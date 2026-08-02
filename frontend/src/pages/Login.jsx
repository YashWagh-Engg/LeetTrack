import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
        const response = await api.post(
            "/login",
            form
        );

        login(response.data.access_token);

        navigate("/dashboard");

    } catch (err) {
        console.log(err.response);

        toast.error(
            err.response?.data?.detail ||
            "Something went wrong"
        );

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
                 className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 rounded p-3 font-bold"
>
                 {loading ? "Logging in..." : "Login"}
                </button>

                  

                <p className="text-center text-gray-400 mt-6">

                    Don't have an account?

                    <Link
                        to="/signup"
                        className="text-cyan-400 ml-2"
                    >

                        Signup

                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Login;