class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");


    }

    create(){
        this.add.text(20,20,"Playing game", {font: '25px Comic sans', fill: 'green' });
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0,0);
        this.player = this.add.image(100, 100, "player");
        this.player.setOrigin(0,0);
    }
}
