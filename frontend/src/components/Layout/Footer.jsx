import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-6">
      <div className="container mx-auto px-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Job Portal. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
