const { Router } = require("express");
const Blog = require("../models/blog");
const router = Router();


router.get("/logOut", (req, res) => {
  res.clearCookie("token").redirect("/signin");
});

router.get("/addBlog", (req, res) => {
  res.render("addBlog", { user: req.user });
});

router.get("/:id",async(req,res)=>{
  console.log("req.params isssssss ", req.params);
  console.log("req.params.id isssssss ", req.params.id);
  const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({blogId:req.params.id}).populate("createdBy");
    return res.render("blog",{user:req.user,blog,comments});
});

// router.post("/comment/:blogId", async (req, res) => {
//     await Comment.create({
//       content: req.body.content,
//       blogId: req.params.blogId,
//       createdBy: req.user._id,
//     });
//     return res.redirect(`/blog/${req.params.blogId}`);
//   });


  /**
   router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
  return res.json({ blog, comments });
});
   */

module.exports = router;
