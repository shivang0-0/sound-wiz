const binCount = 1024
let particles = new Array(binCount) //particles array for 1024 particles on display
let fft
let song

let Particle = function(position) {  //initiating properties of object Particle
  this.position = position
  this.speed = createVector(0, 1) //initial speed 0 in x direction and 1 unit in y
  this.color = [random(0, 255), random(0,255), random(0,255)] //giving random color to particle
  
  this.draw = function() {
    fill(this.color) //function of p5
    ellipse( //function of p5 to create ellipse with center,width and height
      this.position.x, this.position.y,
      this.diameter, this.diameter
    )
  }
  
  this.update = function(energy) { //function of p5 to update real-time position of particle
    this.position.y += this.speed.y * energy * 40 //increasing position of particle in y axis based on energy received
    
    if (this.position.y > height) { //if position becomes greater than height of the page then give new position at the top
      this.position.y = 0
    }
    
    this.diameter = random(5,7) + (energy* 69) //increasing diameter of particle based on a formula with given energy
  }
}

function preload() {
  song = loadSound('bones.mp3')
  fft = new p5.FFT()
}

function setup() {
  createCanvas(1920, 1080)
  noStroke()
  song.setVolume(0.5);
  song.loop();  
  positionParticleWave(particles)
}

function draw() {
  background(0)

  // returns an array with [binCount] amplitude readings from lowest to highest frequencies
  let spectrum = fft.analyze()
  updateParticles(spectrum)
}

function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume()
  }
}