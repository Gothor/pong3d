const SCENE_HOME_MENU_ENTRIES = ['New game'];

class Scene_Home {

    constructor() {
        this.HEIGHT_MENU_ITEM = 0.2;
        this.HEIGHT_GUTTER_MENU = 0.05;
        this.HEIGHT_DISTANCE_MENU_ITEMS = (this.HEIGHT_MENU_ITEM + this.HEIGHT_GUTTER_MENU);

        this.hover = -1;
        this.menuEntries = [];

        for (let i = 0; i < SCENE_HOME_MENU_ENTRIES.length; i++) {
            let graphics = createGraphics(0.8 * width, 0.1 * height);
            graphics.textAlign(CENTER, CENTER);
            graphics.fill(0);
            graphics.noStroke();
            graphics.textSize(32);
            graphics.text(SCENE_HOME_MENU_ENTRIES[i], 0.4 * width, 0.05 * height);

            let image = createImage(0.8 * width, 0.1 * height);

            graphics.loadPixels();
            image.loadPixels();
            for (let i = 0; i < graphics.width; i++) {
                for (let j = 0; j < graphics.height; j++) {
                    let index = (i + j * graphics.width) * 4;
                    image.pixels[index + 0] = graphics.pixels[index + 0];
                    image.pixels[index + 1] = graphics.pixels[index + 1];
                    image.pixels[index + 2] = graphics.pixels[index + 2];
                    image.pixels[index + 3] = graphics.pixels[index + 3];
                }
            }
            image.updatePixels();
            this.menuEntries.push(image);
        }
    }

    idle() {
        this.hover = -1;

        let glMouseX = map(mouseX, 0, width, -1, 1);
        let glMouseY = map(mouseY, 0, height, -1, 1);

        let y = -((SCENE_HOME_MENU_ENTRIES.length - 1) * this.HEIGHT_DISTANCE_MENU_ITEMS) / 2 - this.HEIGHT_MENU_ITEM / 2;
        for (let i = 0; i < SCENE_HOME_MENU_ENTRIES.length; i++) {
            if (glMouseX >= -0.8 && glMouseX <= 0.8 &&
                glMouseY >= y && glMouseY <= y + this.HEIGHT_MENU_ITEM) {
                this.hover = i;
                break;
            }
            y += this.HEIGHT_DISTANCE_MENU_ITEMS;
        }

        if (mouseIsPressed) {
            switch(this.hover) {
              case 0:
                setNextScene(new Scene_Pong());
                break;
            }
        }
    }

    draw() {
        clear();

        camera();
        perspective();

        resetDirectionalLights();
        resetPointLights();
        ambientLight(255);

        texture(homeBackgroundImage);
        push();
            translate(0, 0, -0.1);
            plane(width, height);
        pop();

        let y = -((SCENE_HOME_MENU_ENTRIES.length - 1) * this.HEIGHT_DISTANCE_MENU_ITEMS) / 2 * height / 2;
        for (let i = 0; i < this.menuEntries.length; i++) {
            let entry = this.menuEntries[i];

            push();
                translate(0, y, -0.05);

                if (this.hover === i) {
                    ambientMaterial(255, 255, 255, 25);
                    plane(0.8 * width, 0.1 * height);
                }
            pop();

            push();
                translate(0, y, 0);

                texture(this.menuEntries[i]);
                plane(0.8 * width, 0.1 * height);
            pop();

            y += this.HEIGHT_DISTANCE_MENU_ITEMS * height / 2;
        }

        /*
        print_number(_np, _hiScore, 0, RATIO_H_W - 0.06);

        glBindTexture(GL_TEXTURE_2D, 0);

        checkNextScene();
        */
    }

}