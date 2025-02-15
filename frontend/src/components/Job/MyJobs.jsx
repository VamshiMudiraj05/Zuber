import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching jobs!");
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/job/update/${jobId}`,
        updatedJob,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating job!");
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/job/delete/${jobId}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting job!");
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <section className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6 md:px-12">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Your Posted Jobs
        </h1>

        {myJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myJobs.map((job) => (
              <div key={job._id} className="bg-white shadow-lg p-6 rounded-lg">
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Title:</span>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      disabled={editingMode !== job._id}
                      value={job.title}
                      onChange={(e) => handleInputChange(job._id, "title", e.target.value)}
                    />
                  </div>
                  <div>
                    <span className="font-semibold">Country:</span>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      disabled={editingMode !== job._id}
                      value={job.country}
                      onChange={(e) => handleInputChange(job._id, "country", e.target.value)}
                    />
                  </div>
                  <div>
                    <span className="font-semibold">City:</span>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      disabled={editingMode !== job._id}
                      value={job.city}
                      onChange={(e) => handleInputChange(job._id, "city", e.target.value)}
                    />
                  </div>
                  <div>
                    <span className="font-semibold">Salary:</span>
                    {job.fixedSalary ? (
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        disabled={editingMode !== job._id}
                        value={job.fixedSalary}
                        onChange={(e) => handleInputChange(job._id, "fixedSalary", e.target.value)}
                      />
                    ) : (
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          className="w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          disabled={editingMode !== job._id}
                          value={job.salaryFrom}
                          onChange={(e) => handleInputChange(job._id, "salaryFrom", e.target.value)}
                        />
                        <input
                          type="number"
                          className="w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          disabled={editingMode !== job._id}
                          value={job.salaryTo}
                          onChange={(e) => handleInputChange(job._id, "salaryTo", e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="font-semibold">Description:</span>
                    <textarea
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      disabled={editingMode !== job._id}
                      value={job.description}
                      onChange={(e) => handleInputChange(job._id, "description", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  {editingMode === job._id ? (
                    <>
                      <button
                        onClick={() => handleUpdateJob(job._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center space-x-2"
                      >
                        <FaCheck />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleDisableEdit}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition flex items-center space-x-2"
                      >
                        <RxCross2 />
                        <span>Cancel</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEnableEdit(job._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            You've not posted any jobs yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default MyJobs;
