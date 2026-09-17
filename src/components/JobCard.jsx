function JobCard({ title, company, location, salary, onViewJob }) {
  return (
    <div className="job-card">
      <h3>{title}</h3>

      <p>{company}</p>

      <p>{location}</p>

      <p>{salary}</p>

      <button onClick={onViewJob}>
        View Job
      </button>
    </div>
  );
}

export default JobCard;