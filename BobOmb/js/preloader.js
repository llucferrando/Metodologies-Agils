class preloader extends Phaser.Scene
{
    constructor()
    { 
       super({key: "preloader"});
    }

    preload()
    {  //cargamos los assets mínimos necesarios para el loader
        this.load.setPath('assets/img');
        this.load.image('bg_top','topbg.png');
        this.load.image('bg_down','downbg.png');
        this.load.image('bullet','fireball.png');
        this.load.image('bowserBullet','fire.png');
        this.load.image('bowser','bowser.png');
        this.load.image('obstacle','obstacle.png');
        this.load.image('lvlpopup','level_popup.png')
        this.load.spritesheet('healthUI','bobomb_hearts.png',
        {frameWidth:900,frameHeight:300});
        this.load.spritesheet('death','anyrgb.com.png',
        {frameWidth:240,frameHeight:150});
        this.load.spritesheet('coin','coin.png',
        {frameWidth:16,frameHeight:16});
        
        this.load.spritesheet('bomb','bombs.png',
        {frameWidth:16,frameHeight:25});
        this.load.spritesheet('enemy','bombEnemy.png',
        {frameWidth:16,frameHeight:16});

        this.load.setPath('assets/img');
        this.load.spritesheet('healthUI','bobomb_hearts.png',
        {frameWidth:900,frameHeight:300});

        this.load.setPath('assets/sounds');
        this.load.audio('walk','snd_bomb_plop.mp3');
        this.load.audio('bg_music','snd_music.mp3');
        this.load.audio('coin_sound','smw_coin.wav');
        this.load.audio('death_sound','explosion.mp3');
        
        


        this.load.on('complete',function()
        {
            this.scene.start('splashScreen');
        },this);
    }
    //Empty
    create(){}
    //Empty funcs
    update(){}






















}