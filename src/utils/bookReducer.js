const initialStateBook= {
    isSelected: false,
    isBooked: false ,
    scooter: {},
    userPosition: [],
    onTrip: false,
    trip: {
        booking_id: "",
        trip_id: "",
        booking_code:""
    },
    invoice: false
}

const types= {
    resetState: "reset",
    selectScooter: "select",
    bookScooter: "booking",
    scooterInfo: "scooter",
    updateUserPosition: "updatePosition",
    updateMany: "updateMany",
    trip: "trip",
    updateTripData: "tripData",
    invoice: "payment"
}

const bookReducer= (state, action)=> {
        switch (action.type){
            default: 
                return state;
            case "reset":
                return {...initialStateBook,
                        userPosition: state.userPosition}
            case "select":
                return {
                    ...state,
                    isSelected: action.payload
                }
            case "booking":
                return {
                    ...state,
                    isBooked: action.payload
                }
            case "scooter":
                return {
                    ...state,
                    scooter: action.payload
                }
            case "updatePosition":
                return{
                    ...state,
                    userPosition: action.payload
                }
            case "updateMany":
                return{
                    ...state,
                    ...action.payload
                }
            case "trip":
                return{
                    ...initialStateBook,
                    userPosition: state.userPosition,
                    scooter: state.scooter,
                    onTrip: action.payload,
                    trip:{ ...state.trip}
            }
            case "tripData":
                return {
                    ...state,
                   trip: {
                    ...state.trip,
                    ...action.payload
                   }
                }
            case "payment":
                return{
                    ...initialStateBook,
                    userPosition: state.userPosition,
                    invoice: action.payload
            }
        }
}

export {types, initialStateBook}
export default bookReducer