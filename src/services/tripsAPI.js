import axios from "axios";

class tripsAPI{

   static async getAllTrip(id) {
        const requestUrlTrip = `${process.env.REACT_APP_BASE_URL}/trip/${id}`;
        try {
            const response = await axios.get(requestUrlTrip);
            return response.data
        }
        catch (error) {  
            console.error(error);
            return error.response.data;
        }
    }

}

export default tripsAPI;