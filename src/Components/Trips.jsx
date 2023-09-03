import React from 'react';
import '../assets/triprender.css'
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import SpinRotate from "../utils/SpinRotate"
import useRequest from "../services/useRequest"

const TripList = (props) => {

    const {loading}= useRequest()

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/home");
      };

  

    if (!props.trips.length) {

        return (
            
            <div className='trip-list'>
                <div className='trips-title'>
                    <div>
                       <button className="icon-cross" />
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

    return (
        <>
            <div className='trip-list'>
                <div className='trips-title'>
                    <div>
                        <RxCrossCircled className="icon-cross" onClick={navigateToLogin} />
                    </div>
                    <div>
                        <h1 className='details-title'> Detalle de viajes </h1>
                    </div>
                </div>
                { loading ? <SpinRotate/> :

                <div className='conteiner-trips'>
                    <div className='mini-conteiner-trip'>{props.trips.map(trip => (
                        <li className='title-trip_id' key={trip.trip_id}>
                            <div className='mini-conteiner-trip2'>
                                <p className='trip'>Viaje id: {trip.trip_id} </p>
                                <p className='date-trip'>Fecha y Hora: {new Date(trip.start_date).toLocaleString('es-ES')}
                                </p>
                            </div>
                        </li>
                    ))}
                    </div>
                </div>}
            </div>

            {/* <div className="trip-list">
            <div>
                <h1 className="title-history"><b>Historial de Viajes</b></h1>
            </div>
            {trips.map(trip =>(
            
            <div className='bigconteiner-trip' key={trip.id}>
                    <h2 className='date'>Identificador de Viaje {trip.trip_id}</h2>
                    <div className="history-container">
                        <div className="trip-title">
                            <div className='trip'><p className='date-title'>Fecha y hora</p>{trip.start_date}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div> */}
        </>
    );
};

export default TripList;