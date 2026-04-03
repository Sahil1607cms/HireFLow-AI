import { createContext,useState } from "react";

//creating a global container that stores all data
export const reportContext = createContext()

export const ReportProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState(null)
    const [reports, setReports] = useState([])

    return (
        // all wrapped components can access these data 
        <reportContext.Provider value={{ loading, setLoading, report, setReport, reports, setReports }}>
            {children}
        </reportContext.Provider>
    )
}

//imported at app jsx to wrap the children components so they have access to all the data required whenever needed 
export default ReportProvider