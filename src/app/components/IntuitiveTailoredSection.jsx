
export default function IntuitiveTailoredSection() {
    const items = [
        {
            title: "Effortless Management",
            points: [
                "RESTful APIs: Manage all database functions effortlessly with intuitive HTTP interfaces.",
                "Client SDKs: Access the database easily with SDKs available in multiple programming languages."
            ]
        },
        {
            title: "Optimized Indexing",
            points: [
                "Dense Vector Index: Efficient and precise indexing with optimized HNSW algorithm.",
                "Sparse Vector Index: Expertly designed for SPLADE-generated sparse vectors, outperforming BM25 indices."
            ]
        },
        {
            title: "Flexible Hyperparameter Control",
            points: [
                "Auto-configuration: Insights-driven setup automatically fine-tunes the system for best results.",
                "Manual Precision: Precisely control indexing and querying parameters for custom setups."
            ]
        }
    ]
    return (
        <div className="bg-[#f2f6fc] p-6">
            <div className="flex flex-col max-w-6xl mx-auto">
                <div className="text-[#0055c8] text-4xl font-semibold flex justify-center mb-6">
                    Intuitive and Tailored to Your Needs
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
        </div>
    )
}