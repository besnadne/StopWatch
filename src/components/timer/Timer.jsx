import './timer.css'

function addO(num){
    return num < 10 ? `0${num}`: num;
}
const Timer = (props) => {
    let seconds = addO(props.time.seconds),
        minutes = addO(props.time.minutes),
        hours = addO(props.time.hours);


    return(
        <div className="timer">
            <span>{hours}</span>
            <span>:</span>
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
        </div>
    )    
}

export default Timer;

