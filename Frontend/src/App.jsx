import React from "react";
import {RouterProvider } from "react-router-dom";
import { router } from "./app.routes.jsx";
import {AuthProvider} from "./features/auth/auth.context.jsx";
import {ReportProvider} from "./features/interview/report.context.jsx";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AuthProvider>
      <ReportProvider>
        <RouterProvider router={router} />
      </ReportProvider>
        
      
    </AuthProvider>
    </div>
  );
};

export default App;
