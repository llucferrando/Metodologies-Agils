class obstaclePrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.collideWorldBounds = true;
        this.obstacle = this;
        this.nivel=_scene; 
        this.setColliders();
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
    }

    setColliders()
    {
        this.nivel.physics.add.collider
        (
            this.obstacle,
            this.nivel.bomb,
            

        );

        this.nivel.physics.add.collider
        (
            this.obstacle,
            this.nivel.walls
        );
    }


    


    preUpdate(time,delta)
    {        
            

        super.preUpdate(time, delta); 
    }

}