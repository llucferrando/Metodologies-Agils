class bombPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.collideWorldBounds = true;
        this.bomb = this;
        this.health = gamePrefs.MAX_LIVES;
        this.nivel=_scene;
        this.cursores = this.nivel.input.keyboard.createCursorKeys();   
        this.nivel.input.mouse.disableContextMenu();
    }
    
    hitBomb(_bomb,_bullet)
    {
        if(_bomb.health <= 0)
        {           
            _bomb.nivel.createExplosion(_bomb);
            _bomb.nivel.resetScene();    
            _bomb.destroy(); 
                    
        }
        else
        {
            gamePrefs.SCORE-=200;
            if(gamePrefs.SCORE <=0)
            {
                gamePrefs.SCORE = 0;
            }


            _bullet.destroy();
           _bomb.health--;
           console.log(_bomb.health);
           _bomb.nivel.updateHealth();
        }
        
        
    }

    hitObstacle(_bomb,_bullet)
    {
        if(_bomb.health <= 0)
        {           
            _bomb.nivel.createExplosion(_bomb);
            _bomb.nivel.resetScene();    
            _bomb.destroy();            
        }
        else
        {
            gamePrefs.SCORE-=200;
            if(gamePrefs.SCORE <=0)
            {
                gamePrefs.SCORE = 0;
            }           

           console.log(_bomb.health);
           _bomb.nivel.updateHealth();
        }
        
        
    }

    hitCoin(_bomb,_coin) 
    { 
        gamePrefs.SCORE+=200; 
        _coin.destroy(); 
        _bomb.nivel.coinSound.play();
    } 
   
    death(_bomb,_collisionAgent)
    {
      if(!_collisionAgent.active) return;

      _collisionAgent.deActivate();      

      this.reset();
    }    

    

   
    preUpdate(time,delta)
    {
        this.x = this.nivel.input.x;
        this.y = this.nivel.input.y;

        if(this.x<=20)
            this.x = 20;
        else if(this.x>=config.width-20)
            this.x = config.width-20;

        if(this.y>=config.height-20)
            this.y = config.height-20;
        else if(this.y <= config.height/2+20)
            this.y = config.height/2+20;
        
        super.preUpdate(time, delta); 
        
    }
 
    
}