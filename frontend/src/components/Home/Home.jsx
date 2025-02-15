import React, { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

const Home = () => {
  const { isAuthorized } = useContext(Context);

  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="bg-gray-100 min-h-screen">
      <HeroSection />
      <div className="container mx-auto px-6 md:px-12 space-y-12">
        <HowItWorks />
        <PopularCategories />
        <PopularCompanies />
      </div>
    </section>
  );
};

export default Home;
