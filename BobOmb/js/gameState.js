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

        this.enemyTimer = this.time.addEvent
        (
            {
                delay: 100, //ms
                callback: this.createBullet,
                callbackScope:this,
                loop:true //repeat: -1
            }
        );

    }

    update()
    { //Actualiza whatever  
       this.percentage = Phaser.Math.Between(0,4);
       console.log(this.percentage);
    }

    loadPools()
    {
        this.bulletPool = this.physics.add.group();
        
    }

    createBullet()
    {
        //Mirar si hay alguna bala reciclable en la pool
        var _bullet = this.bulletPool.getFirst(false);

        var posX = Phaser.Math.Between(16,config.width-16);
        var posY = 0;
        
        
        if(!_bullet)
        {//Que no? La creo
            console.log('creando bala');
            if(this.percentage <=1)
            {
                _bullet = new bulletPrefab(this,posX,posY,'bullet');
            }
            else if(this.percentage <=2 && this.percentage >1)
            {
                _bullet = new bulletPrefab(this,posX,config.height,'bullet');
            }
            else if(this.percentage <=3 && this.percentage >2)
            {
                _bullet = new bulletPrefab(this,posY,posX,'bullet');
            }
            else if(this.percentage <=4 && this.percentage >3)
            {
                _bullet = new bulletPrefab(this,posX,posY,'bullet');
            }
            
            
            this.bulletPool.add(_bullet);
        }else
        {//Que si? La reciclo
            console.log('reciclando bala');
            _bullet.body.reset(posX,posY.top);
            _bullet.active = true;
        }
        //Hago cosas con la bala
        //Dar velocidad
        _bullet.body.setVelocityY(gamePrefs.BULLET_SPEED);
        //Ejecuta sonido
        
    }
       
}