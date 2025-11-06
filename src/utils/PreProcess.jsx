export function Preprocess({ inputText, volume, s1Checked, s2Checked, s3Checked }) {

    //console.log(inputText)

    let outputText = inputText + "\n//Hello, this is a test";

    outputText += `\n//all(x => x.gain(${volume}))`

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

    let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]+[:/])/gm;

    let m;
    let matches = []

    while ((m = regex.exec(outputText)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            //console.log(`Found match, group ${groupIndex}: ${match}`);
            matches.push(match)
        });
    }

    let matches2 = matches.map(
        (match) => match.replaceAll(/(?<!post)gain\(([^\d.]+)\)/g, (match, captureGroup) =>
            `gain(${captureGroup}*${volume})`
        )
    );

    let matches3 = matches.reduce(
        (text, original, i) => text.replaceAll(original, matches2[i]),
        outputText
    );

    console.log(matches3);

    return matches3;
}
