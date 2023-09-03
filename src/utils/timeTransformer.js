const timeTransformer= (number)=>{
    const time= parseInt(number)
    if(time < 60){
        return `${time} s`
    }

    const minutes = Math.floor(time / 60)

    const countToSeconds = (time - (minutes * 60))

    const seconds = countToSeconds !== 0 ? countToSeconds > 9 ? countToSeconds : "0" + countToSeconds : "00"

    return `${minutes} min ${seconds}s`

}
export default timeTransformer