    let version = '0 . 1'
    var isGameOverButtonApear = false;
    var tweenManager;
    var camera;
    var startPoint;
    var player;
    var timingShoot;
    var bullets;
    var bullets2;
    var enemies;
    var impacts;
    var drgBody; //dragon boss body array
    let bodyMoveDragonVelocity = 0.5;
    let KILLCOUNTLEVEL  = 0;
    let _KILLCOUNT  = 0;
    let _DEATHNUMBER  = 0;
    let _LEVELMAX = 1;
    let _BULLETDAMAGE  = 0;
    let _BOSSKILL = 0;
    let _BESTSCORE = 0;
    let _WEAPONUPGRADE_SPEED = 0;
    let _WEAPONUPGRADE_DGTS = 0;
    let _HEALTHPGRADE = 0;
    let maxHealth = 4;
    let playerDamage = 1;
    var isMoveAuto = false;
    var isOnMobile = false;
    var isGameFinish = false;
    //INPUT
    var btnPause;
    var btnQuit;
    var btnReset;
    var cursor;
    var touchup;
    var touchdown;
    var touchleft ;
    var touchright;
    // spacebar : any;
    // lvlnxtfunc :any;
    var popenemyZero;
    var popenemyOne;
    var popenemyTwo;
    var popenemyThree;
    var popenemyFour; 
    var popenemyFive; 
    var popenemySix;
    var popenemySeven;
    var popenemyEight;
    var popenemyNine; 
    var popenemyTen;
    var popenemyEleven;
    var popenemyTwelve;
    var popbossOne;
    var popBonusCounter  = 0; //pop weapon counter
    
    let scoreValue = 0;
    let levelValue = 1;
    var skyIsVisible = true;
    //pointxt! : Phaser.GameObjects.BitmapText;
    var scoretext;
    var leveltxt;
    var levelNextxt;
    var gameovertxt;
    var goscoretxt;
    var starttxt;
    var testtxt;
    var upgradetxt;
    var chronotxt;
    var reactor;

    let backGroundSpeed = 0;
    let skyAlphaMax = 0.4;
    var itsIncrementNextLvlValue = false;
    var ispopBonus = true;
    var ispopBoss = true;
    var isPaused = false;
    let armEvoCount = 1; 
    let speed  = 100; // popenemy = levelvalue * speed 
    var menuBar;;
    var healthBar;
    var weaponUp; //box weapon+
    var city; //decor
    var mask; //transition img
    var sky; //decor
    var killwall; 
    let chrono = 0;
    var isChronoStart = false;
    var isControlsOperational = false;
    var music;
    var transiSong
    var boomSong;
    var bipSong;
    var boostSong;
    var bossSong;
    var impactSong;

    var pointerX;
    var pointerY;
    var newpointerX;
    var newpointerY;

class Home extends Phaser.Scene
{
    constructor(){
        super('Home')
    }
    
    preload(){
        this.load.bitmapFont('customfont','assets/gb.png', 'assets/gb.xml');
        this.load.bitmapFont('customfont2','assets/bmf.png', 'assets/bmf.xml');
        this.load.image('logo', 'assets/MtlBrdsLogo.png');
        this.load.image('roel', 'assets/troelogo.ico');
        this.load.spritesheet('buttoninterface','assets/Btns2.png', {frameWidth : 70, frameHeight : 43});

    }

    create() {
        //TITLE
        this.add.sprite(183, 150, 'logo',0).setScale(2);
        this.add.sprite(40, 425, 'roel',0).setScale(2);
        //PLAY BTN
        self = this
        var btnPlay = this.add.sprite(183, 250, 'buttoninterface',9).setScale(1.02).setDepth(9).setAlpha(1).setInteractive({ pixelPerfect: true }); //BTN UP
        btnPlay.on('pointerup', function (event){
            btnPlay.setFrame(11);
            
            self.scene.start('MetalBirds');
            //MBscene.scene.restart('MetalBirds');

        });
        btnPlay.on('pointerover', function (event){btnPlay.setFrame(10);});
        btnPlay.on('pointerout', function (event){
            //self.btnQuit.clearTint();
            btnPlay.setFrame(9);
        });
        this.add.bitmapText(40, 10,'customfont2',`V E R S I O N  ${version}` ,10).setTintFill(0x606060).setOrigin(0.5, 0.5).setDepth(4);
        this.add.bitmapText(260, 427,'customfont2',[
            `  T     .     R     O     E    L  `,
            `  B  E  L  G  I  U  M   2  O  2  3`,
            `  t r i s t a n r o e l @ o u t l o o k . c o m`
        ],10).setTintFill(0xffffff).setOrigin(0.5, 0.5).setDepth(4);
    }
}

class MetalBirds extends Phaser.Scene
{
    constructor(){
        super('MetalBirds')
    }
    
    preload() {
      this.load.audio('music', 'assets/mtlbrdsong2.mp3');
      this.load.audio('transisong', 'assets/transisong.mp3');
      this.load.audio('impactsong', 'assets/impact3.mp3');
      this.load.audio('itemsong', 'assets/itemsound.mp3');
      this.load.audio('boomsong', 'assets/explode.mp3');
      this.load.audio('bipsong', 'assets/sound.mp3');
      this.load.audio('boostsong', 'assets/boostsong.mp3');
      this.load.audio('bossong', 'assets/bossSong2.mp3');
      this.load.bitmapFont('customfont','assets/gb.png', 'assets/gb.xml');
      this.load.bitmapFont('customfont2','assets/bmf.png', 'assets/bmf.xml');
      this.load.spritesheet('player', 'assets/f16.png', {frameWidth : 31, frameHeight : 48});
      this.load.spritesheet('bullet','assets/bullet01.png', {frameWidth : 16, frameHeight : 16});
      this.load.spritesheet('fatbullet','assets/bullet01.png', {frameWidth : 32, frameHeight : 32});
      this.load.spritesheet('largebullet','assets/bullet01.png', {frameWidth : 32, frameHeight : 16});
    //   this.load.spritesheet('xplose','assets/img/Xplose.png', {frameWidth : 160, frameHeight : 160});
      this.load.spritesheet('xplose','assets/explosion-g.png', {frameWidth : 32, frameHeight : 32});
      this.load.spritesheet('city','assets/bckgrnd.png', {frameWidth : 366, frameHeight : 445});
      this.load.spritesheet('sky','assets/sky.png', {frameWidth : 415, frameHeight : 558});
      this.load.spritesheet('airplanes','assets/ironbirds2.png', {frameWidth : 40, frameHeight : 48});
      this.load.spritesheet('fatbirds','assets/fatbirds2.png', {frameWidth : 190, frameHeight : 180});
      this.load.spritesheet('dragon','assets/dragon.png', {frameWidth : 90, frameHeight : 90});
      this.load.spritesheet('fruits','assets/obj18.png', {frameWidth : 18, frameHeight : 18});
      this.load.spritesheet('button','assets/Btns.png', {frameWidth : 92, frameHeight : 92});
      this.load.spritesheet('buttoninterface','assets/Btns2.png', {frameWidth : 70, frameHeight : 43});
      this.load.spritesheet('body','assets/interface.png', {frameWidth : 457, frameHeight : 242});
    }

    create() {
        music = this.sound.add('music', {loop : true, volume : 0.6});
        transiSong = this.sound.add('transisong');
        impactSong = this.sound.add('impactsong',{volume : 0.5});
        boomSong = this.sound.add('boomsong',{volume : 0.5});
        bipSong = this.sound.add('bipsong');
        boostSong = this.sound.add('boostsong',{volume : 0.5});
        bossSong = this.sound.add('bossong',{volume : 1.2});
        const itemSong = this.sound.add('itemsong');
        music.play();

        tweenManager = this.tweens;
        //CAMERA
        camera = this.cameras.main;
        camera.flashEffect.start(); //FLASH
        //this.camera.setViewport(0, 0, 366, 445); //bordure externe visible l'ors du tremblement
        //PLAYER
        console.log('coucou');
        startPoint = this.physics.add.sprite(183, 350,'airplanes').setDepth(2).setSize(5,5).setVisible(false);
        startPoint.body.enable = false
        player = this.physics.add.sprite(183, 350,'airplanes').setDepth(2);
        player.body.setSize(8, 20);                                    
        player.setData('health', 4);
        player.setCollideWorldBounds(true);
        player.visible = true;
        //player.setInteractive({ draggable: true });
        //player.on('drag', (pointer, dragX, dragY) => player.setPosition(dragX, dragY));
        
        //BAR RECTANGLES
        menuBar = this.add.rectangle(183,10,366,30,0x282828).setScrollFactor(0,0).setDepth(4);
        healthBar = this.add.rectangle(65,12,120,10,0xB14F37).setScrollFactor(0,0).setDepth(5);
        killwall = this.physics.add.sprite(183,500,'bullet', 100).setDepth(0);
        killwall.body.setSize(445,20);
        //BULLETS
        bullets = this.physics.add.group();
        bullets2 = this.physics.add.group();
        enemies = this.physics.add.group();
        impacts = this.physics.add.group();
        weaponUp = this.physics.add.group();
        //DECOR
        var filterLign = this.add.tileSprite(183,222.5,366,445,'city', 11).setDepth(3).setAlpha(0.08);
        city = this.add.tileSprite(183,222.5,366,445,'city', 0).setDepth(0).setAlpha(1);
        mask = this.add.tileSprite(183,222.5,366,445,'city', 10).setDepth(3).setAlpha(0);
        sky = this.add.tileSprite(183,222.5,366,445,'sky', 0)
        sky.alpha = 0.4;
        //TEXT
        scoretext =  this.add.bitmapText(300, 12,'customfont','score:0',10).setTintFill(0xffffff).setOrigin(0.5, 0.5).setDepth(4);
        leveltxt =  this.add.bitmapText(183, 12,'customfont','level:0',10).setTintFill(0xffffff).setOrigin(0.5, 0.5).setDepth(4);
        starttxt =  this.add.bitmapText(183, 200,'customfont2','3',60).setTintFill(0xffffff).setOrigin(0.5, 0.5).setDepth(4);
        gameovertxt = this.add.bitmapText(183, 200,'customfont2','GAME OVER',60).setTintFill(0xffffff).setOrigin(0.5, 0.5).setDepth(4).setVisible(false);
        goscoretxt = this.add.bitmapText(183, 246,'customfont2','',60).setTintFill(0xffffff).setOrigin(0.5, 0.5).setDepth(4).setVisible(false);
        //this.pointxt = this.add.bitmapText(183, 260,'customfont','9',10).setTintFill(0xffffff).setOrigin(0.5, 0.5);
        //this.testtxt = this.add.bitmapText(183, 30,'customfont','TEST',10).setTintFill(0xffffff).setOrigin(0.5, 0.5);
        upgradetxt = this.add.bitmapText(75, 70,'customfont','TEST',8).setTintFill(0xB8B8B8).setOrigin(0.5, 0.5).setDepth(4).setVisible(false);;
        levelNextxt = this.add.bitmapText(183, 200,'customfont2','LEVEL 2',60).setTintFill(0xffffff).setOrigin(0.5, 0.5).setAlpha(0);
        chronotxt = this.add.bitmapText(183, 215,'customfont','time',10).setTintFill(0xffffff).setOrigin(0.5, 0.5).setDepth(4).setAlpha(0);
        //ANIMS
        this.anims.create({
          key: 'plyrleft',
          frames: this.anims.generateFrameNumbers('airplanes',{frames: [0, 1]}),
          frameRate: 8,
        });
        this.anims.create({
            key: 'burst',
            frames: this.anims.generateFrameNumbers('bullet',{frames: [252, 277, 302, 327]}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'startburst',
            frames: this.anims.generateFrameNumbers('largebullet',{frames: [250 ,322, 346]}),
            frameRate: 16,
            repeat: -1
        });
        this.anims.create({
            key: 'impactzero',
            frames: this.anims.generateFrameNumbers('bullet',{frames: [1, 26, 51, 76, 1, 26, 51, 76, 1, 26, 51, 76]}),
            frameRate: 15,
            //repeat: -1
        });
        this.anims.create({
            key: 'xplosion',
            frames: this.anims.generateFrameNumbers('xplose',{frames: [0, 1, 2, 3, 4, 5, 6, 7]}),
            frameRate: 15,
            //repeat: -1
        });
        this.anims.create({
            key: 'takeItem',
            frames: this.anims.generateFrameNumbers('bullet',{frames: [ 634,618 ,593, 618, 593, 618]}),
            frameRate: 8,
            // repeat: -1
        });
        this.anims.create({
              key: 'bullet1',
              frames: this.anims.generateFrameNumbers('bullet',{frames: [134, 159, 184, 209]}),
              frameRate: 15,
              repeat: -1
        });
        this.anims.create({
            key: 'bullet2',
            frames: this.anims.generateFrameNumbers('bullet',{frames: [509, 534, 559, 584]}),
            frameRate: 25,
            repeat: -1
        });
        this.anims.create({
            key: 'bullet3',
            frames: this.anims.generateFrameNumbers('bullet',{frames: [627, 652, 677, 702]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'bullet4',
            frames: this.anims.generateFrameNumbers('bullet',{frames: [630, 655, 680, 705]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'bullet5',
            //frames: this.anims.generateFrameNumbers('bullet',{frames: [765, 790, 815, 840]}),
            frames: this.anims.generateFrameNumbers('bullet',{frames: [765,815,790,840]}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'bullet6',
            //frames: this.anims.generateFrameNumbers('bullet',{frames: [765, 790, 815, 840]}),
            frames: this.anims.generateFrameNumbers('fatbullet',{frames: [44,56,68]}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'bullet8',
            //frames: this.anims.generateFrameNumbers('bullet',{frames: [765, 790, 815, 840]}),
            frames: this.anims.generateFrameNumbers('bullet',{frames: [127,152,177,202]}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'bullet10',
            frames: this.anims.generateFrameNumbers('bullet',{frames: [129,154,179,204]}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'bulletBossOne',
            frames: this.anims.generateFrameNumbers('bullet',{frames: [633,658,683,708]}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'flame',
            frames: this.anims.generateFrameNumbers('fatbullet',{frames: [18, 30, 42, 54]}),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'dragonHead',
            //frames: this.anims.generateFrameNumbers('dragon',{frames: [0, 1, 2, 3, 2, 1, 0]}),
            frames: this.anims.generateFrameNumbers('dragon',{frames: [3, 2, 1, 0, 0, 1, 2]}),
            frameRate: 4,
            repeat: -1
        });
        //REACTOR
        reactor = this.physics.add.sprite(183, 275,'largebullet').setDepth(2).setScale(1.5).setVisible(false);
        reactor.anims.play('startburst',true);

        const container = this.add.container(160, 30,[player]);
        //container.setSize(player.width * 10, player.height * 10);
        // container.add([ player, reactor ]);
        container.setInteractive({ draggable: true });

        container.on('drag', (pointer, dragX, dragY) => container.setPosition(dragX, dragY));
        // container.on('drag', (pointer, dragX, dragY) => {
        //     container.setPosition(dragX, dragY);
          
        //     // Calculez les nouvelles positions pour les enfants par rapport au centre du conteneur
        //     const centerX = container.width / 2;
        //     const centerY = container.height / 2;

        //     const offsetX = centerX - player.width / 2;
        //     const offsetY = centerY - player.height / 2;

        //     player.setPosition(offsetX, offsetY);
        //     reactor.setPosition(offsetX, offsetY);
        //   });
        //SHOOT CADENCE
        timingShoot = this.time.addEvent({delay : 250, callback: ()=> this.shootAction() , loop : true, paused : false});
        //ENEMY POP
        popenemyZero = this.time.addEvent({delay : 800 , callback: () => this.setEnemyZero() , loop : true, paused : true});
        popenemyOne = this.time.addEvent({delay : 3000 , callback: () => this.setEnemyOne() , loop : true, paused : true});
        popenemyTwo = this.time.addEvent({delay : 2500 , callback: ()=> this.setEnemyTwo() , loop : true, paused : true});
        popenemyThree = this.time.addEvent({delay : 5000 , callback: ()=> this.setEnemyThree() , loop : true, paused : true});
        popenemyFour = this.time.addEvent({delay : 3000 , callback: ()=> this.setEnemyFour() , loop : true, paused : true,});
        popenemyFive = this.time.addEvent({delay : 10000, callback: ()=> this.setEnemyFive() , loop : true, paused : true,});
        popenemySix = this.time.addEvent({delay : 10000 , callback: ()=> this.setEnemySix() , loop : true, paused : true,});
        popenemySeven = this.time.addEvent({delay : 3000 , callback: ()=> this.setEnemySeven() , loop : true, paused : true});
        popenemyEight = this.time.addEvent({delay : 10000 , callback: ()=> this.setEnemyEight() , loop : true, paused : true});
        popenemyNine = this.time.addEvent({delay : 100000 ,callback: ()=> this.setEnemyNine() , loop : true, paused : false});
        popenemyTen = this.time.addEvent({delay : 3000 ,callback: ()=> this.setEnemyTen() , loop : true , paused : true});
        popenemyEleven = this.time.addEvent({delay : 80000 ,callback: ()=> this.setEnemyEleven() , loop : true , paused : true});
        popenemyTwelve = this.time.addEvent({delay : 30000 ,callback: ()=> this.setEnemyTwelve() , loop : true , paused : true});
        //IMPACT COLLISION
        const self = this;
        //ENEMY DAMAGE
        this.physics.add.overlap(bullets, enemies, function(blt,nmy){
            impactSong.play();
            if(nmy.data.list.health > 0){
                nmy.data.list.health -= playerDamage;
                _BULLETDAMAGE += playerDamage;
                scoreValue += levelValue;
                self.createImpact(nmy);
                self.textPoint(levelValue, nmy);
                blt.destroy();
            }else{
                nmy.setTintFill(0x3D3D3D); 
                popBonusCounter += 1;
                KILLCOUNTLEVEL += 1;
                _KILLCOUNT +=1;
                nmy.body.checkCollision.none = true; 
                if(nmy.data.list.type == 'boss'){
                    scoreValue += levelValue * 5;
                    self.textPoint(levelValue * 5, nmy);
                    _BOSSKILL += 1;
                    console.log('daboom ?');

                    self.bossDestruction(nmy);
                    self.destroyAll();
                    //console.log("level Value : " +levelValue);
                }else{
                    scoreValue += levelValue * 2;
                    self.textPoint(levelValue * 2, nmy);
                    self.createExplose(nmy);
                    nmy.destroy();
                }
            }
            scoretext.setText(`SCORE:${scoreValue}`);
        });
        //PLAYER DAMAGE
        this.physics.add.overlap(player, bullets2, function(plyr, blt){
          blt.destroy();
          boomSong.play();
          // Réinitialisation des propriétés de l'effet de secousse de la caméra
          camera.shakeEffect.reset();
          // Configuration des paramètres de l'effet de secousse
          camera.shakeEffect.start(800, 0.01);
          if(plyr.data.list.health > 1){
              self.InvinciblePlayer();
              plyr.data.list.health -= 1;
              (armEvoCount > 1)? armEvoCount -= 1 : armEvoCount = 1;
              self.createImpact(plyr);
          }else{
              timingShoot.paused = true;
              plyr.data.list.health = 0;
              player.isVisible = false;
              _DEATHNUMBER++;
              armEvoCount = 99;
              self.createExplose(plyr);
              console.log(plyr);
              self.GameOverScene();
        }
         console.log('plyr hlth : '+ plyr.data.list.health);
        });
        //OVERLAP ITEM
        this.physics.add.overlap(player, weaponUp, function(plyr, box){
            ispopBonus = true;
            self.createImpactItem(plyr);
            popBonusCounter = 0;
            //console.log(box);
            itemSong.play();
            switch (box.data.list.typeCount) {
                case 0: 
                if(plyr.data.list.health >= maxHealth){
                    plyr.data.list.health = plyr.data.list.health
                self.textPoint('FULL', plyr);
                }else{
                plyr.data.list.health += 1;
                self.textPoint('+', plyr);
                }    
                console.log('fruits');
                box.destroy();
                    break;
                case 1: armEvoCount += 1;
                console.log('weapon+');
                box.destroy();
                (armEvoCount >= 8)? self.textPoint('FULL', plyr) : self.textPoint('UPGRADE', plyr);
                    break;
                case 2: timingShoot.timeScale += 0.1;
                _WEAPONUPGRADE_SPEED += 1;
                weaponUp.clear(true,true);
                self.textPoint('LEVEL UP !', plyr)
                console.log(box);
                    break;
                case 3: playerDamage += 0.1;
                _WEAPONUPGRADE_DGTS += 1;
                weaponUp.clear(true,true);
                self.textPoint('LEVEL UP !', plyr)
                console.log(box);
                    break;
                case 4: maxHealth += 1; 
                _HEALTHPGRADE += 1;
                plyr.data.list.health += 1;
                weaponUp.clear(true,true);
                self.textPoint('LEVEL UP !', plyr)
                console.log(box);
                    break;
                default:break;
            }
        });
        //KILLWALL 
        this.physics.add.overlap(killwall, enemies, function(kllwll, enmy){
          enmy.destroy();
        })
        this.physics.add.overlap(killwall, bullets2, function(kllwll, blt){
            blt.destroy();
        })
        //STRT POINT
        this.physics.add.overlap(player, startPoint, function(plyr , point ){
            isMoveAuto = false;
            self.popUpgrade();
            point.body.enable = false;
        })
        //INPUT
        this.input.keyboard.on('keydown-SPACE',()=> this.PauseGameAction()); // SPACE
        this.input.keyboard.on('keydown-B',()=> {console.log(this.popenemyOne);}); // B
        cursor = this.input.keyboard.createCursorKeys(); // ARROWS
        //HTMLBTN
        // const btn = document.getElementById('ctnbtn');
        //if(btn){btn.addEventListener('click', ()=>{this.PauseGameAction()});};
        this.add.sprite(183, 568, 'body',0).setScale(1.02).setDepth(7);
        //#region TOUCH INPUT
        let btnquitposition = (isOnMobile) ? 476 : 400;
        btnQuit = this.add.sprite(323, btnquitposition, 'buttoninterface',3).setScale(1.02).setDepth(9).setAlpha(1).setInteractive({ pixelPerfect: true }).setVisible(false); //BTN UP
        btnQuit.on('pointerup', function (event){
            bipSong.play();
            btnQuit.setFrame(5);
            self.scene.start('Home');
            // self.scene.stop('MetalBirds');
            transiSong.stop();
            self.scale.setGameSize(366,445)
        });
        btnQuit.on('pointerover', function (event){btnQuit.setFrame(4);});
        btnQuit.on('pointerout', function (event){
            //self.btnQuit.clearTint();
            btnQuit.setFrame(3);
         });

        btnPause = this.add.sprite(42.50, 476, 'buttoninterface',0).setScale(1.02).setDepth(9).setAlpha(1).setInteractive({ pixelPerfect: true }); //BTN UP
        btnPause.on('pointerup', function (event){
            btnPause.setFrame(2);
            self.PauseGameAction();
        });
        btnPause.on('pointerover', function (event){btnPause.setFrame(1);});
        btnPause.on('pointerout', function (event){btnPause.setFrame(0);});

        btnReset = this.add.sprite(183, 400, 'buttoninterface',12).setScale(1.02).setDepth(9).setAlpha(1).setInteractive({ pixelPerfect: true }).setVisible(false); //BTN UP
        btnReset.on('pointerup', function (event){
            bipSong.play();
             btnReset.setFrame(14);
             self.scene.restart();
             transiSong.stop();
        });
        btnReset.on('pointerover', function (event){btnReset.setFrame(13);});
        btnReset.on('pointerout', function (event){btnReset.setFrame(12)});
        const btnUp = this.add.sprite(185, 504, 'button',0).setDepth(8).setAlpha(1).setInteractive({ pixelPerfect: true }); //BTN UP
        btnUp.on('pointerover', function (event){
            touchup = true;
            btnUp.setTint(0xff0000);
            btnUp.setFrame(1);
        });
        btnUp.on('pointerout', function (event){
           touchup = false;
            btnUp.clearTint();
            btnUp.setFrame(0);
        });
        const btnDown = this.add.sprite(185, 633, 'button',0).setDepth(8).setAlpha(1).setInteractive({ pixelPerfect: true }); //BTN DOWN
        btnDown.flipY = true;
        btnDown.on('pointerover', function (event ){
            touchdown = true;
            btnDown.setTint(0xff0000);
            btnDown.setFrame(1);
        });
        btnDown.on('pointerout', function (event ){
            touchdown = false;
            btnDown.clearTint();
            btnDown.setFrame(0);
        });
        const btnUpRight = this.add.sprite(238, 513, 'button',2).setDepth(8).setAlpha(1).setInteractive({ pixelPerfect: true }); //BTN DOWN
        btnUpRight.on('pointerover', function (event ){
            touchup = true;
            touchright = true;
            btnUpRight.setTint(0xff0000);
            btnUpRight.setFrame(3);
        });
        btnUpRight.on('pointerout', function (event){
            touchup = false;
            touchright = false;
            btnUpRight.clearTint();
            btnUpRight.setFrame(2);
        });
        const btnRight = this.add.sprite(248, 570, 'button',0).setDepth(8).setAlpha(1).setInteractive({ pixelPerfect: true }); //BTN UP
        btnRight.rotation = 1.58;
        btnRight.on('pointerover', function (event){
            touchright = true;
            btnRight.setTint(0xff0000);
            btnRight.setFrame(1);
        });
        btnRight.on('pointerout', function (event){
            touchright = false;
            btnRight.clearTint();
            btnRight.setFrame(0);
        });
        const btnDownRight = this.add.sprite(238, 624, 'button',2).setDepth(8).setAlpha(1).setInteractive({ pixelPerfect: true }); //BTN UP
        btnDownRight.flipY = true;
        btnDownRight.on('pointerover', function (event){
            touchright = true;
            touchdown = true;
            btnDownRight.setTint(0xff0000);
            btnDownRight.setFrame(3);
        });
        btnDownRight.on('pointerout', function (event){
            touchright = false;
            touchdown = false;
            btnDownRight.clearTint();
            btnDownRight.setFrame(2);
        });
        const btnUpLeft = this.add.sprite(129, 513, 'button',2).setDepth(8).setAlpha(1).setInteractive({ pixelPerfect: true }); //BTN UP
        btnUpLeft.flipX = true;
        btnUpLeft.on('pointerover', function (event){
            touchup = true;
            touchleft = true;
            btnUpLeft.setTint(0xff0000);
            btnUpLeft.setFrame(3);
        });
        btnUpLeft.on('pointerout', function (event){
            touchup = false;
            touchleft = false;
            btnUpLeft.clearTint();
            btnUpLeft.setFrame(2);
        });
        const btnLeft = this.add.sprite(118, 567, 'button',0).setDepth(8).setAlpha(1).setInteractive({ pixelPerfect: true }); //BTN UP
        btnLeft.rotation = -1.58;
        btnLeft.on('pointerover', function (event){
            touchleft = true;
            btnLeft.setTint(0xff0000);
            btnLeft.setFrame(1);
        });
        btnLeft.on('pointerout', function (event){
            touchleft = false;
            btnLeft.clearTint();
            btnLeft.setFrame(0);
        });
        const btnDownLeft = this.add.sprite(129, 624, 'button',2).setDepth(8).setAlpha(1).setInteractive({ pixelPerfect: true }); //BTN UP
        btnDownLeft.flipY= true;
        btnDownLeft.flipX= true;
        btnDownLeft.on('pointerover', function (event){
            touchleft = true;
            touchdown = true;
            btnDownLeft.setTint(0xff0000);
            btnDownLeft.setFrame(3);
        });
        btnDownLeft.on('pointerout', function (event){
            touchleft = false;
            touchdown = false;
            btnDownLeft.clearTint();
            btnDownLeft.setFrame(2);
        });
        //#endregion

        // this.setDragon();
        //this.setEnemyEleven()
        //var testObj = this.physics.add.sprite(183, 350,'largebullet', 238).setDepth(2).setScale(2);
        //testObj.anims.play('startburst',true);
        // this.setEnemyFive()
        //this.setDragon();
        this.ResetValues();
        this.StartScene();
        (sessionStorage.getItem('bestscore') != undefined)? _BESTSCORE = parseInt(sessionStorage.getItem('bestscore')) : console.log('no bestScore');
        (sessionStorage.getItem('levelMax') != undefined)? _LEVELMAX = parseInt(sessionStorage.getItem('levelMax')) : console.log('no maxLevel');
        //SIZE PC OR MOBILE 
        const { width, height } = this.scale;
        if(isOnMobile){
            this.scale.setGameSize(366,700)
            camera.setViewport(0, 0, 366, 700); //bordure externe visible l'ors du tremblement
        }else{
            this.scale.setGameSize(366,445)
            camera.setViewport(0, 0, 366, 445); //bordure externe visible l'ors du tremblement
        }
        isOnMobile ? this.scale.setGameSize(366,700) : this.scale.setGameSize(366,445);

        // this.input.on('pointerdown', function (pointer)
        // {
        //     console.log(this.game.loop.frame, 'down B');
        //     if (pointer.isDown)
        //     {
        //         pointerX = pointer.worldX;
        //         pointerY = pointer.worldY;
        //         console.log("down");
        //     }
            
        // }, this);

        //END CREATE
    }

    update() {
        // const p = this.input.activePointer;
        // if(p.isDown){
        //     newpointerX = p.worldX - pointerX;
        //     newpointerY = p.worldY - pointerY;
        //     //console.log("down" + newpointerX + "-" + newpointerY);
        // }
        // else{
        //     newpointerX = 0;
        //     newpointerY = 0;
        //     //console.log("out" + newpointerX + "-" + newpointerY);
        // }

        if(!isPaused){
            city.tilePositionY -= (1 + backGroundSpeed);
            sky.tilePositionY -= (3 + backGroundSpeed);
            mask.tilePositionY -= 100;
            (isChronoStart)? chrono ++ : chrono = chrono;
            this.popBoss();
            this.popBonusWeapon();
            this.LevelNext();
            this.SceneAction();
            this.playerMovement();
        }else{
            city.tilePositionY = city.tilePositionY;
            sky.tilePositionY = sky.tilePositionY;
            mask.tilePositionY = mask.tilePositionY;
            chrono = chrono;
        }
        healthBar.width = player.data.list.health * 20;
        //console.log(this.maxHealth);
        reactor.x = player.x;
        reactor.y = player.y + 32;
        leveltxt.setText(`LVL:${levelValue}`);
        levelNextxt.setText(`LEVEL ${levelValue + 1}`);
        upgradetxt.setText([
            `UPGRADE`,
            `  dammage:    lvl ${_WEAPONUPGRADE_DGTS}`,
            `  SPEED:        lvl ${_WEAPONUPGRADE_SPEED}`,
            `  HEALTH:      lvl ${_HEALTHPGRADE}`,
            ``,
            `STATS`,
            `  BESTSCORE: ${_BESTSCORE}`,
            `  LEVELMAX:   ${_LEVELMAX}`,
            `  BOSSKILL:   ${_BOSSKILL}`
        ]);
        //this.testtxt.setText(`popBonusCtn:${this.popBonusCounter}killcountlvl:${this.KILLCOUNTLEVEL}`);
        chronotxt.setText(`time : ${this.formatChronoTime(chrono)}`);

        if(!skyIsVisible){
            if(sky.alpha > 0){sky.alpha -= 0.005;}
        }else{
            if(sky.alpha < skyAlphaMax){sky.alpha += 0.005;}
        }
        if(drgBody.length > 0){
            Phaser.Actions.Angle(drgBody, 1.5, 0.1,17,2);
            console.log('hello');
        }
        (isMoveAuto)? this.playerAuto() : '';
        //END UPDATE
    }

    //#region FUNCTIONS

    ResetValues(){
        this.physics.resume();
        tweenManager.resumeAll();
        isGameOverButtonApear = false;
        drgBody = []; //dragon boss body array
        bodyMoveDragonVelocity = 0.5;
        KILLCOUNTLEVEL  = 0;
        _KILLCOUNT  = 0;
        _DEATHNUMBER  = 0;
        _LEVELMAX  = 1;
        _BULLETDAMAGE  = 0;
        _BOSSKILL = 0;
        _WEAPONUPGRADE_SPEED = 0;
        _WEAPONUPGRADE_DGTS = 0;
        _HEALTHPGRADE = 0;
        maxHealth = 4;
        playerDamage = 1;
        isMoveAuto = false;
        isOnMobile = false;
        isGameFinish = false;
        popBonusCounter  = 0; //pop weapon counter
        scoreValue = 0;
        levelValue = 1;
        skyIsVisible = true;
        backGroundSpeed = 0;
        skyAlphaMax = 0.4;
        itsIncrementNextLvlValue = false;
        ispopBonus = true;
        ispopBoss = true;
        isPaused = false;
        armEvoCount = 1; 
        speed  = 100; // popenemy = levelvalue * speed 
        chrono = 0;
        isChronoStart = false;
        isControlsOperational = false;
    }

    InvinciblePlayer(){
        // Commencer le clignotement
        var intervalId = setInterval(() => {
            console.log(player.body.checkCollision.none = true);
            player.visible = !player.isVisible;
            player.isVisible = !player.isVisible;
        }, 50); // Clignote toutes les 500 ms (0.5 secondes)
        //setTimeout(()=>{player.isVisible = true;},1500);
        setTimeout(()=>{
            clearInterval(intervalId);
            player.visible = true;
            player.body.checkCollision.none = false;
        },1500)
    }
    StartScene(){
      var startValues = [3,2,1,'GO!',''];
      var nbr = 0;
      timingShoot.paused = true;
      var start = setInterval(()=>{
          nbr++;
          starttxt.setText(startValues[nbr]);
          bipSong.play();
          //console.log(nbr);
          if(nbr >= 4){
              timingShoot.paused = false;
              isChronoStart = true;
              clearInterval(start);
              isControlsOperational = true;
          };
      },1000);
    } 

    SceneAction(){
        let rnd = Math.floor(Math.random() * 2); // 0 | 1
        //console.log(this.popenemyOne);
        popenemyOne.timeScale = levelValue ;
        popenemyTwo.timeScale = levelValue ;
        popenemyThree.timeScale = levelValue ;
        popenemyFour.timeScale = levelValue ;
        popenemyFive.timeScale = levelValue ;
        popenemySix.timeScale = levelValue ;
        popenemySeven.timeScale = levelValue ;
        popenemyEight.timeScale = levelValue ;
        popenemyNine.timeScale = levelValue ;
        popenemyTen.timeScale = levelValue ;
        popenemyEleven.timeScale = levelValue ;
        popenemyTwelve.timeScale = levelValue ;
        
        switch (KILLCOUNTLEVEL) {
        case 0 :
        // this.popenemyOne.paused = false;
        if(levelValue >= 2 && rnd == 0){popenemyTwelve.paused = false;popenemyOne.paused = true} else{popenemyOne.paused = false;popenemyTwelve.paused = true};
        (levelValue >= 3) ? popenemyEleven.paused = false : popenemyEleven.paused = true;
        popenemySix.paused = false;

        ispopBoss = true;
        //console.log('salut');
            break;
        case levelValue * 10: console.log(levelValue * 10 +" Kill");
        this.cloudOpacityChange();
        popenemyTwo.paused = false;
        popenemyFive.paused = false;

        popenemyOne.paused = true;
        popenemySix.paused = true;
        popenemyTwelve.paused = true;
            break;
        case levelValue * 20:console.log(levelValue * 20 +" Kill");
        this.cloudOpacityChange();
        popenemyThree.paused = false;
        popenemySeven.paused = false;

        popenemyOne.paused = true;
        popenemyTwo.paused = true;
        popenemyFive.paused = true;
        popenemySix.paused = true;
        popenemyTwelve.paused = true;
            break;
        case levelValue * 25: console.log(levelValue * 25 +" Kill");
        popenemyZero.paused = false;

        popenemyOne.paused = true;
        popenemyTwo.paused = true;
        popenemyFive.paused = true;
        popenemySix.paused = true;
        popenemySeven.paused = true;
        popenemyTwelve.paused = true;
            break;
        case levelValue * 30: console.log(levelValue * 30 +" Kill");
        this.cloudOpacityChange();
        popenemyEight.paused = false;
        popenemyFour.paused = false;

        popenemyOne.paused = true;
        popenemyTwo.paused = true;
        popenemyThree.paused = true;
        popenemyFive.paused = true;
        popenemySix.paused = true;
        popenemySeven.paused = true;
        popenemyNine.paused = true;
        popenemyTwelve.paused = true;
            break;
        case levelValue * 40: console.log(levelValue * 40 +" Kill");
        this.cloudOpacityChange();
        popenemyTen.paused = false;

        popenemyOne.paused = true;
        popenemyZero.paused = true;
        popenemyTwo.paused = true;
        popenemyFour.paused = true;
        popenemyFive.paused = true;
        popenemySix.paused = true;
        popenemySeven.paused = true;
        popenemyEight.paused = true;
        popenemyNine.paused = true;
        popenemyTwelve.paused = true;
            break;
        case levelValue * 50: console.log(levelValue * 50 +" Kill");
        this.cloudOpacityChange();
        music.stop();
        popenemyZero.paused = true;
        popenemyOne.paused = true;
        popenemyTwo.paused = true;
        popenemyThree.paused = true;
        popenemyFour.paused = true;
        popenemyFive.paused = true;
        popenemySix.paused = true;
        popenemySeven.paused = true;
        popenemyEight.paused = true;
        popenemyNine.paused = true;
        popenemyTen.paused = true;
        popenemyEleven.paused = true;
        popenemyTwelve.paused = true;
            break;
        default:
            break;
      }
    }

    LevelNext(){
    if(itsIncrementNextLvlValue){
        if(KILLCOUNTLEVEL >= 50){levelValue++;}
        city.setFrame(levelValue >= 8 ? 8 : levelValue - 1);
        isControlsOperational = true;
        KILLCOUNTLEVEL = 0;
        itsIncrementNextLvlValue = false;
        city.alpha = 1;
        levelNextxt.alpha = 0;
        chronotxt.alpha = 0;
        mask.alpha = 0;
        isChronoStart = true;
        camera.flashEffect.start(); //FLASH
        weaponUp.clear(true,true);
        console.log('hola');
      }
    }

    nextLevelAction(){
    let newSpeed = 20;
    isMoveAuto = true;
    startPoint.body.enable = true;
    boostSong.play();
    transiSong.play();
    bossSong.stop();
    impactSong.volume = 0;
    boomSong.volume = 0;
    //this.city.setTintFill(1);
    if(!isGameFinish){
        var cloudAccelerate = this.tweens.addCounter({
            from: backGroundSpeed,
            to: newSpeed,
            duration: 15000,
            ease: 'expo.out',
                onUpdate: (tween) => {
                    enemies.clear(true,true);
                    bullets2.clear(true,true);
                    isControlsOperational = false;
                    levelNextxt.alpha = sky.alpha
                    chronotxt.alpha = sky.alpha
                    isChronoStart = false;
                    mask.alpha = 1;
                    popBonusCounter = 0;
                    city.alpha = 0.2;
                    popenemyNine.paused = true;
                    popenemyEleven.paused = true;
                    reactor.visible = true;
                    const value = Math.round(tween.getValue());
                    backGroundSpeed = value;
                    boomSong.stop();
                },
                onComplete: (tween) => {
                    reactor.visible = false;
                    timingShoot.paused = false;
                    newSpeed = 0;
                    backGroundSpeed = 0;
                    cloudAccelerate.stop();
                    popenemyNine.paused = false;
                    popenemyEleven.paused = false;
                    itsIncrementNextLvlValue = true;
                    transiSong.stop();
                    music.play();
                    boostSong.play();
                    impactSong.volume = 0.5;
                    boomSong.volume = 0.5;
                }
            });
    }
    }

    GameOverScene(){
        if(!isGameFinish){
            music.stop();
            bossSong.stop();
            console.log(this._KILLCOUNT);
            this.AllEnemyPaused();
            isChronoStart = false;
            player.visible = false;
            isGameFinish = true;
            isControlsOperational = false;
            setTimeout(()=>{
                this.destroyAll();
                enemies.clear(true,true);
                bullets2.clear(true,true);
            },1500);
            setTimeout(()=>{
                mask.setAlpha(0.8);
                mask.setFrame(9);
                goscoretxt.setText(scoreValue);
                gameovertxt.setVisible(true);
                goscoretxt.setVisible(true);
                this.physics.pause();
                tweenManager.pauseAll();
                chronotxt.setAlpha(1);
                btnPause.setVisible(false);
                btnQuit.setVisible(true);
                this.buttonMenuIsVisible(false,true);
                this.SetUserValues(_KILLCOUNT,_DEATHNUMBER,_BULLETDAMAGE,_BOSSKILL,scoreValue);
            } , 8000)
          }
    }

    playerMovement(){
        player.setVelocity(0); 
        player.setFrame(0);                  
        if(cursor.up.isDown || touchup || newpointerY < 0){                         
            player.setVelocityY(-120);
        }
        if(cursor.down.isDown || touchdown || newpointerY > 0){                         
            player.setVelocityY(120);
        }                      
        if(cursor.left.isDown || touchleft || newpointerX < 0){
            player.setVelocityX(-120);
            player.setFrame(1);
        }                 
        if(cursor.right.isDown || touchright || newpointerX > 0){
            player.setVelocityX(120);
            player.setFrame(3);
        }  
    }

    playerAuto(){
        this.physics.moveToObject(player, startPoint, 100);
    }

    popUpgrade(){
        weaponUp.create(100,250,'fruits',15).setScale(2).setData('typeCount', 2);
        weaponUp.create(180,250,'fruits',16).setScale(2).setData('typeCount', 3);
        weaponUp.create(260,250,'fruits',17).setScale(2).setData('typeCount', 4);
    }

    popBonusWeapon(){
      if(popBonusCounter >= 10){
          if(ispopBonus){
              this.setWeaponUp();
              //(KILLCOUNTLEVEL >= 50)? levelValue++ : "ok";
              popBonusCounter = 0;
              ispopBonus = false;
          }
      }
    }

    popBoss(){
    if(KILLCOUNTLEVEL >= levelValue * 50){
        if(ispopBoss){
            bossSong.play();
            boostSong.play();
            switch (levelValue) {
                case 1: this.setBossOne();
                ispopBoss = false;
                    break;
                case 2: this.setBossTwo();
                ispopBoss = false;         
                    break;
                case 3: this.setBossThree();
                ispopBoss = false;
                    break;
                case 4: this.setBossFour();
                ispopBoss = false;
                    break;
                case 5: this.setDragon();
                ispopBoss = false;
                    break;
                default: this.setDragon();
                ispopBoss = false;
                    break;
            }
        }
    }
    }

    shootAction(){
      if(bullets){
        // armEvoCount = 8
        switch (armEvoCount) {
        case 1: 
            var fire = bullets.create(player.body.position.x + 3, player.body.position.y,'bullet', 404).setSize(3, 6).setOffset(7,5).setScale(2);
            setTimeout(() => {fire.destroy();}, 1000);
            fire.setCollideWorldBounds(true);
            // console.log(fire);
            fire.body.velocity.y = -300;
            break;
        case 2: 
            var fire = bullets.create(player.body.position.x + 8, player.body.position.y,'bullet', 404, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire2 = bullets.create(player.body.position.x - 2, player.body.position.y,'bullet', 404, true).setSize(3, 6).setOffset(7,5).setScale(2);
            setTimeout(() => {fire.destroy();fire2.destroy();}, 1000);
            fire.body.velocity.y = -300;
            fire2.body.velocity.y = -300;
            break;
        case 3:
            var fire = bullets.create(player.body.position.x + 8, player.body.position.y,'bullet', 625, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire2 = bullets.create(player.body.position.x - 2, player.body.position.y,'bullet', 625, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire3 = bullets.create(player.body.position.x + 8, player.body.position.y,'bullet', 404, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire4 = bullets.create(player.body.position.x - 2, player.body.position.y,'bullet', 404, true).setSize(3, 6).setOffset(7,5).setScale(2);
            setTimeout(() => {fire.destroy();fire2.destroy();fire3.destroy;fire4.destroy();}, 1000);
            fire.body.velocity.x = 120;
            fire.body.velocity.y = -300;
            fire2.body.velocity.x = -120;
            fire2.body.velocity.y = -300;
            fire2.flipX = true;
            fire3.body.velocity.y = -300;
            fire4.body.velocity.y = -300;
            break;
        case 4:
            var fire = bullets.create(player.body.position.x + 8, player.body.position.y,'bullet', 675, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire2 = bullets.create(player.body.position.x - 2, player.body.position.y,'bullet', 675, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire3 = bullets.create(player.body.position.x + 8, player.body.position.y,'bullet', 763, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire4 = bullets.create(player.body.position.x - 2, player.body.position.y,'bullet', 763, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire5 = bullets.create(player.body.position.x + 8, player.body.position.y,'bullet', 404, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire6 = bullets.create(player.body.position.x - 2, player.body.position.y,'bullet', 404, true).setSize(3, 6).setOffset(7,5).setScale(2);
            setTimeout(() => {fire.destroy();fire2.destroy();fire3.destroy();fire4.destroy();fire5.destroy();fire6.destroy();}, 1000);
            fire.body.velocity.x = 120;
            fire.body.velocity.y = 300;
            fire2.body.velocity.x = -120;
            fire.flipX = true;
            fire2.body.velocity.y = 300;
            fire3.body.velocity.x = 180;
            fire4.body.velocity.x = -180;
            fire4.body.velocity.y = -300;
            fire4.flipX = true;
            fire3.body.velocity.y = -300;
            fire5.body.velocity.y = -300;
            fire6.body.velocity.y = -300;
            break;
        case 5:
            var fire0 = bullets.create(player.body.position.x + 3, player.body.position.y,'bullet', 404).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire = bullets.create(player.body.position.x + 8, player.body.position.y,'bullet', 764, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire2 = bullets.create(player.body.position.x - 2, player.body.position.y,'bullet', 764, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire3 = bullets.create(player.body.position.x + 8, player.body.position.y,'bullet', 763, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire4 = bullets.create(player.body.position.x - 2, player.body.position.y,'bullet', 763, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire5 = bullets.create(player.body.position.x + 14, player.body.position.y,'bullet', 404, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire6 = bullets.create(player.body.position.x - 10, player.body.position.y,'bullet', 404, true).setSize(3, 6).setOffset(7,5).setScale(2);
            setTimeout(() => {fire0.destroy();fire.destroy();fire2.destroy();fire3.destroy;fire4.destroy();fire5.destroy();fire6.destroy();}, 1000);
            fire0.body.velocity.y = -300;
            fire.body.velocity.x = 120;
            fire.body.velocity.y = 300;
            fire2.body.velocity.x = -120;
            fire.flipX = true;
            fire2.body.velocity.y = 300;
            fire3.body.velocity.x = 180;
            fire4.body.velocity.x = -180;
            fire4.body.velocity.y = -300;
            fire4.flipX = true;
            fire3.body.velocity.y = -300;
            fire5.body.velocity.y = -300;
            fire6.body.velocity.y = -300;
            break;
        case 6: 
            var fire0 = bullets.create(player.body.position.x + 3, player.body.position.y,'bullet', 404).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire = bullets.create(player.body.position.x + 8, player.body.position.y,'bullet', 764, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire2 = bullets.create(player.body.position.x - 2, player.body.position.y,'bullet', 764, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire25 = bullets.create(player.body.position.x, player.body.position.y + 8,'bullet', 675, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire3 = bullets.create(player.body.position.x + 8, player.body.position.y,'bullet', 763, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire35 = bullets.create(player.body.position.x, player.body.position.y + 8,'bullet', 675, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire4 = bullets.create(player.body.position.x - 2, player.body.position.y,'bullet', 763, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire45 = bullets.create(player.body.position.x - 24, player.body.position.y,'bullet', 625, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire5 = bullets.create(player.body.position.x + 14, player.body.position.y,'bullet', 404, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire55 = bullets.create(player.body.position.x + 36, player.body.position.y,'bullet', 625, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire6 = bullets.create(player.body.position.x - 10, player.body.position.y,'bullet', 404, true).setSize(3, 6).setOffset(7,5).setScale(2);
            setTimeout(() => {fire0.destroy();fire.destroy();fire2.destroy();fire25.destroy();fire3.destroy();fire35.destroy();fire4.destroy();fire45.destroy();fire5.destroy();fire55.destroy();fire6.destroy();}, 1000);
            fire0.body.velocity.y = -300;
            fire.body.velocity.x = 120;
            fire.body.velocity.y = 300;
            fire.flipX = true;
            fire2.body.velocity.x = -120;
            fire2.body.velocity.y = 300;
            fire25.body.velocity.x = -280;
            fire25.body.velocity.y = 300;
            fire3.body.velocity.y = -300;
            fire35.body.velocity.x = 280;
            fire35.body.velocity.y = 300;
            fire35.flipX = true;
            fire3.body.velocity.x = 180;
            fire4.body.velocity.x = -180;
            fire4.body.velocity.y = -300;
            fire4.flipX = true;
            fire45.flipX = true;
            fire45.body.velocity.x = -180;
            fire45.body.velocity.y = -300;
            fire5.body.velocity.y = -300;
            fire55.body.velocity.x = 180;
            fire55.body.velocity.y = -300;
            fire6.body.velocity.y = -300;
            break;
        case 7:
            //
            var fire0 = bullets.create(player.body.position.x + 22, player.body.position.y,'bullet', 404).setSize(3, 6).setOffset(7,5).setScale(2);
            //dev LEFT
            var fire02 = bullets.create(player.body.position.x - 18, player.body.position.y,'bullet', 404).setSize(3, 6).setOffset(7,5).setScale(2);
            //DIAG BAS right
            var fire = bullets.create(player.body.position.x + 8, player.body.position.y,'bullet', 764, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire1 = bullets.create(player.body.position.x, player.body.position.y + 10,'bullet', 678, true).setSize(3, 6).setOffset(7,5).setScale(2);
            //DIAG BAS Left
            var fire2 = bullets.create(player.body.position.x - 2, player.body.position.y,'bullet', 764, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire22 = bullets.create(player.body.position.x, player.body.position.y + 10,'bullet', 678, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire25 = bullets.create(player.body.position.x, player.body.position.y + 8,'bullet', 675, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire3 = bullets.create(player.body.position.x + 8, player.body.position.y,'bullet', 763, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire35 = bullets.create(player.body.position.x, player.body.position.y + 8,'bullet', 675, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire4 = bullets.create(player.body.position.x - 2, player.body.position.y,'bullet', 763, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire45 = bullets.create(player.body.position.x - 24, player.body.position.y,'bullet', 625, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire5 = bullets.create(player.body.position.x + 10, player.body.position.y,'bullet', 404, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire55 = bullets.create(player.body.position.x + 36, player.body.position.y,'bullet', 625, true).setSize(3, 6).setOffset(7,5).setScale(2);
            var fire6 = bullets.create(player.body.position.x - 6, player.body.position.y,'bullet', 404, true).setSize(3, 6).setOffset(7,5).setScale(2);
            setTimeout(() => {fire0.destroy();fire02.destroy();fire.destroy();fire1.destroy();fire2.destroy();fire22.destroy();fire25.destroy();fire3.destroy();fire35.destroy();fire4.destroy();fire45.destroy();fire5.destroy();fire55.destroy();fire6.destroy();}, 1000);
            fire0.body.velocity.y = -300;
            fire02.body.velocity.y = -300;
            fire.body.velocity.x = 120;
            fire.body.velocity.y = 300;
            fire1.body.velocity.x = 300;
            fire1.body.velocity.y = 120;
            fire.flipX = true;
            fire1.flipX = true;
            fire2.body.velocity.x = -120;
            fire2.body.velocity.y = 300;
            fire22.body.velocity.x = -300;
            fire22.body.velocity.y = 120;
            fire25.body.velocity.x = -280;
            fire25.body.velocity.y = 300;
            fire3.body.velocity.y = -300;
            fire35.body.velocity.x = 280;
            fire35.body.velocity.y = 300;
            fire35.flipX = true;
            fire3.body.velocity.x = 180;
            fire4.body.velocity.x = -180;
            fire4.body.velocity.y = -300;
            fire4.flipX = true;
            fire45.flipX = true;
            fire45.body.velocity.x = -180;
            fire45.body.velocity.y = -300;
            fire5.body.velocity.y = -300;
            fire55.body.velocity.x = 180;
            fire55.body.velocity.y = -300;
            fire6.body.velocity.y = -300;
            break;
            case 8:
                //
                var fire0 = bullets.create(player.body.position.x + 28, player.body.position.y,'bullet', 404).setSize(3, 6).setOffset(7,5).setScale(2);
                var fire00 = bullets.create(player.body.position.x + 3, player.body.position.y,'bullet', 281).setSize(3, 6).setOffset(7,5).setScale(2);
                //dev LEFT
                var fire02 = bullets.create(player.body.position.x - 24, player.body.position.y,'bullet', 404).setSize(3, 6).setOffset(7,5).setScale(2);
                //DIAG BAS right
                var fire = bullets.create(player.body.position.x + 8, player.body.position.y,'bullet', 764, true).setSize(3, 6).setOffset(7,5).setScale(2);
                var fire1 = bullets.create(player.body.position.x, player.body.position.y + 10,'bullet', 678, true).setSize(3, 6).setOffset(7,5).setScale(2);
                //DIAG BAS Left
                var fire2 = bullets.create(player.body.position.x - 2, player.body.position.y,'bullet', 764, true).setSize(3, 6).setOffset(7,5).setScale(2);
                var fire22 = bullets.create(player.body.position.x, player.body.position.y + 10,'bullet', 678, true).setSize(3, 6).setOffset(7,5).setScale(2);
                var fire25 = bullets.create(player.body.position.x, player.body.position.y + 8,'bullet', 675, true).setSize(3, 6).setOffset(7,5).setScale(2);
                var fire3 = bullets.create(player.body.position.x + 8, player.body.position.y,'bullet', 763, true).setSize(3, 6).setOffset(7,5).setScale(2);
                var fire32 = bullets.create(player.body.position.x, player.body.position.y +30,'bullet', 678, true).setSize(3, 6).setOffset(7,5).setScale(2);
                var fire33 = bullets.create(player.body.position.x , player.body.position.y +20,'bullet', 767, true).setSize(3, 6).setOffset(7,5).setScale(2);
                var fire35 = bullets.create(player.body.position.x, player.body.position.y + 8,'bullet', 675, true).setSize(3, 6).setOffset(7,5).setScale(2);
                var fire4 = bullets.create(player.body.position.x - 2, player.body.position.y,'bullet', 763, true).setSize(3, 6).setOffset(7,5).setScale(2);
                var fire42 = bullets.create(player.body.position.x, player.body.position.y +30,'bullet', 678, true).setSize(3, 6).setOffset(7,5).setScale(2);
                var fire44 = bullets.create(player.body.position.x, player.body.position.y + 20,'bullet', 767, true).setSize(3, 6).setOffset(7,5).setScale(2);
                var fire45 = bullets.create(player.body.position.x - 24, player.body.position.y,'bullet', 625, true).setSize(3, 6).setOffset(7,5).setScale(2);
                var fire5 = bullets.create(player.body.position.x + 14, player.body.position.y,'bullet', 404, true).setSize(3, 6).setOffset(7,5).setScale(2);
                var fire55 = bullets.create(player.body.position.x + 36, player.body.position.y,'bullet', 625, true).setSize(3, 6).setOffset(7,5).setScale(2);
                var fire6 = bullets.create(player.body.position.x - 10, player.body.position.y,'bullet', 404, true).setSize(3, 6).setOffset(7,5).setScale(2);
                setTimeout(() => {fire00.destroy();fire0.destroy();fire02.destroy();fire.destroy();fire1.destroy();fire2.destroy();fire22.destroy();fire25.destroy();fire3.destroy();fire32.destroy();fire33.destroy();fire35.destroy();fire4.destroy();fire42.destroy();fire44.destroy();fire45.destroy();fire5.destroy();fire55.destroy();fire6.destroy();}, 1000);
                fire00.body.velocity.y = -300;
                fire0.body.velocity.y = -300;
                fire02.body.velocity.y = -300;
                fire.body.velocity.x = 120;
                fire.body.velocity.y = 300;
                fire1.body.velocity.x = 300;
                fire1.body.velocity.y = 120;
                fire.flipX = true;
                fire1.flipX = true;
                fire2.body.velocity.x = -120;
                fire2.body.velocity.y = 300;
                fire22.body.velocity.x = -300;
                fire22.body.velocity.y = 120;
                fire25.body.velocity.x = -280;
                fire25.body.velocity.y = 300;
                fire3.body.velocity.y = -300;
                fire3.body.velocity.x = 180;
                fire32.body.velocity.x = 200;
                fire32.body.velocity.y = -200;
                fire33.body.velocity.x = 180;;
                fire35.body.velocity.x = 280;
                fire35.body.velocity.y = 300;
                fire35.flipX = true;
                fire4.body.velocity.x = -180;
                fire4.body.velocity.y = -300;
                fire42.body.velocity.x = -200;
                fire42.body.velocity.y = -200;
                fire4.flipX = true;
                fire44.body.velocity.x = -180;;
                fire45.flipX = true;
                fire45.body.velocity.x = -180;
                fire45.body.velocity.y = -300;
                fire5.body.velocity.y = -300;
                fire55.body.velocity.x = 180;
                fire55.body.velocity.y = -300;
                fire6.body.velocity.y = -300;
                break;
        case 9 : armEvoCount = 8;
            break;
        case 99 : 
            break;
        default: armEvoCount = armEvoCount;
            break;
        }

      }else{
        console.log('bullets not found');
        // console.log(this);
      }
    };

    textPoint(value, enmy){
    var rndX = Phaser.Math.Between(-15,15);      
    var ptxt = this.add.bitmapText(183, 260,'customfont2','9',15).setTintFill(0xffffff).setOrigin(0.5, 0.5).setDepth(2).setText(value);
    ptxt.x = enmy.x + rndX;
    ptxt.y = enmy.y;
    this.tweens.add({
        targets: ptxt,
        y: enmy.y - 50,  // Position y finale
        duration: 500,  // Durée de l'animation en millisecondes
        ease: 'Linear',  // Type d'interpolation
        onComplete: () => {
            ptxt.destroy();
        }
      });
    }

    cloudOpacityChange(){
    skyIsVisible = false;
        setTimeout(()=>{
            skyIsVisible = true;
            skyAlphaMax = 0.4;
        },5000)
    };

  //SET ENEMY
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
    setEnemyZero(){
    let rnd = Math.floor(Math.random() * 2);

    let rndval = rnd == 0 ? 30 : -30;
    var rndX = Phaser.Math.Between(50,316);    
    var shootDelay = Phaser.Math.Between(900,5000);
    var enemy = enemies.create(rndX,0,'airplanes',12);
    enemy.body.setSize(20, 35);
    enemy.setData('health', -1);
    enemy.flipY = true;
    //this.ShootAnyRightBottom(enemy, 80, 0,150,'bullet',253,1200,5,7000,false);

        //enemy.body.velocity.y = 100;
    this.tweens.add({
        targets: enemy,
        x : {value : player.x + rndval , ease : 'expo.inout'},
        y : {value : 500, ease : 'linear'},
        duration : 4000
    });
    //this.physics.moveToObject(enemy, player, 130);
        setTimeout(() => {
            if(enemy.data != undefined){
                this.ShootEnemyFour(enemy)
            }
        }, shootDelay);
        setTimeout(() => {enemy.destroy()},4000);
    }

    setEnemyOne(){
        var rndX = Phaser.Math.Between(50,316);      
        var shootDelay = Phaser.Math.Between(1000,10000);
        var enemy = enemies.create(rndX,0,'airplanes',4);
        enemy.body.setSize(20, 35)
        // .setOffset(80,50);
        enemy.setData('health', 0 + levelValue);
        enemy.flipY = true;
        enemy.body.velocity.y = 80;
        setTimeout(() => {
            if(enemy.data != undefined){
                this.ShootEnemyOne(enemy);
            }
        }, shootDelay);
    }

    setEnemyTwo(){   
        var rndX = Phaser.Math.Between(30,336);      
        var shootDelay = Phaser.Math.Between(1000,10000);      
        var enemy = enemies.create(rndX,-30,'airplanes',10);
        enemy.body.setSize(25, 35);
        enemy.setData('health', 1 + levelValue);
        enemy.flipY = true;
        this.tweens.add({
            targets : enemy,
            props: {
                x: { value: 200, duration: 4000, },
                y: { value: 600, duration: 15000,  },
            },
            ease: 'Sine.easeInOut',
            yoyo: true,
            //repeat: -1
        });
        setTimeout(() => {
            if(enemy.data != undefined){this.ShootEnemyTwo(enemy);}
        }, shootDelay);
    }

    setEnemyThree(){
        var rndX = Phaser.Math.Between(-40,40);      
        //var shootDelay = Phaser.Math.Between(1000,10000);      
        var enemy = enemies.create(174,0,'airplanes',11).setDepth(2);
        enemy.setData('health', 7 + levelValue);
        enemy.flipY = true;
        enemy.body.velocity.y = 40;
        enemy.body.velocity.x = rndX;
        setTimeout(() => {
            if(enemy.data != undefined){
                this.ShootEnemyThree(enemy);
                enemy.body.velocity.y = 0;
                enemy.body.velocity.x = 0;
            }
        }, 3000);
    }

    setEnemyFour(){
        // var rndyvel = Phaser.Math.Between(3000,8000);         
        let rnd = Math.floor(Math.random() * 2); // 0 | 1
        let posX = (rnd == 0)? 0 : 366;
        let posY = (rnd == 0)? 100 : 200;
        console.log(rnd);
        var enemy = enemies.create(posX,posY,'airplanes',9);
        enemy.setData('health', 2 + levelValue);
        enemy.flipY = true;
        this.tweens.add({
            targets: enemy,
            x : {value : 173 , ease : 'back.out'},
            y : {value : 500 , ease : 'quint.in'},
            duration : 8000
        });
        enemy.body.velocity.y = 30;
        setTimeout(() => {
            if(enemy.data != undefined){
                this.ShootEnemyFour(enemy);
            }
        }, 1500);
    }

    setEnemyFive(){
        let rnd = Math.floor(Math.random() * 2) 
        let posX = (rnd == 0)? 100 : 266;
        var rndX = Phaser.Math.Between(50,316);      
        var rndX2 = Phaser.Math.Between(50,316);   
        // var shootDelay = Phaser.Math.Between(1000,10000);      
        var enemy = enemies.create(posX,0,'airplanes',5);
        enemy.body.setSize(25, 35);   
        enemy.setData('health', 4 + levelValue);
        enemy.flipY = true;
        this.tweens.add({
            targets: enemy,
            x : {value : rndX2 , ease : 'expo.in'},
            y : {value : 140 , ease : 'quint.out'},
            duration : 8000
        });
        //enemy.body.velocity.y = 40;
        setTimeout(() => {
            //if(enemy.data != undefined){
                this.ShootEnemyFive(enemy);
            //}
        }, 2000);
    }

    setEnemySix(){
        let rnd = Math.floor(Math.random() * 2) 
        let posX = (rnd == 0)? 0 : 366;
        var rndX = Phaser.Math.Between(50,316);         
        var rndY = Phaser.Math.Between(90,200);         
        var enemy = enemies.create(posX,250,'airplanes',6);
        enemy.body.setSize(25, 35);
        enemy.setData('health', 5 + levelValue);
        enemy.flipY = true;
        this.tweens.add({
            targets: enemy,
            x : {value : rndX , ease : 'linear'},
            y : {value : rndY , ease : 'sine.int'},
            duration : 4000,
            onComplete: (tween) => {
                if(enemy.data != undefined){
                    enemy.body.velocity.y = (rnd == 0) ? -15 : 15;
                    enemy.body.velocity.x = (rnd == 0) ?  -15 : 15;
                }
            }
        });
        setTimeout(() => {
            if(enemy.data != undefined){
                this.ShootEnemySix(enemy);
            }
        }, 300);
    }

    setEnemySeven(){
            var rndpopx = Phaser.Math.Between(10,260);         
            var rndtimeShoot = Phaser.Math.Between(3000,8000); 
            var enemy = enemies.create(rndpopx,0,'airplanes',7);
            enemy.body.setSize(25, 35);
            enemy.setData('health', 2 + levelValue);
            enemy.flipY = true;
            
            this.tweens.add({
                targets: enemy,
                props: {
                    x: { value: rndpopx + 100, duration: 2000,},
                    y: { value: 500, duration: 25000,  },
                },
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1
            });
            setTimeout(() => {
                if(enemy.data != undefined){
                    this.ShootEnemySeven(enemy);
                }
            }, rndtimeShoot);
    }

    setEnemyEight(){  
        var rndx = Phaser.Math.Between(-30,30);         
        var rndy = Phaser.Math.Between(10,50);         
        var enemy = enemies.create(173,0,'airplanes',13);
        enemy.setData('health', 7 + levelValue);
        enemy.flipY = true;
        enemy.body.velocity.y = rndy;
        enemy.body.velocity.x = rndx;
        setTimeout(() => {
            if(enemy.data != undefined){
                enemy.body.velocity.y = 0;
                enemy.body.velocity.x = 0;
                var canon = bullets2.create(enemy.x, enemy.y, 'bullet', 9).setData('',0);
                this.tweens.add({
                    targets: canon,
                    angle: { start: 30, to: 160 },
                    ease: 'sine.inout',
                    yoyo: true,
                    repeat: -1,
                    duration: Phaser.Math.Between(2000, 5000)
                });
                this.ShootEnemyEight(canon,enemy);
            }
        }, 3500);
    };

    setEnemyNine(){
        var rndxpos = Phaser.Math.Between(100,266);         
        var rndyvel = Phaser.Math.Between(15,30);         
        var enemy = enemies.create(rndxpos,0,'fatbirds',4);
        enemy.setData('health', 19 + levelValue);
        enemy.body.setSize(30, 60).setOffset(80,50);
        enemy.body.velocity.y = rndyvel;
        setTimeout(() => {
            if(enemy.data != undefined){
                enemy.body.velocity.y = 0;
                var canon = bullets2.create(enemy.x, enemy.y, 'bullet', 9).setData('',0);
                this.tweens.add({
                    targets: canon,
                    angle: { start: 30, to: 160 },
                    ease: 'sine.inout',
                    //yoyo: true,
                    repeat: -1,
                    duration: Phaser.Math.Between(2000, 5000)
                });
                this.ShootEnemyNine(canon,enemy);
            }
        }, 6000);
    }

    setEnemyTen(){      
        var rndX = Phaser.Math.Between(100,266);         
        var rndyvel = Phaser.Math.Between(10,50);         
        var rndxvel = Phaser.Math.Between(-50,50);         
        var enemy = enemies.create(rndX,0,'airplanes',12);
        enemy.setData('health', 4 + levelValue);
        enemy.flipY = true;
        enemy.body.setSize(30, 35);
        enemy.body.velocity.y = rndyvel;
        enemy.body.velocity.x = rndxvel;
        setTimeout(()=>{    
            if(enemy.data != undefined){
                enemy.setCollideWorldBounds(true);
                enemy.body.bounce.y = 1;
                enemy.body.bounce.x = 1;
            }
            },1000);
        this.ShootEnemyTen(enemy);  
    }

    setEnemyEleven(){
        // var rndyvel = Phaser.Math.Between(3000,8000);         
        let rnd = Math.floor(Math.random() * 2); // 0 | 1
        let posX = (rnd == 0)? 0 : 366;
        console.log(rnd);
        var enemy = enemies.create(posX,200,'fatbirds',7);
        enemy.body.setSize(70, 20);
        enemy.setData('health', 50 + levelValue);
        this.tweens.add({
            targets: enemy,
            x : {value : 173 , ease : 'back.out'},
            y : {value : 50 , ease : 'quint.in'},
            duration : 8000
        });
        enemy.body.velocity.y = 15;
        setTimeout(() => {
            if(enemy.data != undefined){
                //this.ShootEnemyFour(enemy);
                this.ShootAnyRightBottom(enemy,0,0,150,'bullet',211,600,5,5000,true)
            }
        }, 1500);
    }

    setEnemyTwelve(){
        var rndx = Phaser.Math.Between(50,316);         
        let rnd = Math.floor(Math.random() * 2); // 0 | 1
        let posX = (rnd == 0)? 50 : 316;
        console.log(rnd);
        var enemy = enemies.create(posX,400,'fatbirds',5);
        enemy.setData('health', 20 + levelValue);
        enemy.body.setSize(70, 20);
        enemy.flipY = true;
        this.tweens.add({
            targets: enemy,
            x : {value : rndx , ease : 'back.out'},
            y : {value : 50 , ease : 'circle.in'},
            duration : 8000,
            onComplete: (tween) => {
            }
        });
        setTimeout(() => {
            if(enemy.data != undefined){
                enemy.body.velocity.y = 80;
                this.ShootEnemyFour(enemy);
            }
        }, 1500);
    }

    setBossOne(){
        var enemy = enemies.create(173,0,'fatbirds',3).setDepth(2);
        var canon = bullets2.create(173,0,'bullet',9);
        enemy.body.setSize(85, 40)
        enemy.setData('health', 200);
        enemy.setData('type', 'boss');
        enemy.body.velocity.y = 80;
        canon.body.velocity.y = 80;
            this.tweens.add({
                targets: canon,
                angle: { start: 180, to: 0 },
                ease: 'sine.inout',
                yoyo: true,
                repeat: -1,
                duration: Phaser.Math.Between(2000, 5000)
            });
        setTimeout(()=>{
                enemy.body.velocity.y = 0;
                canon.body.velocity.y = 0;
                this.tweens.add({
                    targets: [enemy, canon],
                    props: {
                        x: { value: Phaser.Math.Between(50, 300), duration: 4000,},
                        y: { value: Phaser.Math.Between(50, 300), duration: 8000,},
                    },
                    ease: 'Sine.easeInOut',
                    yoyo: true,
                    repeat: -1
                });
                this.ShootBossOne(canon, enemy);
                this.ShootEnemyFive(enemy);
        },2000);
    };

    setBossTwo(){
        var enemy = enemies.create(173,0,'fatbirds',2).setDepth(2);
        var canon = bullets2.create(173,0,'bullet',9);
        enemy.body.setSize(85, 40)
        enemy.setData('health', 300);
        enemy.setData('type', 'boss');
        enemy.body.velocity.y = 80;
        canon.body.velocity.y = 80;
            this.tweens.add({
                targets: canon,
                angle: { start: 180, to: 0 },
                ease: 'sine.inout',
                yoyo: true,
                repeat: -1,
                duration: Phaser.Math.Between(2000, 5000)
            });
        setTimeout(()=>{
                enemy.body.velocity.y = 0;
                canon.body.velocity.y = 0;
                this.tweens.add({
                    targets: [enemy, canon],
                    props: {
                        x: { value: Phaser.Math.Between(50, 300), duration: 4000,},
                        y: { value: Phaser.Math.Between(50, 300), duration: 8000,},
                    },
                    ease: 'Sine.easeInOut',
                    yoyo: true,
                    repeat: -1
                });
                this.ShootAnyRightBottom(enemy,0,0,150,'bullet',261,450,30,5000,true)
                this.ShootEnemyFive(enemy);
        },2000);
    };

    setBossThree(){
        var enemy = enemies.create(173,0,'fatbirds',1).setDepth(2);
        var canon = bullets2.create(173,0,'bullet',100);
        enemy.body.setSize(180, 10)
        enemy.setData('health', 500);
        enemy.setData('type', 'boss');
        enemy.body.velocity.y = 80;
        canon.body.velocity.y = 80;
        setTimeout(()=>{
            enemy.body.velocity.y = 0;
            canon.body.velocity.y = 0;
            this.tweens.add({
                targets: [enemy, canon],
                props: {
                    x: { value: Phaser.Math.Between(50, 300), duration: 4000,},
                    y: { value: Phaser.Math.Between(50, 300), duration: 8000,},
                },
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });
            //this.ShootBossOne(canon, enemy);
            this.ShootAnyRightBottom(enemy,-70,0,200,'bullet', 155, 1000, 4,6000, false);
            this.ShootAnyRightBottom(enemy,70,0,200,'bullet', 155, 1000, 4,6000, false);
            this.ShootAnyRightBottom(enemy,0,0,100,'bullet', 136, 200, 8,10000, true);
            this.ShootAnyRightBottom(enemy,0,0,310,'bullet', 254, 0, 2,15000, false);
            this.ShootEnemyFive(enemy);
        },2000);
    };

    setBossFour(){
        var enemy = enemies.create(173,0,'fatbirds',0).setDepth(2);
        var canon = bullets2.create(173,0,'bullet',100).setDepth(8);
        enemy.body.setSize(180, 40)
        enemy.setData('health', 600);
        enemy.setData('type', 'boss');
        enemy.body.velocity.y = 80;
        canon.body.velocity.y = 80;
            this.tweens.add({
                targets: canon,
                angle: { start: 180, to: 0 },
                ease: 'sine.inout',
                yoyo: true,
                repeat: -1,
                duration: Phaser.Math.Between(200, 400)
            });
        setTimeout(()=>{
                enemy.body.velocity.y = 0;
                canon.body.velocity.y = 0;
                this.tweens.add({
                    targets: [enemy, canon],
                    props: {
                        x: { value: Phaser.Math.Between(50, 300), duration: 8000,},
                        y: { value: Phaser.Math.Between(50, 300), duration: 8000,},
                    },
                    ease: 'Sine.easeInOut',
                    yoyo: true,
                    repeat: -1
                });
                //this.ShootBossOne(canon, enemy);
                //this.ShootEnemyFive(enemy);
                this.ShootAnyRightBottom(enemy, 0, 0,150,'bullet',254,2000,5,2000,true);
                this.ShootAnyRightBottom(enemy, -80, 0,150,'bullet',253,1200,5,5000,false);
                this.ShootAnyRightBottom(enemy, 80, 0,150,'bullet',253,1200,5,7000,false);
                //this.ShootAnyRightBottom(enemy, 0, 0,200,'bullet',275,200,5,7000,false);
                this.ShootAnyCanon(enemy,canon, -50);
                // console.log(canon.angle);
        },2000);
    };

    setWeaponUp(){      
        //var rndX = Phaser.Math.Between(100,266);      
        var rndXChoices = (armEvoCount < 3)? 1 : Math.floor(Math.random() * 2); // 0 | 1 
        var rndyvel = Phaser.Math.Between(10,50);         
        var rndxvel = Phaser.Math.Between(-130,130);
              console.log(rndXChoices);
        switch (rndXChoices) {
            case 0: 
            var rnd = Phaser.Math.Between(0,12);      
            var box = weaponUp.create(173,10,'fruits',rnd).setScale(2).setData('typeCount', 0);
            console.log(box);
            break;
            case 1: 
            var box = weaponUp.create(173,10,'fruits',13).setScale(2).setData('typeCount', 1);
            console.log(box);
            break;
            // case 2: var box = this.weaponUp.create(173,10,'fruits',14).setScale(2);
            //     break;
            default:
                break;
        }  
        // var box = this.weaponUp.create(173,10,'box',0).setScale(0.8);
        box.setCollideWorldBounds(true);
        box.body.setSize(20, 20);
        box.body.velocity.y = rndyvel;
        box.body.velocity.x = rndxvel;
        box.body.bounce.y = 1;
        box.body.bounce.x = 1;
    };

    setDragon(){
        for (let i = 0; i < 20; i++)
        {
            if(i == 19){
                drgBody.push(enemies.create(460 - (i * 10),-200 + (i * 8),'dragon',3));
                drgBody[i].setData('health', 1000);
                drgBody[i].setData('type', 'boss');
                drgBody[i].body.setSize(50, 50);
                drgBody[i].setVelocityY(20);
                drgBody[i].anims.play('dragonHead', true);
            }else{
                drgBody.push(enemies.create(460 - (i * 10),-200 + (i * 8),'dragon',4));
                drgBody[i].setData('health', 5000);
                drgBody[i].body.setSize(40, 40);
                drgBody[i].setVelocityY(20);
            }
            this.tweens.add({
                targets: [drgBody[i]],
                x:  i * 6,
                yoyo: true,
                duration: 1500 -(i * 0.5) ,
                ease: 'Sine.easeInOut',
                repeat: -1,
            });
            setTimeout(()=>{
                drgBody[i].setVelocityY(0);
            },11500)
        }

        this.ShootDragon(drgBody[19]);
        this.ShootEnemyFive(drgBody[9]);
        this.ShootAnyRightBottom(drgBody[14],0,0,150,'bullet',385,800,6,10000,true);
        this.ShootAnyRightBottom(drgBody[14],0,0,100,'bullet',381,200,2,3000,true);
        //destroyDragon(drgBody);
    };
    //SHOOT
    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////                                                                                                              by tristan roel
    ShootAnyRightBottom(enmy, positionShootX,positionShootY, bulletVlctyY, keyStringShoot , frameShootNbr, intervalNbr, blltNbrForBreak , timePause , isTargeted){
        let breakTimeNbr = 0;
        let isShoot = true;
        var shoot = setInterval(()=>{
            if(isShoot){
                var bulet = bullets2.create(enmy.x + positionShootX,enmy.y + positionShootY, keyStringShoot,frameShootNbr).setDepth(1);
                bulet.body.setSize(6, 6);
                bulet.setScale(2);
                bulet.flipY = true;
                breakTimeNbr++;
                if(isTargeted){
                    this.physics.moveToObject(bulet, player, bulletVlctyY);
                }else{
                     bulet.body.velocity.y = bulletVlctyY;
                }
                if(enmy.data == undefined || enmy.data.list.health <= 0){bulet.destroy();clearInterval(shoot)};
                setTimeout(()=>{bulet.destroy();},15000);

                switch (breakTimeNbr) {
                    case blltNbrForBreak:
                        isShoot = false;
                        setTimeout(()=>{
                            breakTimeNbr = 0;
                            isShoot = true;
                            // console.log('pause?'+ isShoot);
                            
                        },timePause)
                        break;
                    default:
                        break;
                }
            }
            },intervalNbr);
        
    }

    ShootAnyCanon(enmy ,canon , bulletVelocity){
        console.log(canon.angle);
        var shoot = setInterval(()=>{
            var bulet = bullets2.create(canon.x,canon.y,'bullet', 377).setDepth(1).setScale(2);
            bulet.body.setSize(4,4);
            this.physics.velocityFromAngle(canon.angle, bulletVelocity, bulet.body.velocity);
            if(enmy.data == undefined || enmy.data.list.health <= 0){bulet.destroy();clearInterval(shoot)};
            setTimeout(() => {bulet.destroy();},8000);
        }, 100);
    }

    ShootEnemyOne(enmy){
        var bulet = bullets2.create(enmy.x,enmy.y,'bullet').setDepth(1);
        bulet.anims.play('bullet1', true);
        bulet.body.setSize(6, 6);
        bulet.setScale(2);
        setTimeout(()=>{bulet.destroy();},7000);
        this.physics.moveToObject(bulet, player, 160);
    }

    ShootEnemyTwo(enmy){
        var bulet = bullets2.create(enmy.x,enmy.y,'bullet').setDepth(1);
        bulet.anims.play('bullet2', true);
        bulet.body.setSize(4, 10);
        bulet.flipY = true;
        bulet.setScale(2);
        bulet.body.velocity.y = 100;
        setTimeout(()=>{bulet.destroy();},7000);
        //console.log('daboom');
    }

    ShootEnemyThree(enmy){
        var fire = setInterval(()=>{       
            var buletOne = bullets2.create(enmy.x,enmy.y,'bullet');
            var buletTwo = bullets2.create(enmy.x,enmy.y,'bullet');
            var buletThree = bullets2.create(enmy.x,enmy.y,'bullet');
            buletOne.anims.play('bullet3', true).setDepth(1);
            buletTwo.anims.play('bullet3', true).setDepth(1);
            buletThree.anims.play('bullet3', true).setDepth(1);
            buletOne.body.setSize(4, 4);
            buletTwo.body.setSize(4, 4);
            buletThree.body.setSize(4, 4);
            buletOne.flipY = true;
            buletTwo.flipY = true;
            buletThree.flipY = true;
            buletOne.setScale(2);
            buletTwo.setScale(2);
            buletThree.setScale(2);
            buletOne.body.velocity.y = 100;
            buletTwo.body.velocity.y = 100;
            buletTwo.body.velocity.x = -30;
            buletThree.body.velocity.y = 100;
            buletThree.body.velocity.x = 30;
            if(enmy.data == undefined){this.destroyEnmyBullet(buletOne,buletTwo,buletThree,fire),clearInterval(fire)};
            setTimeout(()=>{
                this.destroyEnmyBullet(buletOne,buletTwo,buletThree, fire);
                if(enmy.data != undefined){
                    enmy.body.velocity.y = 20;
                    enmy.body.velocity.x = 60;
                };
            },6000);
        },1500);
    }

    destroyEnmyBullet(bullet1,bullet2,bullet3, interval){
        bullet1.destroy();
        bullet2.destroy();
        bullet3.destroy();
        clearInterval(interval);
    }

    ShootEnemyFour(enmy){
        var bulet = bullets2.create(enmy.x,enmy.y,'bullet').setDepth(1);
        bulet.anims.play('bullet4', true);
        bulet.body.setSize(6, 6);
        bulet.setScale(2);
        setTimeout(()=>{bulet.destroy();},7000);
        this.physics.moveToObject(bulet, player, 100);
    }

    ShootEnemyFive(enmy){
        var shoot = setInterval(()=>{
            var bulet = bullets2.create(enmy.x,enmy.y,'bullet').setDepth(1).setScale(2).setSize(6, 6);
            bulet.anims.play('bullet5', true);
            setTimeout(()=>{bulet.destroy();},7000);
            if(enmy.data == undefined || enmy.data.list.health <= 0){bulet.destroy();clearInterval(shoot)}
            else{
                this.physics.moveToObject(bulet, player, 180);
            }
        },2000);
    }

    ShootEnemySix(enmy ){
            var shoot = setInterval(()=>{
                var bulet = bullets2.create(enmy.x,enmy.y,'fatbullet').setDepth(1);
                bulet.anims.play('bullet6', true);
                bulet.body.setSize(12, 12);
                bulet.body.velocity.y = 160;
                bulet.flipY = true;
                bulet.setScale(2);
                setTimeout(()=>{bulet.destroy();},7000);
                if(enmy.data == undefined){bulet.destroy();clearInterval(shoot)};
            },3000);
    }

    ShootEnemySeven(enmy ){
        var shoot = setInterval(()=>{
            var rndX = Phaser.Math.Between(-10,10);
            var bulet = bullets2.create(enmy.x + rndX,enmy.y,'bullet', 281).setDepth(1);
            bulet.body.setSize(6, 6);
            bulet.body.velocity.y = 110;
            bulet.flipY = true;
            bulet.setScale(2);
            setTimeout(()=>{bulet.destroy();},7000);
            if(enmy.data == undefined || enmy.data.list.health <= 0){bulet.destroy();clearInterval(shoot)};
        },1000);
        setTimeout(()=>{clearInterval(shoot);},3000);
    }

    ShootEnemyEight(canon ,enmy ){
        var shoot = setInterval(()=>{
            
        var bulet = bullets2.create(canon.x,canon.y,'bullet', 127).setDepth(1);
        bulet.body.setSize(10,10);
        bulet.setScale(2);
        bulet.anims.play('bullet8', true);
        this.physics.velocityFromAngle(canon.angle, 100, bulet.body.velocity);
        setTimeout(()=>{bulet.destroy();},7000);
        if(enmy.data == undefined){
            bulet.destroy();
            canon.destroy();
            clearInterval(shoot)};
        },700);
    }

    ShootEnemyNine(canon ,enmy ){
        var shoot = setInterval(()=>{
        var bulet = bullets2.create(canon.x,canon.y,'bullet', 377).setDepth(1);
        bulet.body.setSize(4,5);
        bulet.setScale(2);
        //bulet.anims.play('bullet8', true);
        this.physics.velocityFromAngle(canon.angle, 100, bulet.body.velocity);
        setTimeout(()=>{bulet.destroy();},7000);
        if(enmy.data == undefined){
            bulet.destroy();
            canon.destroy();
            clearInterval(shoot)};
        },300);
    }

    ShootEnemyTen(enmy ){
        var shoot = setInterval(()=>{
            if(enmy.data != undefined){
                var bulet = bullets2.create(enmy.x,enmy.y,'bullet').setDepth(1);
                bulet.anims.play('bullet10', true);
                bulet.body.setSize(6,8);
                bulet.setScale(2);
                bulet.body.velocity.y = 100;
                setTimeout(()=>{bulet.destroy();},7000);
            }else{
                clearInterval(shoot)
            }
            if(enmy.data == undefined){
            };
        }, 3000);
    }

    ShootBossOne(canon, enmy){
        let gunType = false;
        let nbr = 400;
        var shootType = setInterval(()=>{
            nbr = Phaser.Math.Between(200,1000);         
            gunType = !gunType;
        },5000);
        var shoot = setInterval(()=>{
            if(canon != undefined){
                if(gunType){
                    var bulet = bullets2.create(canon.x,canon.y,'bullet', 200).setDepth(1).setScale(2);
                    bulet.body.setSize(6,6);
                    bulet.anims.play('bulletBossOne',true);
                    this.physics.velocityFromAngle(canon.angle, -50, bulet.body.velocity);
                    setTimeout(() => {bulet.destroy();},5000);
                }else{
                    var bulet2 = bullets2.create(canon.x,canon.y,'bullet', 252).setDepth(1).setScale(2);
                    bulet2.body.setSize(6,9);
                    bulet2.body.velocity.y = 150;
                    bulet2.flipY = true;
                    setTimeout(() => {bulet2.destroy();},5000);
                }
                if(enmy.data == undefined || enmy.data.list.health <= 0){
                    canon.destroy();
                    clearInterval(shoot);
                    clearInterval(shootType)};
            }
        }, nbr);
    }

    ShootDragon(dragon ){
        var shoot = setInterval(()=>{
            var fire = bullets2.create(dragon.x, dragon.y + 40, 'fatbullet').setDepth(1);
            fire.anims.play('flame', true);
            fire.body.setSize(13, 20).setOffset(10,10);                                       
            fire.flipY = true;
            fire.setScale(2);
            fire.body.velocity.y = 80; 
            if(dragon.data == undefined){clearInterval(shoot);};
            setTimeout(() => {fire.destroy();},5000);
        }, 3000)
    };

    bossDestruction(enmy){
        timingShoot.paused = true;
        var destruct = setInterval(()=>{
            boomSong.play();
            camera.shakeEffect.start(800, 0.01);
            enmy.setTintFill(0x3D3D3D); 
            var rnd = Phaser.Math.Between(-80,80);    
            var rnd2 = Phaser.Math.Between(-80,80);    
            var ipct = impacts.create(enmy.x + rnd,enmy.y + rnd2,'xplose').setDepth(2).setScale(2);
            ipct.anims.play('xplosion', true);
            //console.log(enemies);
            setTimeout(() => {
                ipct.destroy();
            }, 600);
        },200);
        setTimeout(() => {
            clearInterval(destruct);
            enmy.destroy();
            camera.shakeEffect.reset();
            this.nextLevelAction();
        },6000)
    }

    createImpact(enmy){
        var rnd = Phaser.Math.Between(-10,10);    
        var rnd2 = Phaser.Math.Between(-10,10);    
        var ipct = impacts.create(enmy.x + rnd, enmy.y + rnd2,'bullet').setDepth(2);
        ipct.setScale(2);
        ipct.anims.play('impactzero', true);
        impactSong.play();

        if(enmy.data.list.health >= 0){
         enmy.setTintFill(0xffffff,0xffffff,0xffffff,0xffffff);
         setTimeout(()=>{ enmy.clearTint();},100)
        }else{
            if(enmy.data.list.type == 'boss'){
                enmy.setTintFill(0x3D3D3D); 
            }
        }
        setTimeout(() => {
            // enmy.clearTint();
            ipct.destroy();
        }, 600);
    }

    createImpactItem(enmy){
        var rnd = Phaser.Math.Between(-8,8);    
        var rnd2 = Phaser.Math.Between(-8,8);    
        var ipct = impacts.create(enmy.x + rnd,enmy.y + rnd2,'bullet').setDepth(3);
        ipct.setScale(2);
        ipct.anims.play('takeItem', true);
        setTimeout(() => {
            ipct.destroy();
        }, 600);
    }

    createExplose(enmy){
        var xplose = impacts.create(enmy.x,enmy.y,'xplose').setDepth(1);;
        xplose.anims.play('xplosion', true);
        xplose.setScale(2);
        boomSong.play();
        setTimeout(() => {
            xplose.destroy();
        }, 600);
    }

    destroyAll(){
        for (let index = 0; index < enemies.children.entries.length; index++) {
            this.bossDestruction(enemies.children.entries[index]); 
        }
        //for (let index = 0; index < this.bullets2.children.entries.length; index++) {
            //this.bullets2.children.entries[index].destroy(); 
            bullets2.clear(true,true);
        //}
    }

    PauseGameAction(){
        if(isControlsOperational){
            isPaused = !isPaused; // Inverse l'état de pause lorsque la touche espace est enfoncée
            if(isPaused){
                bipSong.play();
                music.pause();
                transiSong.pause();
                bossSong.pause();
                boomSong.volume = 0;
                impactSong.volume = 0;
                isOnMobile ? btnPause.y = 476 : btnPause.y = 400;
                btnQuit.setVisible(true);
                btnReset.setVisible(true);
                upgradetxt.setVisible(true);
                this.physics.pause();
                tweenManager.pauseAll();
                this.scene.pause();
                setTimeout(()=>{
                    this.scene.resume();
                },250)
                isChronoStart = false;
                chronotxt.setAlpha(1);
                this.buttonMenuIsVisible(true,true)
                mask.setFrame(9);
                mask.setAlpha(1);
                this.AllEnemyPaused();
            }else{
                bipSong.play();
                music.resume();
                transiSong.resume();
                bossSong.resume();
                boomSong.volume = 0.5;
                impactSong.volume = 0.5;
                console.log("killcnt" + this.KILLCOUNTLEVEL);
                btnPause.y = 476
                btnQuit.setVisible(false);
                btnReset.setVisible(false);
                upgradetxt.setVisible(false);
                this.physics.resume();
                tweenManager.resumeAll();
                isChronoStart = true;
                chronotxt.setAlpha(0);
                this.buttonMenuIsVisible(false,false)
                mask.setFrame(10);
                mask.alpha = 0;
                if(KILLCOUNTLEVEL < 10 + levelValue){
                    popenemyTwelve.paused = false;
                    popenemyOne.paused = false;
                    popenemySix.paused = false;
                }else if(KILLCOUNTLEVEL > 10 && KILLCOUNTLEVEL < 20 + levelValue){
                    popenemyTwo.paused = false;
                    popenemyFive.paused = false;
                }else if(KILLCOUNTLEVEL > 10 && KILLCOUNTLEVEL < 25 + levelValue){
                    popenemyZero.paused = false;
                }else if(KILLCOUNTLEVEL > 20 && KILLCOUNTLEVEL < 30 + levelValue){
                    popenemyThree.paused = false;
                    popenemyZero.paused = false;
                    popenemySeven.paused = false;
                }else if(KILLCOUNTLEVEL > 30 && this.KILLCOUNTLEVEL < 40 + levelValue){
                    popenemyEight.paused = false;
                    popenemyFour.paused = false;
                }else if(KILLCOUNTLEVEL > 40 && KILLCOUNTLEVEL < 50 + levelValue){
                    popenemyTen.paused = false;
                }
            }
        }
    }

    AllEnemyPaused(){
        popenemyZero.paused = true;
        popenemyOne.paused = true;
        popenemyTwo.paused = true;
        popenemyThree.paused = true;
        popenemyFour.paused = true;
        popenemyFive.paused = true;
        popenemySix.paused = true;
        popenemySeven.paused = true;
        popenemyEight.paused = true;
        popenemyNine.paused = true;
        popenemyTen.paused = true;
        popenemyEleven.paused = true;
        popenemyTwelve.paused = true;
    }

    formatChronoTime(time) {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
      
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
      
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    SetUserValues(KILLCOUNT,DEATHNUMBER,BULLETDAMAGE,BOSSKILL,scoreValue){
      console.log(KILLCOUNT);
      sessionStorage.setItem('score', scoreValue.toString());

      if(scoreValue > _BESTSCORE){
          sessionStorage.setItem('bestscore', scoreValue.toString());
      }
      if(levelValue > _LEVELMAX){
        sessionStorage.setItem('levelMax', levelValue.toString());
      }
      sessionStorage.setItem('killcount', KILLCOUNT.toString());
      sessionStorage.setItem('deathNumber', DEATHNUMBER.toString());
      sessionStorage.setItem('BulletDammage', BULLETDAMAGE.toString());
      sessionStorage.setItem('BossKillNbr', BOSSKILL.toString());

      console.log('storage ok');
    }

    buttonMenuIsVisible(ContinuebtnIsVisible, QuitIsVisible){
        const element = document.getElementById('ctnbtn');
        const element2 = document.getElementById('rebtn');
        if(ContinuebtnIsVisible){
            if (element) {element.style.visibility = 'visible';}
        }else{
            if (element) {element.style.visibility = 'hidden';}
        }
        if(QuitIsVisible){
            if (element2) {element2.style.visibility = 'visible';}
        }else{
            if (element2) {element2.style.visibility = 'hidden';}
        }
            
          
    }
//#endregion

}

var config = {
    type: Phaser.AUTO,
    pixelArt : true,
    width : 366,
    height : 445,
  //   height : 700,
    backgroundColor : '#282828',
    fps:{
      target: 50,
      forceSetTimeOut: true
    },
    input:{
      gamepad: true
    },
    scale:{
      mode : Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [ Home,MetalBirds ],
    //parent: 'gameContainer',
    physics: {
      default: 'arcade',
      arcade: {
        debug : true
      }
    }
  };
const game = new Phaser.Game(config);