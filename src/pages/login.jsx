import { useState } from "react";

function Login({ onRegister, onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                onLoginSuccess(data);
                alert(`Welcome ${data.full_name}!`);
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Backend connection failed");
            console.log(error);
        }
    };

    return (
        <main className="login">
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <label>Email</label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password</label>

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    Login
                </button>
            </form>

            <p>
                Don't have an account?{" "}

                <button
                    type="button"
                    onClick={onRegister}
                    className="register-link"
                >
                    Register
                </button>
            </p>
        </main>
    );
}

export default Login;
