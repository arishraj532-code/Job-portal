function Companies({ onViewCompanyJobs }) {
  const companies = [
    {
      name: "Green Technologies",
      location: "Chennai",
      jobs: "12 Jobs",
    },
    {
      name: "Code Wrap Solution",
      location: "Bangalore",
      jobs: "8 Jobs",
    },
    {
      name: "Max-Tech Solutions",
      location: "Chennai",
      jobs: "10 Jobs",
    },
  ];

  return (
    <main className="companies">

      <h1>Top Companies</h1>

      <div className="companies-list">

        {companies.map((company, index) => (
          <div className="company-card" key={index}>

            <h2>{company.name}</h2>

            <p>{company.location}</p>

            <p>{company.jobs}</p>

            <button onClick={() => onViewCompanyJobs(company.name)}>
              View Jobs
            </button>

          </div>
        ))}

      </div>

    </main>
  );
}

export default Companies;