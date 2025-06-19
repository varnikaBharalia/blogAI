const { Router } = require("express");
const { createHmac } = require("crypto");
const User = require("../models/user"); 
const Blog = require("../models/blog"); 
const { generateToken } = require("../service/auth");

const router = Router();

router.post("/signup", async (req, res) => {
  if(!req.body || !req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Name, email, and password are required" })};

  const { name, email, password } = req.body;

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists with this email" });
    }

    // Create new user (pre-save hook will hash password)
    const user = await User.create({ name, email, password });

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/signin", async (req, res) => {
  if(!req.body || !req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Email and password are required" })};
  const { email, password } = req.body;

  try {
 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Step 2: Hash the password with user's stored salt
    const hashedPassword = createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");

    // Step 3: Compare hashes
    if (hashedPassword !== user.password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Step 4: Generate JWT token
    const token = generateToken(user);

    // Step 5: Optionally fetch related data (e.g., blogs)
    const blogs = await Blog.find({}); // adjust filter if needed

    // Step 6: Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      blogs,
    });
  } catch (err) {
    console.error("Signin Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
