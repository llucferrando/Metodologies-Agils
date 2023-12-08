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
     this.load.bitmapFont('gameFont','gameFont.png','gameFont.xml'); 
     this.load.setPath('assets/img');
     this.load.image('splash_screen', 'splash_screen.png');
     this.load.on('complete',function()
     {
         console.log('completed');
         this.finalizaCarga();
     },this);
        
        
       
   }

   create(){}

   finalizaCarga()
   {
     
     this.splashscreen = this.add.sprite(0,0,'splash_screen').setOrigin(0);
  
      this.time.addEvent(
          {
              delay: 5000,
              callback: this.initMenu,
              callbackScope: this,
              repeat: 0
          }
      );

   }
   

   
   initMenu()
   {
        this.scene.start('gameState');
   }










}