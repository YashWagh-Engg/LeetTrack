function AnalyticsCard({
    title,
    value,
    icon
}) {

    return (

        <div
            className="
                bg-slate-800
                rounded-2xl
                p-6
                border
                border-slate-700
                shadow-lg
                hover:shadow-cyan-500/20
                hover:-translate-y-1
                transition-all
                duration-300
            "
        >

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-400 text-sm">
                        {title}
                    </p>

                    <h2 className="text-4xl font-bold text-white mt-3">
                        {value}
                    </h2>

                </div>

                <div className="text-5xl">
                    {icon}
                </div>

            </div>

        </div>

    );

}

export default AnalyticsCard;