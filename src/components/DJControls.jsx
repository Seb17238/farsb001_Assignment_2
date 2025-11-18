function DJControls({ cpm, onCpmChange, volume, onVolumeChange }) {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPM</span>
                <input
                    type="text" className="form-control" id="cpm_text_input"
                    placeholder="120" value={cpm} onChange={(e) => onCpmChange(Number(e.target.value))}
                    aria-label="CPM" aria-describedby="cpm_label"/>
                </div>

            <div>
                <label htmlFor="volume_range" className="form-label">volume</label>
                <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                    id="volume_range"
                />
            </div>
        </>
    )
}

export default DJControls;


