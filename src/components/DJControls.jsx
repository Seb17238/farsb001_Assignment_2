function DJControls( { volume, onVolumeChange}){
    return (
        <>


            <div class="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPM</span>
                <input type="text" className="form-control" id="cpm_text_input" placeholder="120" aria-label="Username" aria-describedby="cpm_label"/>

                </div>
                <div>
                    <label htmlFor="volume_range" className="form-label">volume</label>
                    <input type="range" className="form-range" min="0" max="1" step="0.01" onMouseUp={onVolumeChange} id="volume_range"/>
                </div>

                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="s1"/>
                <label className="form-check-label" htmlFor="s1">
                    s1
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="s2"/>
                <label className="form-check-label" htmlFor="s2">
                    s2
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="s3"/>
                <label className="form-check-label" htmlFor="s3">
                    s3
                </label>
                </div>
                    {/* <div className="col-md-4">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                p1: ON
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                p1: HUSH
                            </label>
                        </div>
                    </div> */}


        </>
    )
}

export default DJControls