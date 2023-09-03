import { useAppContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";

const Logout = () => {

    const {logout}= useAppContext()
 
    const toLogin = useNavigate();


    const logOut = (e) =>{



        try {
            localStorage.removeItem("token");
            logout();
            toLogin("/");

        } catch (err) {
            console.error(err.message);
        }
    }


    return (

        <div className="AsideMenu-div--link logout"> 
            <IoLogOutOutline className="AsideMenu-icon logout" />
            <button type='button' className="AsideMenu-h4 logout" onClick={logOut}>Cerrar sesion</button>
        </div>
    )
}

export default Logout;