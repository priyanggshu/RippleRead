import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">Oops! The page you're looking for doesn't exist or has been moved.</p>

      <Link
        to="/"
        className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
