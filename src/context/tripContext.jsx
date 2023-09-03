import { createContext, useContext, useReducer } from "react";
import bookReducer, {initialStateBook} from "../utils/bookReducer";

const TripContext = createContext()
export const TripWrapper = ({ children }) => {
    const [bookState, dispatch]= useReducer(bookReducer, initialStateBook) 

    const handleContext= (typeDispatch, payloadDispatch)=>{
        dispatch({
                type: typeDispatch,
                payload: payloadDispatch
                })}

    return (
        <TripContext.Provider value={({
            bookState,
            handleContext,
        })}>
            {children}
        </TripContext.Provider>
    )

}
export function useTripContext() {
    return useContext(TripContext)
}