import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const interviewHistory =
    JSON.parse(localStorage.getItem("interviewHistory")) || [];

const totalInterviews = interviewHistory.length;

const highestInterviewScore =
    interviewHistory.length > 0
        ? Math.max(
            ...interviewHistory.map(
                (item) => item.score
            )
        )
        : 0;

const averageInterviewScore =
    interviewHistory.length > 0
        ? Math.round(
            interviewHistory.reduce(
                (total, item) =>
                    total + item.score,
                0
            ) / interviewHistory.length
        )
        : 0;

const latestInterviewScore =
    interviewHistory.length > 0
        ? interviewHistory[0].score
        : 0;


    const navigate = useNavigate();
    const [totalJobs, setTotalJobs] = useState(0);

    const [savedJobs, setSavedJobs] = useState(0);

    const [atsScore, setAtsScore] = useState(0);

    const [bestMatch, setBestMatch] = useState(0);

    const interviewCount =
    localStorage.getItem("interviewCount") || 0;

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            // Saved Jobs

            const saved = JSON.parse(
                localStorage.getItem("savedJobs")
            ) || [];

            setSavedJobs(saved.length);

            // Recommended Jobs

            const jobsResponse = await axios.get(
                "http://127.0.0.1:8000/recommended-jobs"
            );

            setTotalJobs(jobsResponse.data.length);

            if (jobsResponse.data.length > 0) {

                setBestMatch(
                    jobsResponse.data[0].match_percentage
                );

            }

            

            // Resume Analysis

            const resumeResponse = await axios.get(
                "http://127.0.0.1:8000/analyze-resume"
            );

            setAtsScore(
                resumeResponse.data.score
            );

        }

        catch (error) {

            console.log(error);

        }

    };





    const logout = () => {

        localStorage.removeItem("token");

        alert("Logged Out Successfully");

        navigate("/login");

    };

    return (

        <div className="min-h-screen bg-gray-100">

            <div className="bg-blue-600 text-white p-5 flex justify-between items-center">

                <h1 className="text-3xl font-bold">
                    AI Placement Portal
                </h1>



                <button
                    onClick={logout}
                    className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>

            </div>

            <div className="max-w-5xl mx-auto p-8">

                



                <div className="bg-white shadow-lg rounded-xl p-8 mb-10 text-center">

    <h2 className="text-4xl font-bold text-gray-800">
        Welcome👋
    </h2>

    <p className="text-gray-500 mt-3">
        Manage your resume, track interviews, save jobs and monitor your placement journey.
    </p>

</div>











                <div className="grid md:grid-cols-3 gap-6 mb-8">

    <div className="bg-white shadow-lg rounded-xl p-6 text-center">

        <h3 className="text-xl font-bold text-purple-700">

            🎤 Mock Interviews

        </h3>

        <p className="text-gray-600 mt-2">

            Completed

        </p>

        <p className="text-4xl font-bold text-green-600 mt-3">

            1

        </p>

    </div>

</div>

<div className="bg-white shadow-lg rounded-xl p-8 mb-10">

{/* Interview Analytics */}

<div className="mt-10">

    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">

        Interview Analytics

    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Interviews */}

        <div className="bg-white shadow-lg rounded-xl p-6 text-center border-t-4 border-blue-500">

            <h3 className="text-lg font-semibold text-gray-700">

                Total Interviews

            </h3>

            <p className="text-4xl font-bold text-blue-600 mt-3">

                {totalInterviews}

            </p>

        </div>


        {/* Highest Score */}

        <div className="bg-white shadow-lg rounded-xl p-6 text-center border-t-4 border-green-500">

            <h3 className="text-lg font-semibold text-gray-700">

                Highest Score

            </h3>

            <p className="text-4xl font-bold text-green-600 mt-3">

                {highestInterviewScore}%

            </p>

        </div>


        {/* Average Score */}

        <div className="bg-white shadow-lg rounded-xl p-6 text-center border-t-4 border-purple-500">

            <h3 className="text-lg font-semibold text-gray-700">

                Average Score

            </h3>

            <p className="text-4xl font-bold text-purple-600 mt-3">

                {averageInterviewScore}%

            </p>

        </div>


        {/* Latest Score */}

        <div className="bg-white shadow-lg rounded-xl p-6 text-center border-t-4 border-orange-500">

            <h3 className="text-lg font-semibold text-gray-700">

                Latest Score

            </h3>

            <p className="text-4xl font-bold text-orange-600 mt-3">

                {latestInterviewScore}%

            </p>

        </div>

    </div>

</div>

    <h2 className="text-2xl font-bold text-center mb-8">
        Quick Actions
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

        <button
            onClick={() => navigate("/resume-upload")}
            className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
            Resume Upload
        </button>

        <button
            onClick={() => navigate("/job-recommendation")}
            className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
        >
            Job Recommendation
        </button>

        <button
            onClick={() => navigate("/saved-jobs")}
            className="bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
        >
            Saved Jobs
        </button>

        <button
            onClick={() => navigate("/profile")}
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
            My Profile
        </button>

        <button
            onClick={() => navigate("/mock-interview")}
            className="bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition"
        >
            Mock Interview
        </button>

    </div>

</div>




                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

                    <div className="bg-white shadow-lg rounded-xl p-6 text-center">

                        <h2 className="text-4xl">📄</h2>

                        <h3 className="text-3xl font-bold mt-2">

                            {totalJobs}

                        </h3>

                        <p className="text-gray-600 mt-2">

                            Total Jobs

                        </p>

                        <p className="text-gray-500 text-sm mt-2">
    Available job recommendations
</p>

                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 text-center">

                    <h2 className="text-4xl">❤️</h2>

                    <h3 className="text-3xl font-bold mt-2">

                        {savedJobs}

                    </h3>

                    <p className="text-gray-600 mt-2">

                        Saved Jobs

                    </p>

                    <p className="text-gray-500 text-sm mt-2">
    Jobs saved for later
</p>

                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 text-center">

                    <h2 className="text-4xl">📈</h2>

                    <h3 className="text-3xl font-bold mt-2">

                        {atsScore}%

                    </h3>

                    <p className="text-gray-600 mt-2">

                        ATS Score

                    </p>

                    <p className="text-gray-500 text-sm mt-2">
    Resume quality score
</p>

                 </div>

                <div className="bg-white shadow-lg rounded-xl p-6 text-center">

                    <h2 className="text-4xl">🎯</h2>

                    <h3 className="text-3xl font-bold mt-2">

                        {bestMatch}%

                    </h3>

                    <p className="text-gray-600 mt-2">

                        Best Match

                    </p>


                    <p className="text-gray-500 text-sm mt-2">
    Highest matching job
</p>

                </div>

        </div>








        <div className="bg-white shadow-lg rounded-xl p-8 mt-10">

    <h2 className="text-2xl font-bold mb-6">
        📊 Resume Progress
    </h2>

    <div className="mb-6">

        <div className="flex justify-between mb-2">

            <span className="font-semibold">
                ATS Score
            </span>

            <span>
                {atsScore}%
            </span>

        </div>

        <div className="w-full bg-gray-300 rounded-full h-4">

            <div
                className="bg-green-500 h-4 rounded-full"
                style={{
                    width: `${atsScore}%`
                }}
            ></div>

        </div>

    </div>

    <div>






        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

    <h2 className="text-xl font-bold mb-6">
        📝 Recent Activity
    </h2>

    <div className="space-y-4">

        <div className="flex items-center justify-between border-b pb-3">

            <div>

                <h3 className="font-semibold text-green-700">
                    Resume Uploaded
                </h3>

                <p className="text-sm text-gray-500">
                    Your latest resume has been uploaded successfully.
                </p>

            </div>

            <span className="text-xs text-gray-400">
                Today
            </span>

        </div>

        <div className="flex items-center justify-between border-b pb-3">

            <div>

                <h3 className="font-semibold text-blue-700">
                    ATS Analysis Completed
                </h3>

                <p className="text-sm text-gray-500">
                    Resume analyzed and ATS score generated.
                </p>

            </div>

            <span className="text-xs text-gray-400">
                Today
            </span>

        </div>

        <div className="flex items-center justify-between">

            <div>

                <h3 className="font-semibold text-purple-700">
                    Job Recommendations Loaded
                </h3>

                <p className="text-sm text-gray-500">
                    Personalized jobs are ready for you.
                </p>

            </div>

            <span className="text-xs text-gray-400">
                Today
            </span>

        </div>

    </div>

</div>

        <div className="flex justify-between mb-2">

            <span className="font-semibold">
                Best Match
            </span>

            <span>
                {bestMatch}%
            </span>

        </div>

        <div className="w-full bg-gray-300 rounded-full h-4">

            <div
                className="bg-purple-500 h-4 rounded-full"
                style={{
                    width: `${bestMatch}%`
                }}
            ></div>

        </div>

    </div>

</div>






            </div>

        </div>

    );

}

export default Dashboard;