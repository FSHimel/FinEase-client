import { Link } from "react-router";

const Error = () => {
  return (
    <div className="min-h-screen">
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white px-4 text-center">
        <h1 className="text-7xl font-bold mb-4">404</h1>

        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>

        <p className="text-gray-400 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <ul className="p-3 rounded-3xl">
          <Link
            to={"/"}
            className="px-3 py-3  font-semibold rounded-lg transition"
          >
            Go Back Home
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Error;
