const mongoose = require('mongoose');

const uri = "mongodb+srv://hellomohit:ArPBXN5aZ7Pc3Yg2@cluster0.zij5twe.mongodb.net/hellomohit?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); 
  }
};

module.exports = connectDB;
