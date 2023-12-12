class level2 extends Phaser.Scene
{
    constructor()
    {
        super({key:'level2'});
    }

    preload()
    { //Carga assets en memoria
        //this.cameras.main.setBackgroundColor("112"); 
    

        this.load.setPath('assets/sounds');
        this.load.audio('walk','snd_bomb_plop.mp3');
        this.load.audio('bg_music','snd_music.mp3');
    }
    create()
    {
        this.bg_top= this.add.sprite(0,0,'bg_top').setOrigin(0);
        this.bg_down=this.add.sprite(0,192, 'bg_down').setOrigin(0);
        

        this.bomb = new bombPrefab(this,config.width/2,config.height*.8,'bomb');
        this.enemy = new enemyRoamingPrefab(this,config.width,config.height*.8,'enemy');


        //Up Spawner
        this.upSpawner = new bulletSpawnerPrefab(this,16,config.width-16,-20,-5,0,1,1200,1800);
        //Down Spawner
        this.downSpawner = new bulletSpawnerPrefab(this,16,config.width-16,config.height+5,config.height+20,0,-1,1200,1800);
        //Right Spawner
        this.RightSpawner = new bulletSpawnerPrefab(this,config.width+5,config.width+20,config.height/2+20,config.height-20,-1,0,1200,1800);
        //Left Spawner
        this.LeftSpawner = new bulletSpawnerPrefab(this,-20,-5,config.height/2+20,config.height-20,1,0,1200,1800);
        //Diagonal Spawner
        this.DiagonalSpawner = new bulletSpawnerPrefab(this,-20,-5,config.height/4+20,config.height-config.height/4-20,1,1,1200,1800);


        this.loadAnimations();
        this.loadSounds();
        this.loadPools();

        //Text
        this.tiempoTexto = this.add.text(16, 8, 'TIME LEFT:' 
        + gamePrefs.LEVEL1_TIME, { fontSize: '16px', fill: '#fff' });

        this.scoreText = this.add.text(150, 8, 'SCORE:' 
        + gamePrefs.SCORE, { fontSize: '16px', fill: '#fff' });


        this.bomb.anims.play('idle',false);
        this.enemy.anims.play('enemyWalk',true);
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
        this.scoreText.setText('SCORE:' + gamePrefs.SCORE);
        gamePrefs.SCORE+=50;

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
            this.scene.start('level3')
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

    update()
    { //Actualiza whatever         
        
        
    }


    loadPools()
    {
        this.bulletPool = this.physics.add.group();
    }

    update()
    { //Actualiza whatever         
       
       
    }
}