import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

const useLoc= ()=> {
    const [lat, setLat]=useState()
    const [lng, setLng]= useState()
    const [error, setError]= useState()

    const handleLoc= useCallback( (e)=> {
        setLat(e.coords.latitude);
        setLng(e.coords.longitude);
    },[])
    const handleError= (error)=> {
        setError(error)
    }
    // // Genera errores usar el useLayout o useEffect
    useEffect(()=> {
        if (!navigator.geolocation) 
            return setError("No hay ubicacion disponible")
        navigator.geolocation.getCurrentPosition(
            handleLoc,
             handleError,
            { enableHighAccuracy: true,}
             )
    },[]) 
    // useEffect( ()=>{
    // if(!navigator.geolocation){
    //     return setError( "No hay ubicacion disponible")
    // }
    // const watchLoc= navigator.geolocation.watchPosition(
    //     handleLoc,
    //     handleError,
    //     { enableHighAccuracy: true,
    //     });
    // return (
    // () => navigator.geolocation.clearWatch(watchLoc))
    // },[])

    return {
        lat,
        lng,
        error
    }
} 

export default useLoc