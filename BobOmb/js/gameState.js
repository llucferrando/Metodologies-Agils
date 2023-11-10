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
        
        this.load.spritesheet('bomb','bombs.png',
        {frameWidth:16,frameHeight:25});

        this.load.setPath('assets/sounds');
        this.load.audio('walk','snd_bomb_plop.mp3');
    }
    create()
    {
        this.bg_top= this.add.sprite(0,0,'bg_top').setOrigin(0);
        this.bg_down=this.add.sprite(0,192, 'bg_down').setOrigin(0);
        

        this.bomb = new bombPrefab(this,config.width/2,config.height*.8,'bomb');

        this.loadAnimations();
        this.loadSounds();
        this.loadPools();

        this.bomb.anims.play('idle',false);

        this.plopTimer = this.time.addEvent
        (
            {
                delay: 200, //ms
                callback: this.PlaySound(),
                callbackScope:this,
                loop:true,
                repeat:-1
            }
        );

        this.bulletTimerDown = this.time.addEvent
        (
            {
                delay: 500, //ms             
                callback: this.createBulletDown,
                callbackScope:this,
                loop:true //repeat: -1
            }
        );

        this.bulletTimerUp = this.time.addEvent
        (
            {
                delay: 500, //ms             
                callback: this.createBulletUp,
                callbackScope:this,
                loop:true //repeat: -1
            }
        );

        this.bulletTimerRight = this.time.addEvent
        (
            {
                delay: 500, //ms             
                callback: this.createBulletRight,
                callbackScope:this,
                loop:true //repeat: -1
            }
        );

        this.bulletTimerLeft = this.time.addEvent
        (
            {
                delay: 500, //ms             
                callback: this.createBulletLeft,
                callbackScope:this,
                loop:true //repeat: -1
            }
        );

       

    }

    PlaySound()
    {
        this.walk.play();
    }

    loadAnimations()
    {
        this.anims.create(
        {
            key: 'idle',
            frames:this.anims.generateFrameNumbers('bomb', {start:0, end: 1}),
            frameRate: 8,
            repeat: -1
        });
    }

    loadSounds()
    {
        this.walk=this.sound.add('walk').setLoop(true);
    }

    update()
    { //Actualiza whatever         
       
       
    }


    loadPools()
    {
        this.bulletPoolUp = this.physics.add.group();
        this.bulletPoolDown = this.physics.add.group();
        this.bulletPoolLeft = this.physics.add.group();
        this.bulletPoolRight = this.physics.add.group();
        
    }

    createBulletDown()
    {
        //Mirar si hay alguna bala reciclable en la pool
        var _bullet = this.bulletPoolDown.getFirst(false);

        var posX = Phaser.Math.Between(16,config.width-16);
        var posY = 0;
        
        
        if(!_bullet)
        {//Que no? La creo
            console.log('creando bala');
            _bullet = new bulletPrefab(this,posX,posY,'bullet');
            this.bulletPoolDown.add(_bullet);
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
        var _bullet = this.bulletPoolUp.getFirst(false);

        var posX = Phaser.Math.Between(16,config.width-16);
        var posY = 0;
        
        
        if(!_bullet)
        {//Que no? La creo
            console.log('creando bala');
            _bullet = new bulletPrefab(this,posX,config.height,'bullet');
            this.bulletPoolUp.add(_bullet);
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
        var _bullet = this.bulletPoolLeft.getFirst(false);

        var posX = Phaser.Math.Between(16,config.height-16);
        var posY = 0;
        
        
        if(!_bullet)
        {//Que no? La creo
            console.log('creando bala');
            _bullet = new bulletPrefab(this,posY,posX,'bullet');
            this.bulletPoolLeft.add(_bullet);
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
        var _bullet = this.bulletPoolRight.getFirst(false);

        var posX = Phaser.Math.Between(16,config.height-16);
        var posY = 0;
        
        
        if(!_bullet)
        {//Que no? La creo
            console.log('creando bala');
            _bullet = new bulletPrefab(this,config.width,posX,'bullet');
            this.bulletPoolRight.add(_bullet);
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

    
    
       
}