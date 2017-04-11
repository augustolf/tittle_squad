const SCREEN_WIDTH = 600;
const SCREEN_HEIGHT = 600;

let socket;

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  frameRate(1);
  background(204);
  socket = io.connect('http://localhost:8080');
  socket.on('newEntity', function(data) {
      console.log('newEntity');
  });
}

function draw() {

}