var gamePrefs=
{
    NAVE_SPEED:2,
    MAX_LIVES:3,
    BULLET_SPEED:100,
    BOMB_SPEED:120,
    LEVEL1_TIME:30,
    ENEMY_SPEED:100,
    SCORE:0,
    LEVEL_WIDTH:256,
    LEVEL_HEIGHT:384
   
    
}

var config = 
{
    type: Phaser.AUTO,
    width: gamePrefs.LEVEL_WIDTH,
    height: gamePrefs.LEVEL_HEIGHT,
    scene:[preloader,splashScreen,menu,levelSelector,gameState,level1,level2,level3,level4,level5], //array con las escenas
    render:
    {
        pixelArt:true
    },
    scale:
    {
        mode:Phaser.Scale.FIT,
        autoCenter:Phaser.Scale.CENTER_BOTH
    },
    physics:
    {
        default:'arcade',
        arcade:
        {
            gravity:{y:0},
            debug:false
        }
    }
};

var juego = new Phaser.Game(config);