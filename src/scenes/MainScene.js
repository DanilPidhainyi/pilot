import { Scene } from "phaser";
import { Player } from "../gameobjects/Player";
import { BlueEnemy } from "../gameobjects/BlueEnemy";

export class MainScene extends Scene {
    player = null;
    enemy_blue = null;
    cursors = null;

    points = 0;
    game_over_timeout = 20;

    constructor() {
        super("MainScene");
    }

    init() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.cameras.main.setBounds(-Infinity, -Infinity, Infinity, Infinity); // Розмір світу
        // this.physics.world.setBounds(-Infinity, -Infinity, Infinity, Infinity);
        this.scene.launch("MenuScene");

        // Reset points
        this.points = 0;
        this.game_over_timeout = 20;
    }

    create() {
        // this.add.image(0, 0, "background")
        //     .setOrigin(0, 0);

        // Створення TileSprite
        this.background = this.add.tileSprite(0, 0, 2400, 2400, 'background-tile');

        // Масштабування текстури (аналог tileScale)
        this.background.setTileScale(0.5, 0.5);

        // Player
        this.player = new Player({ scene: this });
        this.player.setCollideWorldBounds(false)
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1);

        // Enemy
        this.enemy_blue = new BlueEnemy(this);

        // Cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.space.on("down", () => {
            this.player.fire();
        });
        this.input.on("pointerdown", (pointer) => {
            this.player.fire(pointer.x, pointer.y);
        });

        // Overlap enemy with bullets
        this.physics.add.overlap(this.player.bullets, this.enemy_blue, (enemy, bullet) => {
            bullet.destroyBullet();
            this.enemy_blue.damage(this.player.x, this.player.y);
            this.points += 10;
            this.scene.get("HudScene")
                .update_points(this.points);
        });

        // // Overlap player with enemy bullets
        // this.physics.add.overlap(this.enemy_blue.bullets, this.player, (player, bullet) => {
        //     bullet.destroyBullet();
        //     this.cameras.main.shake(100, 0.01);
        //     // Flash the color white for 300ms
        //     this.cameras.main.flash(300, 255, 10, 10, false,);
        //     this.points -= 10;
        //     this.scene.get("HudScene")
        //         .update_points(this.points);
        // });

        // This event comes from MenuScene
        this.game.events.on("start-game", () => {
            this.scene.stop("MenuScene");
            this.scene.launch("HudScene", { remaining_time: this.game_over_timeout });
            this.player.start();
            this.enemy_blue.start();

            // Game Over timeout
            this.time.addEvent({
                delay: 1000,
                loop: true,
                callback: () => {
                    if (this.game_over_timeout === 0) {
                        // You need remove the event listener to avoid duplicate events.
                        this.game.events.removeListener("start-game");
                        // It is necessary to stop the scenes launched in parallel.
                        this.scene.stop("HudScene");
                        this.scene.start("GameOverScene", { points: this.points });
                    } else {
                        this.game_over_timeout--;
                        this.scene.get("HudScene").update_timeout(this.game_over_timeout);
                    }
                }
            });
        });
    }

    update() {
        this.player.update();
        this.enemy_blue.update();
        this.background.tilePositionX += 0.5; // Рух плитки по X
        this.background.tilePositionY += 0.2; // Рух плитки по Y

        // Player movement entries
        if (this.cursors.up.isDown) {
            this.player.move("up");
        }
        if (this.cursors.down.isDown) {
            this.player.move("down");
        }
        if (this.cursors.left.isDown) {
            this.player.move("left");
        }
        if (this.cursors.right.isDown) {
            this.player.move("right");
        }

        if (this.background.x + 1200 - this.player.x < 600) {
            this.background.x += 1200;
        }

        if (this.background.x - this.player.x > 600) {
            this.background.x -= 600;
        }

        if (this.background.y + 1200 - this.player.y < 600) {
            this.background.y += 1200;
        }

        if (this.background.y - this.player.y > 600) {
            this.background.y -= 600;
        }

    }
}
