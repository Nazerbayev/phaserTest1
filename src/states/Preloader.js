import Phaser from 'phaser'

export default class Preloader extends Phaser.State {
  constructor () {
    super()
  }

  preload () {
    // These are the assets we loaded in Boot.js
    this.splash = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);

    this.loader = this.add.sprite(this.world.centerX, this.world.centerY + 128, 'loaderBar')
    this.loader.anchor.setTo(0.5)

    // Sets a basic loading bar
    this.load.setPreloadSprite(this.loader);

    // Load any assets for the game here
    this.load.image('space', 'assets/images/space.png');
    this.load.image('rock', 'assets/images/rock.png');
    this.load.spritesheet('playership', 'assets/images/player.png', 12, 12);
    this.load.spritesheet('power', 'assets/images/power.png', 12, 12);
    this.load.image('playerParticle', 'assets/images/player-particle.png');
    this.load.audio('collect', 'assets/audio/collect.ogg');
    this.load.audio('explosion', 'assets/audio/explosion.ogg');
  }

  create () {
    this.state.start('MainMenu')
  }
}
