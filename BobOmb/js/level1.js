class level1 extends Phaser.Scene
{
    constructor()
    {
        super({key:'level1'});
    }

    create()
    {
        this.bg_top= this.add.sprite(0,0,'bg_top').setOrigin(0);
        this.bg_down=this.add.sprite(0,192, 'bg_down').setOrigin(0);
        
        

        this.bomb = new bombPrefab(this,config.width/2,config.height*.8,'bomb');


        //Up Spawner
        this.upSpawner = new bulletSpawnerPrefab(this,16,config.width-16,-20,-5,0,1,1800,2200);
        //Down Spawner
        this.downSpawner = new bulletSpawnerPrefab(this,16,config.width-16,config.height+5,config.height+20,0,-1,1800,2200);
        //Right Spawner
        this.RightSpawner = new bulletSpawnerPrefab(this,config.width+5,config.width+20,config.height/2+20,config.height-20,-1,0,1800,2200);
        //Left Spawner
        this.LeftSpawner = new bulletSpawnerPrefab(this,-20,-5,config.height/2+20,config.height-20,1,0,1800,2200);
        

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

        this.coinTimer = this.time.addEvent 
        ( 
            { 
                delay: 1000, //ms 
                callback:this.createCoin, 
                callbackScope:this, 
                loop:true, 
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

        this.physics.add.overlap 
        ( 
            this.bomb, 
            this.coinPool, 
            this.bomb.hitCoin, 
            this.coin, 
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
            this.add.sprite(config.width/2,config.height/2,'lvlpopup');
            gamePrefs.LEVEL1_TIME = 30;
            this.walk.stop();
            this.backgroundMusic.stop();
            this.time.addEvent
            (
                {

                    delay:2000,
                    callback:this.goToScene,
                    callbackScope:this,
                    loop:false
                }

            );
            
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

            this.anims.create(
            {
            key: 'coinIdle',
            frames:this.anims.generateFrameNumbers('coin', {start:0, end: 3}),
            frameRate: 10,
            repeat: -1
            });

            this.anims.create({
            key: 'deathAnim',
            frames: this.anims.generateFrameNumbers('death', { start: 0, end: 19 }),
            frameRate: 10,
            repeat: 0,
            showOnStart:true,
            hideOnComplete:true            
            });

            
    }
    goToScene()
    {
        
        this.scene.start('level2');
        console.log('canviando escena');
    }

    loadSounds()
    {
        this.walk=this.sound.add('walk').setLoop(true);
        this.backgroundMusic=this.sound.add('bg_music').setLoop(true);
        this.coinSound=this.sound.add('coin_sound');
        this.deathSound= this.sound.add('death_sound');
    }


    createExplosion(_bomb)
    {

            console.log('Create explosion');
            this.death = new deathPrefab(this,_bomb.x,_bomb.y,'death');
            this.deathSound.play();
              
    }

    updateHealth()
    {
        this.healthUI.setFrame(this.bomb.health);
    }

    loadPools()
    {
        this.bulletPool = this.physics.add.group();
        this.coinPool = this.physics.add.group();
    }

    createCoin() 
    { 
        //Mirar si hay alguna moneda reciclable en la pool 
        var coin = this.coinPool.getFirst(false); 
 
        var posX = Phaser.Math.Between(20,config.width-20); 
        var posY = Phaser.Math.Between(config.height/2+20,config.height-20); 
         
          if(!coin) 
        {//Que no? La creo 
            console.log('creando moneda'); 
            coin = new coinPrefab(this,posX,posY,'coin'); 
            this.coinPool.add(coin); 
        }else 
        {//Que si? La reciclo 
            console.log('reciclando moneda'); 
            coin.body.reset(posX,posY);                
            coin.active = true; 
        } 
    }


    resetScene()
    {
        this.cameras.main.fadeOut(1500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.backgroundMusic.stop();
            this.walk.stop();
            this.scene.start('menu');
            gamePrefs.LEVEL1_TIME = 30;  
        })
    }
}