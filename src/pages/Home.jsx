import { useState, useEffect } from "react";
import JobCard from "../components/Jobcard.jsx";

function Home({ onViewJob }) {
  const [searchText, setSearchText] = useState("");
  const [locationText, setLocationText] = useState("");

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/jobs")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    setSearch(searchText.trim());
    setLocation(locationText.trim());
  };

  const filteredJobs = jobs.filter((job) => {
    const jobTitle = job[1].toLowerCase();
    const jobLocation = job[3].toLowerCase();

    const searchValue = search.toLowerCase();
    const locationValue = location.toLowerCase();

    return (
      jobTitle.includes(searchValue) &&
      jobLocation.includes(locationValue)
    );
  });

  return (
    <main className="home">

      <section className="hero">
        <div className="hero-content">

          <p className="small-text">
            Find your next opportunity
          </p>

          <h1>
            Find a job you actually want
          </h1>

          <p className="hero-description">
            Search for jobs, explore companies and take the next step
            in your career.
          </p>

          <form className="search-box" onSubmit={handleSearch}>

            <input
              type="text"
              placeholder="Job title or keyword"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <input
              type="text"
              placeholder="Location"
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
            />

            <button type="submit">
              Search Jobs
            </button>

          </form>

        </div>
      </section>

      <section className="popular-jobs">

        <h2>Popular Jobs</h2>

        <div className="jobs-list">

          {filteredJobs.length === 0 ? (
            <p className="no-jobs">
              No jobs found. Try a different search.
            </p>
          ) : (
            filteredJobs.map((job) => (
              <JobCard
                key={job[0]}
                title={job[1]}
                company={job[2]}
                location={job[3]}
                salary={job[4]}
                onViewJob={() =>
                  onViewJob({
                    id: job[0],
                    title: job[1],
                    company: job[2],
                    location: job[3],
                    salary: job[4]
                  })
                }
              />
            ))
          )}

        </div>

      </section>

    </main>
  );
}

export default Home;