import { useEffect, useState } from "react";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

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
                <h1 className="text-white text-3xl font-bold">
                    Loading Dashboard...
                </h1>
            </div>
        );
    }

    return (

        <div className="bg-slate-900 min-h-screen text-white">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-8 overflow-y-auto">

                    <h1 className="text-4xl font-bold mb-8">
                        Welcome back, {dashboard.username} 👋
                    </h1>

                    {/* First Row */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                        <StatCard
                            title="Daily Goal"
                            value={dashboard.daily_goal}
                            icon="🎯"
                        />

                        <StatCard
                            title="Solved Today"
                            value={dashboard.solved_today}
                            icon="✅"
                        />

                        <StatCard
                            title="Remaining Goal"
                            value={dashboard.remaining_goal}
                            icon="🔥"
                        />

                        <StatCard
                            title="Total Problems"
                            value={dashboard.total_problems}
                            icon="📚"
                        />

                    </div>

                    {/* Second Row */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">

                        <StatCard
                            title="Easy"
                            value={dashboard.easy}
                            icon="🟢"
                        />

                        <StatCard
                            title="Medium"
                            value={dashboard.medium}
                            icon="🟡"
                        />

                        <StatCard
                            title="Hard"
                            value={dashboard.hard}
                            icon="🔴"
                        />

                        <StatCard
                            title="Current Streak"
                            value={dashboard.current_streak}
                            icon="⚡"
                        />

                    </div>

                    {/* Average Time */}

                    <div className="bg-slate-800 rounded-xl p-6 mt-8 shadow-lg border border-slate-700">

                        <h2 className="text-xl font-bold mb-3">
                            Average Solving Time
                        </h2>

                        <p className="text-5xl font-bold text-cyan-400">
                            {dashboard.average_time} min
                        </p>

                    </div>

                    {/* Activity & Notifications */}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

                        {/* Recent Activity */}

                        <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">

                            <h2 className="text-2xl font-bold mb-5">
                                📋 Recent Activity
                            </h2>

                            {
                                dashboard.recent_activity.length === 0 ? (

                                    <p className="text-gray-400">
                                        No recent activity.
                                    </p>

                                ) : (

                                    dashboard.recent_activity.map((activity, index) => (

                                        <div
                                            key={index}
                                            className="border-b border-slate-700 py-3"
                                        >
                                            <p className="font-medium text-white">
                                                {activity.activity}
                                            </p>

                                            <p className="text-sm text-gray-400">
                                                {new Date(activity.created_at).toLocaleString()}
                                            </p>
                                        </div>

                                    ))

                                )
                            }

                        </div>

                        {/* Notifications */}

                        <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">

                            <h2 className="text-2xl font-bold mb-5">
                                🔔 Notifications
                            </h2>

                            {
                                dashboard.notifications.length === 0 ? (

                                    <p className="text-gray-400">
                                        No notifications.
                                    </p>

                                ) : (

                                    dashboard.notifications.map((notification, index) => (

                                        <div
                                            key={index}
                                            className="border-b border-slate-700 py-3"
                                        >
                                            <p className="font-medium">
                                                {notification.message}
                                            </p>

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

                                )
                            }

                        </div>

                    </div>

                </main>

            </div>

        </div>

    );

}

export default Dashboard;