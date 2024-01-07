class bowserBulletPrefab extends bulletPrefab
{
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        super(_scene,_posX,_posY,_spriteTag);
    }


    preUpdate(time,delta)
    {
        this.rotation +=0.4;
        super.preUpdate(time,delta);
    }
}