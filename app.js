class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentSnare = "./sounds/snare-acoustic01.wav";
    this.currentHihat = "./sounds/hihat-acoustic01.wav";
    this.currentOpenhat = "./sounds/openhat-acoustic01.wav";
    this.currentExhaust = "./sounds/hellcat.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.openhatAudio = document.querySelector(".openhat-sound");
    this.exhaustAudio = document.querySelector(".exhaust-sound");
    this.index = 0;
    this.bpm = 200; //bits per minute means how fast loop over
    this.isPlaying = null;
    this.selects = document.querySelector("select");
  }
  activePad() {
    this.classList.toggle("active");
  }

  //lets start adding method
  repeat() {
    let step = this.index % 8;
    // console.log(`step ${step} and index is ${this.index}`); --> to see how step works
    const activeBars = document.querySelectorAll(`.b${step}`);
    //console.log(step); --> to see our step works or not!
    //loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      //check if pads are active!
      //null
      if (bar.classList.contains("active")) {
        //check each sound
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0; //to play on correct note again
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
        if (bar.classList.contains("openhat-pad")) {
          this.openhatAudio.currentTime = 0;
          this.openhatAudio.play();
        }
        if (bar.classList.contains("exhaust-pad")) {
          this.exhaustAudio.currentTime = 7;
          this.exhaustAudio.play();
        }
      }
    });
    this.index++;
  }
  //lets make start method which also repeat method
  start() {
    // console.log(this);
    const interval = (60 / this.bpm) * 1000;
    //check if its playing
    if (this.isPlaying) {
      //clear the interval
      clearInterval(this.isPlaying);
      console.log(this.isPlaying);
      this.isPlaying = null;
      //
    } else {
      this.isPlaying = setInterval(() => {
        //arrow function keeps outer function and do not let it to refer to window
        this.repeat();
      }, interval);
    }
  }
  updateBtn() {
    //null
    if (!this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }
}

const drumKit = new DrumKit();
// drumKit.start();

//event listner

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", function () {
  drumKit.updateBtn();
  //and we added callback function
  drumKit.start();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function () {
    drumKit.changeSound();
  });
});
