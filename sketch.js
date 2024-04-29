var mode = 0;
var splash; 
let songs = [];
let correctArtists = []; 
let currentQuestion = 0; 
let score = 0; 
let currentSong;
let isGameStarted = false;

function preload() {
  loadSound('Hallucinate.mp3', function(sound) {
    songs.push(sound);
    correctArtists.push("Dua Lipa");
  });

  loadSound('Lose You To Love Me.mp3', function(sound) {
    songs.push(sound);
    correctArtists.push("Selena Gomez");
  });

  loadSound('I Like Me Better.mp3', function(sound) {
    songs.push(sound);
    correctArtists.push("Lauv");
  });
  loadSound('Bartier Cardi.mp3', function(sound) {
    songs.push(sound);
    correctArtists.push("Cardi B");
  });
}

function setup() {
  createCanvas(displayWidth, displayHeight); // full screen
  splash = new Splash(); 
}

function draw() {
  if (mode == 0) {
    splash.show();
  } else if (mode == 1) {
    background(random(255), random(255), random(255));
    drawRainbows();
    text(`Score: ${score}`, width / 2, 30);
  }
}

function mousePressed() {
  if (mode == 0) {
    mode = 1;
    isGameStarted = true;
    playNextQuestion();
  }
}

function playNextQuestion() {
  // Stop the current song if it's playing
  if (currentSong) {
    currentSong.stop();
  }
  
  if (currentQuestion < songs.length) {
    let song = songs[currentQuestion];
    currentSong = song; // Update current song
    song.play();
    createGuessInput();
  } else {
    gameOver();
  }
}

function createGuessInput() {
  let input = createInput();
  input.position(width / 2 - 100, height / 2 + 20);
  input.size(200, 20);
  input.attribute('placeholder', 'Enter singer\'s name');
  input.changed(checkAnswer);
}

function checkAnswer() {
  let guess = this.value().toLowerCase();
  let correctArtist = correctArtists[currentQuestion];
  if (guess === correctArtist.toLowerCase()) {
    score++;
    alert("Correct!");
  } else {
    alert("Wrong!");
  }
  currentQuestion++;
  if (currentQuestion < songs.length) {
    playNextQuestion();
  } else {
    gameOver();
  }
}

function gameOver() {
  mode = 2;
  if (currentSong) {
    currentSong.stop();
  }
  
  background(random(255), random(255), random(255)); 
  drawRainbows();
  text("Game Over! Your final score is: " + score, width / 2, height / 2);
}

function drawRainbows() {
  let rainbowWidth = 700;
  let rainbowHeight = 800;
  let colors = ['red', 'orange', 'green', 'blue', 'indigo', 'violet'];
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    arc(width / 2, height / 2, rainbowWidth, rainbowHeight, PI + QUARTER_PI * i, PI + QUARTER_PI * (i + 1));
  }
}

class Splash {
  constructor() {
    this.splashBorder = 100;
  }

  show() {
    background(0); 
    drawRainbows();
    fill(255);
    textSize(50);
    text("Artist Guessing Game", width / 2, height / 2 - 100);
    textSize(20);
    text("Welcome to the Music Guessing Game!", width / 2, height / 2 - 50);
    textSize(16);
    text("Play a song and guess the artist and the song name. You can even play with friends.", width / 2, height / 2);
     textSize(16);
    text("Andrea Liu", width / 2, height / 2 - 79);
    textSize(30);
    text("Click to Start", width / 2, height / 2 + 50);
  }
}
