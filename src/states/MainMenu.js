import Phaser from 'phaser'

export default class MainMenu extends Phaser.State {
  init(score = 0) {
    this.highestScore = this.highestScore || 0;
    this.highestScore = Math.max(score, this.highestScore)
  }
  create () {
    this.background = this.game.add.tileSprite(0,0, this.game.width, this.game.height, 'space');
    this.background.autoScroll(-20, 0);

    var text = "Tap to begin";
    var style = {
      font: "30px Arial",
      fill: "#FFF",
      align: "center"
    }

    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5);

    text = `Highest score: ${this.highestScore}`;
    style = {
      font: "15px Arial",
      fill: "#FFF",
      align: "center"
    }

    var h = this.game.add.text(this.game.width/2, this.game.height/2 + 50, text, style);
    h.anchor.set(0.5);
  }
  update() {
    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('Play');
    }
  }
}
