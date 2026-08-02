    import { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";

    import api from "../services/api";

    import Navbar from "../components/Navbar";
    import Sidebar from "../components/Sidebar";
    import StatCard from "../components/StatCard";

    function Dashboard() {
        const [dashboard, setDashboard] = useState(null);
        const [loading, setLoading] = useState(true);

        const navigate = useNavigate();

        useEffect(() => {
            const fetchDashboard = async () => {
                try {
                    const response = await api.get("/dashboard/");
                    setDashboard(response.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };

            fetchDashboard();
        }, []);

        if (loading) {
            return (
                <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent"></div>
                </div>
            );
        }

        return (
            <div className="bg-slate-900 min-h-screen text-white">

                <Navbar />

                <div className="flex">

                    <Sidebar />

                    <main className="flex-1 p-8 overflow-y-auto">

                        {/* Header */}

                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">

                            <div>
                                <h1 className="text-4xl font-bold">
                                    Welcome back, {dashboard.username} 👋
                                </h1>

                                <p className="text-gray-400 mt-2">
                                    Track your coding journey and stay consistent every day.
                                </p>
                            </div>

                            <div className="flex items-center gap-4 mt-5 lg:mt-0">

        <div className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-3">
            <p className="text-gray-400 text-sm">
                Today's Date
            </p>

            <p className="font-semibold">
                {new Date().toLocaleDateString()}
            </p>
        </div>

        <button
            onClick={() => window.location.reload()}
            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-xl font-semibold transition"
        >
            🔄 Refresh
        </button>

    </div>

                        </div>

                        {/* Motivation Banner */}

                        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 mb-8 shadow-xl">

                            <h2 className="text-3xl font-bold">
                                🚀 Keep Going
                            </h2>

                            <p className="mt-3 text-cyan-100 text-lg">
                                {dashboard.remaining_goal === 0
                                    ? "Congratulations! You completed today's goal."
                                    : `Only ${dashboard.remaining_goal} problem(s) left to complete today's target.`}
                            </p>

                        </div>

                        {/* Statistics */}

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                            <StatCard
                                title="Total Problems"
                                value={dashboard.total_problems}
                                icon="📚"
                                color="purple"
                            />

                            <StatCard
                                title="Daily Goal"
                                value={dashboard.daily_goal || "No Goal"}
                                icon="🎯"
                                color="cyan"
                            />

                            <StatCard
                                title="Solved Today"
                                value={dashboard.solved_today}
                                icon="✅"
                                color="green"
                            />

                            <StatCard
                                title="Remaining"
                                value={dashboard.remaining_goal}
                                icon="📌"
                                color="yellow"
                            />

                            <StatCard
                                title="Easy"
                                value={dashboard.easy}
                                icon="🟢"
                                color="green"
                            />

                            <StatCard
                                title="Medium"
                                value={dashboard.medium}
                                icon="🟡"
                                color="yellow"
                            />

                            <StatCard
                                title="Hard"
                                value={dashboard.hard}
                                icon="🔴"
                                color="red"
                            />

                            <StatCard
                                title="Current Streak"
                                value={`${dashboard.current_streak} Days`}
                                icon="🔥"
                                color="orange"
                            />

                        </div>

                        {/* Average Time */}

                    <div className="bg-slate-800 rounded-xl p-6 mt-8 border border-slate-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/10">

                            <div className="bg-slate-800 rounded-xl p-6 mt-8 shadow-lg border border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/10">

        <div className="flex justify-between items-center">

            <div>

                <h2 className="text-xl font-bold">
                    ⏱ Average Solving Time
                </h2>

                <p className="text-gray-400 mt-2">
                    Average time spent solving one problem.
                </p>

            </div>

            <div className="text-right">

                <p className="text-5xl font-bold text-cyan-400">
                    {dashboard.average_time}
                </p>

                <span className="text-gray-400">
                    minutes
                </span>

            </div>

        </div>

    </div>

                            <p className="text-5xl font-bold text-cyan-400">
                                {dashboard.average_time} min
                            </p>

                        </div>

                        {/* Quick Actions */}

                        <div className="bg-slate-800 rounded-xl p-6 mt-8 shadow-lg border border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/10">

                            <h2 className="text-2xl font-bold mb-5">
                                ⚡ Quick Actions
                            </h2>

                            <div className="flex flex-wrap gap-4">

                                <button
                                    onClick={() => navigate("/problems")}
                                    className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-lg font-semibold transition"
                                >
                                    ➕ Add Problem
                                </button>

                                <button
                                    onClick={() => navigate("/goals")}
                                    className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg font-semibold transition"
                                >
                                    🎯 Update Goal
                                </button>

                                <button
                                    onClick={() => navigate("/analytics")}
                                    className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-lg font-semibold transition"
                                >
                                    📊 Analytics
                                </button>

                            </div>

                        </div>

                        {/* Activity & Notifications */}

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

                            <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/10">

                                <h2 className="text-2xl font-bold mb-5">
                                    📋 Recent Activity
                                </h2>

                                {dashboard.recent_activity.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-10">
        <div className="text-5xl mb-3">📋</div>

        <h3 className="text-xl font-semibold">
            No Recent Activity
        </h3>

        <p className="text-gray-400 mt-2 text-center">
            Start solving problems to see your activity here.
        </p>
    </div>
                                ) : (
                                    dashboard.recent_activity.map((activity, index) => (
                                        <div
                                            key={index}
                                            className="border-b border-slate-700 py-3"
                                        >
                                            <p className="font-medium">
                                                {activity.activity}
                                            </p>

                                            <p className="text-sm text-gray-400">
                                                {new Date(activity.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    ))
                                )}

                            </div>

                            <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/10">
                                <h2 className="text-2xl font-bold mb-5">
                                    🔔 Notifications
                                </h2>

                                {dashboard.notifications.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-10">
        <div className="text-5xl mb-3">🔔</div>

        <h3 className="text-xl font-semibold">
            You're All Caught Up
        </h3>

        <p className="text-gray-400 mt-2 text-center">
            There are no new notifications.
        </p>
    </div>
                                ) : (
                                    dashboard.notifications.map((notification, index) => (
                                        <div
                                            key={index}
                                            className="border-b border-slate-700 py-3"
                                        >
                                            <p>{notification.message}</p>

                                            <p className="text-sm text-gray-400">
                                                {new Date(notification.created_at).toLocaleString()}
                                            </p>

                                            <span
                                                className={`text-xs ${
                                                    notification.is_read
                                                        ? "text-green-400"
                                                        : "text-yellow-400"
                                                }`}
                                            >
                                                {notification.is_read ? "Read" : "Unread"}
                                            </span>
                                        </div>
                                    ))
                                )}

                            </div>

                        </div>

                    </main>

                </div>

            </div>
        );
    }

    export default Dashboard;