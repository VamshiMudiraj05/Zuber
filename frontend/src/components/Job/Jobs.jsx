import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/job/getall", {
        withCredentials: true,
      })
      .then((res) => {
        setJobs(res.data.jobs);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6 md:px-12">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          All Available Jobs
        </h1>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No jobs available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transition transform hover:scale-105"
              >
                <p className="text-xl font-semibold text-blue-600">{job.title}</p>
                <p className="text-gray-700 mt-2">{job.category}</p>
                <p className="text-gray-600">{job.country}</p>
                <Link
                  to={`/job/${job._id}`}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Job Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Jobs;
