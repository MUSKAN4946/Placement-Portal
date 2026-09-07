import { useEffect, useState } from "react";

function InterviewFeedback() {
    const [interviewHistory, setInterviewHistory] = useState([]);

    useEffect(() => {
        try {
            const savedHistory =
                window.localStorage.getItem("interviewHistory");

            if (savedHistory) {
                const parsedHistory = JSON.parse(savedHistory);

                if (Array.isArray(parsedHistory)) {
                    setInterviewHistory(parsedHistory);
                }
            }
        } catch (error) {
            console.error("Unable to load interview history:", error);
            setInterviewHistory([]);
        }
    }, []);

    // Get latest interview score
    const score =
        interviewHistory.length > 0
            ? Number(interviewHistory[0].score) || 0
            : 0;

    // Performance function
    const getPerformance = (value) => {
        if (value >= 80) {
            return "Excellent";
        } else if (value >= 60) {
            return "Good";
        } else if (value >= 40) {
            return "Average";
        } else {
            return "Needs Improvement";
        }
    };

    const performance = getPerformance(score);

    let badge = "";
    let strengths = [];
    let improvements = [];
    let recommendation = "";

    // Feedback based on interview score
    if (score >= 80) {
        badge = "Placement Ready";

        strengths = [
            "Strong interview performance",
            "Good technical understanding",
            "Clear and relevant answers"
        ];

        improvements = [
            "Keep practicing advanced technical questions",
            "Continue improving communication skills"
        ];

        recommendation =
            "Excellent performance. Keep practicing regularly to stay placement ready.";
    } else if (score >= 60) {
        badge = "Almost Ready";

        strengths = [
            "Good technical fundamentals",
            "Good problem-solving approach",
            "Positive interview performance"
        ];

        improvements = [
            "Practice more technical questions",
            "Improve communication skills",
            "Revise important programming concepts"
        ];

        recommendation =
            "Good progress. Continue practicing technical and communication skills.";
    } else if (score >= 40) {
        badge = "Keep Learning";

        strengths = [
            "Basic technical understanding",
            "Willingness to learn",
            "Good scope for improvement"
        ];

        improvements = [
            "Revise Python fundamentals",
            "Practice OOP concepts",
            "Practice SQL questions",
            "Improve communication"
        ];

        recommendation =
            "Keep practicing consistently and strengthen your fundamentals before placements.";
    } else {
        badge = "Beginner";

        strengths = [
            "Learning Attitude"
        ];

        improvements = [
            "Revise Python fundamentals",
            "Revise OOP concepts",
            "Practice SQL",
            "Improve Communication"
        ];

        recommendation =
            "Focus on fundamentals first and practice more mock interviews.";
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white shadow-xl rounded-xl p-10 w-[700px]">

                {/* Heading */}
                <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">
                    Interview Feedback
                </h1>

                {/* Overall Score */}
                <div className="bg-blue-100 border border-blue-400 rounded-xl p-6 mb-8 text-center">

                    <h2 className="text-2xl font-bold text-blue-700">
                        Overall Interview Score
                    </h2>

                    <p className="text-5xl font-bold text-blue-600 mt-4">
                        {score}%
                    </p>

                </div>

                {/* Performance */}
                <h2 className="text-2xl text-center font-bold text-blue-700 mb-8">
                    {performance}
                </h2>

                {/* Badge */}
                <div className="bg-purple-100 border border-purple-400 rounded-lg p-4 mb-6 text-center">

                    <h2 className="text-xl font-bold text-purple-700">
                        🏅 Achievement Badge
                    </h2>

                    <p className="text-lg font-semibold mt-2">
                        {badge}
                    </p>

                </div>

                {/* Strengths */}
                <div className="bg-green-100 border border-green-400 rounded-lg p-5 mb-6">

                    <h2 className="text-2xl font-bold text-green-700 mb-3">
                        ✅ Strengths
                    </h2>

                    <ul className="list-disc ml-6 space-y-2">

                        {strengths.map((item, index) => (
                            <li key={index}>
                                {item}
                            </li>
                        ))}

                    </ul>

                </div>

                {/* Improvements */}
                <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-5 mb-6">

                    <h2 className="text-2xl font-bold text-yellow-700 mb-3">
                        📚 Areas to Improve
                    </h2>

                    <ul className="list-disc ml-6 space-y-2">

                        {improvements.map((item, index) => (
                            <li key={index}>
                                {item}
                            </li>
                        ))}

                    </ul>

                </div>

                {/* Recommendation */}
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

                            <div className="overflow-x-auto">

                                <table className="w-full border-collapse">

                                    <thead>

                                        <tr className="bg-gray-100">

                                            <th className="border p-2">
                                                Date
                                            </th>

                                            <th className="border p-2">
                                                Score
                                            </th>

                                            <th className="border p-2">
                                                Performance
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {interviewHistory.map(
                                            (item, index) => {

                                                const historyScore =
                                                    Number(item.score) || 0;

                                                const historyPerformance =
                                                    item.performance ||
                                                    getPerformance(historyScore);

                                                return (
                                                    <tr key={index}>

                                                        <td className="border p-2 text-center">
                                                            {item.date}
                                                        </td>

                                                        <td className="border p-2 text-center font-semibold">
                                                            {historyScore}%
                                                        </td>

                                                        <td className="border p-2 text-center">
                                                            {historyPerformance}
                                                        </td>

                                                    </tr>
                                                );
                                            }
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default InterviewFeedback;