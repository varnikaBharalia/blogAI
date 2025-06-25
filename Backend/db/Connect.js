const mongoose = require('mongoose');

const uri = "mongodb+srv://blogify:ilKQAM1gKEHEONBd@cluster0.mqqne2d.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0";

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


