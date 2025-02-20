import Blog from "../db/Blog.js";
import { redisClient } from "../server.js";
import { generateSummary } from "../services/ai_service.js";
import { fetchExternalData } from "../services/external_services.js";

export const createBlogController = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const summary = await generateSummary(content);
    const newBlog = new Blog({ title, content, author, summary });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error.message);
  }
};

export const fetchBlogsController = async (req, res) => {
  try {
    const { page = 1, limit = 5, search } = req.query;
    const cacheKey = `blogs-page-${page}-limit-${limit}-search-${search || 'all'}`;

    const cacheData = await redisClient.get(cacheKey)
      if(cacheData) {
        return res.json(JSON.parse(cacheData));
      } 

    const query = search ? { title: new RegExp(search, 'i') } : {};
    const blogs = await Blog.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalBlogs = await Blog.countDocuments(query);
    const response = { blogs, totalPages: Math.ceil(totalBlogs / limit) };

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(response));
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error.message);
  }
};



export const getBLogByIdController = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!blog) {
      return res.status(401).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error.message);
  }
};

export const updateBlogController = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(401).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error.message);
  }
};

export const deleteBlogController = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if(!blog) {
      return res.status(403).json({ message: "Blog not found" });
    };

    if(blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not Authorized" });
    };

    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error.message);
  }
};

export const likeBlogController = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if(!blog) {
      return res.status(403).json({ message: "Blog not found" });
    };

    if(blog.likes.includes(req.user.id)) {
      blog.likes = blog.likes.filter(id => id.toString() !== req.user.id);
    } else {
      blog.likes.push(req.user.id);
    };

    await blog.save();
    res.status(200).json({ message: "Blog like status updated", likes: blog.likes.length });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error.message);
  }
};

export const saveBlogController = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if(!blog) {
      return res.status(403).json({ message: "Blog not found" });
    };

    if(blog.savedBy.includes(req.user.id)) {
      blog.savedBy = blog.savedBy.filter(id => id.toString() !== req.user.id);
    } else {
      blog.savedBy.push(req.user.id);
    };

    await blog.save();
    res.status(200).json({ message: "Blog save status updated" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error.message);
  }
};


export const getRecommendationsController = async (req, res) => {
  try {
    const userId = req.user.id;

    const likedBlogs = await Blog.find({ likes: userId }).select('_id category author');

    if(!likedBlogs.length) {
      return res.json({ message: "No recommendations available yet" });
    };

    const categories = [...new Set(likedBlogs.map(blog => blog.category))];
    const authors = [...new Set(likedBlogs.map(blog => blog.author.toString()))];

    const recommendations = await Blog.find({
      $or: [
        { category: { $in: category } },
        { author: { $in: authors } }
      ],
      _id: { $nin: likedBlogs.map(blog => blog._id) },
      likes: { $ne: userId },
      savedBy: {$ne: userId }
    }).limit(5);
    
    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error.message);
  }
};

export const fetchExternalSourcesController = async (req, res) => {
  try {
    const data = await fetchExternalData();
    if (!data.length) {
      return res.status(404).json({ message: "No articles found" });
    }
    res.json({ success: true, articles: data });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error("Controller error:", error.message);
  }
};
