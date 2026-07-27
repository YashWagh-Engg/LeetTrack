import { useEffect, useState } from "react";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import AnalyticsCard from "../components/AnalyticsCard";

import DifficultyChart from "../components/DifficultyChart";
import MonthlyChart from "../components/MonthlyChart";
import TopicChart from "../components/TopicChart";

function Analytics() {

    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchAnalytics = async () => {

            try {

                const response = await api.get("/analytics/");

                setAnalytics(response.data);

            } catch (error) {

                console.error("Failed to load analytics:", error);

            } finally {

                setLoading(false);

            }

        };

        fetchAnalytics();

    }, []);

    if (loading) {

        return (

            <div className="min-h-screen bg-slate-900 flex items-center justify-center">

    <div className="text-center">

        <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent mx-auto mb-6"></div>

        <h2 className="text-2xl font-semibold text-white">
            Loading Analytics...
        </h2>

        <p className="text-gray-400 mt-2">
            Preparing your coding insights.
        </p>

    </div>

</div>

        );

    }

    return (

        <div className="bg-slate-900 min-h-screen text-white">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-8">

                    <div className="flex justify-between items-center mb-8">

    <div>

        <h1 className="text-4xl font-bold">
            📊 Analytics
        </h1>

        <p className="text-gray-400 mt-2">
            Track your progress, consistency, and performance.
        </p>

    </div>

    <button
        onClick={() => window.location.reload()}
        className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-xl font-semibold transition"
    >
        🔄 Refresh
    </button>

</div>

                    {/* Cards */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <AnalyticsCard
                            title="Total Problems"
                            value={analytics.total_problems}
                            icon="📚"
                        />

                        <AnalyticsCard
                            title="Average Time"
                            value={`${analytics.average_time} min`}
                            icon="⏱️"
                        />

                        <AnalyticsCard
                            title="Current Streak"
                            value={`${analytics.current_streak} Days`}
                            icon="🔥"
                        />

                    </div>

                    {/* Charts */}

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                        <DifficultyChart
                            data={analytics.difficulty}
                        />

                        <MonthlyChart
                            data={analytics.monthly_progress}
                        />

                    </div>

                    <div className="mt-8">

                        <TopicChart
                            data={analytics.topics}
                        />

                    </div>

                </main>

            </div>

        </div>

    );

}

export default Analytics;