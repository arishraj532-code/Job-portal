import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Companies from "./pages/Companies";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Application from "./pages/Application";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import Contact from "./pages/Contact";

function App() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);

  const [showJobs, setShowJobs] = useState(false);
  const [showCompanies, setShowCompanies] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showMyApplications, setShowMyApplications] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleHome = () => {
    setShowJobs(false);
    setShowCompanies(false);
    setShowApplication(false);
    setShowAbout(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowMyApplications(false);
    setShowContact(false);

    setSelectedJob(null);
    setSelectedCompany(null);
  };

  const handleJobs = () => {
    setShowJobs(true);
    setShowCompanies(false);
    setShowApplication(false);
    setShowAbout(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowMyApplications(false);
    setShowContact(false);

    setSelectedJob(null);
    setSelectedCompany(null);
  };

  const handleCompanies = () => {
    setShowCompanies(true);
    setShowJobs(false);
    setShowApplication(false);
    setShowAbout(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowMyApplications(false);
    setShowContact(false);

    setSelectedJob(null);
    setSelectedCompany(null);
  };

  const handleAbout = () => {
    setShowAbout(true);
    setShowJobs(false);
    setShowCompanies(false);
    setShowApplication(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowMyApplications(false);
    setShowContact(false);

    setSelectedJob(null);
    setSelectedCompany(null);
  };

  const handleLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowJobs(false);
    setShowCompanies(false);
    setShowApplication(false);
    setShowAbout(false);
    setShowMyApplications(false);
    setShowContact(false);

    setSelectedJob(null);
    setSelectedCompany(null);
  };

  const handleRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowJobs(false);
    setShowCompanies(false);
    setShowApplication(false);
    setShowAbout(false);
    setShowMyApplications(false);
    setShowContact(false);

    setSelectedJob(null);
    setSelectedCompany(null);
  };

  const handleContact = () => {
    setShowContact(true);
    setShowJobs(false);
    setShowCompanies(false);
    setShowApplication(false);
    setShowAbout(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowMyApplications(false);

    setSelectedJob(null);
    setSelectedCompany(null);
  };

  // LOGIN SUCCESS
  const handleLoginSuccess = (data) => {
    setCurrentUser(data);

    setShowLogin(false);
    setShowRegister(false);
    setShowJobs(false);
    setShowCompanies(false);
    setShowApplication(false);
    setShowAbout(false);
    setShowMyApplications(false);
    setShowContact(false);

    setSelectedJob(null);
    setSelectedCompany(null);
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);

    setShowJobs(false);
    setShowCompanies(false);
    setShowApplication(false);
    setShowAbout(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowMyApplications(false);
    setShowContact(false);
  };

  const handleApply = () => {
    setShowApplication(true);

    setShowJobs(false);
    setShowCompanies(false);
    setShowAbout(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowMyApplications(false);
    setShowContact(false);
  };

  const handleViewCompanyJobs = (company) => {
    setSelectedCompany(company);

    setShowJobs(true);
    setShowCompanies(false);
    setShowApplication(false);
    setShowAbout(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowMyApplications(false);
    setShowContact(false);

    setSelectedJob(null);
  };

  return (
    <>
      <Navbar
        onHome={handleHome}
        onJobs={handleJobs}
        onCompanies={handleCompanies}
        onAbout={handleAbout}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onContact={handleContact}
      />

      {/* About */}
      {showAbout && <About />}

      {/* Login */}
      {showLogin && (
        <Login
          onRegister={handleRegister}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Register */}
      {showRegister && <Register />}

      {/* Contact */}
      {showContact && <Contact />}

      {/* Application */}
      {showApplication && selectedJob && (
        <Application job={selectedJob} />
      )}

      {/* Job Details */}
      {selectedJob && !showApplication && (
        <JobDetails
          job={selectedJob}
          onApply={handleApply}
        />
      )}

      {/* Companies */}
      {showCompanies && (
        <Companies
          onViewCompanyJobs={handleViewCompanyJobs}
        />
      )}

      {/* Jobs */}
      {showJobs && (
        <Jobs
          selectedCompany={selectedCompany}
          onViewJob={handleViewJob}
        />
      )}

      {/* My Applications */}
      {showMyApplications && currentUser && (
        <MyApplications userId={currentUser.user_id} />
      )}

      {/* Home */}
      {!showAbout &&
        !showLogin &&
        !showRegister &&
        !showContact &&
        !showApplication &&
        !selectedJob &&
        !showCompanies &&
        !showJobs &&
        !showMyApplications && (
          <Home onViewJob={handleViewJob} />
        )}

      <Footer />
    </>
  );
}

export default App;