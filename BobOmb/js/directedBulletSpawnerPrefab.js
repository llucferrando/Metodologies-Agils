class directedBulletSpawnerPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_minDelay,_maxDelay)
    {
        super(_scene,-100,-100,null);
        _scene.add.existing(this);
        this.scene = _scene;
        this.minDelay = _minDelay;
        this.maxDelay = _maxDelay;
        this.setOrigin(.5,0);


        this.bulletTimer = this.scene.time.addEvent
        (
            {
                delay: Phaser.Math.Between(this.minDelay,this.maxDelay), //ms             
                callback: this.createBullet,
                callbackScope:this,
                loop:true //repeat: -1
            }
        );

    }

    createBullet()
    {
        var _bullet = this.scene.bulletPool.getFirst(false);


        var posX;
        var posY;

        var acceptable;

        while(!acceptable)
        {
            posX = Phaser.Math.Between(-40,gamePrefs.LEVEL_WIDTH+40);
            posY = Phaser.Math.Between(-40,gamePrefs.LEVEL_HEIGHT+40);

            if(posX < 0 || posX > gamePrefs.LEVEL_WIDTH || posY < 0 || posY > gamePrefs.LEVEL_HEIGHT)
            {
                acceptable = true;
            }
        }


        var dirX = (this.scene.bomb.x - posX)/300;
        var dirY = (this.scene.bomb.y - posY)/300;
        
        
        if(!_bullet)
        {
            console.log('creando bala');
            _bullet = new bulletPrefab(this.scene,posX,posY,'bullet');
            this.scene.bulletPool.add(_bullet);
        }else
        {
            console.log('reciclando bala');
                _bullet.body.reset(posX,posY);               
            _bullet.active = true;
        }

        _bullet.body.setVelocityY(gamePrefs.BULLET_SPEED*dirY);
        _bullet.body.setVelocityX(gamePrefs.BULLET_SPEED*dirX);

    }

    preUpdate(time,delta)
    {
        super.preUpdate(time,delta);
    }
}