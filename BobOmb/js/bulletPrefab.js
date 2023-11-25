class bulletPrefab extends Phaser.GameObjects.Sprite
{
    //constructor(_scene,_posX,_posY,_spriteTag='bullet')
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        //this.nave = Scene.physics.add.sprite(posX,posY,spriteTag);
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.collideWorldBounds = true;
        this.nivel = _scene;
        this.bullet = this;
        //this.setColliders();
    }
    
    preUpdate()
    {
        if(this.y<=0 || this.y>=config.height)
        {
            this.active = false;
        }
    }
}