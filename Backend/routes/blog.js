const { Router } = require("express");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const multer = require("multer");
const path = require("path");
const { console } = require("inspector");

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post("/addNewBlog", upload.single("coverImage"), async (req, res) => {
  console.log("req from backend is ", req.body);
  console.log(req.file);

  const { title, body, userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  const blog = await Blog.create({
    title,
    body,
    coverImage: `/uploads/${req.file.filename}`,
    createdBy: userId,
  });

  res.status(201).json({ blog });
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
