var gamePrefs=
{
    NAVE_SPEED:2,
    BULLET_SPEED:100,
    BOMB_SPEED:120,
    LEVEL1_TIME:30,
    ENEMY_SPEED:100,
    SCORE:0,
   
    
}

var config = 
{
    type: Phaser.AUTO,
    width: 256,
    height: 384,
    scene:[preloader,splashScreen,gameState], //array con las escenas
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
            debug:true
        }
    }
};

var juego = new Phaser.Game(config);