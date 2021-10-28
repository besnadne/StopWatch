import {Component} from 'react';
import './App.css';
import Timer from './components/timer/Timer';
import ButtonsControl from './components/buttons-control/ButtonsControl';
import {interval} from 'rxjs';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      seconds : 0,
      minutes : 0,
      hours : 0,
      timerId : null
    };
    this.source = interval(1000);
    this.subscribe = null;
  }

  setTime(){
    let seconds = +this.state.seconds,
        minutes = +this.state.minutes,
        hours = +this.state.hours;


        if(seconds >= 59 && minutes>= 59){
          this.setState({
            hours: hours + 1,
            minutes: 0,
            seconds: 0
          });
        } else if( seconds >= 59){
          this.setState({
            minutes: minutes + 1,
            seconds: 0
          });
        } else{
          this.setState({seconds: seconds + 1});
        }
  }


  handleStart = ()=>{
    if(!this.subscribe) {
      this.subscribe = this.source.subscribe(val => this.setTime());
    }
  }


  clearTime (){
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
  }


  clearTimerId(){
    if(this.subscribe) {
      this.subscribe.unsubscribe();
      this.subscribe = null;
    }
  }

  handleStop = ()=>{
    this.clearTime();
    this.clearTimerId();
  }


  handleWait = ()=> {
    this.clearTimerId();
  }

   handleReset = ()=>{
     this.handleStop();
     setTimeout(()=> this.handleStart(), 0)
   }


  
 render(){
   return(
     <div className='App'>
       <Timer time={this.state}/>
       <ButtonsControl
          onClickStart = {this.handleStart}
          onClickStop = {this.handleStop}
          onClickWait = {this.handleWait}
          onClickReset = {this.handleReset}
       />
     </div>
   )
 }
 
}

export default App;
