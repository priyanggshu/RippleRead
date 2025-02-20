import { createContext, useState, useEffect } from "react";
import axios from "axios";

const BlogContext = createContext({ blogs: [] });

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/blog")
        .then(res => setBlogs(res.data.blogs))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }, []);

    return (
        <BlogContext.Provider value={{ blogs, loading }}>
            { children }
        </BlogContext.Provider>
    );
};

export default BlogContext;