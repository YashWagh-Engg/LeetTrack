import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function MonthlyChart({ data }) {

    return (

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-lg">

            <h2 className="text-2xl font-bold mb-6 text-white">
                Monthly Progress
            </h2>

            <div className="w-full h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

                        <XAxis
                            dataKey="month"
                            stroke="#cbd5e1"
                        />

                        <YAxis
                            allowDecimals={false}
                            stroke="#cbd5e1"
                        />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#06b6d4"
                            strokeWidth={3}
                            dot={{
                                r: 5
                            }}
                            activeDot={{
                                r: 8
                            }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default MonthlyChart;