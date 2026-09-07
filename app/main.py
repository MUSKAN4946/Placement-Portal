from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import engine, Base
from app.models.user import User
from app.routes.auth import router as auth_router
from app.routes.resume import router as resume_router
from app.routes.jobs import router as jobs_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(jobs_router)


@app.get("/")
def home():
    return {
        "message": "Placement Portal Running Successfully"
    }