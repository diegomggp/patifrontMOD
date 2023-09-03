import { useEffect } from "react"
import { useAppContext } from "../context/context"
import { useTripContext } from "../context/tripContext"
import { useClientContext } from "../context/clientDataContext"
import {types} from "../utils/bookReducer"
import useCountdown from "../utils/useCountdown"
import useRequest from "../services/useRequest"
import "../assets/BookingButton.css"
import SpinRotate from "../utils/SpinRotate"

const BookingButton = ({ isInZone, cancelTrip })=>{
    const {bookState:{isBooked, scooter} , updateBook, handleContext}= useTripContext()
    const { handleError } = useAppContext()
    const { clientData } = useClientContext();
    const timeToReachScooter= 600
    const { timeLeft, init, cancel, outOfTime }= useCountdown(timeToReachScooter)
    const {bookingScooter, cancelBooking, loading}= useRequest()

    // Cuando llegue a 0 el contador se ejecuta el useEffect
    useEffect(()=>{
        if(outOfTime){
        handleContext(types.bookScooter, false)
        // updateBook()
        handleCancel()
        cancelTrip(false)
        }
    },[outOfTime])
    //  al aceptar el componente trip se reinicia todo
    useEffect(()=>{
        if(isInZone === true){
            cancel()
            handleContext(types.bookScooter, false)
            // updateBook()
            cancelTrip(false)
        }
    }, [isInZone])

    const handleBooking= async ()=>{
        // TODO pendiente cambiar user_id por el user del contexto
        const id_user= clientData.client_id
        const body= {
            id_user,
            id_scooter: scooter.scooter_id
        }
        try{
            const data= await bookingScooter(body);
            const payload= {
                booking_id: data.data.booking_id,
                booking_code: data.code
                }
            handleContext(types.updateTripData, payload)
            handleContext(types.bookScooter, true);
            init()
        }catch(error){
            handleError("ups, parece que no pudimos confirmar la reserva de esta scooter")
        }
    }
    const handleCancel= async ()=> {
        const id= scooter.scooter_id
        const payload = {
            booking_id: "",
            booking_code: ""
        }
        try {
            const data = await cancelBooking(id);
            cancel();
            if(isBooked){  
                handleContext(types.bookScooter, false)
                handleContext(types.updateTripData, payload)
            }
            cancelTrip()
        } catch (error) {
            handleError("ups, parece que no pudimos cancelar esta reserva")
        }
    }

   
       
    // dos tipos de botones, para reservar y para cancelar la reserva

    if(!isBooked && !outOfTime)
        return(
            <div className="BookingButton-div">
                { loading ? <SpinRotate/> :
                <button className="BookingButton-button" onClick={handleBooking}>
                    Reservar
                </button>}
            </div>
    )
    if(isBooked || outOfTime)
        return(
            <div className="BookingButton-div">
                { loading ? <SpinRotate/> :
                    <button className= {`BookingButton-button BookingButton-button--cancel ${outOfTime && "isBlinking"}`} 
                onClick={handleCancel}
                    >
                        <h5>{timeLeft}</h5>
                        <h5>Cancelar</h5>
                </button>}
            </div >
        )
}

export default BookingButton