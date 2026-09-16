# JobPortal

A full-stack job portal web application built using React, Flask and Oracle Database.

JobPortal allows users to search for jobs, explore companies, create an account, login, apply for jobs and view their submitted applications.

## Features

- User Registration
- User Login
- Job Search by title and location
- Browse Available Jobs
- Explore Companies
- View Job Details
- Apply for Jobs
- Prevent Duplicate Applications
- My Applications
- Application Status
- Logout
- Responsive UI

## Technologies Used

### Frontend
- React
- JavaScript
- HTML
- CSS
- Vite

### Backend
- Python
- Flask
- Flask-CORS

### Database
- Oracle Database
- SQL

## Project Structure

```text
job-portal/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── JobCard.jsx
│   │   └── Footer.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Jobs.jsx
│   │   ├── Companies.jsx
│   │   ├── JobDetails.jsx
│   │   ├── Application.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── About.jsx
│   │   └── MyApplications.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── backend/
│   ├── app.py
│   ├── .env
│   ├── .gitignore
│   └── venv/
│
├── package.json
├── .gitignore
└── README.md