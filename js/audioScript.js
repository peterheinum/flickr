window.AudioContext = window.AudioContext || window.webkitAudioContext;
navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;
    
// Instantiating AudioContext
try {
    var audioContext = new AudioContext();
} catch (e) {
    console.log("Error initializing Web Audio");
}

var recorder;
// Callback once the user authorizes access to the microphone:
function startUserMedia(stream) {
    var input = audioContext.createMediaStreamSource(stream);
    recorder = new AudioRecorder(input);
    // We can, for instance, add a recognizer as consumer
    if (recognizer) recorder.consumers.push(recognizer);
 };
    
// Actually call getUserMedia
if (navigator.getUserMedia)
    navigator.getUserMedia({audio: true},
                           startUserMedia,
                           function(e) {console.log("No live audio input in this browser");}
                          );
else console.log("No web audio support in this browser");