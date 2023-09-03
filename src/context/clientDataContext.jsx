import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

 const ClientContext = createContext();

export const ClientDataProvider = ({ children }) => {

    const [clientData, setClientData] = useState(null);
    const [userData, setUserData] = useState(null);

    
    const getClientData = async () => {
        const client_id =  localStorage.getItem('id')
        const res = await axios.get(`${ process.env.REACT_APP_BASE_URL }/client/${client_id}`);
        setClientData(res.data[0]);
    } 

    const getUserData = async () =>{
        const user_id =  localStorage.getItem('id')
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/${user_id}`);
        setUserData(res.data[0]);
    }

  

    return (
        <ClientContext.Provider value={({
            clientData,
            getClientData,
            userData, 
            getUserData,

         })}>

            {children}

        </ClientContext.Provider>
    );
}

export function useClientContext() {
    return useContext(ClientContext);
}
 