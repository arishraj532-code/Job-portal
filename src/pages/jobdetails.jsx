function JobDetails({ job, onBack, onApply }) {
  return (
    <main className="job-details">

      <h1>{job.title}</h1>

      <p>{job.company}</p>

      <p>{job.location}</p>

      <p>{job.salary}</p>

      <h2>Job Description</h2>

      <p>
        We are looking for a {job.title} to join our development team.
        The candidate will work on web applications and contribute to
        real-world projects.
      </p>

      <h2>Required Skills</h2>

      <ul>
        <li>JavaScript</li>
        <li>React</li>
        <li>HTML</li>
        <li>CSS</li>
        <li>Git</li>
      </ul>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "30px"
        }}
      >

        <button
          onClick={onApply}
          style={{
            marginTop: "0"
          }}
        >
          Apply Now
        </button>

        <button
          onClick={onBack}
          style={{
            marginTop: "0",
            background: "#555"
          }}
        >
          Back to Jobs
        </button>

      </div>

    </main>
  );
}

export default JobDetails;