class gameState extends Phaser.Scene
{
    constructor()
    {
        super({key:'gameState'});
    }

    preload()
    { //Carga assets en memoria
        //this.cameras.main.setBackgroundColor("112"); 
        this.load.setPath('assets/img');
        this.load.image('bg_top','topbg.png');
        this.load.image('bg_down','downbg.png');
        this.load.image('bullet','fireball.png');
        
    }
    create()
    {
        this.bg_top= this.add.sprite(0,0,'bg_top').setOrigin(0);
        this.bg_down=this.add.sprite(0,192, 'bg_down').setOrigin(0);
        var percentage;
        this.loadPools();

        this.bulletTimer = this.time.addEvent
        (
            {
                delay: 100, //ms             
                callback: this.createBullets,
                callbackScope:this,
                loop:true //repeat: -1
            }
        );

        this.bulletTimer = this.time.addEvent
        (
            {
                delay: 2000, //ms             
                callback: this.percentage,
                callbackScope:this,
                loop:true //repeat: -1
            }
        );
       

    }

    update()
    { //Actualiza whatever         
       console.log(this.percentage);
       
    }

    percentage()
    {
        this.percentage = Phaser.Math.Between(0,3);
        
    }

    loadPools()
    {
        this.bulletPool = this.physics.add.group();
        
    }

    createBulletDown()
    {
        //Mirar si hay alguna bala reciclable en la pool
        var _bullet = this.bulletPool.getFirst(false);

        var posX = Phaser.Math.Between(16,config.width-16);
        var posY = 0;
        
        
        if(!_bullet)
        {//Que no? La creo
            console.log('creando bala');
            _bullet = new bulletPrefab(this,posX,posY,'bullet');
            this.bulletPool.add(_bullet);
        }else
        {//Que si? La reciclo
            console.log('reciclando bala');
                _bullet.body.reset(posX,posY);                      
            _bullet.active = true;
        }
        //Hago cosas con la bala
        //Dar velocidad
        _bullet.body.setVelocityY(gamePrefs.BULLET_SPEED);
        //Ejecuta sonido
        
    }

    createBulletUp()
    {
        //Mirar si hay alguna bala reciclable en la pool
        var _bullet = this.bulletPool.getFirst(false);

        var posX = Phaser.Math.Between(16,config.width-16);
        var posY = 0;
        
        
        if(!_bullet)
        {//Que no? La creo
            console.log('creando bala');
            _bullet = new bulletPrefab(this,posX,config.height,'bullet');
            this.bulletPool.add(_bullet);
        }else
        {//Que si? La reciclo
            console.log('reciclando bala');
                _bullet.body.reset(posX,config.height);                      
            _bullet.active = true;
        }
        //Hago cosas con la bala
        //Dar velocidad
        _bullet.body.setVelocityY(gamePrefs.BULLET_SPEED * -1);
        //Ejecuta sonido
        
    }

    createBulletLeft()
    {
        //Mirar si hay alguna bala reciclable en la pool
        var _bullet = this.bulletPool.getFirst(false);

        var posX = Phaser.Math.Between(16,config.height-16);
        var posY = 0;
        
        
        if(!_bullet)
        {//Que no? La creo
            console.log('creando bala');
            _bullet = new bulletPrefab(this,posY,posX,'bullet');
            this.bulletPool.add(_bullet);
        }else
        {//Que si? La reciclo
            console.log('reciclando bala');
                _bullet.body.reset(posY,posX);                      
            _bullet.active = true;
        }
        //Hago cosas con la bala
        //Dar velocidad
        _bullet.body.setVelocityX(gamePrefs.BULLET_SPEED );
        //Ejecuta sonido
        
    }

    createBulletRight()
    {
        //Mirar si hay alguna bala reciclable en la pool
        var _bullet = this.bulletPool.getFirst(false);

        var posX = Phaser.Math.Between(16,config.height-16);
        var posY = 0;
        
        
        if(!_bullet)
        {//Que no? La creo
            console.log('creando bala');
            _bullet = new bulletPrefab(this,config.width,posX,'bullet');
            this.bulletPool.add(_bullet);
        }else
        {//Que si? La reciclo
            console.log('reciclando bala');
                _bullet.body.reset(config.width,posX);                      
            _bullet.active = true;
        }
        //Hago cosas con la bala
        //Dar velocidad
        _bullet.body.setVelocityX(gamePrefs.BULLET_SPEED *-1);
        //Ejecuta sonido
        
    }

    createBullets()
    {
        if(this.percentage = 0)
        {
            this.createBulletDown();
        }
        else if(this.percentage = 1)
        {
            this.createBulletUp();
        }
        else if(this.percentage = 2)
        {
            this.createBulletLeft();
        }
        else if(this.percentage = 3)
        {
            this.createBulletRight();
        }


    }
    
       
}