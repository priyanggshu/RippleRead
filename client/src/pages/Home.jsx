import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/Auth_Context";
import BlogContext from "../context/Blog_Context";
import { Link } from "react-router-dom";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { CgMenuMotion, CgSearch, CgSun, CgMoon } from "react-icons/cg";

const Home = () => {
  const [dark, setDark] = useState(false);
  const { user } = useContext(AuthContext);
  const { blogs = [] } = useContext(BlogContext);
  const [externalPosts, setExternalPosts] = useState([]);
  const api_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchExternalPosts = async () => {
      try {
        const response = await fetch(`${api_url}/blog/external`);
        const data = await response.json();

        if (data && Array.isArray(data.articles)) {
          setExternalPosts(data.articles);
        } else {
          console.warn("Unexpected API response:", data);
          setExternalPosts([]);
        }
      } catch (error) {
        console.error("Error fetching external posts:", error);
        setExternalPosts([]);
      }
    };

    fetchExternalPosts();
  }, [api_url]);

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const currentDate = formatDate(new Date());

  return (
    <div
      className={`min-h-screen flex flex-col ${
        dark ? "bg-gray-900 text-gray-200" : "bg-[#E4E2D6] text-gray-900"
      }`}
    >
      {/* Top utility bar */}
      <div
        className={`border-b ${
          dark ? "border-gray-700" : "border-gray-200"
        } py-2 px-6`}
      >
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <div
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white cursor-pointer"
              onClick={() => setDark(!dark)}
            >
              {dark ? <CgMoon /> : <CgSun />}
              <span className="ml-2 text-xs font-serif">
                {dark ? "NIGHT" : "DAY"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
            >
              <FaGithub />
            </a>
            <Link
              to="/login"
              className="text-xs font-serif uppercase hover:underline"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="text-xs font-serif uppercase hover:underline"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>

      {/* Main header with logo */}
      <header
        className={`border-b ${
          dark ? "border-gray-700" : "border-gray-200"
        } py-4`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="w-1/3">
              <p className="text-xs font-serif uppercase">{currentDate}</p>
            </div>

            <div className="w-1/3 text-center">
              <h1 className="text-4xl font-serif font-bold italic tracking-tight">
                RippleRead
              </h1>
            </div>

            <div className="w-1/3 flex justify-end">
              <div className="flex items-center border rounded">
                <input
                  type="text"
                  placeholder="SEARCH"
                  className={`text-sm px-2 py-1 w-32 focus:outline-none font-serif ${
                    dark ? "bg-gray-800" : "bg-white"
                  }`}
                />
                <button className="px-2">
                  <CgSearch className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation menu */}
      <nav
        className={`border-b ${
          dark ? "border-gray-700" : "border-gray-200"
        } py-3`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between">
            <CgMenuMotion className="cursor-pointer" />
            <ul className="flex space-x-6 font-serif uppercase text-sm">
              <li>
                <Link to="/" className="hover:underline font-bold">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/world" className="hover:underline">
                  World
                </Link>
              </li>
              <li>
                <Link to="/business" className="hover:underline">
                  Business
                </Link>
              </li>
              <li>
                <Link to="/tech" className="hover:underline">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/science" className="hover:underline">
                  Science
                </Link>
              </li>
              <li>
                <Link to="/arts" className="hover:underline">
                  Arts
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:underline">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/opinion" className="hover:underline">
                  Opinion
                </Link>
              </li>
            </ul>
            <div></div> {/* Empty div for flex spacing */}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Featured Article Section */}
        {externalPosts.length > 0 && (
          <div className="mb-12 border-b pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-Quattrocento font-bold leading-tight mb-4">
                  {externalPosts[0]?.title}
                </h2>
                <p className="text-lg font-serif leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
                  {externalPosts[0]?.description || "No description available"}
                </p>
                <p className="text-sm font-serif text-gray-500 dark:text-gray-400 mb-4">
                  By{" "}
                  {externalPosts[0]?.creator ||
                    externalPosts[0]?.source_name ||
                    "Unknown"}{" "}
                  |
                  {externalPosts[0]?.pubDate &&
                    ` ${formatDate(externalPosts[0]?.pubDate)}`}
                </p>
                <a
                  href={externalPosts[0]?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 font-serif hover:underline"
                >
                  Continue Reading
                </a>
              </div>
              <div>
                {externalPosts[0]?.image_url && (
                  <img
                    src={externalPosts[0]?.image_url}
                    alt={externalPosts[0]?.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Latest News Grid */}
        <h2 className="text-2xl font-serif font-bold border-b pb-2 mb-6">
          LATEST NEWS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {externalPosts.slice(1, 7).map((post) => (
            <article key={post.article_id || post.title} className="mb-6">
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-48 object-cover mb-3"
                />
              )}
              <h3 className="text-xl font-serif mb-2">
                {post.title}
              </h3>
              <p className="text-sm font-serif text-gray-700 dark:text-gray-300 mb-2">
                {post.description?.substring(0, 120) ||
                  "No description available"}
                {post.description?.length > 120 ? "..." : ""}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-xs font-serif text-gray-500 dark:text-gray-400">
                  {post.source_name || "Unknown"}
                </p>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 text-sm font-serif hover:underline"
                >
                  Read More
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Blog Section */}
        <h2 className="text-2xl font-serif font-bold border-b pb-2 mb-6">
          FROM OUR BLOG
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <article key={blog._id} className="mb-6 pb-6 border-b">
                <h3 className="text-xl font-serif font-semibold mb-2">
                  {blog.title}
                </h3>
                <p className="text-sm font-serif text-gray-700 dark:text-gray-300 mb-3">
                  {blog.summary}
                </p>
                <Link
                  to={`/blog/${blog._id}`}
                  className="text-blue-700 dark:text-blue-400 text-sm font-serif hover:underline"
                >
                  Continue Reading
                </Link>
              </article>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400 font-serif italic">
              No blogs available at the moment.
            </p>
          )}
        </div>

        {/* More News Section */}
        <h2 className="text-2xl font-serif font-bold border-b pb-2 my-6">
          MORE NEWS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {externalPosts.slice(7, 15).map((post) => (
            <article key={post.article_id || post.title} className="mb-6">
              <h3 className="text-md font-serif font-semibold mb-1">
                {post.title}
              </h3>
              <p className="text-xs font-serif text-gray-500 dark:text-gray-400 mb-2">
                {post.source_name || "Unknown"}
              </p>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 dark:text-blue-400 text-xs font-serif hover:underline"
              >
                Read More
              </a>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`mt-auto border-t ${
          dark ? "border-gray-700" : "border-gray-200"
        } py-8`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-serif font-bold mb-4">RippleRead</h3>
              <p className="text-sm font-serif text-gray-600 dark:text-gray-400">
                Your trusted source for the latest news and insights from around
                the globe.
              </p>
            </div>
            <div>
              <h3 className="text-md font-serif font-bold mb-4">SECTIONS</h3>
              <ul className="text-sm font-serif space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/world" className="hover:underline">
                    World
                  </Link>
                </li>
                <li>
                  <Link to="/business" className="hover:underline">
                    Business
                  </Link>
                </li>
                <li>
                  <Link to="/tech" className="hover:underline">
                    Technology
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-md font-serif font-bold mb-4">FOLLOW US</h3>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                >
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center">
            <p className="text-xs font-serif text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} RippleRead. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
