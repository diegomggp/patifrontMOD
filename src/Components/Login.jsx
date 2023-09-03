import { useNavigate, Link } from "react-router-dom"
import { useAppContext } from "../context/context";
import {useState} from 'react';
import { BsGoogle, BsFacebook, BsApple } from "react-icons/bs";
import SpinRotate from "../utils/SpinRotate";
import DragBar from "./auxiliar/DragBar";
import '../assets/Login.css'

const Login=() => {
    const [isPending, setIsPending] = useState(false);
    const {log, handleError}= useAppContext()
    const toHome= useNavigate();

    const url = `${process.env.REACT_APP_BASE_URL}/login`; 

    const [data, setData] = useState({
        email:"",
        password:""
    })

    const login = async (e) => {
        e.preventDefault(); 
        if((data.email=="") || (data.password=="")) {
            if(data.email=="") {
                alert("falta email")
            } else if (data.password==""){
                alert("falta contraseña");
            }
            return;
        } 
        
        const body = {
            email: data.email, 
            password:data.password,
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

        if (parseRes.token) {
            localStorage.setItem("token", parseRes.token);
            localStorage.setItem("id", parseRes.id);
            toHome("/home");
 
           } else {
            handleError(parseRes.error)
            console.error(parseRes);
          }
        } catch (err) {
            handleError(err.message)
            console.error(err);
        }finally{
            setIsPending(false)
        }
    }

    function handle(e){
        const newData = {...data};
        newData[e.target.name] = e.target.value;
        setData(newData);
    }
    const autoEnter= ()=> {
        log();
        toHome("/home");
    }

        return(
            <div className="Login-div-Main">  
                <div className="title-login2">
                    <h1 className="Login-logo">SPEEDY</h1>
                <h1>Inicio de sesión</h1>
            </div>
                <div className="login-conteiner">
    
                    <form className="big-login-input">
                        <div>
                            <input className='login2-input' type="text" name="email" placeholder="Email" required onChange={(e) => handle(e)} value={data.email} />
                        </div>
    
                        <div >
                            <input className='login2-input' type="password" placeholder="Contraseña" required onChange={(e) => handle(e)} name="password" value={data.password} />
                        </div>
                        <p className="Login-p">He olvidado mi contraseña</p>
                    </form>
                    <div>
                            <button type='button' className="login2-btn" onClick={login}>
                                {isPending ? <SpinRotate color={"white"}/> :  "Iniciar sesión"}
                            </button >
                    </div>
                    <div className="box-login">
                    <Link className='link' to="/register">
                    <h4 className="subtitle-login">¿No tienes cuenta todavia? <b className="reg">Registrate</b> </h4>
                    </Link>
                    </div>
                    {/* para pruebas solo
                    <button type='button' className="login2-btn" onClick={autoEnter}>TEST</button> */}

                        <div className="Login-div-footer">
                            <p className="Login-p">O con</p>
                            <div className="Login-div-footericons">
                            <BsGoogle className="Login-icon"/>
                            <BsFacebook className="Login-icon" />
                            <BsApple className="Login-icon" />
                            </div>
                        </div>
                </div>
                
           </div>
        )

}

export default Login;