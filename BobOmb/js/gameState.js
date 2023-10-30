class gameState extends Phaser.Scene
{
    constructor()
    {
        super({key:'gameState'});
    }

    preload()
    { //Carga assets en memoria
        this.cameras.main.setBackgroundColor("112"); 
        this.load.setPath('assets/img');
        this.load.image('bg_back','background_back.png');
        this.load.image('bg_frontal','background_frontal.png');
        this.load.spritesheet('nave','naveAnim.png',
        {frameWidth:16,frameHeight:24});
        this.load.image('bullet','spr_bullet_0.png');
        this.load.spritesheet('enemy','enemy-medium.png',
        {frameWidth:32,frameHeight:16});
    }

    create()
    { //Pinta assets en pantalla
        this.bg_back = this.add.tileSprite
        (0,0,config.width,config.height,'bg_back').setOrigin(0);
        this.bg_frontal = this.add.tileSprite
        (0,0,config.width,config.height,'bg_frontal').setOrigin(0);
        this.nave = this.physics.add.sprite(config.width/2,config.height*.95,'nave');
        this.nave.body.collideWorldBounds = true;

        this.loadAnimations();
        this.loadPools();
        //this.nave.anims.play('idle');
        this.cursores = this.input.keyboard.createCursorKeys();
        
        this.cursores.space.on
        (
            'down',
            function()
            {
                this.createBullet();
            },
            this
        ); 
        /*
        this.bulletTimer = this.time.addEvent
        (
            {
                delay: 200, //ms
                callback: this.createBullet,
                callbackScope:this,
                loop:true //repeat: -1
            }
        );
        */
        this.enemyTimer = this.time.addEvent
        (
            {
                delay: 2000, //ms
                callback: this.createEnemy,
                callbackScope:this,
                loop:true //repeat: -1
            }
        );
    }

    loadAnimations()
    {
        
        this.anims.create(
        {
            key: 'idle',
            frames:this.anims.generateFrameNumbers('nave', {start:0, end: 1}),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create(
        {
            key: 'left',
            frames:this.anims.generateFrameNumbers('nave', {start:2, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create(
        {
            key: 'right',
            frames:this.anims.generateFrameNumbers('nave', {start:4, end: 5}),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create(
        {
            key: 'enemy_idle',
            frames:this.anims.generateFrameNumbers('enemy', {start:0, end: 1}),
            frameRate: 10,
            repeat: -1
        });
    }

    loadPools()
    {
        this.bulletPool = this.physics.add.group();
        this.enemyPool = this.physics.add.group();
    }

    createBullet()
    {
        //Mirar si hay alguna bala reciclable en la pool
        var _bullet = this.bulletPool.getFirst(false);
        
        if(!_bullet)
        {//Que no? La creo
            console.log('creando bala');
            _bullet = new bulletPrefab(this,this.nave.x,this.nave.body.top,'bullet');
            this.bulletPool.add(_bullet);
        }else
        {//Que si? La reciclo
            console.log('reciclando bala');
            _bullet.body.reset(this.nave.x,this.nave.body.top);
            _bullet.active = true;
        }
        //Hago cosas con la bala
        //Dar velocidad
        _bullet.body.setVelocityY(gamePrefs.BULLET_SPEED);
        
    }

    createEnemy()
    {
        //Mirar si hay algun enemigo reciclable en la pool
        var _enemy = this.enemyPool.getFirst(false);
        
        var posX = Phaser.Math.Between(16,config.width-16);
        var posY = -16;

        if(!_enemy)
        {//Que no? Lo creo
            console.log('creando enemigo');
            //_enemy = new bulletPrefab(this,this.nave.x,this.nave.body.top,'bullet');
            //_enemy = this.add.sprite(posX,posY,'enemy');
            _enemy = new enemyPrefab(this,posX,posY,'enemy');
            this.enemyPool.add(_enemy);
            //_enemy.anims.play('enemy_idle');
        }else
        {//Que si? Lo reciclo
            console.log('reciclando enemigo');
            _enemy.body.reset(posX,posY);
            _enemy.active = true;
            //_bullet.body.reset(this.nave.x,this.nave.body.top);
            //_bullet.active = true;
        }
        //Hago cosas con el enemigo
        //Dar velocidad
        _enemy.body.setVelocityY(gamePrefs.ENEMY_SPEED);
        
    }

    update()
    { //Actualiza whatever  
        this.bg_back.tilePositionY -=.25; 
        this.bg_frontal.tilePositionY -=1;
        
        if(this.cursores.left.isDown)
        {
            //this.nave.x -= gamePrefs.NAVE_SPEED;
            this.nave.body.velocity.x -= gamePrefs.NAVE_SPEED;
            //this.nave.body.setVelocityX(-gamePrefs.NAVE_SPEED);
            this.nave.anims.play('left',true);
        }else
        if(this.cursores.right.isDown)
        {
            //this.nave.x += gamePrefs.NAVE_SPEED;
            this.nave.body.velocity.x += gamePrefs.NAVE_SPEED;
            //this.nave.body.setVelocityX(gamePrefs.NAVE_SPEED);
            this.nave.anims.play('right',true);
        }else
        {
            this.nave.anims.play('idle',true);
            //this.nave.body.velocity.x = 0;
        }
        /*
        if(this.cursores.space.isDown)//no me vale, balas infinitas mientras pulso
        if(this.cursores.space.isUp)//no me vale, balas infinitas mientras no pulso
        {
            this.createBullet();
        }
        */
    }
}