import { useCallback, useEffect, useState } from "react"
import { useTripContext } from "../context/tripContext"
import { useAppContext } from "../context/context"
import { types } from "../utils/bookReducer"
import { IoMdUnlock } from "react-icons/io";
import { useClientContext } from "../context/clientDataContext";
import useRequest from "../services/useRequest"
import "../assets/Trip.css"
import SpinRotate from "../utils/SpinRotate"
import DragBar from "./auxiliar/DragBar";

const Trip = ({cancelTime})=>{
    const {bookState:{userPosition, scooter, isBooked, isSelected, trip}, handleContext} = useTripContext()
    const { handleError } = useAppContext()
    const { clientData } = useClientContext();
    const {loading, confirmBooking, bookingScooter}= useRequest()
    const [isInZone, setIsInZone]= useState(false)
    // const [hiding, setHiding]= useState(false)
    const [lngUser, latUser] = userPosition;
    // Funcion para que cuando este a menos de 20 metros se active el pop up.
    const isLessThan20Meters= useCallback(()=>{ 
        if (scooter.lng && isSelected){
            const { lng, lat } = scooter;
            const pitagoricDistanceBetween= Math.sqrt(((lngUser-lng)**2)+((latUser-lat)**2));
            const twentyMeters= 0.00150 
            if(pitagoricDistanceBetween < twentyMeters){
                setIsInZone(true)
            }
            else {
                setIsInZone(false)
            }
            }
        if(!isSelected) 
            setIsInZone(false)
    })
    
    useEffect(()=>{
        isLessThan20Meters()
    },[userPosition, isSelected, isBooked])

    useEffect(()=>{
        if (!isBooked)
        setIsInZone(false)
    }, [isBooked])



    const handleSubmit= async ( id= false)=>{
        let booking_id = id
        if (id=== false){ booking_id = trip.booking_id}
        try{
            const data= await confirmBooking({booking_id ,lngUser, latUser})
            const payload= {
                trip_id: data.trip_id
            }
            handleContext(types.updateTripData, payload)
                handleContext(types.trip, true);
                cancelTime(true);
        }catch(error){
            handleError("ups, no pudimos confirmar tu viaje, parece que hemos tenido un error")
        }
        
    }

    const bookWithoutReserve= async ()=>{
        const id_user = clientData.client_id
        const body = {
            id_user,
            id_scooter: scooter.scooter_id
        }
        try {
            const data = await bookingScooter(body);
            const payload = {
                booking_id: data.data.booking_id,
                booking_code: data.code
            }
            handleContext(types.updateTripData, payload)
            handleContext(types.bookScooter, true);
            return data.data.booking_id
        } catch (error) {
            handleError("ups, parece que no pudimos confirmar la reserva de esta scooter")
        }
    }
    const handleWithoutReserve= async ()=>{
        const reserve = await bookWithoutReserve()
        await handleSubmit(reserve)
    }

     
    if (isInZone){
        return(
            <div onClick={ isBooked ? null : handleWithoutReserve} 
                        className="Trip-form">
                        {isBooked ? <DragBar action={handleSubmit}/> : loading ? <SpinRotate /> : <button type="submit" className="Trip-btn Trip-btn--Booking">
                        <IoMdUnlock className="Trip-btn--icon"/>
                        Desbloquear</button>}
                        
                    
            </div>
            // <div onClick={ isBooked ? handleSubmit : handleWithoutReserve} 
            //             className="Trip-form">
            //             {loading ? <SpinRotate /> : <button type="submit" className="Trip-btn Trip-btn--Booking">
            //             <IoMdUnlock className="Trip-btn--icon" />
            //             Desbloquear</button>}
                    
            // </div>
        )
    }
    if (!isInZone)
    return (
        <div  className="Trip-div-main--NoBooking">
            { isBooked ? <DragBar isDisabled={true}/> :  
            <button className="Trip-btn Trip-btn--NoBooking" type="button">
                <IoMdUnlock className="Trip-btn--icon"/>
                Desbloquear
            </button>}

        </div>

    )
}

export default Trip