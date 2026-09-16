import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Companies from "./pages/Companies";
import JobDetails from "./pages/JobDetails";
import Application from "./pages/Application";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import MyApplications from "./pages/MyApplications";


function App() {

  const [selectedJob, setSelectedJob] = useState(null);

  const [showApplication, setShowApplication] = useState(false);
  const [showJobs, setShowJobs] = useState(false);
  const [showCompanies, setShowCompanies] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showMyApplications, setShowMyApplications] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState("");

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [loggedInUser, setLoggedInUser] = useState(null);


  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  const handleHome = () => {

    setSelectedJob(null);
    setShowApplication(false);
    setShowJobs(false);
    setShowCompanies(false);
    setShowAbout(false);
    setShowMyApplications(false);
    setShowLogin(false);
    setShowRegister(false);
    setSelectedCompany("");

    scrollToTop();
  };


  const handleJobs = () => {

    setSelectedJob(null);
    setSelectedCompany("");
    setShowApplication(false);
    setShowJobs(true);
    setShowCompanies(false);
    setShowAbout(false);
    setShowMyApplications(false);
    setShowLogin(false);
    setShowRegister(false);

    scrollToTop();
  };


  const handleCompanies = () => {

    setSelectedJob(null);
    setShowApplication(false);
    setShowJobs(false);
    setShowCompanies(true);
    setShowAbout(false);
    setShowMyApplications(false);
    setShowLogin(false);
    setShowRegister(false);

    scrollToTop();
  };


  const handleAbout = () => {

    setSelectedJob(null);
    setShowApplication(false);
    setShowJobs(false);
    setShowCompanies(false);
    setShowAbout(true);
    setShowMyApplications(false);
    setShowLogin(false);
    setShowRegister(false);

    scrollToTop();
  };


  const handleMyApplications = () => {

    if (!loggedInUser) {
      alert("Please login to view your applications");
      setShowLogin(true);
      setShowRegister(false);

      scrollToTop();

      return;
    }

    setSelectedJob(null);
    setShowApplication(false);
    setShowJobs(false);
    setShowCompanies(false);
    setShowAbout(false);
    setShowMyApplications(true);
    setShowLogin(false);
    setShowRegister(false);
    setSelectedCompany("");

    scrollToTop();
  };


  const handleViewAppliedJob = (job) => {

    setSelectedJob(job);
    setShowMyApplications(false);
    setShowApplication(false);
    setShowJobs(false);
    setShowCompanies(false);
    setShowAbout(false);
    setShowLogin(false);
    setShowRegister(false);

    scrollToTop();
  };


  const handleViewCompanyJobs = (companyName) => {

    setSelectedCompany(companyName);
    setShowCompanies(false);
    setShowJobs(true);
    setShowAbout(false);
    setShowMyApplications(false);
    setShowLogin(false);
    setShowRegister(false);

    scrollToTop();
  };


  const handleBackToCompanies = () => {

    setShowJobs(false);
    setShowCompanies(true);
    setShowMyApplications(false);

    scrollToTop();
  };


  const handleApply = () => {

    if (!loggedInUser) {

      alert("Please login to apply for a job");

      setShowLogin(true);
      setShowApplication(false);

      scrollToTop();

      return;
    }

    setShowApplication(true);
    setShowMyApplications(false);

    scrollToTop();
  };


  const handleLogin = () => {

    setShowLogin(true);
    setShowRegister(false);
    setShowAbout(false);
    setShowMyApplications(false);
    setSelectedJob(null);
    setShowApplication(false);
    setShowJobs(false);
    setShowCompanies(false);

    scrollToTop();
  };


  const handleRegister = () => {

    setShowRegister(true);
    setShowLogin(false);
    setShowAbout(false);
    setShowMyApplications(false);
    setSelectedJob(null);
    setShowApplication(false);
    setShowJobs(false);
    setShowCompanies(false);

    scrollToTop();
  };


  const handleLoginSuccess = (user) => {

    setLoggedInUser(user);

    setShowLogin(false);
    setShowRegister(false);

    scrollToTop();
  };


  const handleLogout = () => {

    setLoggedInUser(null);
    setShowMyApplications(false);
    setShowApplication(false);
    setSelectedJob(null);
    setShowJobs(false);
    setShowCompanies(false);
    setShowAbout(false);
    setSelectedCompany("");

    scrollToTop();
  };


  return (
    <>
      <Navbar
        onHome={handleHome}
        onJobs={handleJobs}
        onCompanies={handleCompanies}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onAbout={handleAbout}
        onMyApplications={handleMyApplications}
        user={loggedInUser}
        onLogout={handleLogout}
      />


      {showMyApplications ? (

        <MyApplications
          user={loggedInUser}
          onViewJob={handleViewAppliedJob}
        />

      ) : showAbout ? (

        <About />

      ) : showRegister ? (

        <Register
          onLogin={handleLogin}
        />

      ) : showLogin ? (

        <Login
          onRegister={handleRegister}
          onLoginSuccess={handleLoginSuccess}
        />

      ) : showApplication ? (

        <Application
          job={selectedJob}
          user={loggedInUser}
          onBack={() => {
            setShowApplication(false);
            scrollToTop();
          }}
        />

      ) : selectedJob ? (

        <JobDetails
          job={selectedJob}
          onBack={handleHome}
          onApply={handleApply}
        />

      ) : showCompanies ? (

        <Companies
          onViewCompanyJobs={handleViewCompanyJobs}
        />

      ) : showJobs ? (

        <Jobs
          onViewJob={setSelectedJob}
          selectedCompany={selectedCompany}
          onBackToCompanies={handleBackToCompanies}
        />

      ) : (

        <Home
          onViewJob={setSelectedJob}
        />

      )}


      <Footer />
    </>
  );
}


export default App;