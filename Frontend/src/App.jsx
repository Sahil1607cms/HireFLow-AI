import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { ReportProvider } from "./features/interview/report.context.jsx";
import { ToastContainer } from "react-toastify";


const App = () => {
  return (
    <div>
        <AuthProvider>
          <ReportProvider>
            <RouterProvider router={router} />
          </ReportProvider>
        </AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
