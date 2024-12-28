
const nowPlaying = document.querySelector(".now-playing");
const trackArt = document.querySelector(".track-art");
const trackName = document.querySelector(".track-name");
const playPauseBtn = document.querySelector(".playpause-track");
const nextBtn = document.querySelector(".next-track");
const prevBtn = document.querySelector(".prev-track");
const seekSlider = document.querySelector(".seek_slider");
const volumeSlider = document.querySelector(".volume_slider");
const currTime = document.querySelector(".current-time");
const totalDuration = document.querySelector(".total-duration");

const trackList = [
  { name: "Hey Minnale",  path: "Hey Minnale.mp3" },
  { name: "Carol of the bells",  path: "Cimorelli-Carol-of-the-Bells.mp3" },
  { name: "Malare Ninne",  path: "Malare-Ninne.mp3" }
];

let trackIndex = 0;
let isPlaying = false;
let currTrack = new Audio();

function loadTrack(index) {
  const track = trackList[index];
  currTrack.src = track.path;
  trackName.textContent = track.name;
  nowPlaying.textContent = `PLAYING ${index + 1} OF ${trackList.length}`;
  currTrack.load();
  updateSeek();
}


function togglePlayPause() {
  if (isPlaying) {
    currTrack.pause();
    playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  } else {
    currTrack.play();
    playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }
  isPlaying = !isPlaying;
}


function changeTrack(direction) {
  trackIndex = (trackIndex + direction + trackList.length) % trackList.length;
  loadTrack(trackIndex);
  currTrack.play();
}


function updateSeek() {
  const seekPosition = (currTrack.currentTime / currTrack.duration) * 100;
  seekSlider.value = seekPosition;

  let currentMinutes = Math.floor(currTrack.currentTime / 60);
  let currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);
  let durationMinutes = Math.floor(currTrack.duration / 60);
  let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);

  currTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
  totalDuration.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
}


playPauseBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", () => changeTrack(1));
prevBtn.addEventListener("click", () => changeTrack(-1));
seekSlider.addEventListener("input", () => currTrack.currentTime = (seekSlider.value / 100) * currTrack.duration);
volumeSlider.addEventListener("input", () => currTrack.volume = volumeSlider.value / 100);


loadTrack(trackIndex);
setInterval(updateSeek, 1000);
