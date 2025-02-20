import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/Auth_Context";
import BlogContext from "../context/Blog_Context";
import { Link } from "react-router-dom";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { CgMenuMotion, CgSearch, CgSun, CgMoon } from "react-icons/cg";

const Home = () => {
  const [dark, setDark] = useState(false);
  const { user } = useContext(AuthContext);
  const { blogs } = useContext(BlogContext);
  const [externalPosts, setExternalPosts] = useState([]);

  useEffect(() => {
    const fetchExternalPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/blog/external");
        const data = await response.json();
        setExternalPosts(Array.isArray(data.articles) ? data.articles : []);
        console.log("Fetched data:", data);
      } catch (error) {
        console.error("Error fetching external posts:", error);
      }
    };

    fetchExternalPosts();
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        dark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Navbar */}
      <nav className="bg-[#F6F4F6] shadow-md py-10 px-10 flex justify-between items-center h-12">
        <div className="flex items-center gap-6 h-full">
          <CgMenuMotion className="scale-125 cursor-pointer" />
          <div className="flex items-center text-gray-600 hover:text-black text-sm gap-3 px-2 rounded-2xl h-full">
            <CgSearch className="scale-125 cursor-pointer" />
            <p>Search</p>
          </div>
          <div
            className="mode flex items-center text-gray-600 hover:text-black h-full cursor-pointer"
            onClick={() => setDark(!dark)}
          >
            {dark ? <CgMoon /> : <CgSun />}
            <span className="ml-2">{dark ? "Night" : "Day"}</span>
          </div>
        </div>
        <div className="bg-gradient-to-tr from-transparent via-yellow-400 to-transparent text-transparent 
          bg-clip-text gap-1">
          <h1 className="text-2xl font-semibold font-serif rounded-xl">
            RippleRead
          </h1>
        </div>
        <div className="flex items-center gap-5 h-full">
          <a
            href="https://twitter.com"
            target="_blank"
            className="hover:scale-110"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            className="hover:text-blue-600"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            className="hover:text-gray-700"
          >
            <FaGithub />
          </a>
          <Link
            to="/signup"
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            Sign Up
          </Link>
          <Link to="/login" className="bg-white border px-4 py-2 rounded-md">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="py-4 flex justify-center space-x-8 bg-white text-gray-700 text-sm drop-shadow-sm">
        <Link to="/blog/" className="hover:underline">
          POST
        </Link>
        <Link to="/dashboard" className="hover:underline">
          LIKED
        </Link>
        <Link to="/dashboard" className="hover:underline">
          SAVED
        </Link>
        <Link to="/about" className="hover:underline">
          ABOUT
        </Link>
        <Link to="/signup" className="hover:underline">
          JOIN US
        </Link>
      </div>

      {/* Main Content - External Posts */}
      <div className="px-8 pt-12 bg-[F4F3F0]">
        {externalPosts.length > 0 ? (
          <div className="grid gap-6 ">
            {/* First Post - Hero Style */}
            {externalPosts[0] && (
              <div className="w-full">
                <h1 className="text-5xl font-serif text-center max-w-3xl mx-auto pb-8">
                  {externalPosts[0].title.split(" ").slice(0, 10).join(" ")}...
                </h1>
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center font-serif text-sm text-gray-600 mt-2">
                    by{" "}
                    <span className="underline">
                      {externalPosts[0].source_name}
                    </span>{" "}
                  </div>
                  <div className="date font-serif text-gray-600 text-sm text-center mt-2">
                    {new Date(
                      externalPosts[0].published_datetime_utc
                    ).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-6">
                  <img
                    src={externalPosts[0].photo_url}
                    alt="Post"
                    className="w-full h-[600px] object-cover rounded-sm"
                  />
                </div>
              </div>
            )}

            {/* Next Three Posts - Stacked in a Column */}
            <div className="grid md:grid-cols-3 gap-6">
              {externalPosts.slice(1, 4).map((post, index) => (
                <div
                  key={post._id || index}
                  className="shadow-md p-3 rounded-lg bg-[#F4F3F0]"
                >
                  <img
                    src={post.photo_url}
                    alt="Post"
                    className="w-2xl h-60 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-semibold font-serif pb-2 mt-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 font-serif text-sm mt-1">
                    {post.snippet}
                  </p>
                </div>
              ))}
            </div>

            {/* Remaining Posts - Grid Format */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Posts Section (3/4 Width) */}
              <div className="w-full md:w-3/4 bg-gray-200 border border-gray-300 rounded-xl space-y-8">
                {externalPosts.slice(4).map((post, index) => (
                  <div
                    key={post._id || index}
                    className="flex bg-transparent shadow-xs rounded-md overflow-hidden"
                  >
                    {/* Image Section */}
                    <div className="w-2/3 mx-2 h-full">
                      <img
                        src={post.photo_url}
                        alt="Post"
                        className="p-4 rounded-3xl object-cover"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="w-2/3 mr-2 p-6">
                      <h3 className="text-2xl font-serif font-semibold">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 font-serif text-sm mt-4">
                        {post.snippet}
                      </p>
                      <div className="text-sm text-gray-500 font-serif mt-5 flex items-center gap-3">
                        <span className="font-semibold">
                          {post.source_name}
                        </span>{" "}
                        •
                        <span>
                          {new Date(
                            post.published_datetime_utc
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 text-sm mt-3 font-serif block hover:underline"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar Section (1/4 Width) */}
              {/* Sidebar Section (1/4 Width) */}
              <div className="w-full md:w-1/4 space-y-8">
                {/* Categories Section */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                  <h3 className="text-2xl font-extrabold mb-6 text-gray-900 flex items-center gap-2">
                    📌 Categories
                  </h3>
                  <ul className="space-y-4">
                    {[
                      { name: "Trending", icon: "🔥" },
                      { name: "Culture", icon: "🎭" },
                      { name: "Creativity", icon: "🎨" },
                      { name: "Food", icon: "🍽️" },
                      { name: "Travel", icon: "✈️" },
                      { name: "Humor", icon: "😂" },
                      { name: "Music", icon: "🎵" },
                    ].map((category, index) => (
                      <li key={index}>
                        <Link
                          to={`/search?category=${category.name.toLowerCase()}`}
                          className="flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-300"
                        >
                          <span className="text-2xl">{category.icon}</span>{" "}
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Search Bar */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                  <h3 className="text-xl font-extrabold mb-4 text-gray-900 flex items-center gap-2">
                    🔍 Search
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search posts..."
                      className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                    <CgSearch className="absolute left-3 top-3 text-gray-400 text-lg" />
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-blue-50 p-6 rounded-xl shadow-lg border border-blue-200">
                  <h3 className="text-xl font-extrabold mb-4 text-gray-900 flex items-center gap-2">
                    📬 Stay Updated
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Subscribe to receive the latest articles directly in your
                    inbox!
                  </p>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 mb-4"
                  />
                  <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-300">
                    Subscribe
                  </button>
                </div>

                {/* Social Links */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
                  <h3 className="text-xl font-extrabold mb-4 text-gray-900 flex items-center justify-center gap-2">
                    📲 Follow Us
                  </h3>
                  <div className="flex justify-center gap-5">
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      className="text-gray-600 hover:text-blue-500 transition"
                    >
                      <FaTwitter size={24} />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      className="text-gray-600 hover:text-blue-500 transition"
                    >
                      <FaLinkedin size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
