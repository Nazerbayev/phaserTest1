import Phaser from 'phaser'

export default class Play extends Phaser.State {
  create () {
    // Add your game content here
    this.game.world.setBounds(0, 0, 1920, 1920);
    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
    this.player = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playership');
    this.player.scale.setTo(5);

    this.player.animations.add('fly', [0, 1, 2, 3], 5, true);
    this.player.animations.play('fly');
    this.playerScore = 0;
    this.physics.arcade.enable(this.player);
    this.playerSpeed = 120;
    this.player.body.collideWorldBounds = true;
    this.game.camera.follow(this.player);

    this.explosionSound = this.add.audio('explosion');
    this.collectSound = this.add.audio('collect');

    this.generateAsteroids();
    this.generateCollectables();
    this.showLabels();
  }

  showLabels() {
    var text = 0;
    var style = {
      font: "20px Arial",
      fill: "#FFF",
      align: "center"
    }
    this.scoreLabel = this.add.text(this.game.width - 50, this.game.height - 50, text, style);
    this.scoreLabel.fixedToCamera = true;
  }

  update () {
    if (this.game.input.activePointer.justPressed()) {
      this.physics.arcade.moveToPointer(this.player, this.playerSpeed);
    }
    this.game.physics.arcade.collide(this.player, this.asteroids, this.hitAsteroid, null, this);
    this.game.physics.arcade.overlap(this.player, this.collectables, this.hitCollectable, null, this);
  }

  hitAsteroid(player, asteroid) {
    this.explosionSound.play();
    this.player.kill();
    this.game.time.events.add(800, this.gameOver, this);
  }

  hitCollectable(player, collectable) {
    this.collectSound.play();
    this.playerScore++;
    this.scoreLabel.text = this.playerScore;
    collectable.kill();
  }

  generateAsteroids() {
    this.asteroids = this.add.group();
    this.asteroids.enableBody = true;
    this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;
    var numAsteroids = this.game.rnd.integerInRange(150, 200);
    var asteroid;

    for (var i = 0; i < numAsteroids; i++) {
      asteroid = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
      asteroid.scale.setTo(this.game.rnd.integerInRange(10, 40) / 10);
      asteroid.body.velocity.x = this.game.rnd.integerInRange(-20, 20);
      asteroid.body.velocity.y = this.game.rnd.integerInRange(-20, 20);
      asteroid.body.immovable = true;
      asteroid.body.collideWorldBounds = true;

    }
  }

  gameOver() {
    this.game.state.start('MainMenu', true, false, this.playerScore)
  }

  generateCollectables() {
    this.collectables = this.add.group();
    this.collectables.enableBody = true;
    this.collectables.physicsBodyType = Phaser.Physics.ARCADE;

    var numCollectables = this.game.rnd.integerInRange(100, 150);
    var collectable;

    for (var i = 0; i < numCollectables; i++) {
      collectable = this.collectables.create(this.game.world.randomX, this.game.world.randomY, 'power');
      collectable.animations.add('fly', [0, 1, 2, 3], 5, true);
      collectable.animations.play('fly');
    }

  }

}
