import { useState, memo, useEffect } from "react"
import { Marker } from "react-map-gl"
import { useTripContext } from "../../context/tripContext"
import { useAppContext } from "../../context/context";
import useRequest from "../../services/useRequest"

const Marks= memo(({onClick})=>{
    const {handleError} = useAppContext()
    const {bookState} = useTripContext()
    const {getNearbyScooters}= useRequest()
    const [marksData, setMarksData]= useState(false)

   

    useEffect(()=>{
        const getScooters = async()=>{
            if(bookState.onTrip || bookState.isSelected){
                return false
            }
            const [lngUser, latUser] = bookState.userPosition;
            try{
                const marks = await getNearbyScooters( lngUser, latUser)
                setMarksData(marks)
                
            }catch(error){
                setMarksData(false)
                handleError(error.message)
            }
        };
        if(bookState.userPosition.length !== 0){
            getScooters()
        }

        },[bookState.userPosition , bookState.onTrip])


    if (!marksData || bookState.onTrip) return ;
    // Si Esta activa una reserva, solo muestra esa Marca
    if (bookState.isBooked && bookState.scooter)
        return (
            <Marker
                key={bookState.scooter.scooter_id}
                longitude={bookState.scooter.lng}
                latitude={bookState.scooter.lat} >
                <img className="Marker-icon2" src="/Patinete Logo azul.png" alt="logo Bear"></img>
            </Marker>
        )
    // Todas las Marcas
    if(marksData.features)
    return(
        <>
        {marksData.features?.map((point) =>
            <Marker
                key={point.scooter_id}
                longitude={point.lng}
                latitude={point.lat}
                onClick={() => onClick(point)} >
                    {/* <div className="Mark-div"> */}
                <img className="Marker-icon" src="/Patinele Logo normal.png" alt="logo Bear"></img>
                {/* </div> */}
            </Marker>)
        }
        </>
    )
})

export default Marks