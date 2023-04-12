const express = require('express');
const {MongoClient} = require('mongodb');
const path = require('path');

const app = express();


app.get('/', async (req, res) => {
    const uri = 'mongodb+srv://RestaurantAdmin:CaseBite123@casebites.rejmzyj.mongodb.net/test';
    const client = new MongoClient(uri, { useNewUrlParser: true });

    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'ejs');
    
    // Set the view engine to use EJS templates

    try {
        await client.connect();
        console.log('Connected to MongoDB');
    
        const collection = client.db('CaseBites').collection('RestaurantsInfo');
        const cursor = collection.find();
        const data = [];
        await cursor.forEach((document) => {
          data.push({
            name: document.name,
            location: document.location,
            payOptions: document.payOptions,
            hours: document.hours ,
            popItems: document.popItems,
            waitTime: document.waitTime
          });
        });
        console.log(data);
        res.render(path.join(__dirname+'/map.ejs'),{data:data});
        // The "data" variable is passed to the "index" template file
        } catch (error) {
            console.error(`Error: ${error}`);
            res.send(`Error: ${error}`);
        } finally {
            await client.close();
            console.log('Disconnected from MongoDB');
        }
    });

    app.listen(3000, () => {
    console.log('Server listening on port 3000');
    });

