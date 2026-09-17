import { useState } from "react";

function Login({ onRegister, onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Welcome ${data.full_name}!`);

                // Send login data back to App.jsx
                if (onLoginSuccess) {
                    onLoginSuccess(data);
                }
            } else {
                alert(data.message || "Invalid email or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Backend connection failed");
        } finally {
            setLoading(false);
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

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
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