class splashScreen extends Phaser.Scene
{

    constructor()
   { //Crear escena
        super({key: "splashScreen"});
   }

   init()
   {//Pintar todo lo que se va a ver en pantalla mientras se cargan los assets
        this.bg = this.add.tileSprite(0,0,gamePrefs.gameWidth,
        gamePrefs.gameHeight,'bg_down').setOrigin(0);
        
   }

   preload()
   { //Cargamos assets
    
        this.load.setPath('assets/fonts/');
        this.load.bitmapFont('UIFont','gameFont.png','gameFont.xml'); 
        this.iniciaJuego();
        
       
   }

   create(){}

   finalizaCarga()
   {
    

   }

   runBomb()
   {
   
   }

   

   ocultaLoader()
   {
       
      
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

   iniciaJuego()
   {
        this.scene.start('gameState');
   }









}