import { Outlet } from "react-router-dom"
import { useEffect } from "react";
import { TripWrapper } from '../context/tripContext';
import { useClientContext } from "../context/clientDataContext";
import BookingPopup from './BookingPopup';
import Map2 from './Map2';
import AsideMenu from "./AsideMenu";
import TripInterface from './TripComponents/TripInterface.jsx';

const Home = () => {

    const { getUserData, userData, getClientData, clientData } = useClientContext();

    useEffect(() => {
        const getContext = async () => {
            await getUserData();
            await getClientData();
        };
        getContext();
    }, [])
    return (
        <>
            <TripWrapper>
                <AsideMenu />
                 <Map2 />
                <BookingPopup/>
                <TripInterface />
                <Outlet/>
            </TripWrapper>
        </>
    )
}

export default Home

