class bowserPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.collideWorldBounds = true;
        this.bowser = this;
        this.nivel=_scene; 
        this.direccion = 1;
        this.body.setVelocityX(gamePrefs.BOWSER_SPEED*this.direccion);
        this.setColliders();

        this.bulletTimer = this.scene.time.addEvent
        (
            {
                delay: Phaser.Math.Between(1800,2500), //ms             
                callback: this.createBullet,
                callbackScope:this,
                loop:true
            }
        );
    }

    setColliders()
    {
        this.nivel.physics.add.collider
        (
            this.bowser,
            this.nivel.walls
        );
    }

    createBullet()
    {
        var _bullet = this.scene.bowserBulletPool.getFirst(false);

        var posX = this.x;
        var posY = this.y+20;
        
        if(!_bullet)
        {
            console.log('creando bala');
            _bullet = new bowserBulletPrefab(this.scene,posX,posY,'bowserBullet');
            this.scene.bulletPool.add(_bullet);
        }else
        {
            console.log('reciclando bala');
                _bullet.body.reset(posX,posY);               
            _bullet.active = true;
        }

        _bullet.body.setVelocityY(gamePrefs.BULLET_SPEED);
    }

    preUpdate(time,delta)
    {
        if(this.body.blocked.right || this.body.blocked.left)
        {
            this.direccion *= -1;
            this.body.setVelocityX(gamePrefs.BOWSER_SPEED*this.direccion);
            this.flipX = !this.flipX;
        }

        super.preUpdate(time,delta);
    }
}