import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="max-w-md">
        <img src="/notfound.png" alt="Page Not Found" className="w-full mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          RETURN TO HOME PAGE
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
