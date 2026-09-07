import { useState } from "react";
import axios from "axios";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async () => {

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/register",
                {
                    name,
                    email,
                    password
                }
            );

            alert(response.data.message);

        } catch (error) {

            alert("Registration Failed");

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
                    onChange={(e) => setName(e.target.value)}
                />

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
                    onClick={registerUser}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                >
                    Register
                </button>

            </div>

        </div>

    );

}

export default Register;