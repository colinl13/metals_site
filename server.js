const express = require('express');
const path = require('path');
const app = express();
const mime = require("mime");
const port = 3000;

const { MongoClient } = require("mongodb")

// Middleware to parse JSON bodies
app.use(express.json())

// Middleware to serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

async function start() {
  try {
    console.log(`Connecting to MongoDB at ${mongoUri}, db: ${mongoDbName}`)
    const client = new MongoClient(mongoUri)
    await client.connect()
    const db = client.db(mongoDbName)
    todosCollection = db.collection("todos")

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    process.exit(1)
  }
}

start()