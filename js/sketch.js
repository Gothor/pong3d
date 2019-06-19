let _nextScene = null;
let _scene = null;
let _hiScore = 0;

let homeBackgroundImage;
let pongBackgroundImage;

function preload() {
  homeBackgroundImage = loadImage('img/home_background.png');
  pongBackgroundImage = loadImage('img/space.jpg');
}

function setup() {
  createCanvas(640, 480, WEBGL);

  _scene = new Scene_Home();
}

function draw() {
  clear();
  
  if (_scene.idle)
    _scene.idle();
  if (_scene.draw)
    _scene.draw();

  checkNextScene();
}

function mousePressed() {
  if (_scene.mousePressed)
    _scene.mousePressed();
}

function resetDirectionalLights() {
    _renderer.directionalLightColors = [];
    _renderer.directionalLightDirections = [];
    _renderer._useLightShader().setUniform('uDirectionalLightCount', 0)
}

function resetPointLights() {
    _renderer.pointLightColors = [];
    _renderer.pointLightPositions = [];
    _renderer._useLightShader().setUniform('uPointLightCount', 0)
}