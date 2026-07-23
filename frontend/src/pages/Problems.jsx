import { useEffect, useState } from "react";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProblemModal from "../components/ProblemModal";

function Problems() {

    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async () => {

        setLoading(true);

        try {

            const response = await api.get("/problem/");

            setProblems(response.data);

        } catch (error) {

            console.log(error);

            if (error.response?.status === 404) {
                setProblems([]);
            }

        } finally {

            setLoading(false);

        }

    };

    const getDifficultyColor = (difficulty) => {

        switch (difficulty) {

            case "Easy":
                return "bg-green-600";

            case "Medium":
                return "bg-yellow-500 text-black";

            case "Hard":
                return "bg-red-600";

            default:
                return "bg-gray-600";

        }

    };

    return (

        <div className="bg-slate-900 min-h-screen text-white">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-8">

                    <div className="flex justify-between items-center mb-8">

                        <h1 className="text-4xl font-bold">
                            Problems
                        </h1>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-lg font-semibold"
                        >
                            + Add Problem
                        </button>

                    </div>

                    {loading ? (

                        <div className="text-center text-xl mt-20">
                            Loading Problems...
                        </div>

                    ) : problems.length === 0 ? (

                        <div className="bg-slate-800 rounded-xl p-10 text-center">

                            <h2 className="text-2xl font-bold">
                                No Problems Yet 📚
                            </h2>

                            <p className="text-gray-400 mt-3 mb-6">
                                Start solving LeetCode problems!
                            </p>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold"
                            >
                                Add First Problem
                            </button>

                        </div>

                    ) : (

                        <div className="overflow-x-auto rounded-xl">

                            <table className="w-full bg-slate-800">

                                <thead>

                                    <tr className="border-b border-slate-700">

                                        <th className="text-left p-4">
                                            Title
                                        </th>

                                        <th className="text-left p-4">
                                            Difficulty
                                        </th>

                                        <th className="text-left p-4">
                                            Topic
                                        </th>

                                        <th className="text-left p-4">
                                            Time
                                        </th>

                                        <th className="text-left p-4">
                                            Solved On
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {problems.map((problem) => (

                                        <tr
                                            key={problem.id}
                                            className="border-b border-slate-700 hover:bg-slate-700 transition"
                                        >

                                            <td className="p-4 font-medium">
                                                {problem.title}
                                            </td>

                                            <td className="p-4">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(problem.difficulty)}`}
                                                >
                                                    {problem.difficulty}
                                                </span>

                                            </td>

                                            <td className="p-4">
                                                {problem.topic}
                                            </td>

                                            <td className="p-4">
                                                {problem.time_taken} min
                                            </td>

                                            <td className="p-4">
                                                {problem.solved_at
                                                    ? new Date(problem.solved_at).toLocaleDateString()
                                                    : "-"}
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </main>

            </div>

            <ProblemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchProblems}
            />

        </div>

    );

}

export default Problems;