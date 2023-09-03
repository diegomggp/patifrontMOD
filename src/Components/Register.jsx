import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/context";
import SpinRotate from "../utils/SpinRotate";
import { useState } from 'react';
import { BsGoogle, BsFacebook, BsApple } from "react-icons/bs";
import '../assets/Register.css'


const Register = () => {
    const [isPending, setIsPending] = useState(false);
    const {handleError } = useAppContext()
    const toLogin = useNavigate();

    const url = `${process.env.REACT_APP_BASE_URL}/register`;

    const [data, setData] = useState({
        user_name: "",
        email: "",
        password: ""
    })

    const register = async (e) => {
        e.preventDefault();

        if ((data.password) !== (data.passwordAgain)) {
            alert("Las contraseñas no son iguales")
            return;
        }

       const body = {

            user_name: data.user_name,
            email: data.email,
            password: data.password
        }
            setIsPending(true)
            try {
                const res = await fetch (url, 
                {
                    method: "POST",
                    headers: {"Content-Type":"application/json"}, 
                    body: JSON.stringify(body)
                } 
                );
                const parseRes = await res.json(); 
                if (parseRes.errors) {
                    handleError(parseRes.errors[0].msg)   
                }
                if (parseRes.error){
                    handleError(parseRes.error)
                }
    
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                localStorage.setItem("id", parseRes.id);
                toLogin("/home");
      
               } else {
                console.error(parseRes);
              }
            } catch (err) {
              console.error(err.message);
            }finally{
                setIsPending(false)
            }
    }

    function handle(e) {
        const newData = { ...data };
        newData[e.target.name] = e.target.value;
        setData(newData);
    }

    return (
        <div className="Register-div-Main">
          <div className="title-register">
                <h1 className="Register-logo">SPEEDY</h1>
            <h1>Inicia tu registro</h1>
        </div>
        <div className="register-conteiner">
        <div className="big-register-input">

            <div>
                <input  className='register-input' type="text" name="user_name" placeholder="Nombre" required onChange={(e) => handle(e)} id="user_name" value={data.user_name} />
            </div>

            <div>
                <input className="register-input" type="text" name="email" placeholder="Email" required onChange={(e) => handle(e)} value={data.email} />
            </div>

            <div>
                <input className="register-input" type="password" name="password" placeholder="Contraseña" required onChange={(e) => handle(e)} value={data.password} />
            </div>

            <div>
                <input className="register-input" type="password" name="passwordAgain" placeholder="Repite tu contraseña" required onChange={(e) => handle(e)} value={data.passwordAgain} />
            </div>

            <div>
            <button type='button' disabled={!data.user_name || !data.email || !data.password || !data.passwordAgain} className="register-btn" onClick={register}>
                {!isPending ? "Registro" : <SpinRotate color={"white"}/>}
                </button>
            </div>
            <div className="box-register">
                <Link className='link' to="/login">
                <h4 className="subtitle-register">¿Ya tienes cuenta? <b className="reg">Ingresa</b> </h4>
                </Link>
                </div>
                    <div className="Register-div-footer">
                        <p className="Register-p">O con</p>
                        <div className="Register-div-footericons">
                            <BsGoogle className="Register-icon" />
                            <BsFacebook className="Register-icon" />
                            <BsApple className="Register-icon" />
                        </div>
                    </div>
                </div>

        </div>
        </div>
    )

}

export default Register;
