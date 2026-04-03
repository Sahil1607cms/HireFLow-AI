import { useState, useEffect } from "react";
import { useReport } from "../hooks/useReport.js";
import { useParams } from "react-router";
import {Loader2} from "lucide-react"

export default function Report() {
  const [activeSection, setActiveSection] = useState("technical");
  const [openIndexes, setOpenIndexes] = useState([]);
  const { report, getReportById, loading } = useReport();
  const { id } = useParams();

  const toggle = (index) => {
  setOpenIndexes((prev) => (prev[0] === index ? [] : [index]));
};

  if (loading || !report) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-indigo-500 mb-4" size={50} />
        <p className="text-slate-500 text-lg">Loading your report...</p>
      </main>
    );
  }

  const sectionMap = {
    technical: report.technicalQuestions,
    behavioral: report.behavioralQuestions,
    roadmap: report.preparationPlan,
  };

  const currentList = sectionMap[activeSection];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 p-6">
        <p className="text-xs text-slate-400 mb-4 uppercase">Sections</p>

        {["technical", "behavioral", "roadmap"].map((section) => (
          <button
            key={section}
            onClick={() => {
              setActiveSection(section);
              setOpenIndexes([]);
            }}
            className={`block w-full text-left px-3 py-2 rounded-lg mb-2 transition
              ${
                activeSection === section
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 grid grid-cols-12 gap-8 p-8">
        {/* Center */}
        <div className="col-span-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 capitalize">
            {activeSection}
          </h2>

          <div className="space-y-4">
            {currentList.map((item, i) => {
              const isOpen = openIndexes.includes(i);

              return (
                <div
                  key={i}
                  className="border border-slate-200 rounded-xl bg-white"
                >
                  {/* Header */}
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex justify-between items-start p-4 text-left"
                  >
                    <div className="flex gap-3">
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                        {activeSection === "roadmap"
                          ? `Day ${item.day}`
                          : `Q${i + 1}`}
                      </span>

                      <p className="text-sm text-slate-800">
                        {item.question || item.focus}
                      </p>
                    </div>

                    <span className="text-slate-400">{isOpen ? "▲" : "▼"}</span>
                  </button>

                  {/* Dropdown */}
                  {isOpen && (
                    <div className="px-4 pb-4 border-t border-slate-200 space-y-3">
                      {item.intention && (
                        <div>
                          <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                            INTENTION
                          </span>
                          <p className="text-sm text-slate-600 mt-1">
                            {item.intention}
                          </p>
                        </div>
                      )}

                      {item.answer && (
                        <div>
                          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                            MODEL ANSWER
                          </span>
                          <p className="text-sm text-slate-600 mt-1">
                            {item.answer}
                          </p>
                        </div>
                      )}

                      {item.tasks && (
                        <div>
                          <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                            TASKS
                          </span>
                          <ul className="text-sm text-slate-600 mt-1 list-disc pl-5">
                            {item.tasks.map((t, idx) => (
                              <li key={idx}>{t}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-4 space-y-6">
          {/* Match Score */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
            <p className="text-xs text-slate-400 mb-2 uppercase">Match Score</p>
            <p className="text-4xl font-bold text-indigo-500">
              {report.matchScore}%
            </p>
          </div>

          {/* Skill Gaps */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <p className="text-xs text-slate-400 mb-3 uppercase">Skill Gaps</p>

            <div className="flex flex-wrap gap-2">
              {report.skillGaps.map((gap, i) => {
                const colorMap = {
                  low: "bg-green-50 text-green-600",
                  medium: "bg-yellow-50 text-yellow-600",
                  high: "bg-red-50 text-red-600",
                };

                return (
                  <span
                    key={i}
                    className={`px-3 py-1 text-xs rounded-full ${colorMap[gap.severity]}`}
                  >
                    {gap.skill}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
