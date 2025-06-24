const { Router } = require("express");
const User = require("../models/user");
const Blog = require("../models/blog");
const { generateToken, verifyToken } = require("../service/auth");

const router = Router();

router.post("/signup", async (req, res) => {
  if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User already exists with this email" });
    }

    res.status(201).json({
      message: "Signup successful",
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/signin", async (req, res) => {
  console.log("Request body:-->", req.body);
  if (!req.body || !req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    // console.log("User found:-->", user);
    if (!user && password === user.password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user);

    // console.log("Generated token:-->", token);

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "None", // "None" if using cross-origin in production with HTTPS
        secure: true, // true if using HTTPS (e.g., on Vercel)
      })
      .status(200)
      .json({
        message: "Login successful",
      });
  } catch (err) {
    console.error("Signin Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/logOut", (req, res) => {
  console.log("Logging out user");
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: true
  });
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
