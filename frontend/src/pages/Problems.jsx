import { useEffect, useState } from "react";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Problems() {

    const [problems, setProblems] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchProblems();

    }, []);

    const fetchProblems = async () => {

        try {

            const response = await api.get("/problem/");

            setProblems(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

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
                            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-lg font-semibold"
                        >
                            + Add Problem
                        </button>

                    </div>

                    {
                        loading ?

                            (

                                <div className="text-center text-xl mt-20">

                                    Loading Problems...

                                </div>

                            )

                            :

                            problems.length === 0 ?

                                (

                                    <div className="bg-slate-800 rounded-xl p-10 text-center">

                                        <h2 className="text-2xl font-bold">

                                            No Problems Yet 📚

                                        </h2>

                                        <p className="text-gray-400 mt-3">

                                            Start solving LeetCode problems!

                                        </p>

                                    </div>

                                )

                                :

                                (

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

                                                {

                                                    problems.map((problem) => (

                                                        <tr
                                                            key={problem.id}
                                                            className="border-b border-slate-700 hover:bg-slate-700"
                                                        >

                                                            <td className="p-4">

                                                                {problem.title}

                                                            </td>

                                                            <td className="p-4">

                                                                <span
                                                                    className={`px-3 py-1 rounded-full text-sm font-semibold
                                                                    ${
                                                                        problem.difficulty === "Easy"
                                                                            ? "bg-green-600"
                                                                            : problem.difficulty === "Medium"
                                                                            ? "bg-yellow-500 text-black"
                                                                            : "bg-red-600"
                                                                    }`}
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

                                                                {
                                                                    new Date(problem.solved_at)
                                                                        .toLocaleDateString()
                                                                }

                                                            </td>

                                                        </tr>

                                                    ))

                                                }

                                            </tbody>

                                        </table>

                                    </div>

                                )

                    }

                </main>

            </div>

        </div>

    );

}

export default Problems;