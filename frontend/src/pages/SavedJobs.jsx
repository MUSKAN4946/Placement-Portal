import { useEffect, useState } from "react";

function SavedJobs() {

    const [savedJobs, setSavedJobs] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
        setSavedJobs(jobs);

    }, []);

    const removeJob = (company) => {

        const updatedJobs = savedJobs.filter(
            (job) => job.company !== company
        );

        setSavedJobs(updatedJobs);

        localStorage.setItem(
            "savedJobs",
            JSON.stringify(updatedJobs)
        );

    };

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-4xl font-bold text-center text-pink-600 mb-10">
                Saved Jobs
            </h1>


            <div className="mb-8">

    <input
        type="text"
        placeholder="Search Saved Jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg"
    />

</div>

            <div className="text-center mb-8">

                <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-bold">

                     Total Saved Jobs : {savedJobs.length}

                </span>

            </div>


            <div className="bg-blue-100 border border-blue-300 rounded-xl p-5 mb-8 text-center">

    <h2 className="text-2xl font-bold text-blue-700">

         Saved Jobs Statistics

    </h2>

    <p className="mt-3 text-lg">

        You currently have

        <span className="font-bold text-purple-700">
            {" "} {savedJobs.length} {" "}
        </span>

        saved job(s).

    </p>

</div>

            {
                savedJobs.length === 0 ? (

                    <div className="bg-white rounded-xl shadow-lg p-10 text-center">

                        <h2 className="text-3xl font-bold text-red-600 mb-4">

                            No Saved Jobs Yet

                        </h2>

                        <p className="text-gray-600">

                            Start saving jobs from the Job Recommendation page.

                        </p>

                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 gap-6">

                        {savedJobs

    .filter((job) =>

        job.title.toLowerCase().includes(search.toLowerCase()) ||

        job.company.toLowerCase().includes(search.toLowerCase())

    )

    .map((job, index) => (


                            <div
                                key={index}
                                className="bg-white shadow-lg rounded-xl p-6"
                            >

                                <img
                                    src={`/images/${job.company.toLowerCase()}.png`}
                                    alt={job.company}
                                    className="w-20 h-20 object-contain mb-4"
                                />

                                <h2 className="text-2xl font-bold">
                                    {job.title}
                                </h2>

                                <p>
                                    <strong>Company :</strong> {job.company}
                                </p>

                                <p>
                                    <strong>Location :</strong> {job.location}
                                </p>

                                <p>
                                    <strong>Salary :</strong> {job.salary}
                                </p>

                                <button
                                    onClick={() => removeJob(job.company)}
                                    className="mt-5 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                                >
                                    🗑 Remove
                                </button>

                            </div>

                        ))}

                    </div>

                )
            }

        </div>

    );

}

export default SavedJobs;