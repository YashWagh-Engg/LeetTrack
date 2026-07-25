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

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchAnalytics();

    }, []);

    if (loading) {

        return (

            <div className="min-h-screen bg-slate-900 flex items-center justify-center">

                <h1 className="text-white text-3xl font-bold">
                    Loading Analytics...
                </h1>

            </div>

        );

    }

    return (

        <div className="bg-slate-900 min-h-screen text-white">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-8">

                    <h1 className="text-4xl font-bold mb-8">
                        📊 Analytics
                    </h1>

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