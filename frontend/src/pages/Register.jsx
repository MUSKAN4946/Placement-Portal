
import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const registerUser = async () => {

        if (!name.trim() || !email.trim() || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {

            const response = await api.post(
                "/register",
                {
                    name,
                    email,
                    password
                }
            );

            alert(response.data.message || "Registration successful!");

            navigate("/login");

        } catch (error) {

            console.error("Registration error:", error);

            const errorMessage =
                error.response?.data?.detail ||
                error.response?.data?.message ||
                error.message ||
                "Unknown error";

            alert("Registration Failed: " + errorMessage);

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <div className="bg-white shadow-lg rounded-xl p-8 w-96">

                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Placement Portal
                </h1>

                <h2 className="text-xl font-semibold text-center mb-6">
                    Register
                </h2>

                <input
                    type="text"
                    placeholder="Enter Name"
                    className="w-full border rounded-lg p-3 mb-4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full border rounded-lg p-3 mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="relative mb-6">

                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        className="w-full border rounded-lg p-3 pr-12"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >

                        {showPassword ? (

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 3l18 18" />
                                <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
                                <path d="M9.88 5.09A10.8 10.8 0 0 1 12 4.9c5 0 8.5 5.1 9 7.1a10.6 10.6 0 0 1-2.1 3.5" />
                                <path d="M6.61 6.61A10.7 10.7 0 0 0 3 12c.5 2 4 7.1 9 7.1a10.8 10.8 0 0 0 4.39-.94" />
                            </svg>

                        ) : (

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>

                        )}

                    </button>

                </div>

                <button
                    onClick={registerUser}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                >
                    Register
                </button>

                <p className="text-center text-gray-600 mt-5">

                    Already have an account?{" "}

                    <Link
                        to="/"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;
