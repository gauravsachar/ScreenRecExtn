
//   const displayStream = await navigator.mediaDevices.getDisplayMedia({video: true, audio: true});
//   // voiceStream for recording voice with screen recording
//   const voiceStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
//   let tracks = [...displayStream.getTracks(), ...voiceStream.getAudioTracks()]
//   const stream = new MediaStream(tracks);
//   handleRecord({stream, mimeType})
// }

// const onClick=()=>{
//   recordScreen();
// }

// third try

async function recordScreen() {
    return await navigator.mediaDevices.getDisplayMedia({
        audio: true, 
        video: { mediaSource: "screen",}        
    });
}

let start = document.getElementById('start'),
    stop  = document.getElementById('stop'),
    mediaRecorder;

start.addEventListener('click', async function(){
    let stream = await recordScreen();
    let mimeType = 'video/webm';
    mediaRecorder = createRecorder(stream, mimeType);
  let node = document.createElement("p");
    node.textContent = "Started recording";
    document.body.appendChild(node);
})


stop.addEventListener('click', function(){
    mediaRecorder.stop();
    let node = document.createElement("p");
    node.textContent = "Stopped recording";
    document.body.appendChild(node);
})

async function recordScreen() {
    return await navigator.mediaDevices.getDisplayMedia({
        audio: true, 
        video: { mediaSource: "screen"}
    });
}

function createRecorder (stream, mimeType) {
  // the stream data is stored in this array
  let recordedChunks = []; 

  const mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = function (e) {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }  
  };
  mediaRecorder.onstop = function () {
     saveFile(recordedChunks);
     recordedChunks = [];
  };
  mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
  return mediaRecorder;
}

function saveFile(recordedChunks){

   const blob = new Blob(recordedChunks, {
      type: 'video/webm'
    });
    window.focus();
    let filename = window.prompt('Enter file name'),

    downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${filename}.webm`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(blob); // clear from memory
    document.body.removeChild(downloadLink);

    if (filename){
        console.log(filename)
    }
    else{
        console.log("NO FILE")
    }
}


