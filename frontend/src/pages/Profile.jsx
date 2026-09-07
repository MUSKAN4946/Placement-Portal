import { useState } from "react";

function Profile() {
    const defaultProfile = {
        name: "Muskan Verma",
        email: "muskanverma.7676@gmail.com",
        phone: "8319301374",
        college: "Shri Vaishnav Vidyapeeth Vishwavidyalaya",
        branch: "B.Tech CSE (Artificial Intelligence)",
        skills: "Python, FastAPI, React, MySQL",
        github: "https://github.com/MUSKAN4946",
        linkedin: "https://www.linkedin.com/in/muskanverma12"
    };

    const [profile, setProfile] = useState(() => {
        const savedProfile = localStorage.getItem("profile");

        return savedProfile
            ? JSON.parse(savedProfile)
            : defaultProfile;
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (field, value) => {
        setProfile({
            ...profile,
            [field]: value
        });
    };

    const handleSave = () => {
        localStorage.setItem("profile", JSON.stringify(profile));
        setIsEditing(false);
        alert("Profile updated successfully!");
    };

    const handleCancel = () => {
        const savedProfile = localStorage.getItem("profile");

        setProfile(
            savedProfile
                ? JSON.parse(savedProfile)
                : defaultProfile
        );

        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">

                {/* Profile Header */}
                <div className="flex flex-col items-center">

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt="Profile"
                        className="w-32 h-32 rounded-full mb-5"
                    />

                    <h1 className="text-4xl font-bold text-blue-700">
                        My Profile
                    </h1>

                </div>

                {/* Profile Details */}
                <div className="mt-8 space-y-5">

                    {/* Name */}
                    <div>
                        <label className="font-bold">
                            Name
                        </label>

                        <input
                            type="text"
                            value={profile.name}
                            disabled={!isEditing}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                            className={`w-full border p-3 rounded mt-1 ${
                                !isEditing
                                    ? "bg-gray-100"
                                    : "bg-white"
                            }`}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="font-bold">
                            Email
                        </label>

                        <input
                            type="email"
                            value={profile.email}
                            disabled
                            className="w-full border p-3 rounded mt-1 bg-gray-100"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="font-bold">
                            Phone
                        </label>

                        <input
                            type="text"
                            value={profile.phone}
                            disabled={!isEditing}
                            onChange={(e) =>
                                handleChange("phone", e.target.value)
                            }
                            className={`w-full border p-3 rounded mt-1 ${
                                !isEditing
                                    ? "bg-gray-100"
                                    : "bg-white"
                            }`}
                        />
                    </div>

                    {/* College */}
                    <div>
                        <label className="font-bold">
                            College
                        </label>

                        <input
                            type="text"
                            value={profile.college}
                            disabled
                            className="w-full border p-3 rounded mt-1 bg-gray-100"
                        />
                    </div>

                    {/* Branch */}
                    <div>
                        <label className="font-bold">
                            Branch
                        </label>

                        <input
                            type="text"
                            value={profile.branch}
                            disabled
                            className="w-full border p-3 rounded mt-1 bg-gray-100"
                        />
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="font-bold">
                            Skills
                        </label>

                        <input
                            type="text"
                            value={profile.skills}
                            disabled={!isEditing}
                            onChange={(e) =>
                                handleChange("skills", e.target.value)
                            }
                            className={`w-full border p-3 rounded mt-1 ${
                                !isEditing
                                    ? "bg-gray-100"
                                    : "bg-white"
                            }`}
                        />
                    </div>

                    {/* GitHub */}
                    <div>
                        <label className="font-bold">
                            GitHub
                        </label>

                        <input
                            type="text"
                            value={profile.github}
                            disabled={!isEditing}
                            onChange={(e) =>
                                handleChange("github", e.target.value)
                            }
                            className={`w-full border p-3 rounded mt-1 ${
                                !isEditing
                                    ? "bg-gray-100"
                                    : "bg-white"
                            }`}
                        />
                    </div>

                    {/* LinkedIn */}
                    <div>
                        <label className="font-bold">
                            LinkedIn
                        </label>

                        <input
                            type="text"
                            value={profile.linkedin}
                            disabled={!isEditing}
                            onChange={(e) =>
                                handleChange("linkedin", e.target.value)
                            }
                            className={`w-full border p-3 rounded mt-1 ${
                                !isEditing
                                    ? "bg-gray-100"
                                    : "bg-white"
                            }`}
                        />
                    </div>

                    {/* Social Links */}
                    {!isEditing && (
                        <div className="space-y-3 pt-3">

                            <p>
                                <strong>GitHub :</strong>

                                <a
                                    href={profile.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 ml-2 hover:underline"
                                >
                                    Open GitHub
                                </a>
                            </p>

                            <p>
                                <strong>LinkedIn :</strong>

                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 ml-2 hover:underline"
                                >
                                    Open LinkedIn
                                </a>
                            </p>

                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-4 pt-5">

                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
                            >
                                ✏️ Edit Profile
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
                                >
                                    💾 Save Changes
                                </button>

                                <button
                                    onClick={handleCancel}
                                    className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600"
                                >
                                    ❌ Cancel
                                </button>
                            </>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Profile;