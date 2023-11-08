class gameState extends Phaser.Scene
{
    constructor()
    {
        super({key:'gameState'});
    }

    preload()
    { //Carga assets en memoria
        //this.cameras.main.setBackgroundColor("112"); 
        this.load.setPath('assets/img');
        this.load.image('bg_top','topbg.png');
        this.load.image('bg_down','downbg.png');
        this.load.spritesheet('bomb','bombs.png',
        {frameWidth:16,frameHeight:25});

        this.load.setPath('assets/sounds');
        this.load.audio('walk','snd_bomb_plop.mp3');
    }
    create()
    {
        this.bg_top= this.add.sprite(0,0,'bg_top').setOrigin(0);
        this.bg_down=this.add.sprite(0,192, 'bg_down').setOrigin(0);

        this.bomb = new bombPrefab(this,config.width/2,config.height*.8,'bomb');

        this.loadAnimations();
        this.loadSounds();

        this.bomb.anims.play('idle',false);

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

    }

    PlaySound()
    {
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
    }

    loadSounds()
    {
        this.walk=this.sound.add('walk').setLoop(true);
    }

    update()
    { //Actualiza whatever

    }
       
}