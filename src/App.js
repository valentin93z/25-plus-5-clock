import React, { useState } from 'react';
import './index.css';

function App() {

  //state

  const [play, setPlay] = useState(false);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [timingType, setTimingType] = useState("Session");


  // timeout function

  const timeout = setTimeout(() => {
    if (timeLeft && play) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);


  // set break and session length

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(prev => prev - 1);
    }
  }

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(prev => prev + 1);
    }
  }

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(prev => prev -1);
      setTimeLeft(timeLeft - 60);
    }
  }

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(prev => prev + 1);
      setTimeLeft(timeLeft + 60);
    }
  }


  // formatted timeLeft function

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  }


  // play timeout

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  }

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if (!timeLeft && timingType === "Session") {
      setTimeLeft(breakLength * 60);
      setTimingType("Break");
      audio.play();
    }
    if (!timeLeft && timingType === "Break") {
      setTimeLeft(sessionLength * 60);
      setTimingType("Session");
      audio.pause();
      audio.currentTime = 0;
    }
  }

  const clock = () => {
    if (play) {
      resetTimer();
      return timeout;
    } else {
      clearTimeout(timeout);
    }
  }

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType("Session");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  }

  React.useEffect(() => {
    clock();
  }, [play, timeLeft, timeout]);


  // styling start-stop button

  const startStopBtn = play ? "PAUSE" : "START"; 


  return (
    <div className="App">
      <h1 className='app-label'>25 + 5 Clock</h1>
      <div className='componentsWrapper'>

      <BreakLength
        play={play}
        breakLength={breakLength}
        handleBreakDecrement={handleBreakDecrement}
        handleBreakIncrement={handleBreakIncrement} />

      <SessionLength
        play={play}
        sessionLength={sessionLength}
        handleSessionDecrement={handleSessionDecrement}
        handleSessionIncrement={handleSessionIncrement} />

      </div>
      <div className='timer'>
        <div className='timerWrapper'>
          <div id='timer-label'>{timingType}</div>
          <div id='time-left'>{formatTime()}</div>
        </div>
        <div className='buttonWrapper'>
          <button id='start_stop' className={startStopBtn} onClick={() => handlePlay()}>{startStopBtn}</button>
          <button id='reset' onClick={() => handleReset()}>RESET</button>
        </div>
      </div>
      <audio id='beep' preload='auto' src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
    </div>
  );
}

function BreakLength({ play, breakLength, handleBreakDecrement, handleBreakIncrement }) {
  return (
    <div className='BreakLength'>
      <div id='break-label'>Break Length</div>
      <div className='lengthWrapper'>
        <button id='break-decrement' disabled={play} onClick={() => handleBreakDecrement()}>
          <svg className='arrow' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"/></svg>
        </button>
        <div id='break-length'>{breakLength}</div>
        <button id='break-increment' disabled={play} onClick={() => handleBreakIncrement()}>
          <svg className='arrow' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"/></svg>
        </button>
      </div>
    </div>
  )
}

function SessionLength({ play, sessionLength, handleSessionDecrement, handleSessionIncrement }) {
  return (
    <div className='SessionLength'>
      <div id='session-label'>Session Length</div>
      <div className='lengthWrapper'>
        <button id='session-decrement' disabled={play} onClick={() => handleSessionDecrement()}>
          <svg className='arrow' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"/></svg>
        </button>
        <div id='session-length'>{sessionLength}</div>
        <button id='session-increment' disabled={play} onClick={() => handleSessionIncrement()}>
          <svg className='arrow' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"/></svg>
        </button>
      </div>
    </div>
  )
}

export default App;