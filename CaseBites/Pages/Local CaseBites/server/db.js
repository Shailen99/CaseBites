const { MongoClient } = require('mongodb');
require("dotenv").config({ path: "./config.env" });

const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
 
    const database = client.db('UserLogins');
    console.log(`Database "${database.databaseName}" is ready!`);

    return database;
  } 
  catch (e) {
    console.error(e);
  }
}

module.exports = { connectToDatabase };