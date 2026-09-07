import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const loginUser = async () => {

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/login",
                {
                    email,
                    password
                }
            );
            console.log(response.data);
            localStorage.setItem(
                "token",
                response.data.access_token
            );

            alert(response.data.message);

            navigate("/dashboard");

        }

        catch (error) {

            alert("Login Failed");

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <div className="bg-white shadow-lg rounded-xl p-8 w-96">

                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Placement Portal
                </h1>

                <h2 className="text-xl font-semibold text-center mb-6">
                    Login
                </h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full border rounded-lg p-3 mb-4"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    className="w-full border rounded-lg p-3 mb-6"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={loginUser}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                >
                    Login
                </button>

            </div>

        </div>

    );

}

export default Login;