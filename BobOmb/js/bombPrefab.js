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
            _bomb.nivel.resetScene();
            
           
        }
        else
        {
            gamePrefs.SCORE=0;
            _bullet.destroy();
           _bomb.bomb.body.reset(config.width/2,config.height*.8);
           _bomb.health--;
           console.log(_bomb.health);
           _bomb.nivel.updateHealth();
        }
        
        
    }
   
    death(_bomb,_collisionAgent)
    {
      if(!_collisionAgent.active) return;

      _collisionAgent.deActivate();      

      this.reset();
    }    

    

   
    preUpdate(time,delta)
    {        
        /*if(this.cursores.left.isDown)
            this.body.setVelocityX(-gamePrefs.BOMB_SPEED);
        else if(this.cursores.right.isDown)
            this.body.setVelocityX(gamePrefs.BOMB_SPEED);
        else
            this.body.setVelocityX(0);

        if(this.cursores.up.isDown)
            this.body.setVelocityY(-gamePrefs.BOMB_SPEED);
        else if(this.cursores.down.isDown)
            this.body.setVelocityY(gamePrefs.BOMB_SPEED);
        else
            this.body.setVelocityY(0);

        if(this.x<=20)
            this.x = 20;
        else if(this.x>=config.width-20)
            this.x = config.width-20;

        if(this.y>=config.height-20)
            this.y = config.height-20;
        else if(this.y <= config.height/2+20)
            this.y = config.height/2+20;
        */
        super.preUpdate(time, delta); 

        // Mueve la bomba hacia la posición del cursor
        this.x = this.nivel.input.x;
        this.y = this.nivel.input.y;
    }
 
    
}