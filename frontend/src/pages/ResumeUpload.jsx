import { useState } from "react";
import axios from "axios";

function ResumeUpload() {

    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState(null);

    const uploadResume = async () => {

        if (!file) {
            alert("Please Select Resume");
            return;
        }

        const formData = new FormData();

        formData.append("file", file);

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/upload-resume",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert(response.data.message);

        }

        catch (error) {

            alert("Resume Upload Failed");

        }

    };

    const analyzeResume = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/analyze-resume"
            );

            setAnalysis(response.data);
            localStorage.setItem("atsScore", response.data.score);

        }

        catch (error) {

            alert("Resume Analysis Failed");

        }

    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">

                <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
                    Resume Upload
                </h1>


                <p className="text-center text-gray-600 mb-6">

                    Upload your latest resume to receive an AI-based analysis.

                </p>

                <input
                    type="file"
                    className="mb-5"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                {
                    file && (

                        <p className="text-green-700 font-semibold mb-4">

                            📄 Selected File : {file.name}

                        </p>

                    )
                }




                <button
                    onClick={uploadResume}
                    className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 mb-4"
                >
                    Upload Resume
                </button>

                <button
                    onClick={analyzeResume}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                >
                    Analyze Resume
                </button>

                {
                    analysis && (

                        <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-md border">

                            <h2 className="text-2xl font-bold text-center mb-4">
                                Resume Analysis
                            </h2>



                            <p className="text-center text-green-600 font-semibold mb-6">

                                ✅ Resume analyzed successfully by AI

                            </p>








                           <h3 className="text-3xl font-bold text-center text-green-600 mb-6">

                                ⭐ ATS Score : {analysis.score}/100

                            </h3>


                            <div className="w-full bg-gray-300 rounded-full h-4 mb-6">

    <div
        className="bg-green-500 h-4 rounded-full"
        style={{ width: `${analysis.score}%` }}
    ></div>

</div>

                            <br />

                            <p className="text-center text-xl font-semibold mb-6">

                                {

                                    analysis.score >= 80

                                        ? "🟢 Resume Status : Excellent"

                                        : analysis.score >= 60

                                        ? "🟡 Resume Status : Good"

                                        : "🔴 Resume Status : Needs Improvement"

                                }

                            </p>

                            <h3 className="font-bold">
                                Skills
                            </h3>

                           <div className="flex flex-wrap gap-3">

                            {

                                analysis.skills.map((skill, index) => (

                                    <span
                                        key={index}
                                        className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold"
                                    >

                                        {skill}

                                    </span>

                                ))

                            }

                        </div>

                            <br />

                            <h3 className="font-bold text-red-600">
                                Missing Skills
                            </h3>

                           <div className="flex flex-wrap gap-3">

    {

        analysis.missing_skills.map((skill, index) => (

            <span
                key={index}
                className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold"
            >

                {skill}

            </span>

        ))

    }

</div>




<div className="mt-8 bg-yellow-50 border border-yellow-300 rounded-lg p-5">

    <h3 className="text-xl font-bold text-yellow-700 mb-3">

        💡 AI Suggestions

    </h3>

    <ul className="list-disc ml-6 space-y-2">

        <li>Add the missing skills to your resume.</li>

        <li>Include 2–3 real-world projects.</li>

        <li>Mention certifications if available.</li>

        <li>Keep your resume to one page.</li>

    </ul>

</div>

                        </div>

                    )
                }

            </div>

        </div>

    );

}

export default ResumeUpload;