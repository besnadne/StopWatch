import './buttonsControl.css'
import { useEffect } from "react";
import { fromEvent, asyncScheduler} from "rxjs";
import { buffer, filter, throttleTime} from "rxjs";


const ButtonsControl = (props) => {
    useEffect(() =>{
        const handleResize = (val) => {
            props.onClickWait();
        }

        const clicks$ = fromEvent(document.getElementById('btn_wait'), 'click');

        const subscription  = clicks$.pipe(
            buffer(clicks$.pipe(throttleTime(299, asyncScheduler, {trailing: true}))),

            filter(clickArray => clickArray.length === 2)
        ).subscribe(handleResize);

        return () => subscription.unsubscribe();
    })



    return (
        <div className="buttonsControl">
            <button className="btn" onClick={props.onClickStart}>Start</button>
            <button className="btn" onClick={props.onClickStop}>Stop</button>
            <button className="btn" id='btn_wait'>Wait</button>
            <button className="btn" onClick={props.onClickReset}>Reset</button>
        </div>
    )
}

export default ButtonsControl;