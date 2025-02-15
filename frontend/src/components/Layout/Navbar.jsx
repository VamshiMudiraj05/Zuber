import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">JobPortal</h1>

        <ul
          className={`md:flex md:items-center absolute md:static bg-blue-600 md:bg-transparent w-full md:w-auto left-0 md:flex-row flex-col text-center md:text-left ${
            show ? "top-16" : "-top-96"
          } transition-all duration-300 ease-in-out md:space-x-6`}
        >
          <li className="py-2 md:py-0">
            <Link
              to="/"
              className="hover:text-gray-200 transition"
              onClick={() => setShow(false)}
            >
              HOME
            </Link>
          </li>
          <li className="py-2 md:py-0">
            <Link
              to="/job/getall"
              className="hover:text-gray-200 transition"
              onClick={() => setShow(false)}
            >
              ALL JOBS
            </Link>
          </li>
          <li className="py-2 md:py-0">
            <Link
              to="/applications/me"
              className="hover:text-gray-200 transition"
              onClick={() => setShow(false)}
            >
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>

          {user && user.role === "Employer" && (
            <>
              <li className="py-2 md:py-0">
                <Link
                  to="/job/post"
                  className="hover:text-gray-200 transition"
                  onClick={() => setShow(false)}
                >
                  POST NEW JOB
                </Link>
              </li>
              <li className="py-2 md:py-0">
                <Link
                  to="/job/me"
                  className="hover:text-gray-200 transition"
                  onClick={() => setShow(false)}
                >
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          )}

          <li className="py-2 md:py-0">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
            >
              LOGOUT
            </button>
          </li>
        </ul>

        {/* Hamburger Menu */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={() => setShow(!show)}>
          {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
