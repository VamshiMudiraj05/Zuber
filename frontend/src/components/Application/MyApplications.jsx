import { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
      return;
    }

    const endpoint =
      user && user.role === "Employer"
        ? "http://localhost:4000/api/v1/application/employer/getall"
        : "http://localhost:4000/api/v1/application/jobseeker/getall";

    axios
      .get(endpoint, { withCredentials: true })
      .then((res) => setApplications(res.data.applications))
      .catch((error) => toast.error(error.response?.data?.message || "Error fetching applications"));
  }, [isAuthorized, user, navigateTo]);

  const deleteApplication = (id) => {
    axios
      .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setApplications((prev) => prev.filter((application) => application._id !== id));
      })
      .catch((error) => toast.error(error.response?.data?.message || "Error deleting application"));
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6 md:px-12">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          {user?.role === "Job Seeker" ? "My Applications" : "Applications From Job Seekers"}
        </h1>

        {applications.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No Applications Found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((application) =>
              user?.role === "Job Seeker" ? (
                <JobSeekerCard
                  key={application._id}
                  application={application}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              ) : (
                <EmployerCard key={application._id} application={application} openModal={openModal} />
              )
            )}
          </div>
        )}
      </div>

      {modalOpen && <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ application, deleteApplication, openModal }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
      <div className="mb-4">
        <p className="text-lg font-semibold">
          <span className="text-gray-700">Name:</span> {application.name}
        </p>
        <p>
          <span className="text-gray-700">Email:</span> {application.email}
        </p>
        <p>
          <span className="text-gray-700">Phone:</span> {application.phone}
        </p>
        <p>
          <span className="text-gray-700">Address:</span> {application.address}
        </p>
        <p>
          <span className="text-gray-700">Cover Letter:</span> {application.coverLetter}
        </p>
      </div>
      <div className="mb-4">
        <img
          src={application.resume.url}
          alt="Resume"
          className="w-full h-48 object-cover rounded cursor-pointer"
          onClick={() => openModal(application.resume.url)}
        />
      </div>
      <button
        onClick={() => deleteApplication(application._id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Delete Application
      </button>
    </div>
  );
};

const EmployerCard = ({ application, openModal }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
      <div className="mb-4">
        <p className="text-lg font-semibold">
          <span className="text-gray-700">Name:</span> {application.name}
        </p>
        <p>
          <span className="text-gray-700">Email:</span> {application.email}
        </p>
        <p>
          <span className="text-gray-700">Phone:</span> {application.phone}
        </p>
        <p>
          <span className="text-gray-700">Address:</span> {application.address}
        </p>
        <p>
          <span className="text-gray-700">Cover Letter:</span> {application.coverLetter}
        </p>
      </div>
      <div className="mb-4">
        <img
          src={application.resume.url}
          alt="Resume"
          className="w-full h-48 object-cover rounded cursor-pointer"
          onClick={() => openModal(application.resume.url)}
        />
      </div>
    </div>
  );
};
