class levelSelector extends Phaser.Scene
{
    constructor()
    {
        super({key:'levelSelector'});
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
     
     this.load.image('level1_button', 'level1_button.png');
     this.load.image('level2_button', 'level2_button.png');
     this.load.image('level3_button', 'level3_button.png');
     this.load.image('level4_button', 'level4_button.png');
     this.load.image('level5_button', 'level5_button.png');
     this.load.image('level6_button', 'level6_button.png');
     this.load.image('level7_button', 'level7_button.png');
     this.load.image('level8_button', 'level8_button.png');

     this.load.setPath('assets/sounds');
     this.load.audio('click','snd_clicksound.mp3')
     this.load.audio('level','snd_level.mp3')

     this.load.on('complete',function()
     {
         console.log('completed');
         this.levelButtons();
     },this);
    }

    levelButtons()
    {
        this.levelMenuMusic();
        this.splashscreen=this.add.sprite(0,0,'main_menu').setOrigin(0);
        this.level1_button = this.add.image(config.width * 0.28, config.height * 0.2, 'level1_button');
        this.level1_button.setInteractive();
        this.level1_button.on("pointerdown", () => {
            this.clickSound();
            this.cameras.main.fadeOut(2000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('level1')
                this.levelMusic.stop();
                
            })
        })
        
        this.level2_button = this.add.image(config.width * 0.72, config.height * 0.2, 'level2_button');
        this.level2_button.setInteractive();
        this.level2_button.on("pointerdown", () => {
            this.clickSound();
            this.cameras.main.fadeOut(2000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('level2')
                this.levelMusic.stop();
                
            })
        })

        this.level3_button = this.add.image(config.width * 0.28, config.height * 0.4, 'level3_button');
        this.level3_button.setInteractive();
        this.level3_button.on("pointerdown", () => {
            this.clickSound();
            this.cameras.main.fadeOut(2000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('level3')
                this.levelMusic.stop();
                
            })
        })

        this.level4_button = this.add.image(config.width * 0.72, config.height * 0.4, 'level4_button');
        this.level4_button.setInteractive();
        this.level4_button.on("pointerdown", () => {
            this.cameras.main.fadeOut(2000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('level4')
                
            })
        })

        this.level5_button = this.add.image(config.width * 0.28, config.height * 0.6, 'level5_button');
        this.level5_button.setInteractive();
        this.level5_button.on("pointerdown", () => {
            this.cameras.main.fadeOut(2000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('level5')
                
            })
        })

        this.level6_button = this.add.image(config.width * 0.72, config.height * 0.6, 'level6_button');
        this.level6_button.setInteractive();
        this.level6_button.on("pointerdown", () => {
            this.cameras.main.fadeOut(2000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('level6')
                
            })
        })

        this.level7_button = this.add.image(config.width * 0.28, config.height * 0.8, 'level7_button');
        this.level7_button.setInteractive();
        this.level7_button.on("pointerdown", () => {
            this.cameras.main.fadeOut(2000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('level7')
                
            })
        })

        this.level8_button = this.add.image(config.width * 0.72, config.height * 0.8, 'level8_button');
        this.level8_button.setInteractive();
        this.level8_button.on("pointerdown", () => {
            this.cameras.main.fadeOut(2000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('level8')
                
            })
        })
        
        

    }

    clickSound()
    {
        this.click=this.sound.add('click');
        this.click.play();
    }
    levelMenuMusic()
    {
    
        this.levelMusic=this.sound.add('level');
        this.levelMusic.play();
        this.levelMusic.volume=0.03;
    
    }

    



}