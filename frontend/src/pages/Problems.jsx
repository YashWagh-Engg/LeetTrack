import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProblemModal from "../components/ProblemModal";
import DeleteModal from "../components/DeleteModal";

function Problems() {

    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProblem, setSelectedProblem] = useState(null);

    const [deleteProblem, setDeleteProblem] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

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

    const handleEdit = (problem) => {

        setSelectedProblem(problem);
        setIsModalOpen(true);

    };

    const handleDelete = async () => {

        if (!deleteProblem) return;
        await api.delete(`/problem/${deleteProblem.id}`);

        toast.success("Problem deleted successfully ✅");

        try {

            setDeleteLoading(true);

            await api.delete(`/problem/${deleteProblem.id}`);

            setDeleteProblem(null);

            fetchProblems();

        } catch (error) {

            console.log(error);
            toast.error("Failed to delete problem");

        } finally {

            setDeleteLoading(false);

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

                        <div>
                        <h1 className="text-4xl font-bold">
                          Problems 📚
                        </h1>

                        <p className="text-gray-400 mt-2">
                         Manage every LeetCode problem you've solved.
                        </p>
                        </div>

                        <button
                            onClick={() => {

                                setSelectedProblem(null);
                                setIsModalOpen(true);

                            }}
                            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-lg font-semibold"
                        >
                            + Add Problem
                        </button>

                    </div>

                    {loading ? (

                        <div className="flex justify-center items-center h-[60vh]">
                        <div className="animate-spin rounded-full h-14 w-14 border-4 border-cyan-500 border-t-transparent"></div>
                        </div>

                    ) : problems.length === 0 ? (

                        <div className="bg-slate-800 rounded-xl p-10 text-center">

                            <h2 className="text-3xl font-bold">
                            🚀 Start Your Coding Journey
                            </h2>

                            <p className="text-gray-400 mt-3 mb-6">
                                Solve your first problem and build your streak.
                            </p>

                            <button
                                onClick={() => {

                                    setSelectedProblem(null);
                                    setIsModalOpen(true);

                                }}
                                className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold"
                            >
                                Add First Problem
                            </button>

                        </div>

                    ) : (

                        <div className="overflow-x-auto rounded-xl border border-slate-700 shadow-lg transition-all duration-300 hover:shadow-cyan-500/10">

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

                                        <th className="text-left p-4">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {problems.map((problem) => (

                                        <tr
                                            key={problem.id}
                                            className="border-b border-slate-700 hover:bg-slate-700"
                                        >

                                            <td className="p-4">
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

                                            <td className="p-4">

                                                <div className="flex gap-2">

                                                    <button
                                                        onClick={() => handleEdit(problem)}
                                                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => setDeleteProblem(problem)}
                                                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

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
editProblem={selectedProblem}
onClose={() => {

setSelectedProblem(null);
setIsModalOpen(false);}}
onSuccess={fetchProblems}/>

            <DeleteModal
                isOpen={deleteProblem !== null}
                problem={deleteProblem}
                loading={deleteLoading}
                onClose={() => setDeleteProblem(null)}
                onConfirm={handleDelete}
            />

        </div>

    );

}

export default Problems;