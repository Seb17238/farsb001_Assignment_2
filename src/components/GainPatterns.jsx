function GainPatterns({ s1Checked, setS1Checked, s2Checked, setS2Checked, s3Checked, setS3Checked }) {
    return (
        <>

                

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

export default GainPatterns;


