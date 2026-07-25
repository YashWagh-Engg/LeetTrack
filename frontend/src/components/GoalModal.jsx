import { useEffect, useState } from "react";
import api from "../services/api";

function GoalModal({
    isOpen,
    onClose,
    onSuccess,
    currentGoal = null
}) {

    const [dailyGoal, setDailyGoal] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (currentGoal) {
            setDailyGoal(currentGoal.daily_goal);
        } else {
            setDailyGoal(1);
        }

    }, [currentGoal]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            if (currentGoal) {

                await api.put("/goal/", {
                    daily_goal: Number(dailyGoal)
                });

            } else {

                await api.post("/goal/", {
                    daily_goal: Number(dailyGoal)
                });

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

        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

            <div className="bg-slate-800 rounded-xl p-8 w-[450px]">

                <h2 className="text-2xl font-bold mb-6">

                    {currentGoal ? "Update Goal" : "Create Goal"}

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="block mb-2">
                            Daily Goal
                        </label>

                        <input
                            type="number"
                            min={1}
                            max={20}
                            value={dailyGoal}
                            onChange={(e) => setDailyGoal(e.target.value)}
                            className="w-full bg-slate-700 rounded p-3"
                        />

                    </div>

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-600 px-4 py-2 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            disabled={loading}
                            className="bg-cyan-500 px-4 py-2 rounded"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default GoalModal;