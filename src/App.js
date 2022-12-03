import { useReactMediaRecorder } from "react-media-recorder";
import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from 'react-player'
const RecordView = (props) => {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  function stopTimer() {
    setIsActive(false);
    setCounter(0);
    setSecond("00");
    setMinute("00");
  }
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl
  } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: true
  });
  //
  //Video Palyer
  const [playing, setPlaying] =  useState(false);
  const [mutevideo,setMuteVideo] = useState(false);
  const [startTime, setStartTime]  = useState(46);
  const [currentTime, SetCurrentTime] = useState(0);
  const [clipStartTime, setClipStartTime] = useState(0);
  const [clipEndTime, setClipEndTime] = useState(0)
  const myRef = new useRef()
  const forward = () =>{
    console.log("Clicked......Forward",myRef.current.seekTo(currentTime+10, 'seconds'))
    setStartTime()
  }
  const reverse= ()=>{
    console.log("Clicked......Reverse",myRef.current.seekTo(currentTime-10, 'seconds'))
  
  }
  const onPause =(event) =>{
    console.log("Event.......", event)
   
  }

  return (
    <div
      style={{
        border: "1px solid black",
        backgroundColor: "black",
        width: "1000px",
        height: "350px"
      }}
    >

    <div>
      Video player
      <ReactPlayer url='https://www.youtube.com/watch?v=JLkCad_qAng' 
      ref={myRef}
      controls={true}
      width= {1000}
      height= {350}
      playing={playing}
      volume={1}
      muted={mutevideo}
      onPause={onPause}
      config={{ 
          playerVars: {
            start: 0
           }
      }}
      
      onProgress={
        (prop)=>{
          SetCurrentTime(prop.playedSeconds)
        }
      }
      />
      <button onClick={()=>setPlaying(!playing)}>{playing?"Pause":"Paly"}</button>
      <button onClick={()=>setMuteVideo(!mutevideo)}>{mutevideo?"UnMute":"Mute"}</button>
      <button onClick={()=>reverse()}>reverse 10 s</button>
      <button onClick={()=>forward()}>forward 10 s</button>

    </div>


      <div
        style={{
          border: "1px solid #bd9f61",
          height: "70px",
          backgroundColor: "#bd9f61",
          display: "flex"
        }}
      >
        <h4
          style={{
            marginLeft: "10px",
            textTransform: "capitalize",
            fontFamily: "sans-serif",
            fontSize: "18px",
            color: "white"
          }}
        >
          {status}
        </h4>
      </div>
      <div style={{ height: "38px" }}>
        {"  "}
        <video src={mediaBlobUrl} controls loop />
      </div>
       
      <div
        className="col-md-6 col-md-offset-3"
        style={{
          backgroundColor: "black",
          color: "white",
          marginLeft: "357px"
        }}
      >
        <div style={{color:"white", backgroundColor:'black'}}>
        Clip Start Time:{Math.floor(clipStartTime/60)}: {Math.floor(clipStartTime%60)}
       </div>
       <div style={{color:"white", backgroundColor:'black'}}>
        Clip End Time: { Math.floor(clipEndTime/60)} : {Math.floor(clipEndTime%60)}
       </div>
        <button
          style={{
            backgroundColor: "black",
            borderRadius: "8px",
            color: "white"
          }}
          onClick={stopTimer}
        >
          Clear
        </button>
        <div style={{ marginLeft: "70px", fontSize: "54px" }}>
          <span className="minute">{minute}</span>
          <span>:</span>
          <span className="second">{second}</span>
        </div>

        <div style={{ marginLeft: "20px", display: "flex" }}>
          <label
            style={{
              fontSize: "15px",
              fontWeight: "Normal"
              // marginTop: "20px"
            }}
            htmlFor="icon-button-file"
          >
            <h3 style={{ marginLeft: "15px", fontWeight: "normal" }}>
              Press the Start to record
            </h3>

            <div>
              <button
                style={{
                  padding: "0.8rem 2rem",
                  border: "none",
                  marginLeft: "15px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  backgroundColor: "#42b72a",
                  color: "white",
                  transition: "all 300ms ease-in-out",
                  transform: "translateY(0)"
                }}
                onClick={() => {
                  if (!isActive) {
                    setMuteVideo(true) // for muting video player
                    setClipStartTime(currentTime)// recording start Time
                    startRecording();
                  } else {
                    setMuteVideo(false)
                    setClipEndTime(currentTime)
                    pauseRecording();
                  }
                  setIsActive(!isActive);
                }}
              >
                {isActive ? "Pause" : "Start"}
              </button>
              <button
                style={{
                  padding: "0.8rem 2rem",
                  border: "none",
                  backgroundColor: "#df3636",
                  marginLeft: "15px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  color: "white",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  transition: "all 300ms ease-in-out",
                  transform: "translateY(0)"
                }}
                onClick={() => {
                  stopRecording();
                  pauseRecording();
                  // for unmuting video
                  setMuteVideo(true) 
                }}
              >
                Stop
              </button>
            </div>
          </label>
        </div>
        <b></b>
      </div>
    </div>
  );
};
export default RecordView;
