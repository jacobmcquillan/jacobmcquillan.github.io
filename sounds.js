var sounds = {
  "tankMeas" : {
    url : "audio examples/tankMeasuredIR.wav"
  },
  "tankSim" : {
    url : "audio examples/tankIR.wav",
  },
  "tankSimVelOut" : {
    url : "audio examples/tankIRvelOut.wav",
  },
  "sprMeas" : {
    url : "audio examples/springMeasuredIR.wav",
  },
  "sprSim" : {
    url : "audio examples/springIR.wav",
  },
  "chordDry" : {
    url : "audio examples/chord.wav",
  },
  "chord" : {
    url : "audio examples/chordTankVelOut.wav",
  },
  "riffDry" : {
    url : "audio examples/riff_dry.wav",
  },
  "riff" : {
    url : "audio examples/riffTankvelOut.wav",
  }
};


var soundContext = new AudioContext();

for(var key in sounds) {
  loadSound(key);
}

function loadSound(name){
  var sound = sounds[name];

  var url = sound.url;
  var buffer = sound.buffer;

  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    soundContext.decodeAudioData(request.response, function(newBuffer) {
      sound.buffer = newBuffer;
    });
  }

  request.send();
}

function playSound(name, options){
  var sound = sounds[name];
  var soundVolume = sounds[name].volume || 1;

  var buffer = sound.buffer;
  if(buffer){
    var source = soundContext.createBufferSource();
    source.buffer = buffer;

    var volume = soundContext.createGain();

    if(options) {
      if(options.volume) {
        volume.gain.value = soundVolume * options.volume;
      }
    } else {
      volume.gain.value = soundVolume;
    }

    volume.connect(soundContext.destination);
    source.connect(volume);
    source.start(0);
  }
}
