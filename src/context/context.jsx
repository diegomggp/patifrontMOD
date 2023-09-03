import { createContext, useContext, useState, useEffect } from "react";


const AppContext = createContext()

export const AppWrapper = ({ children }) => {
    const [isLog, setIsLog] = useState(false)
    const [error, setError]= useState(null);

    const handleError= (a)=>{
        setError(a)
    }
    const eraseError=()=>{
        setError(null)
    }

    const log= ()=>{
        setIsLog(true)
    }
    const logout= ()=>{
        setIsLog(false)
    }
 

    return (
        <AppContext.Provider value={    ({
            isLog,
            log,
            logout,
            error,
            handleError,
            eraseError,
 
        })}>
            {children}
        </AppContext.Provider>
    )

}
export function useAppContext() {
    return useContext(AppContext)
}