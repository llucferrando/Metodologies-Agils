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
        
        
    }
    create()
    {
        this.bg_top= this.add.sprite(0,0,'bg_top').setOrigin(0);
        this.bg_down=this.add.sprite(0,192, 'bg_down').setOrigin(0);

    }

    update()
    { //Actualiza whatever  
    }
       
}