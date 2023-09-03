import axios from "axios";

class tripsAPI{

   static async getAllTrip() {
        const requestUrl = `${process.env.REACT_APP_BASE_URL}/trip`;
        try {
            const response = await axios.get(requestUrl);
            return response.data
        }
        catch (error) {  
            console.error(error);
            return error.response.data;
        }
    }

}

export default tripsAPI;