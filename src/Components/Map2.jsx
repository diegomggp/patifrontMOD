import { useMemo, useRef} from "react";
import Map, {GeolocateControl} from "react-map-gl"
import { useTripContext } from "../context/tripContext";
import Marks from "./Mapcomponents/Marks";
import RouteLayer from "./Mapcomponents/RouteLayer";
import TenMinLayer from "./Mapcomponents/TenMinLayer"
import {types} from "../utils/bookReducer"
import "../assets/Map.css"
import { useCallback } from "react";

const Map2= () => {
    const map2ref= useRef()
    const geoControl= useRef()
    const {bookState, handleContext}= useTripContext()

    const initialViewState ={
            latitude: 40.4,
            longitude: -3.68,
            zoom:12,
        }
        
        // centra la vista al pulsar un mark.
        
    const centerView = useCallback((e) => {
        map2ref.current?.flyTo(
            { center: [e.lng, e.lat], zoom:15, duration: 2000 });
        const payload = {
            scooter: e,
            isSelected: true
        }
        handleContext(types.updateMany, payload)
        },[])
        
// Actualiza la posición del usuario para usarla en eventos
    const currentPos= (e)=>{
        const [lng, lat]= bookState.userPosition
        //La comparacion evita peticiones dobles en layer y re renderizados.
        if(lng !== e.longitude || lat !== e.latitude ){
            const dataPosition = [e.longitude, e.latitude]
            handleContext(types.updateUserPosition, dataPosition )
        }

    }
    // Activa automáticamente la ubicación
    const activeControl= ()=>{
        if(geoControl){
            if(!geoControl.current) return
        geoControl.current.trigger()}

    }

    return (
        <div className="Map">
            <Map
            reuseMaps
            ref={map2ref}
            initialViewState= {initialViewState}
            mapStyle={"mapbox://styles/mapbox/streets-v9"}
            mapboxAccessToken= {process.env.REACT_APP_MAP_PUBLIC_TOKEN}
            cursor="auto"
            // activa la geolocalizacion al cargar el mapa directamente
            onLoad={activeControl}
            >
                {/* Geolocalizacion con funcion para usar de trigger por cercania */}
                <GeolocateControl position="top-right"
                    trackUserLocation="true"
                    ref= {geoControl}
                    onGeolocate={e=>currentPos(e.coords)}
                    showAccuracyCircle="false" 
                    />
                <Marks onClick={centerView}/>
                <TenMinLayer/>
                <RouteLayer/>
            </Map>
        </div>
    )
}

export default Map2