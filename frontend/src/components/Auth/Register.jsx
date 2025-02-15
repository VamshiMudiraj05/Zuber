import React, { useContext, useState } from "react";
import { FaRegUser, FaPencilAlt, FaPhone } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Create a New Account
        </h3>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Register As</label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Name</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <FaPencilAlt className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <MdOutlineMailOutline className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Phone Number</label>
            <div className="relative">
              <input
                type="number"
                placeholder="Enter your phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <FaPhone className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <RiLock2Fill className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
          <div className="text-center">
            <Link to="/login" className="text-blue-500 hover:underline">
              Login Now
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
