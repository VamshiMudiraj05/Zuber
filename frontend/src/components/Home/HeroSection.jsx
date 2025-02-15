import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Jobs",
      icon: <FaSuitcase className="text-blue-600 text-4xl" />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <FaBuilding className="text-blue-600 text-4xl" />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers className="text-blue-600 text-4xl" />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus className="text-blue-600 text-4xl" />,
    },
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 md:px-12 lg:flex lg:items-center">
        {/* Left Section */}
        <div className="lg:w-1/2 space-y-4 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-gray-800 leading-tight">
            Find a job that suits <br /> your interests and skills
          </h1>
          <p className="text-gray-600">
            Discover job opportunities that match your skills and passions.
            Connect with employers seeking talent like yours for rewarding
            careers.
          </p>
        </div>

        {/* Right Section - Image */}
        <div className="lg:w-1/2 flex justify-center mt-6 lg:mt-0">
          <img src="/heroS.jpg" alt="Hero" className="w-full max-w-md rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-12 text-center">
        {details.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-3 flex justify-center">{item.icon}</div>
            <p className="text-xl font-bold text-gray-800">{item.title}</p>
            <p className="text-gray-600">{item.subTitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
