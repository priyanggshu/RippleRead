import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/Auth_Context";
import BlogContext from "../context/Blog_Context";
import { Link } from "react-router-dom";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CgMenuRight, CgMenu, CgClose , CgSearch, CgSun, CgMoon } from "react-icons/cg";

const Home = () => {
  const [dark, setDark] = useState(false);
  const { user } = useContext(AuthContext);
  const { blogs = [] } = useContext(BlogContext);
  const [externalPosts, setExternalPosts] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [utilityMenuOpen, setUtilityMenuOpen] = useState(false);
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
{/* Top utility bar - responsive version */}
<div
  className={`border-b ${
    dark ? "border-gray-700" : "border-stone-400"
  } py-3 px-4 md:px-6`}
>
  <div className="flex flex-wrap justify-between items-center max-w-6xl mx-auto">
    <div className="flex items-center gap-2 md:gap-4">
      <div
        className={`flex items-center space-x-3 hover:translate-x-1 ${
          dark
            ? "text-gray-300 hover:text-blue-300"
            : "text-[#1B1B1E] hover:text-yellow-500"
        } cursor-pointer transition duration-300`}
        onClick={() => setDark(!dark)}
      >
        {dark ? (
          <CgMoon className="scale-110 md:scale-125 hover:animate-pulse" />
        ) : (
          <CgSun className="scale-110 md:scale-125 hover:animate-spin" />
        )}
        <span className="text-xs md:text-sm font-Montserrat font-medium tracking-wider">
          {dark ? "NIGHT" : "DAY"}
        </span>
      </div>
    </div>

    <div className="flex items-center gap-2 md:gap-4">
      {/* Social media icons */}
      <div className="flex items-center space-x-3">
        <a
          href="https://twitter.com"
          target="_blank"
          className={`${
            dark
              ? "text-gray-400 hover:text-white"
              : "text-gray-700 hover:scale-110 hover:text-black"
          } px-1 transition duration-300`}
        >
          <FaXTwitter className="scale-125 md:scale-150" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          className={`${
            dark
              ? "text-gray-400 hover:text-blue-500"
              : "text-gray-700 hover:scale-110 hover:text-blue-600"
          } px-1 transition duration-300`}
        >
          <FaLinkedin className="scale-125 md:scale-150" />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          className={`${
            dark
              ? "text-gray-400 hover:text-white"
              : "text-gray-700 hover:scale-110 hover:text-gray-900"
          } transition duration-300 px-1`}
        >
          <FaGithub className="scale-125 md:scale-150" />
        </a>
      </div>
      
      {/* Login/Repository buttons */}
      <div className="hidden sm:flex justify-center items-center">
        <div
          className={`border-l ${
            dark ? "border-gray-700" : "border-gray-700"
          } h-4 mx-2`}
        ></div>
        <Link
          to="/login"
          className={`text-xs md:text-sm font-Montserrat font-medium tracking-wider uppercase ${
            dark ? "hover:text-blue-400" : "hover:text-blue-700"
          } mx-1 transition duration-300`}
        >
          Log in
        </Link>
        <Link
          to="/signup"
          className={`ml-2 text-xs md:text-sm font-Montserrat font-medium tracking-wider uppercase text-white px-2 py-1 md:px-3 md:py-1 rounded transition duration-300 ${
            dark
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-400 hover:bg-blue-500"
          }`}
        >
          Repository
        </Link>
      </div>
      
      {/* Menu button for mobile only - shows/hides login buttons on small screens */}
      <button 
        className="sm:hidden ml-2 focus:outline-none"
        onClick={() => setUtilityMenuOpen(!utilityMenuOpen)}
      >
        {utilityMenuOpen ? (
          <CgClose className="text-xl" />
        ) : (
          <CgMenuRight className="text-xl" />
        )}
      </button>
    </div>
  </div>
  
  {/* Mobile utility menu - only visible on small screens when toggled */}
  {utilityMenuOpen && (
    <div className="sm:hidden mt-3 pt-2 border-t border-gray-700">
      <div className="flex flex-col items-center space-y-3">
        <Link
          to="/login"
          className={`text-sm font-Montserrat font-medium border p-2 rounded-lg tracking-wider uppercase ${
            dark ? "hover:text-blue-400" : "hover:text-blue-700"
          } transition duration-300`}
        >
          Log in
        </Link>
        <Link
          to="/signup"
          className={`text-sm font-Montserrat font-medium tracking-wider uppercase text-white px-3 py-1 rounded transition duration-300 ${
            dark
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-400 hover:bg-blue-500"
          } inline-block w-fit`}
        >
          Repository
        </Link>
      </div>
    </div>
  )}
</div>

{/* Main header with logo - responsive version */}
<header
  className={`border-b ${
    dark ? "border-gray-700" : "border-stone-400"
  } py-4 md:py-6`}
>
  <div className="max-w-6xl mx-auto px-4 md:px-6">
    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
      {/* Date - full width on mobile, 1/3 width on desktop */}
      <div className="w-full md:w-1/3 flex justify-center mb-3 md:mb-0 order-2 md:order-1">
        <p className="text-xs md:text-sm font-semibold font-Quattrocento tracking-wider uppercase">
          {currentDate}
        </p>
      </div>

      {/* Logo - centered on mobile, 1/3 width on desktop */}
      <div className="w-full md:w-1/3 text-center mb-4 md:mb-0 order-1 md:order-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold italic tracking-tight">
          RippleRead
        </h1>
        <p
          className={`text-xs sm:text-sm font-Playfair tracking-wider mt-1 ${
            dark ? "text-gray-400" : "text-gray-950"
          }`}
        >
          YOUR DAILY DOSE OF NEWS
        </p>
      </div>

      {/* Search - full width on mobile, 1/3 width on desktop */}
      <div className="w-full md:w-1/3 hidden md:flex justify-center md:justify-end order-3 mt-3 md:mt-0">
        <div
          className={`flex items-center font-Syne border ${
            dark
              ? "border-stone-700 text-white placeholder:text-white"
              : "border-stone-400 text-black placeholder:text-gray-600"
          } rounded-2xl overflow-hidden transition duration-300 hover:border-blue-500 w-full max-w-xs md:max-w-none md:w-auto`}
        >
          <input
            type="text"
            placeholder="Search"
            className={`text-sm px-4 py-2 w-full md:w-40 focus:outline-none ${
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
        <div className="md:hidden flex justify-between items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <CgClose className="text-2xl" />
              ) : (
                <CgMenu className="text-2xl" />
              )}
            </button>
            <span className="font-Quattrocento font-bold">MENU</span>
          </div>
          <div className="hidden md:flex justify-center text-sm font-semibold font-Quattrocento items-center">
            <ul className="flex items-center space-x-8">
              <li>
                <Link to="/" className={`${
                    dark ? "border-red-500 hover:text-red-600" : "text-black border-red-700 hover:text-red-700"} border-b-2 pb-1 transition duration-300`}>HOME</Link>
              </li>
              <div
                className={`border-l ${
                  dark ? "border-gray-500" : "border-gray-700"
                } h-4 items-center gap-2`}
              ></div>
              <li>
                <Link to="/sports" className={`${
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
          {mobileMenuOpen && (
            <div className={`md:hidden py-4 ${dark ? "bg-gray-900" : "bg-white"}`}>
              <ul className="flex flex-col space-y-4">
                <li className="py-2 border-b border-gray-700">
                  <Link 
                    to="/" 
                    className={`block ${dark ? "hover:text-red-600" : "hover:text-red-700"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    HOME
                  </Link>
                </li>
                <li className="py-2 border-b border-gray-700">
                  <Link 
                    to="/sports" 
                    className={`block ${dark ? "hover:text-red-600" : "hover:text-red-700"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    SPORTS
                  </Link>
                </li>
                <li className="py-2 border-b border-gray-700">
                  <Link 
                    to="/business" 
                    className={`block ${dark ? "hover:text-red-600" : "hover:text-red-700"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    BUSINESS
                  </Link>
                </li>
                <li className="py-2 border-b border-gray-700">
                  <Link 
                    to="/tech" 
                    className={`block ${dark ? "hover:text-red-600" : "hover:text-red-700"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    TECHNOLOGY
                  </Link>
                </li>
                <li className="py-2 border-b border-gray-700">
                  <Link 
                    to="/science" 
                    className={`block ${dark ? "hover:text-red-600" : "hover:text-red-700"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    SCIENCE
                  </Link>
                </li>
                <li className="py-2 border-b border-gray-700">
                  <Link 
                    to="/politics" 
                    className={`block ${dark ? "hover:text-red-600" : "hover:text-red-700"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    POLITICS
                  </Link>
                </li>
                <li className="py-2 border-b border-gray-700">
                  <Link 
                    to="/health" 
                    className={`block ${dark ? "hover:text-red-600" : "hover:text-red-700"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    HEALTH
                  </Link>
                </li>
                <li className="py-2 border-b border-gray-700">
                  <Link 
                    to="/lifestyle" 
                    className={`block ${dark ? "hover:text-red-600" : "hover:text-red-700"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    LIFESTYLE
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Featured Article Section */}
        {externalPosts.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center justify-center">
                <span
                  className={`uppercase font-Montserrat font-bold tracking-wider text-blue-500 mb-8`}
                >
                  Featured Story
                </span>
                <h2 className="text-3xl md:text-4xl font-Quattrocento font-bold leading-tight mb-4">
                  {externalPosts[0]?.title}
                </h2>
                <p className="text-xl font-semibold font-Quattrocento leading-relaxed mb-4">
                  {externalPosts[0]?.description || "No description available"}
                </p>
                <p
                  className={`text-sm font-Montserrat font-bold ${
                    dark ? "text-blue-500" : "text-blue-800"
                  } mb-4`}
                >
                  By{" "}
                  <span className="cursor-pointer underline">
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
                  className={`${
                    dark ? "text-green-400" : "text-emerald-500"
                  } hover:translate-x-1 font-Quattrocento font-semibold hover:underline inline-flex items-center`}
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
        <h2
          className={`text-xl font-Montserrat font-extrabold tracking-wide border-b-2 ${
            dark ? "border-blue-500" : "border-blue-700"
          } pb-2 mb-8 inline-block`}
        >
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
                    className="w-full h-64 object-cover transition duration-500 transform group-hover:scale-105"
                  />
                ) : (
                  <div
                    className={`w-full h-48 ${
                      dark ? "bg-gray-700" : "bg-gray-200"
                    } flex items-center justify-center`}
                  >
                    <span className="text-gray-500 dark:text-gray-400">
                      Image not available
                    </span>
                  </div>
                )}
              </div>
              <h3
                className={`text-2xl font-Quattrocento font-bold mb-4 ${
                  dark
                    ? "group-hover:text-blue-400"
                    : "group-hover:text-blue-800"
                } group-hover:font-extrabold transition duration-300`}
              >
                {post.title}
              </h3>
              <p
                className={`font-Quattrocento font-semibold ${
                  dark ? "text-gray-300" : "text-gray-800"
                } mb-2`}
              >
                {post.description?.substring(0, 120) ||
                  "No description available"}
                {post.description?.length > 120 ? "..." : ""}
              </p>
              <div className="flex justify-between items-center mt-4">
                <p
                  className={`font-semibold font-Montserrat ${
                    dark ? "text-blue-600" : "text-blue-800"
                  }`}
                >
                  {post.source_name || "Unknown"}
                </p>
                <a href={post.link} target="_blank" rel="noopener noreferrer" className={`${dark ? "text-blue-400" : "text-blue-700"}  font-medium hover:underline inline-flex items-center`}
                >
                  Read More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
        {/* Editor's Picks & Trending Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Editor's Picks Section */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold border-b-2 border-blue-700 dark:border-blue-500 pb-2 mb-6 inline-block">
                EDITOR'S PICKS
              </h2>
              <div className="space-y-6">
                {externalPosts.slice(0, 3).map((blog) => (
                  <article
                    key={blog._id}
                    className="flex flex-col sm:flex-row border-b pb-6 group hover:shadow-md transition-shadow rounded-lg overflow-hidden"
                  >
                    <div className="w-full sm:w-1/3 sm:pr-4">
                      <div className="overflow-hidden rounded-lg shadow-sm">
                        {blog.image_url ? (
                          <img src={blog.image_url} alt={blog.title} className="w-full h-48 sm:h-32 object-cover transition duration-500 transform group-hover:scale-105"/>
                        ) : (
                          <div className="w-full h-48 sm:h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-500 dark:text-gray-400">
                              Image not available
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-full sm:w-2/3 pt-4 sm:pt-0">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition duration-300">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                        {blog.summary}
                      </p>
                      <Link
                        to={`/blog/${blog._id}`}
                        className="text-blue-700 dark:text-blue-400 text-sm font-medium hover:underline inline-flex items-center"
                      >
                        Continue Reading
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Trending Now Section */}
            <div
              className={`${
                dark ? "bg-gray-800" : "bg-gray-50"
              } p-6 rounded-lg shadow-sm`}
            >
              <h2 className="text-xl font-bold border-b-2 border-blue-700 dark:border-blue-500 pb-2 mb-6 inline-block">
                TRENDING NOW
              </h2>
              <div className="space-y-4">
                {externalPosts.slice(7, 12).map((post, index) => (
                  <article
                    key={post.article_id || post.title}
                    className={`pb-4 border-b ${dark ? "border-gray-700 hover:bg-gray-700 " : "border-gray-200 hover:bg-gray-100"} p-3 rounded-md transition-colors`}
                  >
                    <div className="flex items-start">
                      <span
                        className={`text-3xl font-bold ${
                          dark ? "text-blue-500" : "text-blue-700"
                        } mr-8`}
                      >
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-md font-bold hover:text-blue-700 dark:hover:text-blue-400 transition duration-300">
                          <a href={post.link} target="_blank" rel="noopener noreferrer">{post.title}</a>
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{post.source_name || "Unknown"}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* More News Grid */}
          <div className="mb-12">
            <h2 className="text-xl font-bold border-b-2 border-blue-700 dark:border-blue-500 pb-2 mb-6 inline-block">
              MORE NEWS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {externalPosts.slice(12, 20).map((post) => (
                <article
                  key={post.article_id || post.title}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-md font-bold mb-2 hover:text-blue-700 dark:hover:text-blue-400 transition duration-300 line-clamp-2">
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      {post.title}
                    </a>
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {post.source_name || "Unknown"} •{" "}
                    {post.pub_date
                      ? new Date(post.pub_date).toLocaleDateString()
                      : ""}
                  </p>
                  <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 text-xs font-medium hover:underline inline-flex items-center">
                    Read More
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>{" "}
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
                <a href="https://twitter.com" target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">
                  <FaTwitter size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">
                  <FaLinkedin size={20} />
                </a>
                <a href="https://github.com" target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-md font-bold mb-4 uppercase">Sections</h3>
              <div className="grid grid-cols-2">
                <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    <Link to="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">Home</Link>
                  </li>
                  <li>
                    <Link to="/world" className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">World</Link>
                  </li>
                  <li>
                    <Link to="/business" className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">Business</Link>
                  </li>
                  <li>
                    <Link to="/tech" className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">Technology</Link>
                  </li>
                </ul>
                <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    <Link to="/science" className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">Science</Link>
                  </li>
                  <li>
                    <Link to="/arts" className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">Arts</Link>
                  </li>
                  <li>
                    <Link to="/books" className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">Books</Link>
                  </li>
                  <li>
                    <Link to="/opinion" className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">Opinion</Link>
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
                    dark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded font-medium hover:bg-blue-800 transition duration-300">
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
