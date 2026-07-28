import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";

function Signup() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!form.name.trim()) {
            toast.error("Name is required");
            return;
        }

        if (!form.email.trim()) {
            toast.error("Email is required");
            return;
        }

        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {

            setLoading(true);

            await api.post("/signup", {
                name: form.name,
                email: form.email,
                password: form.password
            });

            toast.success("Account created successfully 🎉");

            setTimeout(() => {
                navigate("/");
            }, 1200);

        } catch (err) {

            toast.error(
                err.response?.data?.detail ||
                "Signup failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">

            <form
                onSubmit={handleSubmit}
                className="bg-slate-800 p-8 rounded-xl w-full max-w-md shadow-xl border border-slate-700"
            >

                <h1 className="text-4xl font-bold text-cyan-400 text-center mb-2">
                    LeetTrack
                </h1>

                <p className="text-center text-gray-400 mb-8">
                    Create your account
                </p>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-slate-700 text-white mb-4 outline-none focus:ring-2 focus:ring-cyan-400"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-slate-700 text-white mb-4 outline-none focus:ring-2 focus:ring-cyan-400"
                />

                <div className="relative mb-4">

                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-cyan-400"
                    />

                </div>

                <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-slate-700 text-white mb-4 outline-none focus:ring-2 focus:ring-cyan-400"
                />

                <div className="flex items-center mb-6">

                    <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                        className="mr-2"
                    />

                    <label
                        htmlFor="showPassword"
                        className="text-gray-300 text-sm"
                    >
                        Show Password
                    </label>

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 rounded-lg p-3 font-bold transition disabled:opacity-50"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

                <p className="text-center text-gray-400 mt-6">

                    Already have an account?

                    <Link
                        to="/"
                        className="text-cyan-400 ml-2 hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Signup;