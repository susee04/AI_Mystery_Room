const mongoose = require("mongoose");

let connectionPromise;

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not configured");

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    }).then(() => mongoose.connection);
  }

  try {
    return await connectionPromise;
  } finally {
    connectionPromise = null;
  }
}

module.exports = { connectToDatabase };
