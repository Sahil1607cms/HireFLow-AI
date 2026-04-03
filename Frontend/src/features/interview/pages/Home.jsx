import React, { useState, useRef } from "react";
import { useReport } from "../hooks/useReport.js";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast,Bounce } from "react-toastify";

const Home = () => {
  const { loading, generateReport, reports } = useReport();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resume, setResume] = useState(null);

  const resumeInputRef = useRef();
  const navigate = useNavigate();

  const isReady = resume && jobDescription.trim().length > 0;

  const handleGenerateReport = async (e) => {
    e.preventDefault();

    if (!isReady) return;

    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile: resume,
    });

    if (!data) {
      alert("Report generation failed");
      return;
    }

    navigate(`/report/${data._id}`);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-indigo-500 mb-4" size={50} />
        <p className="text-slate-500 text-lg">
          Generating your interview strategy...
        </p>
      </main>
    );
  }

  return (
    <div className="px-4 py-10 bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="text-center mb-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold text-slate-800">
          Create Your Custom{" "}
          <span className="text-indigo-500">Interview Plan</span>
        </h1>
        <p className="text-slate-500 mt-2">
          Let AI analyze the job requirements and your profile.
        </p>
      </header>

      {/* Main Card */}
      <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="grid md:grid-cols-2">
          {/* LEFT */}
          <div className="p-6 border-r border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-sm font-semibold text-slate-700">
                Target Job Description
              </h2>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                Required
              </span>
            </div>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-48 p-3 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:ring-2 focus:ring-indigo-400 focus:bg-white"
              placeholder="Paste job description..."
              maxLength={5000}
            />

            <p className="text-xs text-slate-400 mt-2">
              {jobDescription.length} / 5000 chars
            </p>
          </div>

          {/* RIGHT */}
          <div className="p-6 space-y-6">
            {/* Resume Upload */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Upload Resume
              </label>
              <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                Required
              </span>

              {!resume ? (
                <label
                  htmlFor="resume"
                  className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg p-6 cursor-pointer hover:border-indigo-400 bg-slate-50"
                >
                  <p className="text-sm text-slate-600">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    PDF or DOCX (Max 5MB)
                  </p>

                  <input
                    ref={resumeInputRef}
                    hidden
                    type="file"
                    id="resume"
                    accept=".pdf,.docx"
                    onChange={(e) => setResume(e.target.files[0])}
                  />
                </label>
              ) : (
                <div className="mt-2 flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-sm text-slate-700 truncate">
                    {resume.name}
                  </span>
                  <button
                    onClick={() => {
                      setResume(null);
                      resumeInputRef.current.value = "";
                    }}
                    className="text-red-500 text-xs hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* OR */}
            <div className="text-center text-xs text-slate-400">OR</div>

            {/* Self Description */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Quick Self-Description (Optional)
              </label>

              <textarea
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                className="w-full mt-2 p-3 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:ring-2 focus:ring-indigo-400 focus:bg-white"
                placeholder="Describe your experience..."
              />
            </div>

            {/* Info */}
            <div className="bg-indigo-50 text-indigo-600 text-xs p-3 rounded-lg border border-indigo-100">
              Resume is required. Self description is optional.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-t border-slate-200 gap-3">
          <span className="text-xs text-slate-400">
            AI-Powered Strategy Generation • ~30s
          </span>

          <button
            onClick={handleGenerateReport}
            disabled={!isReady}
            className={`text-sm px-5 py-2 rounded-lg transition
              ${
                isReady
                  ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
          >
            Generate My Interview Strategy
          </button>
        </div>

        {!isReady && (
          <p className="text-xs text-slate-400 text-center pb-4">
            Upload resume and add job description to continue
          </p>
        )}
      </div>

      {/* Recent Reports */}
      {reports.length > 0 && (
        <section className="max-w-5xl mx-auto mt-10">
          <h2 className="text-lg font-semibold mb-4 text-slate-800">
            My Recent Interview Plans
          </h2>

          <div className="space-y-3">
            {reports.map((report) => (
              <div
                key={report._id}
                onClick={() => navigate(`/interview/${report._id}`)}
                className="p-4 bg-white border border-slate-200 rounded-lg cursor-pointer hover:shadow-sm"
              >
                <h3 className="font-medium text-slate-800">
                  {report.title || "Untitled Position"}
                </h3>

                <p className="text-xs text-slate-500">
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>

                <p className="text-sm text-indigo-500">
                  Match Score: {report.matchScore}%
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;