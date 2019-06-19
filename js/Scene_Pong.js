class Scene_Pong {

    constructor() {
        this.padWidth = 0.15;
        this.padHeight = 0.10;
        this.ballRadius = 0.05;

        this.NB_PARTICULES_MAX = 50;
        this.ratioHW = height / width;

        this.paused = true;

        this.ball = new p5.Vector();
        this.vBall = new p5.Vector();
        this.player = new p5.Vector();
        this.ai = new p5.Vector();

        this.playerScore = 0;
        this.aiScore = 0;

        this.particules = [];

        this.resetBall();
    }

    resetBall() {
        this.paused = true;

        this.ball.set(0, 0, -1.1);
        this.vBall.set(0, 0, -1 / 60);
    }

    idle() {
        // Move the player
        this.player.x = map(mouseX, 0, width, -0.5, 0.5);
        this.player.y = map(mouseY, 0, height, -0.5 * this.ratioHW, 0.5 * this.ratioHW);

        // Limite du positionnement de la raquette
        if (this.player.x < -0.5 + this.padWidth / 2)
            this.player.x = -0.5 + this.padWidth / 2;
        else if (this.player.x > 0.5 - this.padWidth / 2)
            this.player.x = 0.5 - this.padWidth / 2;

        if (this.player.y < -0.5 * this.ratioHW + this.padHeight / 2)
            this.player.y = -0.5 * this.ratioHW + this.padHeight / 2;
        else if (this.player.y > 0.5 * this.ratioHW - this.padHeight / 2)
            this.player.y = 0.5 * this.ratioHW - this.padHeight / 2;

        // Move the AI
        if (!this.paused) {
            let direction = new p5.Vector(this.ball.x - this.ai.x,
                                          this.ball.y - this.ai.y,
                                          0);
            let mag = direction.mag();
            direction.setMag(1);

            if (this.ball.z < -1.5 && this.vBall.z < 0) {
                direction.mult(1 / 60);
                if (direction.mag() < mag) {
                    this.ai.x += direction.x;
                    this.ai.y += direction.y;
                } else {
                    this.ai.x = this.ball.x;
                    this.ai.y = this.ball.y;
                }

                /*
                    if (_aiX < -0.5 + this.padWidth)
                        _aiX = -0.5 + this.padWidth;
                    else if (_aiX > 0.5 - this.padWidth)
                        _aiX = 0.5 - this.padWidth;

                    if (_aiY < -0.5* RATIO_H_W + this.padHeight)
                        _aiY = -0.5* RATIO_H_W + this.padHeight;
                    else if (_aiY > 0.5* RATIO_H_W - this.padHeight)
                        _aiY = 0.5* RATIO_H_W - this.padHeight;
                */


            }
        }

        if (!this.paused) {
            this.ball.add(this.vBall);

            if ((this.ball.x - this.ballRadius <= -0.5 && this.vBall.x < 0) ||
                (this.ball.x + this.ballRadius >= 0.5 && this.vBall.x > 0)) {
                this.vBall.x *= -1;
            }
            if ((this.ball.y - this.ballRadius <= -0.5 * this.ratioHW && this.vBall.y < 0) ||
                (this.ball.y + this.ballRadius >= 0.5 * this.ratioHW && this.vBall.y > 0)) {
                this.vBall.y *= -1;
            }

            if (this.ball.z - this.ballRadius <= -2.4) {
                if (this.ball.x >= this.ai.x - this.padWidth / 2 && this.ball.x <= this.ai.x + this.padWidth / 2 &&
                    this.ball.y >= this.ai.y - this.padHeight / 2 && this.ball.y <= this.ai.y + this.padHeight / 2 &&
                    this.vBall.z < 0) {
                    this.vBall.z *= -1;
                    this.vBall.setMag(this.vBall.mag() + 0.05 / 60);
                }
            }

            if (this.ball.z + this.ballRadius >= -1) {
                if (this.ball.x >= this.player.x - this.padWidth / 2 && this.ball.x <= this.player.x + this.padWidth / 2 &&
                    this.ball.y >= this.player.y - this.padHeight / 2 && this.ball.y <= this.player.y + this.padHeight / 2 &&
                    this.vBall.z > 0) {
                    let direction = new p5.Vector(
                        map(this.ball.x, this.player.x - this.padWidth / 2, this.player.x + this.padWidth / 2, -1, 1),
                        map(this.ball.y, this.player.y - this.padHeight / 2, this.player.y + this.padHeight / 2, -1, 1),
                        -1);
                    direction.setMag(this.vBall.mag() + 0.05 / 60);
                    this.vBall = direction;
                }
            }

            if (this.ball.z + this.ballRadius <= -2.4) {
                this.playerScore++;
                console.log(`${this.playerScore} - ${this.aiScore}`);
                this.resetBall();
            } else if (this.ball.z - this.ballRadius >= -1) {
                this.aiScore++;
                console.log(`${this.playerScore} - ${this.aiScore}`);
                this.resetBall();
                if (this.aiScore === 3) {
                    if (this.playerScore > _hiScore)
                        _hiScore = this.playerScore;
                    setNextScene(new Scene_Home());
                }
            }
        } else {
            this.ball.x = this.player.x;
            this.ball.y = this.player.y;
        }
    }

    draw() {
        camera(0, 0,  0,
               0, 0, -1,
               0, 1,  0);

        background(0);

        // Dessin des vies
        resetDirectionalLights();
        resetPointLights();
        ambientLight(255);
        ortho(-1, 1, -this.ratioHW, this.ratioHW, 0, 100);
        for (let i = 0; i < 3 - this.aiScore; i++) {
            resetMatrix();
            translate(1 - 0.1 * (i + 1), -this.ratioHW + 0.1, -2);
            ambientMaterial(255, 150, 0);
            sphere(0.048);
            translate(0, 0, 1);
            ambientMaterial(255, 200, 0);
            sphere(0.04);
        }

        perspective(2 * atan(3/8), width / height, 1, 7);
        resetMatrix();

        // Draw the background
        texture(pongBackgroundImage);
        push();
            translate(0, 0, -3);
            plane(2, 2);
        pop();

        // Draw the box
        //pointLight(150, 150, 150, 1, -1, -3);
        directionalLight(255, 255, 255, -2, -1, -4);
        pointLight(255, 255, 255, 0, 0.5, -1.5);
        ambientMaterial(150);
        push()
            translate(0, 0, -1.5);

            push();
                rotateZ(0);
                translate(0, 0.5 * this.ratioHW, 0);
                rotateX(-PI / 2);
                plane(1, 2);
            pop();
            push();
                rotateZ(PI);
                translate(0, 0.5 * this.ratioHW, 0);
                rotateX(PI / 2);
                plane(1, 2);
            pop();
            push();
                rotateZ(PI / 2);
                translate(0, 0.5, 0);
                rotateX(PI / 2);
                plane(this.ratioHW, 2);
            pop();
            push();
                rotateZ(3 * PI / 2);
                translate(0, 0.5, 0);
                rotateX(-PI / 2);
                plane(this.ratioHW, 2);
            pop();
        pop();

        ambientMaterial(color(0, 255, 0));
        push()
            translate(0, 0, this.ball.z);

            push();
                rotateZ(0);
                translate(0, 0.499 * this.ratioHW, 0);
                rotateX(-PI / 2);
                plane(1, 0.01);
            pop();
            push();
                rotateZ(PI);
                translate(0, 0.499 * this.ratioHW, 0);
                rotateX(PI / 2);
                plane(1, 0.02);
            pop();
            push();
                rotateZ(PI / 2);
                translate(0, 0.499, 0);
                rotateX(PI / 2);
                plane(this.ratioHW, 0.02);
            pop();
            push();
                rotateZ(3 * PI / 2);
                translate(0, 0.499, 0);
                rotateX(-PI / 2);
                plane(this.ratioHW, 0.02);
            pop();
        pop();

        resetDirectionalLights();
        resetPointLights();

        // Draw the AI pad
        ambientMaterial(color(0, 0, 150, 150));
        push();
            translate(this.ai.x, this.ai.y, -2.4);
            plane(this.padWidth, this.padHeight);
        pop();

        // Draw the ball
        directionalLight(255, 255, 255, 0, 0, -2);
        ambientMaterial(color(100));
        push();
            translate(this.ball.x, this.ball.y, this.ball.z);
            sphere(this.ballRadius);
        pop();

        // Draw the player pad
        ambientMaterial(color(0, 0, 150, 150));
        push();
            translate(this.player.x, this.player.y, -1);
            plane(this.padWidth, this.padHeight);
        pop();
    }

    mousePressed() {
        this.paused = false;
    }

}