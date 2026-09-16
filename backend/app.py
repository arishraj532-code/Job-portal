from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import oracledb


app = Flask(__name__)
CORS(app)

load_dotenv()


# Oracle Database Settings
ORACLE_USER = os.getenv("ORACLE_USER")
ORACLE_PASSWORD = os.getenv("ORACLE_PASSWORD")
ORACLE_DSN = os.getenv("ORACLE_DSN")


# Test Oracle Database Connection
connection = oracledb.connect(
    user=ORACLE_USER,
    password=ORACLE_PASSWORD,
    dsn=ORACLE_DSN,
    mode=oracledb.SYSDBA
)

print("Oracle Database Connected Successfully!")

connection.close()


# Home API
@app.route("/")
def home():
    return "Job Portal Backend is Running!"


# Get Jobs
@app.route("/jobs")
def get_jobs():

    connection = oracledb.connect(
        user=ORACLE_USER,
        password=ORACLE_PASSWORD,
        dsn=ORACLE_DSN,
        mode=oracledb.SYSDBA
    )

    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            j.job_id,
            j.job_title,
            c.company_name,
            j.location,
            j.salary
        FROM jobs j
        JOIN companies c
            ON j.company_id = c.company_id
    """)

    jobs = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(jobs)


# Register User
@app.route("/register", methods=["POST"])
def register():

    data = request.json

    full_name = data["full_name"]
    email = data["email"]
    password = data["password"]

    connection = oracledb.connect(
        user=ORACLE_USER,
        password=ORACLE_PASSWORD,
        dsn=ORACLE_DSN,
        mode=oracledb.SYSDBA
    )

    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO users (
            user_id,
            full_name,
            email,
            password
        )
        VALUES (
            (SELECT NVL(MAX(user_id), 0) + 1 FROM users),
            :full_name,
            :email,
            :password
        )
    """, {
        "full_name": full_name,
        "email": email,
        "password": password
    })

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "Registration successful"
    })


# Login User
@app.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data["email"]
    password = data["password"]

    connection = oracledb.connect(
        user=ORACLE_USER,
        password=ORACLE_PASSWORD,
        dsn=ORACLE_DSN,
        mode=oracledb.SYSDBA
    )

    cursor = connection.cursor()

    cursor.execute("""
        SELECT user_id, full_name
        FROM users
        WHERE email = :email
        AND password = :password
    """, {
        "email": email,
        "password": password
    })

    user = cursor.fetchone()

    cursor.close()
    connection.close()

    if user:

        return jsonify({
            "message": "Login successful",
            "user_id": user[0],
            "full_name": user[1]
        })

    return jsonify({
        "message": "Invalid email or password"
    }), 401


# Apply for Job
@app.route("/apply", methods=["POST"])
def apply_job():

    data = request.json

    user_id = data["user_id"]
    job_id = data["job_id"]

    connection = oracledb.connect(
        user=ORACLE_USER,
        password=ORACLE_PASSWORD,
        dsn=ORACLE_DSN,
        mode=oracledb.SYSDBA
    )

    cursor = connection.cursor()

    # Check if user already applied for this job
    cursor.execute("""
        SELECT application_id
        FROM applications
        WHERE user_id = :user_id
        AND job_id = :job_id
    """, {
        "user_id": user_id,
        "job_id": job_id
    })

    existing_application = cursor.fetchone()

    # If already applied
    if existing_application:

        cursor.close()
        connection.close()

        return jsonify({
            "message": "You have already applied for this job"
        }), 400

    # Insert new application
    cursor.execute("""
        INSERT INTO applications (
            application_id,
            user_id,
            job_id,
            applied_date,
            status
        )
        VALUES (
            (SELECT NVL(MAX(application_id), 0) + 1 FROM applications),
            :user_id,
            :job_id,
            SYSDATE,
            'Applied'
        )
    """, {
        "user_id": user_id,
        "job_id": job_id
    })

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "Application submitted successfully"
    })


# Get My Applications
@app.route("/my-applications/<int:user_id>")
def my_applications(user_id):

    connection = oracledb.connect(
        user=ORACLE_USER,
        password=ORACLE_PASSWORD,
        dsn=ORACLE_DSN,
        mode=oracledb.SYSDBA
    )

    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            a.application_id,
            j.job_id,
            j.job_title,
            c.company_name,
            j.location,
            j.salary,
            a.applied_date,
            a.status
        FROM applications a
        JOIN jobs j
            ON a.job_id = j.job_id
        JOIN companies c
            ON j.company_id = c.company_id
        WHERE a.user_id = :user_id
        ORDER BY a.applied_date DESC
    """, {
        "user_id": user_id
    })

    applications = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(applications)


if __name__ == "__main__":
    app.run(debug=True)