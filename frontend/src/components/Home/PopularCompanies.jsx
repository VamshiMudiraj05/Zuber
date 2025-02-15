import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Millennium City Centre, Gurugram",
      openPositions: 10,
      icon: <FaMicrosoft className="text-blue-600 text-5xl" />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Millennium City Centre, Gurugram",
      openPositions: 5,
      icon: <SiTesla className="text-red-600 text-5xl" />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Millennium City Centre, Gurugram",
      openPositions: 20,
      icon: <FaApple className="text-gray-600 text-5xl" />,
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto text-center px-6 md:px-12">
        <h3 className="text-3xl font-bold text-gray-800 mb-8">Top Companies</h3>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transition transform hover:scale-105"
            >
              <div className="mb-4">{company.icon}</div>
              <p className="text-lg font-semibold text-gray-800">{company.title}</p>
              <p className="text-gray-600 text-sm">{company.location}</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Open Positions: {company.openPositions}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCompanies;
