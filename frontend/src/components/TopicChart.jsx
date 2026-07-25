import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function TopicChart({ data }) {

    return (

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-lg">

            <h2 className="text-2xl font-bold mb-6 text-white">
                Top Practiced Topics
            </h2>

            <div className="w-full h-[450px]">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#334155"
                        />

                        <XAxis
                            type="number"
                            allowDecimals={false}
                            stroke="#cbd5e1"
                        />

                        <YAxis
                            type="category"
                            dataKey="topic"
                            width={110}
                            stroke="#cbd5e1"
                        />

                        <Tooltip />

                        <Bar
                            dataKey="count"
                            fill="#06b6d4"
                            radius={[0, 8, 8, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default TopicChart;