class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
    //audio src
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentSnare = "./sounds/snare-acoustic01.wav";
    this.currentHihat = "./sounds/hihat-acoustic01.wav";
    //all audios
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150; //bits per minute means how fast loop over
    this.isPlaying = null;
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
      bar.style.animation = "playTrack 0.3s alternate ease-in-out 2";
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
      }
    });
    this.index++;
  }
  //lets make start method which also repeat method
  start() {
    let interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  updateBtn() {
    //null
    if (!this.isPlaying) {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    } else {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    }
  }
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
  }
  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.muted = true;
          break;
        case "1":
          this.snareAudio.muted = true;
          break;
        case "2":
          this.hihatAudio.muted = true;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.muted = false;
          break;
        case "1":
          this.snareAudio.muted = false;
          break;
        case "2":
          this.hihatAudio.muted = false;
          break;
      }
    }
  }
  // changeTempo(e) {
  //   const tempoText = document.querySelector(".tempo-nr");

  //   tempoText.innerText = e.target.value;
  // }
  // updateTempo(e) {
  //   clearInterval(this.isPlaying);
  //   this.bpm = e.target.value;
  //   this.isPlaying = null;
  //   const playBtn = document.querySelector(".play");
  //   if (playBtn.classList.contains("active")) {
  //     this.start();
  //   }
  // }
  changeTempo(e) {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    let playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
  updateTempo(e) {
    let tempoNo = document.querySelector(".tempo-nr");
    this.bpm = e.target.value;
    tempoNo.innerText = e.target.value;
  }
}

const drumKit = new DrumKit();
// drumKit.start();

//Event listners

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", () => {
  //and we added callback function
  drumKit.start();
  drumKit.updateBtn();
});

drumKit.selects.forEach((select) => {
  //we want to make callback function to run follow function
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});

drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.updateTempo(e);
});

drumKit.tempoSlider.addEventListener("change", function (e) {
  drumKit.changeTempo(e);
});
