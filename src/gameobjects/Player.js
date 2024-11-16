import { GameObjects, Physics } from "phaser";
import { Bullet } from "./Bullet";

export class Player extends Physics.Arcade.Image {

    // Player states: waiting, start, can_move
    state = "waiting";
    scene = null;
    bullets = null;
    baseSpeed = 600;
    angleDelta = 2;

    constructor({scene}) {
        super(scene, -190, 100, "player");
        this.speed = this.baseSpeed;
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setDamping(true); // Включення демпінгу
        this.setDrag(100);    // Тертя: чим більше, тим сильніше гальмує
        this.setMaxVelocity(400); // Максимальна швидкість

        this.body.setAngularDrag(0.2); // Дампінг для кутової швидкості
        // this.body.setMaxAngular(300);  // Максимальна швидкість обертання


        // this.propulsion_fire = this.scene.add.sprite(this.x - 32, this.y, "propulsion-fire");
        // this.propulsion_fire.play("fire");

        // Bullets group to create pool
        this.bullets = this.scene.physics.add.group({
            classType: Bullet,
            maxSize: 100,
            runChildUpdate: true
        });
    }

    start() {
        this.state = "start";
        const propulsion_fires_trail = [];

        // Effect to move the player from left to right
        this.scene.tweens.add({
            targets: this,
            x: 200,
            duration: 800,
            delay: 1000,
            ease: "Power2",
            yoyo: false,
            onUpdate: () => {
                // Just a little trail FX
                const propulsion = this.scene.add.sprite(this.x - 32, this.y, "propulsion-fire");
                propulsion.play("fire");
                propulsion_fires_trail.push(propulsion);
            },
            onComplete: () => {
                // Destroy all the trail FX

                // this.propulsion_fire.setPosition(this.x - 32, this.y);

                // When all tween are finished, the player can move
                this.state = "can_move";
            }
        });
    }

    move(direction) {
        if(this.state === "can_move") {
        // && this.y - 10 > 0
            if (direction === "up" ) {
                this.y -= 5;
                this.updatePropulsionFire();
            } else if (direction === "down") {
                //  && this.y + 75 < this.scene.scale.height
                this.y += 5;
                this.updatePropulsionFire();
            }
            if (direction === "left" ) {
                // this.angle -= this.angleDelta
                this.body.angularVelocity -= this.angleDelta;
            } else if (direction === "right") {
                // this.angle += this.angleDelta;
                this.body.angularVelocity += this.angleDelta;
            }
        }
    }

    fire(x, y) {
        if (this.state === "can_move") {
            // Create bullet
            const bullet = this.bullets.get();
            if (bullet) {
                bullet.fire(this.x + 16, this.y + 5, x, y);
            }
        }
    }

    updatePropulsionFire() {
        // this.propulsion_fire.setPosition(this.x - 32, this.y);
    }

    update() {
        // Sinusoidal movement up and down up and down 2px
        // this.y += Math.sin(this.scene.time.now / 200) * 0.10;
        // this.propulsion_fire.y = this.y;

        const angleInRadians = Phaser.Math.DegToRad(this.angle);

        // Використовуємо фізику для руху
        // this.body.velocity.x = Math.cos(angleInRadians) * this.speed;
        // this.body.velocity.y = Math.sin(angleInRadians) * this.speed + this.scene.physics.world.gravity.y;
        const x = Math.cos(angleInRadians) * this.speed;
        const y = Math.sin(angleInRadians) * this.speed;

        this.setAcceleration(x, y)
    }

}
