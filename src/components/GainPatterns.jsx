function GainPatterns({ s1Checked, setS1Checked, s2Checked, setS2Checked, s3Checked, setS3Checked }) {

    const handleChange = (pattern) => {
        setS1Checked(pattern === 0);
        setS2Checked(pattern === 1);
        setS3Checked(pattern === 2);
    }

    return (
        <>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="s1"
                    checked={s1Checked}
                    onChange={() => handleChange(0)}
                />
                <label className="form-check-label" htmlFor="s1">Gain Pattern 0</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="s2"
                    checked={s2Checked}
                    onChange={() => handleChange(1)}
                />
                <label className="form-check-label" htmlFor="s2">Gain Pattern 1</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="s3"
                    checked={s3Checked}
                    onChange={() => handleChange(2)}
                />
                <label className="form-check-label" htmlFor="s3">Gain Pattern 2</label>
            </div>
        </>
    )
}

export default GainPatterns;


