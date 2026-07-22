import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-8 shadow-md">
            <div>
                <h1 className="text-2xl font-bold text-cyan-400">
                    LeetTrack
                </h1>
            </div>

            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-semibold transition"
            >
                Logout
            </button>
        </nav>
    );
}

export default Navbar;