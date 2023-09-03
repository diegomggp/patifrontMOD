import { useState} from "react";
import { Link } from "react-router-dom"
import { useTripContext } from "../context/tripContext";
import { CgMenu, CgTime, CgCreditCard  } from "react-icons/cg";
import { IoLockClosedOutline } from "react-icons/io5";
import {IoMdHelpCircleOutline } from "react-icons/io";
import {useClientContext} from "../context/clientDataContext"
import { SlSettings } from "react-icons/sl";
import Logout from "./Logout";
import "../assets/AsideMenu.css"


const AsideMenu= ()=>  {
    const {bookState:{isBooked}} = useTripContext()
    const [toggle, setToggle]= useState(false)
    const {userData, clientData } = useClientContext();

    
    const handleToggle=()=>{
        setToggle(!toggle)
    }

        return(
            <div className={`AsideMenu-div ${toggle && "isActive"}`}>
                <CgMenu className={`AsideMenu-icon--Menu ${toggle && "isActive"}`} onClick={handleToggle} />
                {/* {isBooked && <h2 className="AsideMenu-h2 AsideMenu-h2--booked">Scooter Reservada</h2> } */}
                <div className={`AsideMenu-div--Background ${toggle && "isActive" }`} onClick={handleToggle}>
                    </div>
                 <div className={`AsideMenu ${toggle && "isActive" }`}>
                    <h1 className="AsideMenu-h1">SPEEDY</h1>
                    <h2 className="AsideMenu-h2">Hey, { userData?.user_name|| "nombre"}</h2>
                    
                    <div className="AsideMenu-div-body">
                        <div className="AsideMenu-div--header">
                            {/* <Link to="/kilometros" className="AsideMenu-Link--headericon"> */}
                            <div className="AsideMenu-div-headericon">
                                <p> Crédito disponible</p>
                                <h4 className="AsideMenu-h4--header">{parseFloat(clientData?.balance).toFixed(2)}€</h4>
                            </div>
                            {/* </Link> */}
                            <Link to="/home/forma_pago" className="AsideMenu-Link--headericon">
                            <div className="AsideMenu-div-headericon">
                                <button type="button"
                                className="AsideMenu-btn">Añadir</button>
                            </div>
                            </Link>

                        </div>
                    <Link to="/home/all-trips" className="AsideMenu-link">
                    <div className="AsideMenu-div--link"> <CgTime className="AsideMenu-icon" />
                        <h4 className="AsideMenu-h4">Historial</h4> </div>
                     </Link> 
                        <Link to="/home/paymentform" className="AsideMenu-link">

                    <div className="AsideMenu-div--link"><CgCreditCard className="AsideMenu-icon" />
                            <p className="AsideMenu-h4">Forma de Pago</p></div>
                         </Link>
                    {/* <Link to="/ayuda" className="AsideMenu-link"> */}
                    <div className="AsideMenu-div--link"><IoMdHelpCircleOutline className="AsideMenu-icon" />
                            <h4 className="AsideMenu-h4">Ayuda</h4></div>
                    {/* </Link> */}
                    {/* <Link to="/seguridad" className="AsideMenu-link"> */}
                    <div className="AsideMenu-div--link"><IoLockClosedOutline className="AsideMenu-icon"/>
                        <h4 className="AsideMenu-h4">Centro de Seguridad</h4></div>
                    {/* </Link> */}
                    {/* <Link to="/ajustes" className="AsideMenu-link"> */}
                    <div className="AsideMenu-div--link"><SlSettings className="AsideMenu-icon" />
                        <h4 className="AsideMenu-h4">Ajustes</h4></div>
                    {/* </Link> */}

                    <Logout/>
                </div>
                </div>
          
            </div>
        )


}

export default AsideMenu