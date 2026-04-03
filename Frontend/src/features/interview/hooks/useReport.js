import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportById,
  generateResumePdf,
} from "../services/report.api.js";
import { useContext, useEffect } from "react";
import { reportContext } from "../report.context.jsx";
import { useParams } from "react-router-dom";

//manages all report related logic
export const useReport = () => {
  //pull global state
  const context = useContext(reportContext);
  const { interviewId } = useParams();

  if (!context) {
    throw new Error("useInterview must be used within a ReportProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

    //generate report 
  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);
    let response = null;

    try {
      response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      if (!response || !response.interviewReport) {
        throw new Error("Invalid API response");
      }

      setReport(response.interviewReport);
    } catch (error) {
      console.log("Generate Report Error:", error);
      return null; // IMPORTANT
    } finally {
      setLoading(false);
    }

    return response.interviewReport;
  };

  //fetch report by id
  const getReportById = async (interviewId) => {
    setLoading(true);
    let response = null;
    try {
      response = await getInterviewReportById(interviewId);
      if (!response || !response.interviewReport) {
        throw new Error("Failed to fetch report by Id");
      }
      setReport(response.interviewReport);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response.interviewReport;
  };

  //fetch all reports
  const getReports = async () => {
    setLoading(true);
    let response = null;
    try {
      response = await getAllInterviewReports();
      if (!response || !response.interviewReport) {
            throw new Error("Failed to fetch all reports")
        }
      setReports(response.interviewReports);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    return response.interviewReports;
  };

  const getResumePdf = async (interviewReportId) => {
    setLoading(true);
    let response = null;
    try {
      response = await generateResumePdf({ interviewReportId });
      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewReportId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getReports();
    }
  }, [interviewId]);

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
  };
};
