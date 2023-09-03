import "../assets/SpinRotate.css"
const SpinRotate= ({color = "blue"})=> {

    const colorMode = color === "blue" ? "#31B8B8" : "white"

    return (
    <div className="SpinRotate-div" style={{"backgroundColor": colorMode}}>
    </div>)

}

export default SpinRotate