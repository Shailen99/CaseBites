const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./db');
const bodyParser = require('body-parser');

const bcrypt = require("bcryptjs");
const saltRounds = 10;

const app = express();
app.use(cors());

// Use bodyParser middleware to parse JSON request bodies
app.use(bodyParser.json());

app.post('/validateUser', async (req, res) => {
  try {
    const database = await connectToDatabase();
    // Make sure the database object is defined before accessing it
    if (database) {
      const user = await database.collection('UserInformation').findOne( {name : req.body.name} );
      if (user && bcrypt.compare(req.body.pass, user.pass)) {
        return res.status(200).send('Login successful');
      }
      else {
        return res.status(401).send("Invalid credentials");
      }
    } 
    else {
      res.status(500).send('Database connection error');
    }
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.post('/addUser', async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send('Invalid request body');
      return;
    }
    
    const user = {
      name: req.body.name,
      pass: req.body.pass,
      onMealPlan: req.body.onMealPlan,
      caseCash: req.body.caseCash,
      mealPlan: req.body.mealPlan
    };

    bcrypt.genSalt(saltRounds, function (saltError, salt) {
      if (saltError) {
        throw saltError
      } else {
        bcrypt.hash(user.pass, salt, function(hashError, hash) {
          if (hashError) {
            throw hashError
          } else {
            user.pass = hash;
          }
        })
      }
    })

    const database = await connectToDatabase();

    // if the username is already taken, don't add the new user
    const existingUsername = await database.collection('UserInformation').findOne({ name: user.name });
    if (existingUsername) {
      return res.status(409).send('Username already exists');
    }
    
    const result = await database.collection('UserInformation').insertOne(user);
    console.log(`Added user with ID: ${result.insertedId}`);
    
    res.status(200).send('User added successfully');
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});