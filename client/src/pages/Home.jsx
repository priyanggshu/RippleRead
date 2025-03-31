import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/Auth_Context";
import BlogContext from "../context/Blog_Context";
import { Link } from "react-router-dom";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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
        dark ? "bg-[#1B1B1E] text-[#FBFBFB]" : "bg-[#F2F4F7] text-[#1B1B1E]"
      }`}
    >
      {/* Top utility bar */}
      <div
        className={`border-b ${
          dark ? "border-gray-700" : "border-stone-400"
        } py-3 px-6`}
      >
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center space-x-1 hover:translate-x-1 ${
                dark
                  ? "text-gray-300 hover:text-blue-300"
                  : "text-[#1B1B1E]  hover:text-yellow-500"
              } cursor-pointer transition duration-300`}
              onClick={() => setDark(!dark)}
            >
              {dark ? (
                <CgMoon className="scale-125 hover:animate-pulse" />
              ) : (
                <CgSun className="scale-125 hover:animate-spin" />
              )}
              <span className="ml-2 text-sm font-Montserrat font-medium tracking-wider">
                {dark ? "NIGHT MODE" : "DAY MODE"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              className={`${
                dark
                  ? "text-gray-400 dark:hover:text-white"
                  : "text-gray-700 hover:scale-110 hover:text-black"
              } px-1 transition duration-300`}
            >
              <FaXTwitter className="scale-150" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className={`${
                dark
                  ? "text-gray-400 dark:hover:text-blue-500"
                  : "text-gray-700 hover:scale-110 hover:text-blue-600"
              } px-1 transition duration-300`}
            >
              <FaLinkedin className="scale-150" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              className={`${
                dark
                  ? "text-gray-400 dark:hover:text-white"
                  : "text-gray-700 hover:scale-110 hover:text-gray-900"
              } transition duration-300`}
            >
              <FaGithub className="scale-150" />
            </a>
            <div
              className={`border-l ${
                dark ? "border-gray-700" : "border-gray-700"
              } h-4 mx-2`}
            ></div>
            <Link
              to="/login"
              className={`text-sm font-Montserrat font-medium tracking-wider uppercase ${
                dark ? "dark:hover:text-blue-400" : "hover:text-blue-700"
              } transition duration-300`}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className={` text-sm font-Montserrat font-medium tracking-wider uppercase text-white px-3 py-1 rounded transition duration-300 ${
                dark
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-400 hover:bg-blue-500"
              }`}
            >
              Repository
            </Link>
          </div>
        </div>
      </div>

      {/* Main header with logo */}
      <header
        className={`border-b ${
          dark ? "border-gray-700" : "border-stone-400"
        } py-6`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="w-1/3">
              <p className="text-sm font-semibold font-Quattrocento tracking-wider uppercase">
                {currentDate}
              </p>
            </div>

            <div className="w-1/3 text-center">
              <h1 className="text-4xl md:text-5xl font-bold italic tracking-tight">
                RippleRead
              </h1>
              <p
                className={`text-sm font-Playfair tracking-wider mt-1 ${
                  dark ? "text-gray-400" : "text-gray-950"
                }`}
              >
                YOUR DAILY DOSE OF NEWS
              </p>
            </div>

            <div className="w-1/3 flex justify-end">
              <div
                className={`flex items-center font-Syne border ${
                  dark
                    ? "border-stone-700 text-white placeholder:text-white"
                    : "border-stone-400 text-black placeholder:text-gray-600"
                }  rounded-2xl overflow-hidden transition duration-300 hover:border-blue-500`}
              >
                <input
                  type="text"
                  placeholder="Search"
                  className={`text-sm px-4 py-2 w-40 focus:outline-none ${
                    dark ? "bg-gray-800" : "bg-gray-100"
                  }`}
                />
                <button className="px-3 py-2">
                  <CgSearch
                    className={`${dark ? "text-gray-400" : "text-stone-600"}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation menu */}
      <nav
        className={`sticky top-0 z-10 ${
          dark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        } border-b py-3 shadow-sm`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center text-sm font-semibold font-Quattrocento items-center">
            <ul className="flex items-center space-x-8">
              <li>
                <Link
                  to="/"
                  className={`${
                    dark
                      ? "border-red-500 hover:text-red-600"
                      : "text-black border-red-700 hover:text-red-700"
                  } border-b-2 pb-1 transition duration-300`}
                >
                  HOME
                </Link>
              </li>
              <div
                className={`border-l ${
                  dark ? "border-gray-500" : "border-gray-700"
                } h-4 items-center gap-2`}
              ></div>
              <li>
                <Link
                  to="/sports"
                  className={`${
                    dark
                      ? "border-red-500 hover:text-red-600"
                      : "text-black border-red-700 hover:text-red-700"
                  } border-b-2 pb-1 transition duration-300`}
                >
                  SPORTS
                </Link>
              </li>
              <div
                className={`border-l ${
                  dark ? "border-gray-500" : "border-gray-700"
                } h-4 items-center gap-2`}
              ></div>
              <li>
                <Link
                  to="/business"
                  className={`${
                    dark
                      ? "border-red-500 hover:text-red-600"
                      : "text-black border-red-700 hover:text-red-700"
                  } border-b-2 pb-1 transition duration-300`}
                >
                  BUSINESS
                </Link>
              </li>
              <div
                className={`border-l ${
                  dark ? "border-gray-500" : "border-gray-700"
                } h-4 items-center gap-2`}
              ></div>
              <li>
                <Link
                  to="/tech"
                  className={`${
                    dark
                      ? "border-red-500 hover:text-red-600"
                      : "text-black border-red-700 hover:text-red-700"
                  } border-b-2 pb-1 transition duration-300`}
                >
                  TECHNOLOGY
                </Link>
              </li>
              <div
                className={`border-l ${
                  dark ? "border-gray-500" : "border-gray-700"
                } h-4 items-center gap-2`}
              ></div>
              <li>
                <Link
                  to="/science"
                  className={`${
                    dark
                      ? "border-red-500 hover:text-red-600"
                      : "text-black border-red-700 hover:text-red-700"
                  } border-b-2 pb-1 transition duration-300`}
                >
                  SCIENCE
                </Link>
              </li>
              <div
                className={`border-l ${
                  dark ? "border-gray-500" : "border-gray-700"
                } h-4 items-center gap-2`}
              ></div>
              <li>
                <Link
                  to="/politics"
                  className={`${
                    dark
                      ? "border-red-500 hover:text-red-600"
                      : "text-black border-red-700 hover:text-red-700"
                  } border-b-2 pb-1 transition duration-300`}
                >
                  POLITICS
                </Link>
              </li>
              <div
                className={`border-l ${
                  dark ? "border-gray-500" : "border-gray-700"
                } h-4 items-center gap-2`}
              ></div>
              <li>
                <Link
                  to="/health"
                  className={`${
                    dark
                      ? "border-red-500 hover:text-red-600"
                      : "text-black border-red-700 hover:text-red-700"
                  } border-b-2 pb-1 transition duration-300`}
                >
                  HEALTH
                </Link>
              </li>
              <div
                className={`border-l ${
                  dark ? "border-gray-500" : "border-gray-700"
                } h-4 items-center gap-2`}
              ></div>
              <li>
                <Link
                  to="/lifestyle"
                  className={`${
                    dark
                      ? "border-red-500 hover:text-red-600"
                      : "text-black border-red-700 hover:text-red-700"
                  } border-b-2 pb-1 transition duration-300`}
                >
                  LIFESTYLE
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Featured Article Section */}
        {externalPosts.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center justify-center">
                <span className="text-xs uppercase tracking-wider text-blue-700 dark:text-blue-500 font-medium mb-2">
                  Featured Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                  {externalPosts[0]?.title}
                </h2>
                <p className="text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
                  {externalPosts[0]?.description || "No description available"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  By{" "}
                  <span className="font-medium">
                    {externalPosts[0]?.creator ||
                      externalPosts[0]?.source_name ||
                      "Unknown"}
                  </span>{" "}
                  |
                  {externalPosts[0]?.pubDate &&
                    ` ${formatDate(externalPosts[0]?.pubDate)}`}
                </p>
                <a
                  href={externalPosts[0]?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 font-medium hover:underline inline-flex items-center"
                >
                  Continue Reading
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </a>
              </div>
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                {externalPosts[0]?.image_url ? (
                  <img
                    src={externalPosts[0]?.image_url}
                    alt={externalPosts[0]?.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full min-h-80 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">
                      Image not available
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Top Stories Section */}
        <h2 className="text-xl font-bold border-b-2 border-blue-700 dark:border-blue-500 pb-2 mb-6 inline-block">
          TOP STORIES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {externalPosts.slice(1, 7).map((post) => (
            <article key={post.article_id || post.title} className="mb-6 group">
              <div className="mb-3 overflow-hidden rounded-lg shadow-md">
                {post.image_url ? (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-48 object-cover transition duration-500 transform group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">
                      Image not available
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition duration-300">
                {post.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                {post.description?.substring(0, 120) ||
                  "No description available"}
                {post.description?.length > 120 ? "..." : ""}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {post.source_name || "Unknown"}
                </p>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 dark:text-blue-400 text-sm font-medium hover:underline inline-flex items-center"
                >
                  Read More
                  <svg
                    className="w-3 h-3 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Editor's Picks & Trending Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold border-b-2 border-blue-700 dark:border-blue-500 pb-2 mb-6 inline-block">
              EDITOR'S PICKS
            </h2>
            <div className="space-y-6">
              {blogs.slice(0, 3).map((blog) => (
                <article key={blog._id} className="flex border-b pb-6">
                  <div className="w-1/3 pr-4">
                    <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="w-2/3">
                    <h3 className="text-xl font-bold mb-2 hover:text-blue-700 dark:hover:text-blue-400 transition duration-300">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      {blog.summary}
                    </p>
                    <Link
                      to={`/blog/${blog._id}`}
                      className="text-blue-700 dark:text-blue-400 text-sm font-medium hover:underline inline-flex items-center"
                    >
                      Continue Reading
                      <svg
                        className="w-3 h-3 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold border-b-2 border-blue-700 dark:border-blue-500 pb-2 mb-6 inline-block">
              TRENDING NOW
            </h2>
            <div className="space-y-4">
              {externalPosts.slice(7, 12).map((post, index) => (
                <article
                  key={post.article_id || post.title}
                  className="pb-4 border-b"
                >
                  <div className="flex items-start">
                    <span className="text-3xl font-bold text-gray-200 dark:text-gray-700 mr-4">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-md font-bold hover:text-blue-700 dark:hover:text-blue-400 transition duration-300">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {post.source_name || "Unknown"}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* More News Grid */}
        <h2 className="text-xl font-bold border-b-2 border-blue-700 dark:border-blue-500 pb-2 mb-6 inline-block">
          MORE NEWS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {externalPosts.slice(12, 20).map((post) => (
            <article
              key={post.article_id || post.title}
              className="mb-6 pb-4 border-b"
            >
              <h3 className="text-md font-bold mb-1 hover:text-blue-700 dark:hover:text-blue-400 transition duration-300">
                {post.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {post.source_name || "Unknown"}
              </p>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 dark:text-blue-400 text-xs font-medium hover:underline inline-flex items-center"
              >
                Read More
                <svg
                  className="w-3 h-3 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </a>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`mt-auto ${
          dark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"
        } border-t py-12`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">RippleRead</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Your trusted source for the latest news and insights from around
                the globe, delivered with depth and context.
              </p>
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
                >
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-md font-bold mb-4 uppercase">Sections</h3>
              <div className="grid grid-cols-2">
                <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    <Link
                      to="/"
                      className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/world"
                      className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
                    >
                      World
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/business"
                      className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
                    >
                      Business
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tech"
                      className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
                    >
                      Technology
                    </Link>
                  </li>
                </ul>
                <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    <Link
                      to="/science"
                      className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
                    >
                      Science
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/arts"
                      className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
                    >
                      Arts
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/books"
                      className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
                    >
                      Books
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/opinion"
                      className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
                    >
                      Opinion
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-md font-bold mb-4 uppercase">Subscribe</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Get the latest news delivered to your inbox. We promise not to
                spam you.
              </p>
              <form className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className={`px-4 py-2 rounded border ${
                    dark
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-4 py-2 rounded font-medium hover:bg-blue-800 transition duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} RippleRead. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
