const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./db");
const bodyParser = require("body-parser");

const bcrypt = require("bcryptjs");
const saltRounds = 10;

const app = express();
app.use(cors());

// Use bodyParser middleware to parse JSON request bodies
app.use(bodyParser.json());

app.post("/getComments", async (req, res) => {
  const database = await connectToDatabase();
  const CommentsDB = database.collection("Comments");
  const restaurantName = JSON.parse(req.body.resName);
  const commentsCollection = CommentsDB.find({ resName: restaurantName });

  const comments = [];

  await commentsCollection.forEach((document) => {
    comments.push({
      username: document.username,
      comment: document.comment,
    });
  });

  res.status(200).send(comments);
});

app.post("/addComment", async (req, res) => {
  const database = await connectToDatabase();
  const CommentsDB = database.collection("Comments");
  const resName = JSON.parse(req.body.resName);

  const comment = {
    resName: resName,
    username: JSON.parse(req.body.username),
    comment: JSON.parse(req.body.comment),
  };

  let result = false;

  try {
    result = await CommentsDB.insertOne(comment);
    console.log(`Added comment with ID: ${result.insertedId}`);
  } catch (error) {
    console.error(error);
  }

  if (result) res.status(200).send();
});

app.post("/resetSwipes", async (req, res) => {
  const database = await connectToDatabase();
  const UserInformation = database.collection("UserInformation");
  const userName = JSON.parse(req.body.username);
  const user = await UserInformation.findOne({
    name: userName,
  });

  await UserInformation.updateOne(
    { name: userName },
    {
      $set: {
        mealSwipes: user.mealPlanMealSwipes,
        portSwipes: user.mealPlanPortSwipes,
      },
    }
  );

  res.status(200).send();
});

app.post("/usedMealSwipe", async (req, res) => {
  const database = await connectToDatabase();
  const UserInformation = database.collection("UserInformation");
  const userName = JSON.parse(req.body.username);
  const user = await UserInformation.findOne({
    name: userName,
  });

  await UserInformation.updateOne(
    { name: userName },
    {
      $set: { mealSwipes: user.mealSwipes - 1 },
    }
  );

  res.status(200).send();
});

app.post("/usedPortSwipe", async (req, res) => {
  const database = await connectToDatabase();
  const UserInformation = database.collection("UserInformation");
  const userName = JSON.parse(req.body.username);
  const user = await UserInformation.findOne({ name: userName });

  await UserInformation.updateOne(
    { name: userName },
    {
      $set: { portSwipes: user.portSwipes - 1 },
    }
  );

  res.status(200).send();
});

app.post("/getResName", async (req, res) => {
  const database = await connectToDatabase();
  const RestaurantManagers = database.collection("RestaurantManagers");
  const resName = await RestaurantManagers.findOne({
    username: req.body.username,
  });

  res.send(resName);
});

app.post("/userInformation", async (req, res) => {
  const database = await connectToDatabase();
  const userName = JSON.parse(req.body.username);

  const userInfo = {
    caseCash: 0,
    portSwipes: 0,
    mealSwipes: 0,
    reviewPoints: 0,
    mealPlanPortSwipes: 0,
    mealPlanMealSwipes: 0,
  };

  if (userName == null) {
    res.json(userInfo);
    return;
  }

  const UserInformation = database.collection("UserInformation");
  const user = await UserInformation.findOne({ name: userName });

  if (user == null) {
    res.json(userInfo);
    return;
  }

  userInfo.reviewPoints = user.points;
  userInfo.caseCash = user.caseCash;
  userInfo.portSwipes = user.portSwipes;
  userInfo.mealSwipes = user.mealSwipes;
  userInfo.mealPlanMealSwipes = user.mealPlanMealSwipes;
  userInfo.mealPlanPortSwipes = user.mealPlanPortSwipes;

  res.json(userInfo);
});

app.get("/restaurantData", async (req, res) => {
  const database = await connectToDatabase();
  const RestaurantsInfo = database.collection("RestaurantsInfo");
  const restaurants = RestaurantsInfo.find();
  const data = [];

  await restaurants.forEach((document) => {
    data.push({
      name: document.name,
      location: document.location,
      payOptions: document.payOptions,
      hours: document.hours,
      popItems: document.popItems,
      waitTime: document.waitTime,
      img: document.img,
    });
  });

  res.status(200).send(data);
});

app.post("/validateRestaurant", async (req, res) => {
  try {
    const database = await connectToDatabase();
    // Make sure the database object is defined before accessing it
    if (database) {
      const user = await database
        .collection("RestaurantLogIn")
        .findOne({ name: req.body.name });
      if (user && bcrypt.compare(req.body.pass, user.pass)) {
        return res.status(200).send("Login successful");
      } else {
        return res.status(401).send("Invalid credentials");
      }
    } else {
      res.status(500).send("Database connection error");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.post("/validateUser", async (req, res) => {
  try {
    const database = await connectToDatabase();
    // Make sure the database object is defined before accessing it
    if (database) {
      const user = await database
        .collection("UserInformation")
        .findOne({ name: req.body.name });
      if (user && bcrypt.compare(req.body.pass, user.pass)) {
        return res.status(200).send("Login successful");
      } else {
        return res.status(401).send("Invalid credentials");
      }
    } else {
      res.status(500).send("Database connection error");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.post("/addUser", async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send("Invalid request body");
      return;
    }

    const user = {
      name: req.body.name,
      pass: req.body.pass,
      onMealPlan: req.body.onMealPlan,
      caseCash: req.body.caseCash,
      mealPlan: req.body.mealPlan,
      points: req.body.points,
      mealPlanPortSwipes: 0,
      mealPlanMealSwipes: 0,
      portSwipes: 0,
      mealSwipes: 0,
    };

    if (user.onMealPlan) {
      if (user.mealPlan == "Unlimited") {
        user.portSwipes = 7;
        user.mealSwipes = "Unlimited";
      } else if (user.mealPlan == "10 Classic") {
        user.portSwipes = 3;
        user.mealSwipes = 10;
      } else if (user.mealPlan == "14 Classic") {
        user.portSwipes = 3;
        user.mealSwipes = 14;
      } else if (user.mealPlan == "17 Classic") {
        user.portSwipes = 3;
        user.mealSwipes = 17;
      } else if (user.mealPlan == "10 Halal/Kosher") {
        user.portSwipes = 3;
        user.mealSwipes = 10;
      } else if (user.mealPlan == "14 Halal/Kosher") {
        user.portSwipes = 3;
        user.mealSwipes = 14;
      } else if (user.mealPlan == "Apartment 5/3/150") {
        user.portSwipes = 3;
        user.mealSwipes = 5;
      } else if (user.mealPlan == "Apartment 7/5/100") {
        user.portSwipes = 3;
        user.mealSwipes = 7;
      } else {
        user.portSwipes = 3;
        user.mealSwipes = 5;
      }
    }
    user.mealPlanMealSwipes = user.mealSwipes;
    user.mealPlanPortSwipes = user.portSwipes;

    bcrypt.genSalt(saltRounds, function (saltError, salt) {
      if (saltError) {
        throw saltError;
      } else {
        bcrypt.hash(user.pass, salt, function (hashError, hash) {
          if (hashError) {
            throw hashError;
          } else {
            user.pass = hash;
          }
        });
      }
    });

    const database = await connectToDatabase();

    // if the username is already taken, don't add the new user
    const existingUsername = await database
      .collection("UserInformation")
      .findOne({ name: user.name });
    if (existingUsername) {
      return res.status(409).send("Username already exists");
    }

    const result = await database.collection("UserInformation").insertOne(user);
    console.log(`Added user with ID: ${result.insertedId}`);

    res.status(200).send("User added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
