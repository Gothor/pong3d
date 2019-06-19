class Particule {

    constructor(r) {
        this.position = new p5.Vector(0, 0, 0);
        this.velocity = new p5.Vector(0, 0, 0);
        this.acceleration = new p5.Vector(0, 0, 0);
        this.radius = r;
    }

    update() {
        /*
        void particule_update(particule_t* p, float time) {
            p->r -= (p->r - p->r * 0.01) * time;

            vector_t acc = vec_multc(&p->acc, time);
            vec_addm(&p->vel, &acc);

            vector_t vel = vec_multc(&p->vel, time);
            vec_addm(&p->pos, &vel);

            vec_multm(&p->vel, 0.9);
            //vec_multm(&p->acc, 0.9);
        }
        */
    }

    setPosition(x, y, z) {
        this.position.set(x, y, z);
    }

    setVelocity(x, y, z) {
        this.velocity.set(x, y, z);
    }

    setAcceleration(x, y, z) {
        this.acceleration(x, y, z);
    }

}