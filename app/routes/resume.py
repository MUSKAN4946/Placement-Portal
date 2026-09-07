from fastapi import APIRouter, UploadFile, File
import shutil
import fitz
import os

router = APIRouter()

resume_skills = []


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "Resume Uploaded Successfully",
        "filename": file.filename
    }


@router.get("/analyze-resume")
def analyze_resume():

    upload_folder = "uploads"

    files = os.listdir(upload_folder)

    pdf_files = [file for file in files if file.endswith(".pdf")]

    if len(pdf_files) == 0:

        return {
            "score": 0,
            "skills": [],
            "missing_skills": [],
            "message": "No Resume Found"
        }

    latest_resume = os.path.join(upload_folder, pdf_files[-1])

    document = fitz.open(latest_resume)

    resume_text = ""

    for page in document:
        resume_text += page.get_text()

    document.close()

    skills_database = [

        # Programming
        "Python",
        "C++",
        "Java",
        "C",
        "JavaScript",

        # Web
        "HTML",
        "CSS",
        "React",
        "Node.js",
        "FastAPI",
        "Flask",
        "Django",
        "REST API",

        # Database
        "MySQL",
        "SQL",
        "MongoDB",
        "SQLAlchemy",

        

        # Tools
        "Git",
        "GitHub",
        "VS Code",
        "Docker",
        "AWS",
        "Linux",

        # Subjects
        "Operating Systems",
        "Computer Network",
        "DBMS",
        "OOP",
        "Data Structures",
        "Algorithms",

        # Other
        "Tkinter",
        "PostgreSQL",
        "Power BI",
        "Excel",
        "IoT",
        "Cloud Computing"

    ]

    global resume_skills

    found_skills = []

    resume_lower = resume_text.lower()

    for skill in skills_database:

        if skill.lower() in resume_lower:

            found_skills.append(skill)

    resume_skills = found_skills

    missing_skills = []

    for skill in skills_database:

        if skill not in found_skills:

            missing_skills.append(skill)

    score = int(
        (len(found_skills) / len(skills_database)) * 100
    )

    return {

        "score": score,

        "skills": found_skills,

        "missing_skills": missing_skills,

    }

