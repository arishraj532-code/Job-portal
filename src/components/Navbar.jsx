function Navbar({
  onHome,
  onJobs,
  onCompanies,
  onLogin,
  onRegister,
  onAbout,
  onContact,
  onMyApplications,
  user,
  onLogout
}) {
  return (
    <nav>
      <h2>JobPortal</h2>

      <div>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onHome();
          }}
        >
          Home
        </a>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onJobs();
          }}
        >
          Jobs
        </a>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onCompanies();
          }}
        >
          Companies
        </a>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onAbout();
          }}
        >
          About
        </a>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onContact();
          }}
        >
          Contact Us
        </a>

        {user ? (
          <>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onMyApplications();
              }}
            >
              My Applications
            </a>

            <span>
              Welcome, {user.full_name}
            </span>

            <button onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={onLogin}>
              Login
            </button>

            <button onClick={onRegister}>
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;