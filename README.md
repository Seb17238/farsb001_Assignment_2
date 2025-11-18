# Strudel Demo – README

# Project Overview

This project is a React-based music demo built using Strudel.cc. Its purpose is to allow users to play and change a song using a variety of interactive controls. The interface includes options to adjust song volume, select gain patterns, choose arpeggiators, and control beats per minute (CPM). The project Also features a D3 graph that visualizes the beats from the select gain pattern, as well as the ability to save and load the current state of all controls using JSON file. 

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Componments
The PreProcessTextArea component is responsible for allowing the user to input or edit the raw strudel song text before it is processed. It is a simple textarea element with a label, and it takes two props, the defaultValue, which sets the initial text displayed in the textarea and onChange, which is a callback function that is triggered whenever the user changes the text. The text entered in this component is sent into the Preprocess function, which converts it into playable Strudel code.

The DJControls component provides user controls for adjusting the song's volume and speed (CPM). It contains a slider for volume and a number input for CPM. When the user interacts with these controls the component updates the state in the parent component, which is then passed to the Preprocess function to dynamically adjust the song during playback.

The GainPatterns component allows users to select one of three gain patterns that modify how the song is played. Each pattern has a checkbox, and only one pattern can be active at a time. When the user selects a pattern, the component updates the corresponding state in the parent component, so that the chosen pattern is applied to the song during playback.

The PlayPauseButt component provides controls to play and stop the song. Clicking “Play” triggers the onPlay callback to start playback, while “Stop” triggers onStop to stop it. This allows the user to control the song.

The ArpeggiatorSelect component allows the user to choose between two arpeggiator patterns. Selecting an option updates the parent state via setSelectedArp, which dynamically changes the arpeggiator used in the song during playback.

The D3Graph component displays a representation of the song’s beat using a dynamic line graph. The graph updates continuously, with its speed influenced by the currently selected gain pattern. This provides users with a visual cue of the music, making the interaction more engaging.

# Utils

The Preprocess function takes the song text and dynamically adjusts it based on user input. It modifies the arpeggiator, gain patterns, and volume according to the current state of the controls. By replacing specific placeholders and patterns in the song code. THe function ensures that changes to volume, gain, and arpeggiator selection are update in playback, allowing the music to respond in real time interactions.

# App.js

App.js serves as the main file of the Strudel Demo application. It manages the overall layout, state management, and interaction between all components and utils. State variables are used to track user settings, including volume, CPM, gain patterns, arpeggiator selection, and the preprocessed song text. Whenever a user interacts with a control, such as changing the volume, switching gain patterns, or selecting a new arpeggiator. The corresponding state is updated, and the Preprocess function is called to update the song code. The file also includes handlers for saving and loading user settings as JSON. This allows users to export their current configuration and later reload it. Finally the App.js integrates the D3 graph component, which shows the current gain pattern. This show a visual on the differences in the gain patterns