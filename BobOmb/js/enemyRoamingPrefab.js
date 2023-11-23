class enemyRoamingPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.collideWorldBounds = true;
        this.enemy = this;
        this.nivel=_scene; 
    }


    preUpdate(time,delta)
    {        
            
        if(this.x <= 0)
        {
            this.body.setVelocityX(gamePrefs.ENEMY_SPEED);
        }
        else if(this.x >= config.width)
        {
            this.body.setVelocityX(-gamePrefs.ENEMY_SPEED);
        }
        else
        this.body.setVelocityX(gamePrefs.ENEMY_SPEED);

        super.preUpdate(time, delta); 
    }

}