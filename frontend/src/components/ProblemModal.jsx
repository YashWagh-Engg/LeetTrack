import { useState } from "react";
import api from "../services/api";

function ProblemModal({ isOpen, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        title: "",
        difficulty: "Easy",
        topic: "",
        time_taken: "",
    });

    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await api.post("/problem/", formData);

            setFormData({
                title: "",
                difficulty: "Easy",
                topic: "",
                time_taken: "",
            });

            onSuccess();
            onClose();
        } catch (error) {
            console.log(error);
            alert("Failed to add problem.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

            <div className="bg-slate-800 w-full max-w-lg rounded-xl p-8 shadow-2xl">

                <h2 className="text-3xl font-bold text-white mb-6">
                    Add Problem
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block mb-2 text-gray-300">
                            Problem Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-700 p-3 rounded-lg outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-300">
                            Difficulty
                        </label>

                        <select
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            className="w-full bg-slate-700 p-3 rounded-lg"
                        >
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-300">
                            Topic
                        </label>

                        <input
                            type="text"
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-700 p-3 rounded-lg outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-300">
                            Time Taken (minutes)
                        </label>

                        <input
                            type="number"
                            name="time_taken"
                            value={formData.time_taken}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-700 p-3 rounded-lg outline-none"
                        />
                    </div>

                    <div className="flex justify-end gap-4 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 bg-gray-600 rounded-lg hover:bg-gray-500"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 bg-cyan-500 rounded-lg hover:bg-cyan-600"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default ProblemModal;