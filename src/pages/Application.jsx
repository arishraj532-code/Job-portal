import { useState } from "react";

function Application({ job, user, onBack }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.user_id,
          job_id: job.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Backend connection failed");
      console.log(error);
    }
  };

  if (submitted) {
    return (
      <main className="application">
        <h1>Application Submitted!</h1>

        <p>
          Your application for {job.title} at {job.company} has been
          submitted successfully.
        </p>

        <button onClick={onBack}>
          Back to Job
        </button>
      </main>
    );
  }

  return (
    <main className="application">
      <h1>Apply for {job.title}</h1>

      <p>{job.company}</p>

      <form onSubmit={handleSubmit}>

        <label>Full Name</label>

        <input
          type="text"
          placeholder="Enter your name"
          required
        />

        <label>Email</label>

        <input
          type="email"
          placeholder="Enter your email"
          required
        />

        <label>Phone</label>

        <input
          type="tel"
          placeholder="Enter your phone number"
          required
        />

        <label>Resume</label>

        <input
          type="file"
          required
        />

        <button type="submit">
          Submit Application
        </button>

        <button
          type="button"
          onClick={onBack}
        >
          Back to Job
        </button>

      </form>
    </main>
  );
}

export default Application;
