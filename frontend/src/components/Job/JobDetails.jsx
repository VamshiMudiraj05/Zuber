import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch(() => {
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full mx-4">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Job Details</h3>
        <div className="space-y-4">
          <p className="text-lg">
            <strong>Title:</strong> <span className="text-blue-600">{job.title}</span>
          </p>
          <p>
            <strong>Category:</strong> <span className="text-gray-700">{job.category}</span>
          </p>
          <p>
            <strong>Country:</strong> <span className="text-gray-700">{job.country}</span>
          </p>
          <p>
            <strong>City:</strong> <span className="text-gray-700">{job.city}</span>
          </p>
          <p>
            <strong>Location:</strong> <span className="text-gray-700">{job.location}</span>
          </p>
          <p>
            <strong>Description:</strong> <span className="text-gray-700">{job.description}</span>
          </p>
          <p>
            <strong>Job Posted On:</strong> <span className="text-gray-700">{job.jobPostedOn}</span>
          </p>
          <p>
            <strong>Salary:</strong>{" "}
            {job.fixedSalary ? (
              <span className="text-green-600 font-semibold">{job.fixedSalary}</span>
            ) : (
              <span className="text-green-600 font-semibold">
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>

          {user && user.role !== "Employer" && (
            <div className="text-center mt-6">
              <Link
                to={`/application/${job._id}`}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Apply Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
