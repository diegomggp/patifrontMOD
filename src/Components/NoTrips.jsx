import { useNavigate, Link } from "react-router-dom"
import { useAppContext } from "../context/context";
import { useState } from 'react';
import axios from 'axios';
import '../assets/HistoryKm.css'
import { RxCrossCircled } from "react-icons/rx";

const NoTrips = () => {

    return (
        <div className='trip-list'>
        <div className='trips-title'>
        <div>
            <RxCrossCircled className="icon-cross" />
        </div>
        <div>
            <h1 className='details-title'> Detalle de viajes </h1>
            </div>
        </div>
        <div className='conteiner-trips'>
            <div className='mini-conteiner-trip'>
                <li className='title-trip_id'>
                    <div className='mini-conteiner-trip2'>
                    <p className='trip'>Viaje id: No hay viajes registrados </p>
                    <p className='date-trip'>Fecha y Hora: No hay viajes registrados
                    </p>
                    </div>
                </li>
            
            </div>
        </div>
        </div>


    )
}

export default NoTrips