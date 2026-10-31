import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function JobRecommendation() {

    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [jobType, setJobType] = useState("All");
    const [location, setLocation] = useState("All");
    const [salaryFilter, setSalaryFilter] = useState("All");
    const [sortBy, setSortBy] = useState("Highest Match");
    const [savedJobs, setSavedJobs] = useState(() => {

        const saved = localStorage.getItem("savedJobs");

        return saved ? JSON.parse(saved) : [];

    });
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {

        getJobs();

    }, []);

    useEffect(() => {

        localStorage.setItem(

            "savedJobs",

                JSON.stringify(savedJobs)

        );

    }, [savedJobs]);


    const getJobs = async () => {

        try {

           const response = await api.get(
    "/recommended-jobs"
);

            setJobs(response.data);

        }

        catch (error) {

            alert("Failed To Load Jobs");

        }

    };

    const applyJob = (link) => {

        window.open(link, "_blank");

    };

    const saveJob = (job) => {

    const alreadySaved = savedJobs.find(

        (saved) => saved.company === job.company

    );

    if (alreadySaved) {

        alert("❤️ Job already saved!");

        return;

    }

    setSavedJobs([...savedJobs, job]);

    alert("✅ Job Saved Successfully!");

};


    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
                Recommended Jobs
            </h1>


            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">

    <div>
        <input
            type="text"
            placeholder="Search Job, Company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border rounded-lg"
        />
    </div>

    <div>
        <label className="block mb-2 font-semibold text-gray-700">
            💼 Job Type
        </label>

        <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full p-3 border rounded-lg"
        >
            <option>All</option>
            <option>Full Time</option>
            <option>Internship</option>
        </select>
    </div>

    <div>
        <label className="block mb-2 font-semibold text-gray-700">
            📍 Location
        </label>

        <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border rounded-lg"
        >
            <option>All</option>
            <option>Bangalore</option>
            <option>Hyderabad</option>
            <option>Pune</option>
            <option>Remote</option>
        </select>
    </div>

    <div>
        <label className="block mb-2 font-semibold text-gray-700">
            💰 Salary Range
        </label>

        <select
            value={salaryFilter}
            onChange={(e) => setSalaryFilter(e.target.value)}
            className="w-full p-3 border rounded-lg"
        >
            <option>All</option>
            <option>Below 6 LPA</option>
            <option>6-10 LPA</option>
            <option>Above 10 LPA</option>
        </select>
    </div>

    <div>
        <label className="block mb-2 font-semibold text-gray-700">
            ⭐ Sort By
        </label>

        <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-3 border rounded-lg"
        >
            <option>Highest Match</option>
            <option>Lowest Match</option>
        </select>
    </div>

</div>

<div className="flex justify-end mb-8">

    <button
        onClick={() => {

            setSearch("");
            setJobType("All");
            setLocation("All");
            setSalaryFilter("All");
            setSortBy("Highest Match");

        }}
        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
    >

        🔄 Clear Filters

    </button>

</div>



            <div className="grid md:grid-cols-2 gap-6">

                {

                    jobs

                        .filter((job) => {

                            const matchesSearch =

                                job.title.toLowerCase().includes(search.toLowerCase()) ||

                                job.company.toLowerCase().includes(search.toLowerCase());

                            const matchesType =

    jobType === "All" ||

    job.job_type === jobType;

const matchesLocation =

    location === "All" ||

    job.location === location;

let matchesSalary = true;

if (salaryFilter === "Below 6 LPA") {

    matchesSalary = parseFloat(job.salary.replace(" LPA", "").replace("₹", "")) < 6;

}

else if (salaryFilter === "6-10 LPA") {

    const salary = parseFloat(job.salary.replace(" LPA", "").replace("₹", ""));

    matchesSalary = salary >= 6 && salary <= 10;

}

else if (salaryFilter === "Above 10 LPA") {

    matchesSalary = parseFloat(job.salary.replace(" LPA", "").replace("₹", "")) > 10;

}

return (
    matchesSearch &&
    matchesType &&
    matchesLocation &&
    matchesSalary
);

                        })

                        .sort((a, b) => {

    if (sortBy === "Highest Match") {

        return b.match_percentage - a.match_percentage;

    }

    return a.match_percentage - b.match_percentage;

})

                        .map((job, index) => (
                            

                            <div
                                key={index}
                                className="bg-white shadow-lg rounded-xl p-6"
                            >

                                {

                                    index === 0 && (

                                        <div className="mb-3">

                                            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">

                                                🏆 BEST MATCH

                                            </span>

                                        </div>

                                    )

                                }

                                <img
                                    src={`/images/${job.company.toLowerCase()}.png`}
                                    alt={job.company}
                                    className="w-20 h-20 object-contain mb-4"
                                />

                                <h2 className="text-2xl font-bold">

                                    {job.title}

                                </h2>

                                <p className="mt-3">

                                    <strong>Company :</strong> {job.company}

                                </p>

                                <p>

                                    <strong>Location :</strong> {job.location}

                                </p>

                                <p>

                                    <strong>Salary :</strong> {job.salary}

                                </p>

                                <p>

                                    <strong>Experience :</strong> {job.experience}

                                </p>

                                <p>

                                    <strong>Job Type :</strong> {job.job_type}

                                </p>

                                <p
                                    className={`mt-3 font-bold ${
                                        job.match_percentage >= 80
                                            ? "text-green-600"
                                            : job.match_percentage >= 60
                                            ? "text-yellow-600"
                                            : "text-red-600"
                                    }`}
                                >

                                    🎯 Match : {job.match_percentage}%

                                </p>

                                <div className="w-full bg-gray-300 rounded-full h-4 mt-3">

                                    <div
                                        className={`h-4 rounded-full ${
                                            job.match_percentage >= 80
                                                ? "bg-green-500"
                                                : job.match_percentage >= 60
                                                ? "bg-yellow-500"
                                                : "bg-red-500"
                                        }`}
                                        style={{
                                            width: `${job.match_percentage}%`
                                        }}
                                    >

                                    </div>

                                </div>






                                <div className="flex gap-3 mt-5 flex-wrap">

    <button
        onClick={() => saveJob(job)}
        className="bg-pink-600 text-white px-5 py-2 rounded-lg hover:bg-pink-700"
    >
        ❤️ Save Job
    </button>

    <button
        onClick={() => navigate("/interview-questions")}
        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
    >
        🎤 Interview Prep
        
    </button>



    <button
    onClick={() =>
        setSelectedJob(selectedJob === index ? null : index)
    }
    className="mt-4 mr-3 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
>
    🔍 View Details
</button>

    <button
        onClick={() => applyJob(job.apply_link)}
        className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700"
    >
        Apply
    </button>


    {
    selectedJob === index && (

        <div className="mt-6 bg-gray-100 border rounded-xl p-5">

            <h3 className="text-xl font-bold text-indigo-700 mb-4">
                🏢 Job Details
            </h3>

            <button
    onClick={() => setSelectedJob(null)}
    className="mb-5 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
>
    ❌ Close Details
</button>

            <p className="mb-2">
                <strong>Company:</strong> {job.company}
            </p>

            <p className="mb-2">
                <strong>Job Role:</strong> {job.title}
            </p>

            <p className="mb-2">
                <strong>Location:</strong> {job.location}
            </p>

            <p className="mb-2">
                <strong>Experience:</strong> {job.experience}
            </p>

            <p className="mb-2">
                <strong>Salary:</strong> {job.salary}
            </p>




            <h4 className="font-bold text-green-700 mt-4 mb-2">

    🛠 Required Skills

</h4>

<div className="flex flex-wrap gap-2 mb-4">

    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
        Python
    </span>

    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
        FastAPI
    </span>

    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
        SQL
    </span>

    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
        Git
    </span>

</div>

            <p className="mt-4">
                <strong>Job Description:</strong>
            </p>

            <p className="text-gray-700 mt-2">
                We are looking for a passionate developer with good programming knowledge,
                problem-solving skills, and the ability to work in a team environment.
            </p>

            <button
    onClick={() => window.open(job.apply_link, "_blank")}
    className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
>
    🌐 Visit Company Website
</button>


   

        </div>

    )
}






</div>




                            </div>

                        ))

                }

            </div>

        </div>

    );

}

export default JobRecommendation;