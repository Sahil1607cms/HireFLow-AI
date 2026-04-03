import React, { useState, useRef } from "react";
import { useReport } from "../hooks/useReport.js";
import { useNavigate } from "react-router-dom";
import {Loader2} from "lucide-react"
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
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Loader2 className="animate-spin text-indigo-600 mb-4" size={50} />
      <p className="text-gray-600 dark:text-gray-300 text-lg">
        Generating your interview strategy...
      </p>
    </main>
  );
}

  return (
    <div className="px-4 py-10">
      {/* Header */}
      <header className="text-center mb-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900">
          Create Your Custom{" "}
          <span className="text-indigo-600">Interview Plan</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Let AI analyze the job requirements and your profile.
        </p>
      </header>

      {/* Main Card */}
      <div className="max-w-5xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm">
        <div className="grid md:grid-cols-2">
          {/* LEFT */}
          <div className="p-6 border-r border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-sm font-semibold text-gray-700">
                Target Job Description
              </h2>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                Required
              </span>
            </div>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-48 p-3 text-sm border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500"
              placeholder="Paste job description..."
              maxLength={5000}
            />

            <p className="text-xs text-gray-400 mt-2">
              {jobDescription.length} / 5000 chars
            </p>
          </div>

          {/* RIGHT */}
          <div className="p-6 space-y-6">
            {/* Resume Upload */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Upload Resume
              </label>
              <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                Required
              </span>

              {!resume ? (
                <label
                  htmlFor="resume"
                  className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-indigo-400 bg-gray-50"
                >
                  <p className="text-sm text-gray-600">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
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
                <div className="mt-2 flex justify-between items-center bg-gray-50 p-3 rounded-lg border">
                  <span className="text-sm text-gray-700 truncate">
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
            <div className="text-center text-xs text-gray-400">OR</div>

            {/* Self Description */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Quick Self-Description (Optional)
              </label>

              <textarea
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                className="w-full mt-2 p-3 text-sm border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe your experience..."
              />
            </div>

            {/* Info */}
            <div className="bg-indigo-50 text-indigo-700 text-xs p-3 rounded-lg">
              Resume is required. Self description is optional.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-t border-gray-100 gap-3">
          <span className="text-xs text-gray-400">
            AI-Powered Strategy Generation • ~30s
          </span>

          <button
            onClick={handleGenerateReport}
            disabled={!isReady}
            className={`text-sm px-5 py-2 rounded-lg transition
              ${
                isReady
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            Generate My Interview Strategy
          </button>
        </div>

        {!isReady && (
          <p className="text-xs text-gray-400 text-center pb-4">
            Upload resume and add job description to continue
          </p>
        )}
      </div>

      {/* Recent Reports */}
      {reports.length > 0 && (
        <section className="max-w-5xl mx-auto mt-10">
          <h2 className="text-lg font-semibold mb-4">
            My Recent Interview Plans
          </h2>

          <div className="space-y-3">
            {reports.map((report) => (
              <div
                key={report._id}
                onClick={() => navigate(`/interview/${report._id}`)}
                className="p-4 bg-white border rounded-lg cursor-pointer hover:shadow-sm"
              >
                <h3 className="font-medium">
                  {report.title || "Untitled Position"}
                </h3>

                <p className="text-xs text-gray-500">
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>

                <p className="text-sm text-indigo-600">
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
