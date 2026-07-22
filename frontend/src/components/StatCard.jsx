function StatCard({ title, value, icon }) {
    return (
        <div
            className="
                bg-slate-800
                rounded-xl
                p-6
                shadow-lg
                hover:shadow-cyan-500/20
                hover:-translate-y-1
                duration-300
                transition-all
                border
                border-slate-700
            "
        >
            <div className="flex items-center justify-between">

                <div>

                    <p className="text-gray-400 text-sm">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold text-white mt-2">
                        {value}
                    </h2>

                </div>

                <div className="text-4xl">
                    {icon}
                </div>

            </div>
        </div>
    );
}

export default StatCard;