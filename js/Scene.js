function setNextScene(scene) {
    _nextScene = scene;
}

function checkNextScene() {
    if (_nextScene) {
        console.log("New scene !");

        _scene = _nextScene;
        _nextScene = null;
    }
}

