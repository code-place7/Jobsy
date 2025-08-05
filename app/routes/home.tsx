import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Jobsy" },
    { name: "description", content: "Welcome to Your Resume Buddy!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumess, setResumess] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumess = (await kv.list("resume:*", true)) as KVItem[];

      const parsedResumes = resumess?.map(
        (resume) => JSON.parse(resume.value) as Resume
      );

      setResumess(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review your submission and check AI-powered feedback</h2>
        </div>
        <div className="resumes-section">
          {resumes.length > 0 && (
            <div className="resumes-section">
              {resumes.map((resume: Resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          )}
        </div>
      </section>

      {loadingResumes && (
        <div className="flex flex-col items-center justify-center">
          <img src="/images/resume-scan-2.gif" className="w-[200px]" />
        </div>
      )}
      {!loadingResumes && resumess.length > 0 && (
        <div className="resumes-section">
          {resumess.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
      {!loadingResumes && resumes?.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-10 gap-4">
          <Link
            to="/upload"
            className="primary-button w-fit text-xl font-semibold"
          >
            Upload Resume
          </Link>
        </div>
      )}
    </main>
  );
}
