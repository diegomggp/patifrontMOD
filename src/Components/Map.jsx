import mapboxgl from 'mapbox-gl';
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import Marks from "../utils/Marks.json"
import "../assets/Map.css"



const Map= ()=> {
    mapboxgl.accessToken = process.env.REACT_APP_MAP_PUBLIC_TOKEN
    const mapContainer = useRef(null);
    const map= useRef(null)
    const [lng, setLng] = useState(-3.6862);
    const [lat, setLat] = useState(40.4);
    const [zoom, setZoom] = useState(11);

    useEffect(() => {
         map.current = new mapboxgl.Map({   /* creamos el mapa modificando el map->useref *previene recargas*/
            container: mapContainer.current, /* le decimos el contenedor HTML que tendra el map */
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        if (!map.current) return; // Si no existe el mapa no hace nada
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
        Marks.features.map((feature) =>
            new mapboxgl.Marker(
            ).setLngLat(feature.geometry.coordinates).setPopup(new mapboxgl.Popup().setHTML(
                "<h1>Madrid central</h1>"
                )).addTo(map.current)
        );
        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    },[]);

    return(
        <div>
            <div className="Map-div--sidebar">
                <p className='Map-p'>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</p>
            </div>
            <div ref={mapContainer} className="Map">
            </div>
        </div>
    )


}


export default Map