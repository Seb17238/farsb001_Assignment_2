import './App.css';
import { useEffect, useRef, useState} from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune} from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJControls from './components/DJControls';
import PlayPauseButt from './components/PlayPauseButt';
import PropButtons from './components/PropButtons';
import PreProcessTextArea from './components/PreProcessTextArea';
import { Preprocess } from './utils/PreProcess';
import GainPatterns from './components/GainPatterns';
import AreggiatorSelect from './components/ArpeggiatorSelect';
import D3Graph from './components/D3Graph';


let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

// export function SetupButtons() {

//     document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
//     document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
//     document.getElementById('process').addEventListener('click', () => {
//         Proc()
//     }
//     )
//     document.getElementById('process_play').addEventListener('click', () => {
//         if (globalEditor != null) {
//             Proc()
//             globalEditor.evaluate()
//         }
//     }
//     )
// }



// export function ProcAndPlay() {
//     if (globalEditor != null && globalEditor.repl.state.started == true) {
//         console.log(globalEditor)
//         Proc()
//         globalEditor.evaluate();
//     }
// }

// export function Proc() {

//     let proc_text = document.getElementById('proc').value
//     let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
//     ProcessText(proc_text);
//     globalEditor.setCode(proc_text_replaced)
// }

// export function ProcessText(match, ...args) {

//     let replace = ""
//     // if (document.getElementById('flexRadioDefault2').checked) {
//     //     replace = "_"
//     // }

//     return replace
// }

function getBeatIntervalForPattern(patternIndex) {
  switch (patternIndex) {
    case 0: return "1/2";
    case 1: return "1/4";
    case 2: return "1/8";
    default: return "1/4";
  }
}

export default function StrudelDemo() {

const hasRun = useRef(false);

const handlePlay = () => {
    if (!globalEditor) return;

    const outputText = Preprocess({
        inputText: procText,
        volume,
        s1Checked,
        s2Checked,
        s3Checked,
        selectedArp
    });

    globalEditor.setCode(outputText);
    globalEditor.evaluate();
};

const handleStop = () => {
    globalEditor.stop()
}

const [songText, setSongText] = useState(stranger_tune)

const [procText, setProcText] = useState(stranger_tune)

const [volume, setVolume] = useState(1);

const [state, setState] = useState("stop");

const [s1Checked, setS1Checked] = useState(true);

const [s2Checked, setS2Checked] = useState(false);

const [s3Checked, setS3Checked] = useState(false);

const [cpm, setCpm] = useState(10);

const [selectedArp, setSelectedArp] = useState("0");

const patternIndex =
      s1Checked ? 0 :
      s2Checked ? 1 :
      s3Checked ? 2 : 0;

const interval = getBeatIntervalForPattern(patternIndex);

const saveSettings = () => {
  const stateToSave = { cpm, volume, s1Checked, s2Checked, s3Checked, selectedArp, procText };
  const jsonStr = JSON.stringify(stateToSave, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "strudel_settings.json";
  link.click();
  URL.revokeObjectURL(url);
};

const loadSettings = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const loadedState = JSON.parse(e.target.result);
      setCpm(loadedState.cpm);
      setVolume(loadedState.volume);
      setS1Checked(loadedState.s1Checked);
      setS2Checked(loadedState.s2Checked);
      setS3Checked(loadedState.s3Checked);
      setSelectedArp(loadedState.selectedArp);
      setProcText(loadedState.procText || stranger_tune);
      if(globalEditor) globalEditor.setCode(loadedState.procText || stranger_tune);
    } catch(err) {
      alert("Invalid JSON file");
      console.error(err);
    }
  };
  reader.readAsText(file);
};


useEffect(() => {

    if (state === "play") {
        handlePlay();

    }
}, [volume, s1Checked, s2Checked, s3Checked, cpm, selectedArp]);



// useEffect(() => {
    
//     D3Graph();
//     if(state === "play") {
//         handlePlay();

//     }
// }, [volume, s1Checked, s2Checked, s3Checked, cpm, selectedArp]);


useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
            
        document.getElementById('proc').value = stranger_tune
        // SetupButtons()
        // Proc()
    }

}, []);

useEffect(() => {
    if (globalEditor) {
        globalEditor.setCode(songText);
    }
}, [songText]);


return (
    <div className="App strudel-demo">
        <header className='strudel-header'>
            <h2>Strudel Demo</h2>
        </header>

        <main className='strudel-main'>
            <div className="editor-section">
            <div className="text-area-wrapper">
                <PreProcessTextArea defaultValue={songText} onChange={(e) => setSongText(e.target.value)}/>
            </div>

            <div className="controls-wrapper">
                <br />
                <PlayPauseButt onPlay={() => { setState("play"); handlePlay() }} 
                onStop={() => { setState("stop"); handleStop() }}/>
                <div className="json-buttons mt-2">
                        <button className="btn btn-primary me-2" onClick={saveSettings}>Save Settings</button>
                        <input type="file" accept="application/json" onChange={loadSettings} 
                        style={{ display: "none" }} id="load-settings" />
                        <label htmlFor="load-settings" className="btn btn-secondary">Load Settings</label>
                </div>
                <br />
                <DJControls 
                cpm={cpm} onCpmChange={(value) => setCpm(value)}
                volume={volume} onVolumeChange={(value) => setVolume(value)} 
                />   
                <GainPatterns 
                s1Checked={s1Checked} setS1Checked={setS1Checked} 
                s2Checked={s2Checked} setS2Checked={setS2Checked} 
                s3Checked={s3Checked} setS3Checked={setS3Checked}  />   
                <AreggiatorSelect 
                selectedArp={selectedArp} 
                setSelectedArp={setSelectedArp} />
                </div>

                
                <div className="d3-container">
                    <D3Graph beatInterval={interval} />
                </div>

                
            </div>

            <div className="editor-canvas">
                <div id="editor" className="strudel-editor"></div>
                <canvas id="roll" className="strudel-canvas"></canvas>
            </div>
        </main>
        </div>

);


}