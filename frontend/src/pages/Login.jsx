import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/login", form);

            console.log("========== LOGIN SUCCESS ==========");
            console.log("Full Response:", response);
            console.log("Response Data:", response.data);
            console.log("Access Token:", response.data.access_token);

            if (!response.data.access_token) {
                toast.error("Access token not received from server.");
                return;
            }

            login(response.data.access_token);

            console.log(
                "Stored Token:",
                localStorage.getItem("token")
            );

            toast.success("Login Successful!");

            navigate("/dashboard");

        } catch (err) {
            console.error("========== LOGIN ERROR ==========");
            console.error(err);

            if (err.response) {
                console.error("Status:", err.response.status);
                console.error("Response:", err.response.data);

                toast.error(
                    err.response.data?.detail ||
                    "Login failed"
                );
            } else if (err.request) {
                console.error("No response from server");

                toast.error(
                    "Backend server is not responding."
                );
            } else {
                console.error(err.message);

                toast.error(
                    "Unexpected error occurred."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <form
                onSubmit={handleSubmit}
                className="bg-slate-800 p-8 rounded-xl w-96 shadow-lg"
            >
                <h1 className="text-3xl font-bold text-cyan-400 mb-8 text-center">
                    LeetTrack
                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-slate-700 text-white mb-4"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-slate-700 text-white mb-6"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed rounded p-3 font-bold text-white transition"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center text-gray-400 mt-6">
                    Don't have an account?
                    <Link
                        to="/signup"
                        className="text-cyan-400 ml-2 hover:underline"
                    >
                        Signup
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;