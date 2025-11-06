function PlayPauseButt({ onPlay, onStop}){
    return (
        <>
        <div className="play-pause-buttons" role="group" aria-label="basic mixed sytle examples">
            <button id="play" className="play-button" onClick={onPlay}>Play</button>
            <button id="stop" className="stop-button" onClick={onStop}>Stop</button>
        </div>
        </>
    )
}

export default PlayPauseButt;