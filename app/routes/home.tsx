import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Jobsy" },
    { name: "description", content: "Welcome to Your Resume Buddy!" },
  ];
}

export default function Home() {
  return (
    <main>
      <section className="main-section">
        <div className="page-heading">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review your submission and check AI-powered feddback</h2>
        </div>
      </section>
    </main>
  );
}
