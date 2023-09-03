import React from "react";
import { Link } from "react-router-dom";
import '../assets/LandingPage.css'
import Payments from "./Payments";

const LandingPage = () => {

    return (
        <>
            <div className="Landing-div">
                <div className="Landing-div--body">
                    <h5 className="Landing-h5">Bienvenido a</h5>
                    <h5 className="Landing-h5 title">SPEEDY</h5>
                </div>
                <div className="Landing-div--foot">
                    <svg className="Landing-svg" width="100%" height="100%" id="svg" viewBox="0 0 1440 690" xmlns="http://www.w3.org/2000/svg"><path d="M 0,700 C 0,700 0,350 0,350 C 58.497423565784956,310.07351425626933 116.99484713156991,270.14702851253867 181,295 C 245.0051528684301,319.85297148746133 314.5180350395053,409.4854002061148 390,432 C 465.4819649604947,454.5145997938852 546.9330127104088,409.9113706630024 614,361 C 681.0669872895912,312.0886293369976 733.7499141188596,258.8691171418757 809,258 C 884.2500858811404,257.1308828581243 982.0673308141531,308.612160769495 1058,362 C 1133.9326691858469,415.387839230505 1187.9807626245276,470.68223978014424 1248,469 C 1308.0192373754724,467.31776021985576 1374.0096186877363,408.65888010992785 1440,350 C 1440,350 1440,700 1440,700 Z">
                    </path>
                    </svg>

                    <img src="./Character.png" alt="complete" className="Landing-img2" />
                    <Link 
                    to='/login'
                    className="Landing-div--button">
                        <h5 className="Landing-h5--button">¡Vamos!</h5>

                    </Link>
                </div>
            </div>
            {/* <Payments/> */}
        </>
    )
}
export default LandingPage;