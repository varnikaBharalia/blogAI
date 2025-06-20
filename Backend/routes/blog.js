const { Router } = require("express");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const multer = require("multer");
const path = require("path");
const { storage } = require("../service/cloudinary");

const router = Router();

const upload = multer({ storage: storage });

router.post("/addNewBlog", upload.single("coverImage"), async (req, res) => {
  try {
    
    console.log("req.file from Cloudinary:", req.file);

    const { title, body, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    const blog = await Blog.create({
      title,
      body,
      coverImage: req.file.path,
      createdBy: userId,
    });

    res.status(201).json({ blog });
  } catch (err) {
    console.error("Error while creating blog:", err);
    return res.status(500).json({ error: "Failed to create blog" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({ blogId: req.params.id }).populate(
      "createdBy"
    );
    return res.status(200).json({ blog, comments });
  } catch (err) {
    console.error("Failed to fetch blog:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/comment/:id", async (req, res) => {
  try {
    console.log("req.body from comment is ", req.body);
    console.log("req.params from comment is ", req.params);

    await Comment.create({
      content: req.body.content,
      blogId: req.params.id,
      createdBy: req.body.user.id, // ✅ Correct: using user from body
    });

    return res.status(201).json({ message: "Comment created successfully" });
  } catch (err) {
    console.error("Error while creating comment:", err);
    return res.status(500).json({ error: "Failed to create comment" });
  }
});

module.exports = router;
