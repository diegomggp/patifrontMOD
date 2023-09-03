import { useTripContext } from "../context/tripContext"
import { useState, useEffect, useCallback } from "react"
import {types} from "../utils/bookReducer"
import { FcChargeBattery } from "react-icons/fc";
import { RiRoadMapLine } from "react-icons/ri";
import { HiOutlineBanknotes } from "react-icons/hi2";
import useBookingButton from "./useBookingButton";
import useRequest from "../services/useRequest"
import Trip from './Trip';
import "../assets/BookingPopup.css" 

const BookingPopup = ()=>{
    const {handleContext, bookState}= useTripContext()
    const [direction, setDirection]= useState(false)
    const [isInZone, setIsInZone] = useState(false)
    const {getDirection}= useRequest()
    const cancelTrip = (state) => { setIsInZone(state) }

    const {Time, CancelBooking , ReservedBtn }= useBookingButton({isInZone, cancelTrip})

    const updateDirection = useCallback(async ()=>{
        if (bookState.scooter.lat){
            const {lng, lat}= bookState.scooter
            try{
                const payload = await getDirection(lng, lat)
                const adress = payload.join(", ")
                setDirection(adress)
            }catch(error){
                setDirection("no hay disponible ninguna dirección")
        }
        }
    })

    useEffect(() => {
        if (direction){
            setDirection(false)}
        if (!direction){
            updateDirection()
        }
    },[bookState.isSelected])



    return (
        <div className={`Bookingpp-div ${(bookState.isSelected & !bookState.onTrip ) && "isActive"}
                             ${bookState.isBooked && "Bookingpp-div--booked"}`  }>
                {!bookState.isBooked && <div className={`Bookingpp-div--background ${bookState.isSelected && "isActive"}`}
                 onClick={()=>handleContext(types.selectScooter, false)}></div>}
                {bookState.scooter &&
                <div className="Bookingpp-div--main">
                    <div className="Bookingpp-div--logo">
                        <div className="Booking-div--logoBack">
                            { !bookState.isBooked ?
                            <img className="Bookingpp-img" src="/patinete.png" alt="Bear logo"></img> :
                            <Time />}
                        </div>
                        <h5 className="Bookingpp-h5--scotterID">
                            Nº {bookState?.scooter.scooter_id}
                        </h5>
                    </div>
                    <div className="Bookingpp-div--info">
                        <div className="Bookingpp-div--prop">
                            <div className="Bookingpp-div--battery">
                            <FcChargeBattery className="Bookingpp-icon--bat"/>
                                <h5 className="Bookingpp-h5--battery"> {`${1.20 * bookState?.scooter.batery} Km`}
                            </h5>
                            </div>
                            <div className="Bookingpp-div--direction">
                                <RiRoadMapLine className="Bookingpp-icon" />
                                <h5> {direction ? direction : "Loading..." }</h5> 
                            </div>
                            <div className="Bookingpp-div--direction">
                                <HiOutlineBanknotes
                                className="Bookingpp-icon" />
                                <h5> 0.25€/min</h5> 
                            </div>
                        </div>
                        <div className="Bookingpp-div--footbtn">
                            <ReservedBtn/>
                            <Trip cancelTime={(state) => { setIsInZone(state) } }/>
                        </div>
                        { !bookState.isBooked ?
                        <p className="Bookingpp-p--footer">Desbloqueo 0,00€ · 0,25€/min</p> :
                        <CancelBooking />}
                    </div>
                </div> }
            </div>
    )


}

export default BookingPopup