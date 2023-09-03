import axios from "axios"

const serverReq= {
    url: process.env.REACT_APP_BASE_URL,

    async nearbyScooters(lng, lat, token){
        return await axios.get(`${this.url}/scooters/available/${lng},${lat}?token=${token}`)
    },
    async bookingScooter(body, token) {
        return await axios.post(`${this.url}/booking?token=${token}`, body)
    },
    async confirmBooking(booking_id, body, token) {
        return await axios.post(`${this.url}/booking/${booking_id}?token=${token}`, body)
    },
    async finishTrip(trip_id, body, token) {
        return await axios.post(`${this.url}/trip/${trip_id}?token=${token}`, body)
    },
    async cancelBooking(id_scooter,token){
        return await axios.post(`${this.url}/scooters/status/${id_scooter}?token=${token}`)
    }

}

export default serverReq