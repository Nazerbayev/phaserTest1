import Phaser from 'phaser'

export default class Boot extends Phaser.State {
  init () {
    // Recommended to leave as 1 unless you need multi-touch support
    this.input.maxPointers = 1

    // Phaser will automatically pause if the browser tab the game is in loses focus
    this.stage.disableVisibilityChange = true

    if (this.game.device.desktop) {
      // Desktop specific settings go here
    } else {
      // Mobile specific settings go here
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
      this.scale.setMinMax(480, 260, 1024, 768)
      this.scale.forceLandscape = true
    }
  }

  preload () {
    // Load anything you need for the preloader (e.g. loading bars) here
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('loaderBar', 'assets/images/loader-bar.png')
  }

  create () {
    // Set the stage background colour
    this.game.stage.backgroundColor = '#FFF';
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.minWidth = 240;
    this.scale.minHeight = 170;
    this.scale.maxWidth = 2880;
    this.scale.maxHeight = 1920;

    this.scale.pageAlignHorizontally = true;
    this.scale.refresh();
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Everything from the preload function will have been loaded into cache by
    // this point, so we can now start the preloader
    this.state.start('Preloader')
  }
}
