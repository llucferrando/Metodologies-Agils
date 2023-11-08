class bombPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.collideWorldBounds = true;
        this.nivel=_scene;
        this.cursores = this.nivel.input.keyboard.createCursorKeys();        
    }

    death(_bomb,_collisionAgent)
    {
      if(!_collisionAgent.active) return;

      _collisionAgent.deActivate();      

      this.reset();
    }

    reset()
    {
        this.nivel.scene.restart();
    }

    preUpdate(time,delta)
    {        
        if(this.cursores.left.isDown)
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

        super.preUpdate(time, delta); 
    }
}