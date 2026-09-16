import { useEffect, useState } from "react";

function MyApplications({ user, onViewJob }) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    fetch(`http://127.0.0.1:5000/my-applications/${user.user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  return (
    <main className="my-applications">
      <h1>My Applications</h1>

      {applications.length === 0 ? (
        <p>You have not applied for any jobs yet.</p>
      ) : (
        <div className="applications-list">
          {applications.map((application) => (
            <div
              className="application-card"
              key={application[0]}
            >
              <h2>{application[2]}</h2>

              <p>{application[3]}</p>

              <p>{application[4]}</p>

              <p>{application[5]}</p>

              <p>
                Applied Date:{" "}
                {new Date(application[6]).toLocaleDateString("en-IN")}
              </p>

              <p>
                Status:{" "}
                <span className="status-badge">
                  {application[7]}
                </span>
              </p>

              <button onClick={() =>
                onViewJob({
                  id: application[1],
                  title: application[2],
                  company: application[3],
                  location: application[4],
                  salary: application[5]
                })
              }>
                View Job
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default MyApplications;