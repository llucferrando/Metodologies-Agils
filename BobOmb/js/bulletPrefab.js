class bulletPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.collideWorldBounds = true;
        this.nivel = _scene;
        this.bullet = this;
    }
    
    preUpdate()
    {
        this.rotation +=0.4;


        if(this.y<=-30 || this.y>=config.height+30)
        {
            this.active = false;
        }
    }
}