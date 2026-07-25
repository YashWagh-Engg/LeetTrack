import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

function DifficultyChart({ data }) {

    const chartData = [
        {
            name: "Easy",
            value: data.easy
        },
        {
            name: "Medium",
            value: data.medium
        },
        {
            name: "Hard",
            value: data.hard
        }
    ];

    const COLORS = [
        "#22c55e",
        "#facc15",
        "#ef4444"
    ];

    return (

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-lg">

            <h2 className="text-2xl font-bold mb-6 text-white">
                Difficulty Distribution
            </h2>

            <div className="w-full h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={110}
                            label
                        >

                            {
                                chartData.map((entry, index) => (

                                    <Cell
                                        key={index}
                                        fill={COLORS[index]}
                                    />

                                ))
                            }

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default DifficultyChart;