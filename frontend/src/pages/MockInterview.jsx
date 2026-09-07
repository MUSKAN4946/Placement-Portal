import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MockInterview() {
    const navigate = useNavigate();

    const questions = [
        {
            question: "Tell me about yourself.",
            keywords: ["name", "student", "btech", "computer", "engineering", "skills", "python"]
        },
        {
            question: "What is Python?",
            keywords: ["programming", "language", "interpreted", "high level", "python"]
        },
        {
            question: "Explain OOP Concepts.",
            keywords: ["class", "object", "inheritance", "polymorphism", "encapsulation", "abstraction"]
        },
        {
            question: "What is FastAPI?",
            keywords: ["python", "framework", "api", "web", "backend", "fastapi"]
        },
        {
            question: "Difference between List and Tuple?",
            keywords: ["list", "tuple", "mutable", "immutable", "change"]
        }
    ];

    const [started, setStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [answer, setAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false);

    useEffect(() => {
        if (!started || completed || answered) return;

        if (timeLeft === 0) {
            setAnswered(true);
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, started, completed, answered]);

    const startInterview = () => {
        setStarted(true);
        setCompleted(false);
        setCurrentQuestion(0);
        setTimeLeft(60);
        setScore(0);
        setAnswer("");
        setAnswered(false);
    };

    const evaluateAnswer = () => {
        if (!answer.trim()) {
            alert("Please enter your answer first.");
            return;
        }

        const userAnswer = answer.toLowerCase();

        const matchedKeywords = questions[currentQuestion].keywords.filter(
            (keyword) => userAnswer.includes(keyword.toLowerCase())
        );

        let questionScore = 0;

        if (matchedKeywords.length >= 3) {
            questionScore = 2;
        } else if (matchedKeywords.length >= 1) {
            questionScore = 1;
        }

        setScore((prevScore) => prevScore + questionScore);
        setAnswered(true);
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setAnswer("");
            setTimeLeft(60);
            setAnswered(false);
        } else {
            setCompleted(true);
        }
    };

    const finishInterview = () => {
        const finalScore = Math.round(
            (score / (questions.length * 2)) * 100
        );

        const interviewRecord = {
            score: finalScore,
            date: new Date().toLocaleString()
        };

        const previousHistory =
            JSON.parse(localStorage.getItem("interviewHistory")) || [];

        localStorage.setItem(
            "interviewHistory",
            JSON.stringify([interviewRecord, ...previousHistory])
        );

        setCompleted(true);
    };

    const restartInterview = () => {
        setStarted(false);
        setCompleted(false);
        setCurrentQuestion(0);
        setTimeLeft(60);
        setScore(0);
        setAnswer("");
        setAnswered(false);
    };

    const finalScore = Math.round(
        (score / (questions.length * 2)) * 100
    );

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white shadow-xl rounded-xl p-10 text-center w-[700px]">

                {/* Header */}
                <h1 className="text-4xl font-bold text-purple-700 mb-6">
                    🎤 Mock Interview
                </h1>

                <p className="text-center text-gray-600 mb-8">
                    Practice interview questions and improve your confidence before real interviews.
                </p>

                {/* Start Interview */}
                {!started && (
                    <button
                        onClick={startInterview}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                    >
                        Start Interview
                    </button>
                )}

                {/* Interview Questions */}
                {started && !completed && (
                    <div className="mt-8">

                        <h2 className="text-2xl font-bold mb-4">
                            Question {currentQuestion + 1} / {questions.length}
                        </h2>

                        <p className="text-red-600 font-bold text-lg mb-4">
                            ⏱️ Time Left : {timeLeft} sec
                        </p>

                        <p className="text-sm text-gray-500 mb-4">
                            Progress: {currentQuestion + 1} of {questions.length}
                        </p>

                        <p className="text-xl font-semibold mb-6">
                            {questions[currentQuestion].question}
                        </p>

                        {/* Answer Box */}
                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            disabled={answered}
                            placeholder="Type your answer here..."
                            className="w-full border border-gray-300 rounded-lg p-4 text-left min-h-[120px] mb-5 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {/* Submit Answer */}
                        {!answered && (
                            <button
                                onClick={evaluateAnswer}
                                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 mr-3"
                            >
                                Submit Answer
                            </button>
                        )}

                        {/* Next / Finish */}
                        {answered && currentQuestion < questions.length - 1 && (
                            <button
                                onClick={nextQuestion}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                            >
                                Next Question →
                            </button>
                        )}

                        {answered && currentQuestion === questions.length - 1 && (
                            <button
                                onClick={finishInterview}
                                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                            >
                                Finish Interview
                            </button>
                        )}

                    </div>
                )}

                {/* Interview Completed */}
                {started && completed && (
                    <div className="mt-8 bg-green-100 border border-green-400 rounded-xl p-8">

                        <h2 className="text-3xl font-bold text-green-700">
                            🎉 Interview Completed!
                        </h2>

                        <h3 className="text-2xl font-bold text-blue-700 mt-6">
                            ⭐ Your Score : {finalScore}%
                        </h3>

                        <p className="text-xl font-semibold mt-4">
                            {finalScore >= 80
                                ? "🏆 Performance : Excellent"
                                : finalScore >= 50
                                ? "👍 Performance : Good"
                                : "📚 Performance : Needs Improvement"}
                        </p>

                        <p className="mt-4 text-lg text-gray-700">
                            Thank you for completing the mock interview.
                            Keep practicing regularly to improve your interview performance.
                        </p>

                        <button
                            onClick={() => navigate("/interview-feedback")}
                            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 mr-4 mt-5"
                        >
                            View Interview Feedback
                        </button>

                        <button
                            onClick={restartInterview}
                            className="mt-5 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
                        >
                            Restart Interview
                        </button>

                    </div>
                )}

            </div>

        </div>
    );
}

export default MockInterview;