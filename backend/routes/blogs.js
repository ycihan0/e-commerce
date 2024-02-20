const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog.js");

//create a new blog
router.post("/", async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();

    res.status(201).json(newBlog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//bring all blogs (Read-All)
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//bring one Blog (Read-Sigle)
router.get("/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found." });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//blog update
router.put("/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const updates = req.body;
    const existingBlog = await Blog.findById(blogId);
    if (!existingBlog) {
      return res.status(404).json({ error: "Blog not found." });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updates, {
      new: true,
    });
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error: Server error." });
  }
});

//blog delete
router.delete("/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;

    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found." });
    }

    res.status(200).json(deletedBlog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//Search blogs by name
router.get("/search/:blogName", async (req, res) => {
  try {
    const blogName = req.params.blogName;
    const blogs = await Blog.find({
      name:{$regex:blogName, $options:"i"}//regex belirli bir isme göre ara options ise büyük küçük harf zorunluluğu olmadan ara
    })
    res.status(200).json(blogs)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
