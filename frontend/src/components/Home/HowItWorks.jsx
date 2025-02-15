import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto text-center px-6 md:px-12">
        <h3 className="text-3xl font-bold text-gray-800 mb-8">
          How Career Connect Works!
        </h3>
        
        {/* Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <FaUserPlus className="text-blue-600 text-4xl mb-4" />
            <p className="text-xl font-semibold">Create Account</p>
            <p className="text-gray-600 mt-2">
              Sign up and set up your profile to get started on your career journey.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <MdFindInPage className="text-blue-600 text-4xl mb-4" />
            <p className="text-xl font-semibold">Find a Job / Post a Job</p>
            <p className="text-gray-600 mt-2">
              Browse job listings or post a job to find the perfect candidate.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <IoMdSend className="text-blue-600 text-4xl mb-4" />
            <p className="text-xl font-semibold">Apply / Recruit</p>
            <p className="text-gray-600 mt-2">
              Apply for jobs or hire the best talent for your organization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
