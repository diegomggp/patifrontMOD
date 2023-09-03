import axios from 'axios';
import tripAPI from '../services/tripsAPI'
import React, { useState, useEffect } from 'react'
// import { color } from '@mui/system';
// import Trip from './Trip';
import TripList from './Trips';
import '../assets/triprender.css'


const AllUsers = () => {

    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const getAllTrip = async () => {
            const id = localStorage.getItem('id')
            const response = await tripAPI.getAllTrip(id);
            setTrips(response);
        }
        getAllTrip();
    }, [])


    return (
        <>  
        <TripList trips={trips} />
        </>

    )
}

export default AllUsers;