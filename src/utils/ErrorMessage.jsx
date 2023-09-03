import { useAppContext } from "../context/context"
import { IoRocketOutline } from "react-icons/io5";
import "../assets/ErrorMessage.css"

const ErrorMessage= ()=>{
    const { error, eraseError } = useAppContext()
    if (error)
    return(
        <div className="ErrorMessage-background">
            <div className="ErrorMessage-div">
                <div className="ErrorMessage-div-head">
                        <IoRocketOutline className="ErrorMessage-icon" />
                    <h3 className="ErrorMessage-h3">
                        Lo sentimos, algo salió mal
                    </h3>
                </div>
                <div className="ErrorMessage-div-body">
                    <p className="ErrorMessage-p">
                        {error}
                    </p>
                    <button type="button" className="ErrorMessage-button" onClick={eraseError} >
                        Aceptar 
                    </button>
            </div>
            </div>
        </div>
    )
        
}

export default ErrorMessage