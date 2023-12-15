class WorldOneLevelOne extends Phaser.Scene {
    constructor() {
        super("WorldOneLevelOne");
    }
    scoreText;
    gameOver = false;
    score = 0;
    iw = window.innerWidth;
    ih = window.innerHeight;
    cursors;
    platforms;
    bombs;
    pvx = 0;
    pvy;
    left;
    right;
    speedX = 2.5;
    sky;
    startGame;
    stars;
    body;
    head;
    jp = 575;
    g = 1000;
    create ()
    {
        //alert("Game Started");
        // Create the camera
        this.cameras.main.setSize(window.innerWidth, window.innerHeight);
        //  A simple background for our game
        this.sky = this.add.tileSprite(200, 200, 400, 600, 'sky').setScale(1000);
        //alert("Background Made");

        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.physics.add.staticGroup();
        this.startGame = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.platforms.create(0, 500, 'ground').setScale(1000, 1).refreshBody();
        this.platforms.create(750, 350, 'block').setScale(1, 1).refreshBody();
        this.platforms.create(850, 400, 'block').setScale(1, 1).refreshBody();
        this.platforms.create(950, 300, 'block').setScale(1, 1).refreshBody();
        this.platforms.create(850, 300, 'block').setScale(1, 1).refreshBody();
        

        //this.startGame.create((this.iw/2)+500, 50, 'zone');

        //  Now let's create some ledges
        //this.platforms.create((this.iw/2), 400, 'ground').setScale(0.5, 1).refreshBody();
        
        // Lets create the menu



        // The player and its settings
        //this.player = this.head + this.body;
        this.head = this.physics.add.staticGroup();
        this.head = this.head.create(100, 450, 'head').setCircle(1);
        this.body = this.physics.add.sprite(100, 450, 'body');

        //  Player physics properties. Give the little guy a slight bounce.
        this.body.setBounce(0.15);
        //this.player.setCollideWorldBounds(false);
        
        // Start Camera Following
        this.cameras.main.startFollow(this.body);
        //alert("Camera Followed");

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'BodyLeft',
            frames: this.anims.generateFrameNumbers('body', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'BodyTurn',
            frames: [ { key: 'body', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'BodyRight',
            frames: this.anims.generateFrameNumbers('body', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // Our player animations for the head
        this.anims.create({
            key: 'HeadLeft',
            frames: this.anims.generateFrameNumbers('head', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'HeadTurn',
            frames: [ { key: 'head', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'HeadRight',
            frames: this.anims.generateFrameNumbers('head', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });


        //  Input Events
        this.cameras.main.startFollow(this.body, true);
        this.cameras.main.setBounds(0, 0, 999999999, 0);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.followOffset.set(0, 0);

        this.cameras.main.setDeadzone(200, 350);
        this.cameras.main.setZoom(1);

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
//        this.stars = this.physics.add.group({
//            key: 'star',
//            repeat: 11,
//            setXY: { x: 600, y: 0, stepX: 70 }
//        });

//        this.stars.children.iterate(child =>
//        {
            //  Give each star a slightly different bounce
//            child.setBounceY(Phaser.Math.FloatBetween(0, 0.5));

//        });

        this.bombs = this.physics.add.group();

        //  The score
        this.scoreText = this.add.text(this.cameras.x, 16, 'Score: 0', { fontSize: '32px', fill: '#000', fontFamily: 'cursive' }).setScrollFactor(0);

        //  Collide the player and the stars with the platforms
//        this.physics.add.collider(this.stars, this.platforms);
this.physics.add.collider(this.body, this.platforms);
this.physics.add.collider(this.head, this.platforms);
//this.physics.add.collider(this.player, this.startGame);
        this.physics.add.collider(this.bombs, this.platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
//        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.overlap(this.body, this.startGame, this.startGameCutscene, null, this);
        this.physics.add.collider(this.body, this.bombs, this.hitBomb, null, this);
    }

    update ()
    {
        this.head.x = this.body.x;
        this.head.y = this.body.y - 20;
        this.head.refreshBody();
        //this.platforms.create(this.player.x, 500, 'ground').setScale(1).refreshBody();
        this.sky.tilePositionX += 1;
        //this.bg.tilePositionY += 1.5;
        const cam = this.cameras.main;

        if (cam.deadzone)
        {
            this.moveCam
        }
        else if (cam._tb)
        {
            this.moveCam
        }


        this.physics.world.gravity.y = this.g;
        if (this.gameOver)
        {
            this.scene.start("bootGame");
        }
        if (this.body.y > 1080){
            this.scene.start("bootGame");
        }

        if (this.cursors.left.isDown)
        {
            this.left = true; 
            this.right = false;
            if(this.pvx == 0){
                this.pvx -= 1;
            }
            if(this.pvx > -320){
            this.pvx -= this.speedX;
            console.log(this.pvx);
            }
           // this.player.setVelocityX(320);
           this.body.setVelocityX(this.pvx); 
           this.body.anims.play('BodyLeft', true);
           this.head.anims.play('HeadLeft', true);
        }else if(!this.cursors.left.isDown && !this.cursors.right.isDown && this.left){
            this.body.setVelocityX(this.pvx);
            if(this.pvx < -1*this.speedX){
                this.pvx += this.speedX;
            }
            this.body.anims.stop('BodyLeft');
            this.body.anims.play('BodyLeft');
            this.body.anims.stop('BodyLeft');
            this.head.anims.stop('HeadLeft');
            this.head.anims.play('HeadLeft');
            this.head.anims.stop('HeadLeft');
        }
        else if (this.cursors.right.isDown)
        {
            this.left = false;
            this.right = true;
            if(this.pvx == 0){
                this.pvx += 1;
            }
            if(this.pvx < 320){
            this.pvx += this.speedX;
            console.log(this.pvx);
            }
           // this.player.setVelocityX(320);
           this.body.setVelocityX(this.pvx); 
           this.body.anims.play('BodyRight', true);
           this.head.anims.play('HeadRight', true);
        }else if(!(this.cursors.left.isDown) && !(this.cursors.right.isDown) && this.right){
            if(this.right){
            this.body.setVelocityX(this.pvx);
            if(this.pvx > this.speedX){
                this.pvx -= this.speedX;
            }
            this.body.anims.stop('BodyRight');
            this.body.anims.play('BodyRight');
            this.body.anims.stop('BodyRight');
            this.head.anims.stop('HeadRight');
            this.head.anims.play('HeadRight');
            this.head.anims.stop('HeadRight');
            this.pvx = 0;
        }
    }
        if (this.cursors.up.isDown)
        {
            if(this.body.body.touching.down){
            this.body.setVelocityY(this.jp*-1);
            }
        }
    }
    startGameCutscene(body, gameStart)
    {
        playerx = this.body.x;
        playery = this.body.y;
        this.scene.start("GameStartCutscene");       
    }


    collectStar (body, star)
    {
        star.disableBody(true, true);

        //  Add and update the score
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);

        if(this.stars.countActive(true) === 11){
            this.jp = 200;
        }else if(this.stars.countActive(true) === 10){
            //this.g = 500;
            this.jp = 333;
        }else if(this.stars.countActive(true) === 9){
            //this.g = 10000;
            this.jp = 350;
        }else if(this.stars.countActive(true) === 8){
            this.jp = 350;
        }else if(this.stars.countActive(true) === 7){
            this.g = 350;
        }
        


        if (this.stars.countActive(true) === 0)
        {
            //  A new batch of stars to collect
            this.stars.children.iterate(child =>
            {

                child.enableBody(true, child.x, 0, true, true);

            });

            const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            const bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

        }
    }

    hitBomb (player, bomb)
    {
        location.reload();
    }



}