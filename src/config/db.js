const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Use local MongoDB - change to 127.0.0.1 instead of localhost
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/todoapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    console.log("\n🔧 Troubleshooting Tips:");
    console.log("1. Make sure MongoDB is running locally");
    console.log("2. Try: mongod --dbpath C:\\data\\db");
    console.log("3. Or use MongoDB Atlas (cloud) instead");
    process.exit(1);
  }
};

module.exports = connectDB;
