import Blog from "../db/Blog.js";

export const createBlogController = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newBlog = new Blog({ title, content, author });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error.message);
  }
};

export const fetchBlogsController = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (!blogs) {
      return res.status(401).json({ message: "No blogs found" });
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error.message);
  }
};
