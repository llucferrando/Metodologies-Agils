class menu extends Phaser.Scene
{
    constructor()
   { //Crear escena
        super({key: "menu"});
   }

preload()
{
     this.load.setPath('assets/fonts/');
     this.load.bitmapFont('gameFont','gameFont.png','gameFont.xml');
     this.load.setPath('assets/img');
     this.load.image('main_menu', 'main_menu_bg.png');
     this.load.image('play_button', 'play_button.png');
     this.load.image('sound_button', 'sound_button.png');
     this.load.image('exit_button', 'exit_button.png');
     this.load.on('complete',function()
     {
         console.log('completed');
         this.menuNavigation();
     },this);

}


menuNavigation()
{
     this.splashscreen=this.add.sprite(0,0,'main_menu').setOrigin(0);
     this.play_button = this.add.image(config.width * 0.5, config.height * 0.6, 'play_button');
      this.play_button.setInteractive();
      this.play_button.on("pointerdown", () => {
          this.cameras.main.fadeOut(2000, 0, 0, 0);
          this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
              this.scene.start('gameState')
              
          })
      })
      this.sound_button = this.add.image(config.width * 0.5, config.height * 0.7, 'sound_button');
      this.sound_button.setInteractive();
      /*this.sound_button.on("pointerdown", () => {
          this.cameras.main.fadeOut(2000, 0, 0, 0);
          this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
              this.scene.start('gameState')
              
          })
      })*/
      this.exit_button = this.add.image(config.width * 0.5, config.height * 0.8, 'exit_button');
      this.exit_button.setInteractive();
      this.exit_button.on("pointerdown", () => {
          this.cameras.main.fadeOut(2000, 0, 0, 0);
          this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
              this.scene.stop();
              
          })
      })
      



}
}