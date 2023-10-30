var gamePrefs=
{
    NAVE_SPEED:2,
    BULLET_SPEED:-100,
    ENEMY_SPEED:20
}

var config = 
{
    type: Phaser.AUTO,
    width: 128,
    height: 256,
    scene:[gameState], //array con las escenas
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
            gravity:{y:0}
        }
    }
};

var juego = new Phaser.Game(config);