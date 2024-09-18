export default function EnterprisePowerSection() {
    const items = [
        {
            title: "Ready to Grow with You",
            points: [
                "Near-linear scalability for predictable, efficient query performance.",
                "Unbounded scalability for consistent high-speed results with massive datasets.",
                "Engineered to maintain fast performance as your data expands."
            ]
        },
        {
            title: "Built for Serious Business",
            points: [
                "Reliable data security against unauthorized access and threats.",
                "Enterprise-grade privacy with robust data isolation.",
                "Fault-tolerant design with backup and recovery for consistent performance."
            ]
        },
        {
            title: "Data Time Machine",
            points: [
                "Git-style versioning for your datasets.",
                "Audit changes and track data lineage.",
                "Time-travel to any previous state.",
                "Easily revert or branch your data."
            ]
        }
    ]
    return (
        <div className="max-w-6xl mx-auto mt-20">
            <div className="text-[#0055c8] text-3xl font-semibold flex justify-center mb-6">
                Enterprise Power: Infinite Scale, Ironclad Security, Instant Rewind
            </div>
            <div className="flex flex-col">
                {items.map((item, index) => (
                    <div>
                        <div className="flex gap-2 items-center justify-between space-y-4 my-6 mb-8" key={index}>
                            <div className="w-[400px]">
                                <h1 className="text-2xl font-semibold text-[#f23665] w-fit">
                                    {item.title}
                                </h1>

                            </div>
                            <div className="w-[600px]">
                                {item.points.map((point, index) => (
                                    <div className="text-[#3d8bff]" key={index}>
                                        {point}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full h-[1px] bg-[#f0f2f5] mt-4">

                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}