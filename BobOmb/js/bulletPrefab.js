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
        this.setColliders();
    }
    setColliders()
    {
        this.nivel.physics.add.overlap
        (
            //this.scene.hero,
            this.nivel.bomb,
            this.bullet,
            this.scene.bomb.hitBomb,
            this.bullet,
            null,
            this
        );
    }

    deActivate()
    {
        this.nivel.createExplosion(this);
        this.setActive(false);
        this.x = -100;
        //this.setTexture('explosionAnim');
    }

    preUpdate()
    {
        if(this.y<=-300 || this.y>=config.height+30)
        {
            this.active = false;
        }
    }
}