function InterviewFeedback() {

    const score = Number(localStorage.getItem("atsScore")) || 50;


let performance = "";
let strengths = [];
let improvements = [];
let recommendation = "";
let badge = "";


if (score >= 90) {

    performance = "Excellent";
    badge = "Placement Ready";

    strengths = [
        "Excellent Python knowledge",
        "Strong OOP Concepts",
        "Excellent Problem Solving"
    ];

    improvements = [
        "Keep solving advanced DSA",
        "Attend company mock interviews"
    ];

    recommendation =
        "You are fully placement ready.";

}

else if (score >= 75) {

    performance = "Very Good";
    badge = "Almost Ready";

    strengths = [
        "Good Python knowledge",
        "Strong Logical Thinking"
    ];

    improvements = [
        "Practice System Design",
        "Improve Communication Skills"
    ];

    recommendation =
        "You are very close to being placement ready.";

}

else if (score >= 60) {

    performance = "Good";
    badge = "Needs Practice";

    strengths = [
        "Good Programming Basics",
        "Good Learning Ability"
    ];

    improvements = [
        "Practice SQL",
        "Practice FastAPI",
        "Improve DSA"
    ];

    recommendation =
        "Keep practicing consistently.";

}

else if (score >= 40) {

    performance = "Average";
    badge = "Keep Learning";

    strengths = [
        "Basic Programming Knowledge"
    ];

    improvements = [
        "Revise Python",
        "Practice OOP",
        "Practice Aptitude"
    ];

    recommendation =
        "You need more practice before placements.";

}

else {

    performance = "Needs Improvement";
    badge = "Beginner";

    strengths = [
        "Learning Attitude"
    ];

    improvements = [
        "Revise Python",
        "Revise OOP",
        "Practice SQL",
        "Improve Communication"
    ];

    recommendation =
        "Focus on fundamentals first.";

}


// Save Interview History
const interviewHistory =
    JSON.parse(localStorage.getItem("interviewHistory")) || [];

const today = new Date().toLocaleDateString();

const alreadyExists = interviewHistory.some(
    (item) =>
        item.date === today &&
        item.score === score
);

if (!alreadyExists) {

    interviewHistory.unshift({

        date: today,
        score: score,
        performance: performance,

    });


    interviewHistory = interviewHistory.slice(0, 5);

    localStorage.setItem(
        "interviewHistory",
        JSON.stringify(interviewHistory)
    );
}




    return (

        

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white shadow-xl rounded-xl p-10 w-[700px]">

                <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">

                    AI Interview Feedback

                </h1>


                <div className="bg-blue-100 border border-blue-400 rounded-xl p-6 mb-8 text-center">

    <h2 className="text-2xl font-bold text-blue-700">

        Overall Interview Score

    </h2>

    <p className="text-5xl font-bold text-blue-600 mt-4">

        {score}%

    </p>

</div>

                <h2 className="text-2xl text-center font-bold text-blue-700 mb-8">

                    {performance}

                </h2>


                <div className="bg-purple-100 border border-purple-400 rounded-lg p-4 mb-6 text-center">

                <h2 className="text-xl font-bold text-purple-700">

                    🏅 Achievement Badge

                </h2>

                <p className="text-lg font-semibold mt-2">

                    {badge}

                </p>

            </div>

                <div className="bg-green-100 border border-green-400 rounded-lg p-5 mb-6">

                    <h2 className="text-2xl font-bold text-green-700 mb-3">

                        ✅ Strengths

                    </h2>

                    <ul className="list-disc ml-6 space-y-2">

                      {
                        strengths.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))
                    }

                    </ul>

                </div>

                <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-5 mb-6">

                    <h2 className="text-2xl font-bold text-yellow-700 mb-3">

                        📚 Areas to Improve

                    </h2>

                    <ul className="list-disc ml-6 space-y-2">

                        {
                            improvements.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))
                        }

                    </ul>

                </div>

                <div className="bg-blue-100 border border-blue-400 rounded-lg p-5">

                    <h2 className="text-2xl font-bold text-blue-700 mb-3">

                        🎯 Overall Recommendation

                    </h2>

                    <p>
                            {recommendation}


                    </p>


                    {/* Interview History */}

<div className="bg-white border rounded-lg shadow-md p-5 mt-6">

    <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Interview History
    </h2>

    {interviewHistory.length === 0 ? (

        <p className="text-gray-500">
            No interview history available.
        </p>

    ) : (

        <table className="w-full border-collapse">

            <thead>

                <tr className="bg-gray-100">

                    <th className="border p-2">Date</th>

                    <th className="border p-2">Score</th>

                    <th className="border p-2">Performance</th>

                </tr>

            </thead>

            <tbody>

                {interviewHistory.map((item, index) => (

                    <tr key={index}>

                        <td className="border p-2 text-center">
                            {item.date}
                        </td>

                        <td className="border p-2 text-center">
                            {item.score}%
                        </td>

                        <td className="border p-2 text-center">
                            {item.performance}
                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    )}

</div>

                </div>

            </div>

        </div>

    );

}

export default InterviewFeedback;