class level4 extends Phaser.Scene
{
    constructor()
    {
        super({key:'level4'});
    }

    create()
    {
        this.bg_top= this.add.sprite(0,0,'bg_top').setOrigin(0);
        this.bg_down=this.add.sprite(0,192, 'bg_down').setOrigin(0);

        this.bomb = new bombPrefab(this,config.width/2,config.height*.8,'bomb');

        //Directed Spawner
        this.directedSpawner = new directedBulletSpawnerPrefab(this,300,500);


        this.loadAnimations();
        this.loadSounds();
        this.loadPools();

        //Text
        this.tiempoTexto = this.add.text(16, 8, 'TIME LEFT:' 
        + gamePrefs.LEVEL1_TIME, { fontSize: '16px', fill: '#fff' });

        this.scoreText = this.add.text(150, 8, 'SCORE:' 
        + gamePrefs.SCORE, { fontSize: '16px', fill: '#fff' });

        this.healthUI = this.add.sprite(20,20,'healthUI',this.bomb.health)
        .setOrigin(0)
        .setScrollFactor(0)
        .setScale(.1);


        this.bomb.anims.play('idle',false);

        this.levelTimer = this.time.addEvent
        (
            {
                delay: 1000, //ms             
                callback: this.timeReset,
                callbackScope:this,
                loop:true //repeat: -1
            }
        );
        this.scoreTimer=this.time.addEvent
        (
            {
                delay:1000,
                callback:this.scoreBomb,
                callbackScope:this,
                loop:true
            }

        );
        this.plopTimer = this.time.addEvent
        (
            {
                delay: 200, //ms
                callback: this.PlaySound(),
                callbackScope:this,
                loop:true,
                repeat:-1
            }
        );

        this.physics.add.overlap
        (
            this.bomb,
            this.bulletPool,
            this.bomb.hitBomb,
            this.bullet,
            null,
            this
        );
       

    }
    scoreBomb()
    {
        gamePrefs.SCORE+=50;
        this.scoreText.setText('SCORE:' + gamePrefs.SCORE);
    }
    timeReset(){
        //console.log('Entrando en funcion');
        gamePrefs.LEVEL1_TIME--;
        this.tiempoTexto.setText('TIME LEFT:' + gamePrefs.LEVEL1_TIME);

        if(gamePrefs.LEVEL1_TIME===0)
        {
            gamePrefs.LEVEL1_TIME = 30;
            this.walk.stop();
            this.backgroundMusic.stop();
            this.scene.start('level4')
        }
        
    }
    
    PlaySound()
    {
        this.walk.volume=0.009;
        this.backgroundMusic.volume=0.03;
        this.backgroundMusic.play();
        this.walk.play();
    }

    loadAnimations()
    {
        this.anims.create(
        {
            key: 'idle',
            frames:this.anims.generateFrameNumbers('bomb', {start:0, end: 1}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create(
            {
                key: 'enemyWalk',
                frames:this.anims.generateFrameNumbers('enemy', {start:0, end: 2}),
                frameRate: 8,
                repeat: -1
            });
    }

    loadSounds()
    {
        this.walk=this.sound.add('walk').setLoop(true);
        this.backgroundMusic=this.sound.add('bg_music').setLoop(true);
    }


    loadPools()
    {
        this.bulletPool = this.physics.add.group();
    }

    updateHealth()
    {
        this.healthUI.setFrame(this.bomb.health);
    }

    resetScene()
    {
        this.cameras.main.fadeOut(1500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.backgroundMusic.stop();
            this.walk.stop();

            this.scene.start('menu');
        
        })
    }

    update()
    { //Actualiza whatever         
       
       
    }
}