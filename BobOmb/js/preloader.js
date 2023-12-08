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
        this.load.image('obstacle','obstacle.png');
        
        this.load.spritesheet('bomb','bombs.png',
        {frameWidth:16,frameHeight:25});
        this.load.spritesheet('enemy','bombEnemy.png',
        {frameWidth:16,frameHeight:16});
        


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