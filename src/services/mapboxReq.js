import axios from "axios";


const mapboxReq ={
    url: "https://api.mapbox.com/",
    token: process.env.REACT_APP_MAP_PUBLIC_TOKEN,

    async getDirection(lng, lat){
        return await axios.get(`${this.url}geocoding/v5/mapbox.places/${lng},${lat}.json?limit=1&types=address&language=es&access_token=${this.token}`)
    },
    async getRoute(userLng, userLat, scooterLng, scoooterLat){
        return await axios.get(`${this.url}directions/v5/mapbox/walking/${userLng},${userLat};${scooterLng},${scoooterLat}?alternatives=false&geometries=geojson&overview=simplified&access_token=${this.token}`)
    },
    async getIso(lng, lat){
        return await axios.get(`${this.url}isochrone/v1/mapbox/walking/${lng},${lat}?contours_minutes=11&polygons=true&access_token=${this.token}`)
    }

}
export default mapboxReq