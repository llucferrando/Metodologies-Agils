class enemyPrefab extends Phaser.GameObjects.Sprite
{
    //constructor(_scene,_posX,_posY,_spriteTag='enemy')
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        //this.nave = Scene.physics.add.sprite(posX,posY,spriteTag);
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        this.setOrigin(.5,0);
        this.anims.play('enemy_idle');
        //this.health = 2;

    }

    preUpdate(time,delta)
    {
        if(this.y>=config.height)
        {
            this.active = false;
        }

        super.preUpdate(time,delta);
    }
}