import { useEffect, useState } from "react";
import api from "../services/api";

function ProblemModal({
    isOpen,
    onClose,
    onSuccess,
    editProblem = null
}) {

    const [formData, setFormData] = useState({
        title: "",
        difficulty: "Easy",
        topic: "",
        time_taken: ""
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (editProblem) {

            setFormData({
                title: editProblem.title,
                difficulty: editProblem.difficulty,
                topic: editProblem.topic,
                time_taken: editProblem.time_taken
            });

        } else {

            setFormData({
                title: "",
                difficulty: "Easy",
                topic: "",
                time_taken: ""
            });

        }

    }, [editProblem]);

    if (!isOpen) return null;

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            if (editProblem) {

                await api.put(
                    `/problem/${editProblem.id}`,
                    formData
                );

            } else {

                await api.post(
                    "/problem/",
                    formData
                );

            }

            onSuccess();
            onClose();

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">

            <div className="bg-slate-800 p-8 rounded-xl w-[500px]">

                <h2 className="text-2xl font-bold mb-6">

                    {editProblem ? "Edit Problem" : "Add Problem"}

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        className="w-full bg-slate-700 p-3 rounded"
                        placeholder="Problem Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <select
                        className="w-full bg-slate-700 p-3 rounded"
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>

                    <input
                        className="w-full bg-slate-700 p-3 rounded"
                        placeholder="Topic"
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                    />

                    <input
                        className="w-full bg-slate-700 p-3 rounded"
                        placeholder="Time Taken"
                        type="number"
                        name="time_taken"
                        value={formData.time_taken}
                        onChange={handleChange}
                    />

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-600 px-4 py-2 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-cyan-500 px-4 py-2 rounded"
                        >
                            {loading
                                ? "Saving..."
                                : editProblem
                                ? "Update"
                                : "Save"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default ProblemModal;
