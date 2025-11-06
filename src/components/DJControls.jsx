function DJControls({ volume, onVolumeChange, s1Checked, setS1Checked, s2Checked, setS2Checked, s3Checked, setS3Checked }) {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPM</span>
                <input type="text" className="form-control" id="cpm_text_input" placeholder="120" aria-label="CPM" aria-describedby="cpm_label"/>
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

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="s1"
                    checked={s1Checked}
                    onChange={() => setS1Checked(!s1Checked)}
                />
                <label className="form-check-label" htmlFor="s1">Gain Pattern 0</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="s2"
                    checked={s2Checked}
                    onChange={() => setS2Checked(!s2Checked)}
                />
                <label className="form-check-label" htmlFor="s2">Gain Pattern 1</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="s3"
                    checked={s3Checked}
                    onChange={() => setS3Checked(!s3Checked)}
                />
                <label className="form-check-label" htmlFor="s3">Gain Pattern 2</label>
            </div>
        </>
    )
}

export default DJControls;
