import { useNavigate } from "react-router-dom"
import { useTripContext } from "../../context/tripContext"
import { IoClose } from "react-icons/io5";
import timeTransformer from "../../utils/timeTransformer";
import { useClientContext } from "../../context/clientDataContext";
import "../../assets/Invoice.css"
import { useState } from "react"

const Invoice = ()=>{
    const { bookState: {invoice}} = useTripContext() 
    const { getClientData}= useClientContext()
    const [toogle, setToogle]= useState(false)
    const toHome= useNavigate()
    const exitToHome= ()=>{
        setToogle(false)
        toHome("/home")
    }
    const showInvoice= async () => {
        setToogle(true)
        await getClientData()
    }
    const InvoiceBill= ()=> {
        if (toogle) {
            const { payment, clientupdated } = invoice
            const time = timeTransformer(payment?.triptime)
        return (
            <div className="Invoice-background">
            <div className="Invoice-div">
                <div className="Invoice-div--body">
                    <div className="Invoice-div--head">
                        <h4 className="Invoice-h4 head"> Duración cobrada</h4>
                        <h5 className="Invoice-h5 head">{time} </h5>
                    </div>
                    <div className="Invoice-div--info">
                        <div className="Invoice-div--column">

                            <h4 className="Invoice-h4">Precio Base (0.23€/min):</h4>
                            <h4 className="Invoice-h4">Impuestos: </h4>
                            <h4 className="Invoice-h4
                        "> Total Facturado:</h4>
                            <h4 className="Invoice-h4 Total" >Tu Cartera : </h4>
                        </div>
                        <div className="Invoice-div--column column2">
                            <h5 className="Invoice-h5">{(parseFloat(payment?.baseprice)* payment?.triptime).toFixed(2)} € </h5>
                            <h5 className="Invoice-h5">{payment?.taxes * 100}%</h5>
                            <h5 className="Invoice-h5">{payment?.total_price}€</h5>
                            <h5 className="Invoice-h5 Total"> {parseFloat(clientupdated?.balance).toFixed(2)}€   </h5>
                        </div>
                    </div>

                </div>
                <button className="Invoice-button" onClick={exitToHome}> 
                    <IoClose/> 
                </button>


            </div>
            </div>
        )
    }}
    
    return(
        <div className="InvoiceMain-div">
            <div className="InvoiceMain-div--body">
                <img src="/Component.png" alt="Travelcomplete" className="InvoiceMain-img" />
                <h5 className="InvoiceMain-h5">¡Viaje Finalizado!</h5>
            </div>
            <InvoiceBill/>
            <div className="InvoiceMain-div--foot">
                <svg  className="InvoiceMain-svg" width="100%" height="100%" id="svg" viewBox="0 0 1440 690" xmlns="http://www.w3.org/2000/svg"><path d="M 0,700 C 0,700 0,350 0,350 C 58.497423565784956,310.07351425626933 116.99484713156991,270.14702851253867 181,295 C 245.0051528684301,319.85297148746133 314.5180350395053,409.4854002061148 390,432 C 465.4819649604947,454.5145997938852 546.9330127104088,409.9113706630024 614,361 C 681.0669872895912,312.0886293369976 733.7499141188596,258.8691171418757 809,258 C 884.2500858811404,257.1308828581243 982.0673308141531,308.612160769495 1058,362 C 1133.9326691858469,415.387839230505 1187.9807626245276,470.68223978014424 1248,469 C 1308.0192373754724,467.31776021985576 1374.0096186877363,408.65888010992785 1440,350 C 1440,350 1440,700 1440,700 Z">
                </path>
                </svg>

                <div className="InvoiceMain-div--button" onClick={showInvoice}>
                    <h5 className="InvoiceMain-h5--button">Ver factura</h5>

                </div>
                <img src="/Character.png" alt="complete" className="InvoiceMain-img2" />
            </div>
        </div>
    )






    
}

export default Invoice