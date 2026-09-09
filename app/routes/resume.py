from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import fitz
import os
import re

router = APIRouter()

# Store the currently uploaded resume
current_resume = None
resume_skills = []


# Skills used for resume analysis
SKILLS_DATABASE = [
    # Programming
    "Python",
    "C++",
    "Java",
    "JavaScript",
    "C",

    # Web Development
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
    "PostgreSQL",

    # Tools
    "Git",
    "GitHub",
    "VS Code",
    "Docker",
    "AWS",
    "Linux",

    # Computer Science
    "Operating Systems",
    "Computer Networks",
    "Computer Network",
    "DBMS",
    "OOP",
    "Data Structures",
    "Algorithms",

    # Other
    "Tkinter",
    "Power BI",
    "Excel",
    "IoT",
    "Cloud Computing"
]


def extract_resume_text(file_path):
    document = fitz.open(file_path)

    resume_text = ""

    for page in document:
        resume_text += page.get_text("text") + "\n"

    document.close()

    return resume_text


def detect_skills(resume_text):
    global resume_skills

    found_skills = []

    # Normalize text
    text = re.sub(r"\s+", " ", resume_text.lower())

    for skill in SKILLS_DATABASE:

        skill_lower = skill.lower()

        # Special handling for single-letter C
        if skill == "C":
            pattern = r"(?<![a-z])c(?![a-z])"
        else:
            pattern = r"(?<![a-z0-9])" + re.escape(skill_lower) + r"(?![a-z0-9])"

        if re.search(pattern, text):
            found_skills.append(skill)

    return found_skills


def calculate_score(resume_text, found_skills):
    text = resume_text.lower()

    score = 0

    # Skill score
    skill_score = min(len(found_skills) * 2, 40)
    score += skill_score

    # Resume content checks
    sections = {
        "education": [
            "education",
            "academic"
        ],
        "experience": [
            "experience",
            "internship",
            "work experience"
        ],
        "projects": [
            "projects",
            "project"
        ],
        "skills": [
            "skills",
            "technical skills"
        ],
        "certifications": [
            "certification",
            "certifications",
            "certificate"
        ],
        "contact": [
            "email",
            "phone",
            "linkedin",
            "github"
        ]
    }

    for section_keywords in sections.values():

        if any(keyword in text for keyword in section_keywords):
            score += 10

    # Keep score between 0 and 100
    return min(score, 100)


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    global current_resume

    # Check PDF
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF resume"
        )

    os.makedirs("uploads", exist_ok=True)

    file_path = os.path.join("uploads", file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Remember exact uploaded resume
    current_resume = file_path

    return {
        "message": "Resume Uploaded Successfully",
        "filename": file.filename
    }


@router.get("/analyze-resume")
def analyze_resume():

    global current_resume

    # Make sure a resume was uploaded
    if current_resume is None:
        return {
            "score": 0,
            "skills": [],
            "missing_skills": [],
            "message": "Please upload a resume first"
        }

    # Make sure uploaded file still exists
    if not os.path.exists(current_resume):
        current_resume = None

        return {
            "score": 0,
            "skills": [],
            "missing_skills": [],
            "message": "Resume file not found"
        }

    # Extract actual text from uploaded PDF
    resume_text = extract_resume_text(current_resume)

    # Detect skills from actual resume content
    found_skills = detect_skills(resume_text)

    # Find missing skills
    missing_skills = [
        skill
        for skill in SKILLS_DATABASE
        if skill not in found_skills
    ]

    # Calculate dynamic score
    score = calculate_score(
        resume_text,
        found_skills
    )

    return {
        "score": score,
        "skills": found_skills,
        "missing_skills": missing_skills,
        "message": "Resume analyzed successfully"
    }