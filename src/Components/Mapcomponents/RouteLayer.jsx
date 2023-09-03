import {memo, useState, useEffect, useCallback} from "react"
import { useTripContext } from "../../context/tripContext"
import { Source ,Layer } from "react-map-gl"
import useRequest from "../../services/useRequest"


const RouteLayer = memo(()=>{
    const {bookState:{userPosition, onTrip, isBooked, scooter}}= useTripContext()
    const [route, setRoute]= useState(false)
    const {getRoute}= useRequest()

    useEffect(()=>{ 
        if (userPosition.length && isBooked){
            const updateRoute = async () => {
                    const [lng, lat] = userPosition;
                    const scooterGeometry = scooter
                    const payload = await getRoute(lng, lat, scooterGeometry.lng, scooterGeometry.lat);
                    setRoute(payload)
                };
            updateRoute()
        }
    }, [userPosition, isBooked])

    const layerStyle = {
        id: 'routeLayer',
        type: 'line',
        layout:{
        "line-join" : "round", 
        "line-cap": "round",
        "line-round-limit": 5,
        },
        paint: {
            "line-width": 6,
            "line-opacity": 0.9,
            "line-color": "#31B8B8",
            "line-offset" : 8,
            "line-dasharray":[ .4 , 1.2]  
        }
    };
    if(!route || onTrip || !isBooked )
        return 
    if (route && !onTrip && isBooked)
    return(
        <Source 
            id="routeSource"
            type="geojson"
            data={route.geometry}
        >
            <Layer
                {...layerStyle}
                 >
            </Layer>
        </Source>
    )
} )

export default RouteLayer