class bulletSpawnerPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_minX,_maxX,_minY,_maxY,_dirX,_dirY,_minDelay,_maxDelay)
    {
        super(_scene,-100,-100,null);
        _scene.add.existing(this);
        this.scene = _scene;
        this.minX = _minX;
        this.maxX = _maxX;
        this.minY = _minY;
        this.maxY = _maxY;
        this.dirX = _dirX;
        this.dirY = _dirY;
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
        //Mirar si hay alguna bala reciclable en la pool
        var _bullet = this.scene.bulletPool.getFirst(false);

        var posX = Phaser.Math.Between(this.minX,this.maxX);
        var posY = Phaser.Math.Between(this.minY,this.maxY);
        
        
        if(!_bullet)
        {//Que no? La creo
            console.log('creando bala');
            _bullet = new bulletPrefab(this.scene,posX,posY,'bullet');
            this.scene.bulletPool.add(_bullet);
        }else
        {//Que si? La reciclo
            console.log('reciclando bala');
                _bullet.body.reset(posX,posY);               
            _bullet.active = true;
        }
        //Hago cosas con la bala
        //Dar velocidad
        _bullet.body.setVelocityY(gamePrefs.BULLET_SPEED*this.dirY);
        _bullet.body.setVelocityX(gamePrefs.BULLET_SPEED*this.dirX);
        //Ejecuta sonido

    }

    preUpdate(time,delta)
    {
        super.preUpdate(time,delta);
    }
}