const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://user:pwd@Cluster0.rlbf89n.mongodb.net/?retryWrites=true&w=majority';
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