import { NavLink } from "react-router-dom";

function Sidebar() {
    const linkClass = ({ isActive }) =>
        `block px-4 py-3 rounded-lg transition ${
            isActive
                ? "bg-cyan-500 text-white"
                : "text-gray-300 hover:bg-slate-700"
        }`;

    return (
        <aside className="w-64 bg-slate-800 min-h-screen p-6">
            <h2 className="text-xl font-bold text-white mb-8">
                Dashboard
            </h2>

            <nav className="space-y-3">
                <NavLink to="/dashboard" className={linkClass}>
                    🏠 Dashboard
                </NavLink>

                <NavLink to="/problems" className={linkClass}>
                    📚 Problems
                </NavLink>

                <NavLink to="/goals" className={linkClass}>
                    🎯 Goals
                </NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;