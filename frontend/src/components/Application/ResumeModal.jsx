import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Resume Image */}
        <img
          src={imageUrl}
          alt="Resume"
          className="w-full h-auto max-h-[80vh] object-contain rounded"
        />
      </div>
    </div>
  );
};

export default ResumeModal;
