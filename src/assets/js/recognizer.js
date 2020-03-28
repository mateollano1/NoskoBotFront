// more documentation available at
// https://github.com/tensorflow/tfjs-models/tree/master/speech-commands
{ /* <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script> */ } { /* <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands@0.4.0/dist/speech-commands.min.js"></script> */ }
// the link to your model provided by Teachable Machine export panel
var script = document.createElement('script');
script.type = 'text/javascript';

script.src = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js';
document.body.appendChild(script);

var script2 = document.createElement('script');
script2.type = 'text/javascript';

script2.src = 'https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands@0.4.0/dist/speech-commands.min.js';
document.body.appendChild(script2);

const URL = "https://teachablemachine.withgoogle.com/models/nS7cBrrgp/";

async function createModel() {
    const checkpointURL = URL + "model.json"; // model topology
    const metadataURL = URL + "metadata.json"; // model metadata

    const recognizer = speechCommands.create(
        "BROWSER_FFT", // fourier transform type, not useful to change
        undefined, // speech commands vocabulary feature, not useful for your models
        checkpointURL,
        metadataURL);

    // check that model and metadata are loaded via HTTPS requests.
    await recognizer.ensureModelLoaded();

    return recognizer;
}

async function init() {
    let mayor = 0
    let pos = 0
    let instruccion = ""
    const recognizer = await createModel();
    const classLabels = recognizer.wordLabels(); // get class labels
    //  const labelContainer = document.getElementById("label-container");
    //  for (let i = 0; i < classLabels.length; i++) {
    //      labelContainer.appendChild(document.createElement("div"));
    //  }

    // listen() takes two arguments:
    // 1. A callback function that is invoked anytime a word is recognized.
    // 2. A configuration object with adjustable fields
    recognizer.listen(result => {
        const scores = result.scores; // probability of prediction for each class
        // render the probability scores per class

        for (let i = 0; i < classLabels.length; i++) {
            //  const classPrediction = classLabels[i] + ": " + result.scores[i].toFixed(2);
            //  labelContainer.childNodes[i].innerHTML = classPrediction;
            let resu = ""
            console.log(i + "--+--" + result.scores[i]);
            if ((result.scores[i] * 100) > mayor) {
                mayor = result.scores[i]
                pos = i
                instruccion = classLabels[i]
                    //  return classLabels[pos]
            }
        }
        //  res.innerHTML = classLabels[pos]

    }, {
        includeSpectrogram: true, // in case listen should return result.spectrogram
        probabilityThreshold: 0.75,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
    });
    // recognizer.stopListening()
    // Stop the recognition in 5 seconds.
    //  console.log("scores");

    //  console.log(result.scores);
    setTimeout(() => {
        recognizer.stopListening()
            // console.log("termine :)");
            // console.log(result.scores[mayor]);
            // console.log(instruccion);
        localStorage.setItem('command', instruccion);
        // return "holaa"
    }, 2000);
    // return "h"

}