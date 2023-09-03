import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { RxArrowLeft } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { Elements, CardElement, useStripe, useElements ,CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { useClientContext } from "../context/clientDataContext"
import SpinRotate from "../utils/SpinRotate"
import "../assets/payments.css";

const stripePromise = loadStripe(process.env.REACT_APP_CARD_KEY)

const CheckoutForm = ({amount, handler}) => {
   
    const [loading, setLoading] = useState(false)
    const { clientData, getClientData } = useClientContext();
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardNumberElement),
                
            })
            if (!error) {
                const client_id= clientData?.client_id
                const { id } = paymentMethod
                setLoading(true)
                const token = window.localStorage.getItem("token")
                const { data } = await axios.post(
                    `${process.env.REACT_APP_BASE_URL}/payment/${client_id}?token=${token}`,
                     {
                        id,
                        amount: amount,
                        currency: "EUR",
                        description: "Recarga 10€",
                })
                await handler(false)
                elements.getElement(CardElement).clear();
            }
        }catch(error){
            console.log(error)
        }
        finally{
            await getClientData()
            setLoading(false)
        }
    }
    return <form onSubmit={handleSubmit} className="Payment-form-main">
        <div className="form-group">
            <h3 className="Payment-form--title">Añade tu tarjeta</h3>
            {/* <CardElement className="numberCard "/> */}
            <CardNumberElement className="Payment-input card"></CardNumberElement>
            <div className="Payment-form--dataextra">
                <CardExpiryElement className="Payment-input"></CardExpiryElement>
                <CardCvcElement className="Payment-input"></CardCvcElement>
            </div>
            
            <div className="Payment-btn">
                {loading ? <SpinRotate className="btn-outline-warning"/> :
                    <button className="btn btn-outline-warning">
                        Recargar
                </button>}
            </div>
        </div>
    </form>
}

const Payments = () => {
    const [amount , setAmount] = useState(null)
    const { clientData } = useClientContext();
    const [paying, setPaying]= useState(false)
    const toHome = useNavigate()

    const selectAmount=(money)=>{
        if(money === amount) return setAmount(null)
        setAmount(money)


    }
    const toPay= ()=>{
        if(amount)
        setPaying(true)
    }
    const goHome= ()=>{
        toHome("/home")
    }
    return (
        <Elements stripe={stripePromise}>
            <div className="container p-4 Payments-form">
                <RxArrowLeft className="Payment-cross" onClick={goHome} />                            
                <div className="row"> 
                
                    <div className="col-md-4 offset-md-4">
                        { paying ? <CheckoutForm amount={amount} handler={setPaying}/> :
                        <div className="payments-div">
                            <div className="payments-div--maintitle">
                                <h3 className="payments-h3 maintitle">
                                    Mi monedero
                                </h3>
                                    <h2 className='payments-h2 maintitle'> {parseFloat(clientData?.balance).toFixed(2) || "0" }€</h2>

                            </div>
                            <div className="payments-title"><h2>Selecciona importe:</h2></div>
                            <div className="payments-div--amounts">
                            <button className={`payments-money ${amount === 1000 && "active"}`} onClick={()=> selectAmount(1000)}>
                                10 €
                            </button>
                                    <button className={`payments-money ${amount === 2000 && "active"}`} onClick={() => selectAmount(2000)}>
                                20 €
                            </button>
                            <button className={`payments-money ${amount === 3000 && "active"}`}  onClick={() => selectAmount(3000)}>
                                30 €
                            </button>

                            </div>
                            <button className='payments-btn-add' onClick={toPay}>
                                Añadir
                            </button>
                        </div>}
                        {/* <CheckoutForm amount={amount} handler={setPaying}  /> */}
                    </div>
                </div>
            </div>
        </Elements>
    );
};

export default Payments;