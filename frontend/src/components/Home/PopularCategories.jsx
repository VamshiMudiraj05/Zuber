import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices className="text-blue-600 text-4xl" />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled className="text-blue-600 text-4xl" />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook className="text-blue-600 text-4xl" />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Positions",
      icon: <FaReact className="text-blue-600 text-4xl" />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance className="text-blue-600 text-4xl" />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence className="text-blue-600 text-4xl" />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation className="text-blue-600 text-4xl" />,
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController className="text-blue-600 text-4xl" />,
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto text-center px-6 md:px-12">
        <h3 className="text-3xl font-bold text-gray-800 mb-8">
          Popular Categories
        </h3>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transition transform hover:scale-105"
            >
              <div className="mb-4">{category.icon}</div>
              <p className="text-lg font-semibold text-gray-800">{category.title}</p>
              <p className="text-gray-600 text-sm">{category.subTitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
