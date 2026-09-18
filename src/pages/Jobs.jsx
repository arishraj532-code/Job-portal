import JobCard from "../components/JobCard.jsx";

function Jobs({ onViewJob, selectedCompany, onBackToCompanies }) {
  const jobs = [
    {
      id: 1,
      title: "Python Developer",
      company: "Green Technologies",
      location: "Chennai",
      salary: "₹4 - 7 LPA",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Code Wrap Solution",
      location: "Bangalore",
      salary: "₹5 - 8 LPA",
    },
    {
      id: 3,
      title: "React Developer",
      company: "Max-Tech Solutions",
      location: "Chennai",
      salary: "₹5 - 9 LPA",
    },
  ];

  const filteredJobs = selectedCompany
    ? jobs.filter((job) => job.company === selectedCompany)
    : jobs;

  return (
    <main className="popular-jobs">

      <h1>
        {selectedCompany ? `${selectedCompany} Jobs` : "Available Jobs"}
      </h1>

      {selectedCompany && (
        <button onClick={onBackToCompanies}>
          Back to Companies
        </button>
      )}

      <div className="jobs-list">

        {filteredJobs.map((job, index) => (
          <JobCard
            key={index}
            title={job.title}
            company={job.company}
            location={job.location}
            salary={job.salary}
            onViewJob={() => onViewJob(job)}
          />
        ))}

      </div>

    </main>
  );
}

export default Jobs;
