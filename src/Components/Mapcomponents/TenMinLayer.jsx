import {memo, useState, useEffect, useCallback} from "react"
import { useTripContext } from "../../context/tripContext"
import { Source ,Layer } from "react-map-gl"
import useRequest from "../../services/useRequest"


const TenMinLayer = memo(()=>{
    const {bookState:{userPosition, isSelected, onTrip, isBooked}}= useTripContext()
    const [layer, setLayer]= useState(false)
    const {getIso}= useRequest()

    useEffect(()=>{ 
        if (userPosition.length && !isSelected){
            const updateIso = async () => {
                    const [lng, lat] = userPosition;
                    const payload = await getIso(lng, lat);
                    setLayer(payload)
                };
            updateIso()
        }
    }, [userPosition, onTrip])

    const layerStyle = {
        id: '10MinLayer',
        type: 'fill',
        paint: {
            "fill-opacity": 0.20,
            "fill-color": "#08519c",
            "fill-antialias": true    
        }
    };
    if(!layer || onTrip )
        return 
    if (layer && !onTrip && !isBooked)
    return(
        <Source 
            id="10MinSource"
            type="geojson"
            data={layer}
        >
            <Layer
                {...layerStyle}
                 >
            </Layer>
        </Source>
    )
} )

export default TenMinLayer