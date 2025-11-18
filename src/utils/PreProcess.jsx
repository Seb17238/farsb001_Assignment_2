

export function Preprocess({ inputText, volume, s1Checked, s2Checked, s3Checked, selectedArp }) {

    const arpVar = selectedArp === "0" ? "arpeggiator1" : "arpeggiator2";

    let outputText = inputText;

    outputText = outputText.replace(
        /note\(pick\(arpeggiator1, "<0 1 2 3>\/2"\)\)/g,
        `note(pick(${arpVar}, "<0 1 2 3>/2"))`
    );


    if (s1Checked) {
        outputText = outputText.replace(
            /postgain\(pick\(gain_patterns, pattern\)\)/g,
            "postgain(pick(gain_patterns, 0))"
        );
    }
    if (s2Checked) {
        outputText = outputText.replace(
            /postgain\(pick\(gain_patterns, pattern\)\)/g,
            "postgain(pick(gain_patterns, 1))"
        );
    }
    if (s3Checked) {
        outputText = outputText.replace(
            /postgain\(pick\(gain_patterns, pattern\)\)/g,
            "postgain(pick(gain_patterns, 2))"
        );
    }

    outputText = outputText.replaceAll('{${VOLUME}}', volume);

    return outputText;
}
