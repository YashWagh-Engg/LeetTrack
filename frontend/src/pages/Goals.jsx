import toast from "react-hot-toast";
import { useEffect, useState, useCallback } from "react";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import GoalModal from "../components/GoalModal";

function Goals() {
    const [goal, setGoal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchGoal = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get("/goal/");
            setGoal(response.data);
        } catch (error) {
            if (error.response?.status === 404) {
                setGoal(null);
            } else {
                console.log(error);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGoal();
    }, [fetchGoal]);

    const handleDelete = async () => {
    const confirmDelete = window.confirm(
        "Are you sure you want to delete your daily goal?"
    );

    if (!confirmDelete) return;

    try {
        await api.delete("/goal/");
        setGoal(null);
        toast.success("Goal deleted successfully 🗑️");
    } catch (error) {
        console.log(error);
        toast.error("Failed to delete goal.");
    }
};

    return (
        <div className="bg-slate-900 min-h-screen text-white">
            <Navbar />

            <div className="flex">
                <Sidebar />

                <main className="flex-1 p-8 min-h-screen">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold">Daily Goal</h1>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-lg font-semibold"
                        >
                            {goal ? "Edit Goal" : "Create Goal"}
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center text-xl mt-20">
                            Loading Goal...
                        </div>
                    ) : !goal ? (
                        <div className="bg-slate-800 rounded-xl p-10 text-center">
                            <h2 className="text-3xl font-bold">No Goal Found 🎯</h2>
                            <p className="text-gray-400 mt-4 mb-8">
                                Create your first daily goal.
                            </p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg"
                            >
                                Create Goal
                            </button>
                        </div>
                    ) : (
                        <div className="max-w-2xl bg-slate-800 rounded-xl p-8">
                            <h2 className="text-3xl font-bold mb-6">Today's Goal</h2>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-gray-400">Daily Target</p>
                                    <h3 className="text-5xl font-bold text-cyan-400 mt-2">
                                        {goal.daily_goal}
                                    </h3>
                                    <p className="text-gray-300 mt-2">Problems</p>
                                </div>

                                <div>
                                    <p className="text-gray-400 mb-2">Created On</p>
                                    <p className="text-lg">
                                        {new Date(goal.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg font-semibold"
                                >
                                    Edit Goal
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold"
                                >
                                    Delete Goal
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            <GoalModal
                isOpen={isModalOpen}
                currentGoal={goal}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchGoal}
            />
        </div>
    );
}

export default Goals;

