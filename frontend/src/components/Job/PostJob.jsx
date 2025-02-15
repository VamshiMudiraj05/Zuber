import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleJobPost = async (e) => {
    e.preventDefault();

    const jobData =
      salaryType === "Fixed Salary"
        ? { title, description, category, country, city, location, fixedSalary }
        : { title, description, category, country, city, location, salaryFrom, salaryTo };

    try {
      const { data } = await axios.post("http://localhost:4000/api/v1/job/post", jobData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      toast.success(data.message);
      setTitle("");
      setDescription("");
      setCategory("");
      setCountry("");
      setCity("");
      setLocation("");
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
      setSalaryType("default");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post job!");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h3 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Post a New Job
        </h3>
        <form onSubmit={handleJobPost} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            <option value="Graphics & Design">Graphics & Design</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Frontend Web Development">Frontend Web Development</option>
            <option value="MERN Stack Development">MERN STACK Development</option>
            <option value="Account & Finance">Account & Finance</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Video Animation">Video Animation</option>
            <option value="MEAN Stack Development">MEAN STACK Development</option>
            <option value="Data Entry Operator">Data Entry Operator</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          <div>
            <label className="text-gray-600 font-medium">Salary Type</label>
            <select
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>

            {salaryType === "default" ? (
              <p className="text-red-500 text-sm mt-1">Please select a salary type</p>
            ) : salaryType === "Fixed Salary" ? (
              <input
                type="number"
                placeholder="Enter Fixed Salary"
                value={fixedSalary}
                onChange={(e) => setFixedSalary(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            ) : (
              <div className="grid grid-cols-2 gap-4 mt-2">
                <input
                  type="number"
                  placeholder="Salary From"
                  value={salaryFrom}
                  onChange={(e) => setSalaryFrom(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="number"
                  placeholder="Salary To"
                  value={salaryTo}
                  onChange={(e) => setSalaryTo(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}
          </div>

          <textarea
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job Description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Create Job
          </button>
        </form>
      </div>
    </section>
  );
};

export default PostJob;
