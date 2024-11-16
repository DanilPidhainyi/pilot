import { Game } from "phaser";
import { Preloader } from "./preloader";
import { GameOverScene } from "./scenes/GameOverScene";
import { HudScene } from "./scenes/HudScene";
import { MainScene } from "./scenes/MainScene";
import { MenuScene } from "./scenes/MenuScene";
import { SplashScene } from "./scenes/SplashScene";

// More information about config: https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    parent: "phaser-container",
    width: 400,
    height: 900,
    backgroundColor: "#1c172e",
    pixelArt: false,
    roundPixel: false,
    max: {
        width: 1200,
        height: 1200,
    },
    scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 50 }
        }
    },
    scene: [
        Preloader,
        SplashScene,
        MainScene,
        MenuScene,
        HudScene,
        GameOverScene
    ]
};

new Game(config);
