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
        this.direccion = 1;
        this.body.setVelocityX(gamePrefs.ENEMY_SPEED*this.direccion);
        this.setColliders();
    }

    setColliders()
    {
        this.nivel.physics.add.overlap
        (
            this.nivel.bomb,
            this.enemy,
            this.nivel.bomb.hitBomb,
            null,
            this.nivel.bomb
        );

        this.nivel.physics.add.collider
        (
            this.enemy,
            this.nivel.walls
        );
    }

    howItPatrols()
    {
        return (this.body.blocked.right ||this.body.blocked.left)
    }


    preUpdate(time,delta)
    {        
            
        if(this.howItPatrols())
        {
            this.direccion *= -1;
            this.body.setVelocityX(gamePrefs.ENEMY_SPEED*this.direccion);
            this.flipX = !this.flipX;
        }

        super.preUpdate(time, delta); 
    }

}