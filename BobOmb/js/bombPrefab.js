class bombPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.collideWorldBounds = true;
        this.nivel=_scene;            
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
        super.preUpdate(time, delta); 
    }
}