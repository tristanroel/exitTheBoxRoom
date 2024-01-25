
var player;
var cubes;
var cursors;
var fireKey;
var restart;
var platform;
var projectile;
var exit;

var lastFired = 0;
var fireRate = 500; // Temps entre chaque tir en millisecondes (ici, 2 tirs par seconde)
let isJump = false;
let isGrab = false;
let isunderthebox = false;
let freezeplayer = false;

var overdown; //overlap down
var boxplayer; 
var cat1;
var THIS;
var positionsCube  = [[24, 72, 120, 168, 216, 264, 312],
[24, 72, 120, 999, 216, 264, 312],
[24,999,120,999, 216, 999, 312],
[24, 72, 120, 168, 999, 264, 312],
[999, 72, 999, 168, 216, 264, 999],
[24, 999, 120, 999, 216, 264, 999],
[24, 72, 120, 168, 216, 999,999],
[24, 999, 120, 999, 216, 999,312],
[999, 72, 999, 168, 999, 264,999],
[999, 999, 120, 168, 216, 999, 999],
[24, 72, 999, 999, 999, 264, 312],
[24, 999, 999, 168, 999, 999, 312],
[999, 999, 120, 999, 216, 999, 999],
[24, 999, 999, 168, 216, 999, 312],
[999, 72, 999, 999, 999, 264, 999],
[24, 72, 120, 999, 999, 999, 999],
[999, 999, 999, 168, 216, 999, 312],
[24, 999, 999, 999, 999, 999, 312],
[999, 999, 999, 168, 999, 999, 999],
[999, 999, 999, 999, 999, 999, 999],
[999, 999, 999, 999, 999, 264, 999],
[24, 999, 120, 999, 999, 264, 999],
[999 ,999 , 999, 168, 216, 999, 312],
[999 ,999 , 999, 168, 999, 999, 312],
[24, 999, 120, 999, 999, 999, 312],
[24, 999, 120, 999, 216, 999, 312],
[24, 72, 999, 999, 999, 264, 312]];

let rndRange = 4;
let staticBlockNbr = 6;     
let movecnt = 0;
let level = 0;
let chrono = 0;
var leveltxt;
var victorytxt;
var chronotxt;

//var infotxt;
let end = false;

var murHaut;
var murDroite;
var murGauche;
var murBas;

var jumpsound;
var explosound;
var lasersound;
var winsound;
var victorysound;


class ExittheRoom extends Phaser.Scene
{
    preload(){
        this.load.bitmapFont('customfont','assets/bmf.png', 'assets/bmf.xml');
        this.load.spritesheet('player', 'assets/idle.png', {frameWidth : 50, frameHeight : 50});
        this.load.spritesheet('run', 'assets/run.png', {frameWidth : 50, frameHeight : 50});
        this.load.spritesheet('win', 'assets/win.png', {frameWidth : 50, frameHeight : 50});
        this.load.spritesheet('jump', 'assets/jump.png', {frameWidth : 50, frameHeight : 50});
        this.load.spritesheet('cube', 'assets/theCube.png', {frameWidth : 48, frameHeight : 48});
        this.load.spritesheet('cubes', 'assets/CUBES.png', {frameWidth : 48, frameHeight : 48});
        this.load.image('platform','assets/ground.png');
        this.load.image('exit','assets/exit.png');
        this.load.image('purple','assets/purple.png');
        this.load.audio('jumpsong', 'assets/song/jump.wav');
        this.load.audio('explosionsong', 'assets/song/explosion.wav');
        this.load.audio('lasersong', 'assets/song/laserShoot.wav');
        this.load.audio('winsong', 'assets/song/w.mp3');
        this.load.audio('victorysong', 'assets/song/ouaiii.mp3');
    }
    
    
    create() {
        jumpsound = this.sound.add('jumpsong',{volume : 0.4});
        explosound = this.sound.add('explosionsong',{volume : 0.4});
        lasersound = this.sound.add('lasersong',{volume : 0.4});
        winsound = this.sound.add('winsong',{volume : 0.4});
        victorysound = this.sound.add('victorysong',{volume : 0.4});
        THIS = this;
        cat1 = this.matter.world.nextCategory();
        // cat2 = this.matter.world.nextCategory();
        //Mur Invisible
        var largeurJeu = 336;
        var hauteurJeu = 442;
        murHaut = this.matter.add.rectangle(largeurJeu / 2, -10, largeurJeu, 20, { isStatic: true, collisionFilter: {category: cat1} });
        murBas = this.matter.add.rectangle(largeurJeu / 2, hauteurJeu + 10, largeurJeu, 20, { isStatic: true, collisionFilter: {category: cat1} });
        murGauche = this.matter.add.rectangle(-10, hauteurJeu / 2, 20, hauteurJeu, { isStatic: true, collisionFilter: {category: cat1} });
        murDroite = this.matter.add.rectangle(largeurJeu + 10, hauteurJeu / 2, 20, hauteurJeu, { isStatic: true, collisionFilter: {category: cat1} });

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        console.log(murHaut.gameObject);
        this.matter.add.image(60, 412, 'purple').setDepth(5).setScale(2).setStatic(true);
        // console.log(player.gameObject.texture);
        exit = this.matter.add.sprite(168, 24,'cubes', 0).setStatic(true)
        .setCollisionCategory(cat1)
        .setCollidesWith(cat1)
        .setSensor(true)
        .setDepth(5)

        platform = this.matter.add.image(168, 410, 'platform').setStatic(true)
        .setCollisionCategory(cat1)
        .setCollidesWith([cat1]);

        player = this.matter.add.sprite(270, 350,'player').setBody({
            type: 'rectangle',
            width: 25,
            height: 48
        }).setFixedRotation(true).setData('ID', 1).setFriction(0)
        .setCollisionCategory(cat1)
        .setCollidesWith([cat1]);

        overdown = this.matter.add.sprite(player.x, player.y, 'cube').setScale(0.2).setFixedRotation(true).setSensor(true).setVisible(false);
        boxplayer = this.matter.add.sprite(player.x, player.y, 'cube').setFixedRotation(true).setVisible(false);

        projectile = this.matter.add.sprite(999, 999, 'cube',0)
        .setFixedRotation(true)
        .setScale(0.5)
        .setCollisionCategory(cat1)
        .setCollidesWith(cat1)
        .setMass(0.1)
        .setIgnoreGravity(true)
        .setSensor(true);
        //projectile.body.ignoreGravity = true;

        //setCube();
        setCube2();
        //console.log(positionsCube[0]);
       
            //animation
            this.anims.create({
                key: 'runplayer',
                frames: this.anims.generateFrameNumbers('run',{frames: [0 ,1, 2, 3, 4, 5, 6, 7]}),
                frameRate: 15,
                repeat: -1
            });
            this.anims.create({
                key: 'idleplayer',
                frames: this.anims.generateFrameNumbers('player',{frames: [0 ,1, 2, 3, 4, 5, 6, 7]}),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: 'jumpplayer',
                frames: this.anims.generateFrameNumbers('jump',{frames: [0 ,1, 2, 3, 4, 5, 6, 7]}),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: 'winplayer',
                frames: this.anims.generateFrameNumbers('win',{frames: [0 ,1, 2, 3, 4, 4, 4, 4, 4, 4, 4]}),
                frameRate: 4,
                repeat : 0
            });
        
            //console.log(item);
            this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
                //console.log(item);
                if (bodyA.gameObject == projectile && bodyB.gameObject != player ){
                    if(bodyB.gameObject != null && bodyB.gameObject != platform && platform && bodyA.gameObject != exit){
                        bodyB.gameObject.setTexture(),bodyB.destroy();bodyA.gameObject.y = 999
                        explosound.play()

                    }
                };
                if (bodyB.gameObject == projectile && bodyA.gameObject != player ){
                    if(bodyA.gameObject != null && bodyA.gameObject != platform && bodyA.gameObject != exit){
                        bodyA.gameObject.setTexture(),bodyA.destroy();bodyB.gameObject.y = 999;
                        explosound.play()
                    }
                };
                if(bodyA.gameObject == exit && bodyB.gameObject == player || bodyB.gameObject == exit && bodyA.gameObject == player ) {
                    player.anims.play('winplayer', true);
                    freezeplayer = true;
                    end = true;
                    level++;
                    if(level < 30){
                        winsound.play();
                        player.x = 310; 
                        player.y = 330;
                        setTimeout(()=>{
                            setCube2();
                            end = false;
                            freezeplayer = false;
                        },2000);
                        console.log('fini?');
                    }else{
                        victorysound.play();
                        victorytxt.setVisible(true);
                    }
                } 
            });
        cursors = this.input.keyboard.createCursorKeys();
        fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //leveltxt = this.add.text(12, 12, 'LEVEL', { fontFamily: 'Arial', fontSize: '12px', color: '#2a82ad' }).setDepth(5);
        leveltxt =  this.add.bitmapText(60, 407,'customfont','LEVEL',20).setTintFill(0xffffff).setOrigin(0.5, 0.5).setDepth(6).setScale(0.6);
        victorytxt =  this.add.bitmapText(168, 150,'customfont','V I C T O R Y !',20).setTintFill(0x6C76AC).setOrigin(0.5, 0.5).setDepth(6).setVisible(false);
        chronotxt = this.add.bitmapText(18, 410,'customfont','time',10).setTintFill(0xffffff).setDepth(8).setScale(2);
        //infotxt =  this.add.bitmapText(260, 12,'customfont','LEVEL',20).setTintFill(0x6C76AC).setOrigin(0.5, 0.5).setDepth(5);
        
    }





    update(time, delta) {
        
        //leveltxt.setText('LEVEL : '+ level); 
        leveltxt.setText(`L E V E L : ${level}`);
        chronotxt.setText(` ${formatChronoTime(chrono)}`);
        //infotxt.setText(`isgrab ${isGrab}`);
        if(overdown != undefined){overdown.setPosition(player.x, player.y + 24);}
        if(boxplayer != undefined){boxplayer.setPosition(player.x, player.y - 40);}

        var allCat1Bodies = this.matter.world.getAllBodies().filter(body => body.collisionFilter.category === cat1 && body.gameObject != player);

        // Vérification de l'overlap entre un corps spécifique (par exemple, overdown) et tous les corps de la catégorie cat1
        for (var i = 0; i < allCat1Bodies.length; i++) {
            var cat1Body = allCat1Bodies[i];
            this.matter.overlap(overdown, cat1Body, function () {
                isJump = true;
                if(allCat1Bodies[i].gameObject != null){
                    if(allCat1Bodies[i].gameObject.data != null){
                        if(allCat1Bodies[i].gameObject.data.list.ID == 2){
                            if(isGrab == true){
                                if(!isunderthebox){
                                    isGrab = false;
                                    isunderthebox = true;
                                    boxplayer.setVisible(true);
                                    allCat1Bodies[i].gameObject.setVisible(false)
                                    allCat1Bodies[i].destroy()
                                    // setTimeout(()=>{
                                    //     allCat1Bodies[i].gameObject.body.force.x = 0
                                    // },200)
                                }
                                
                            }
                            //THIS.matter.world.remove(allBodies[i]);
                        }
                    }
                }
            });
        if(end){
            //console.log('o');
            deleteCube();
        }
        }
        if(!freezeplayer){
            chrono++;
            if (cursors.left.isDown) {
                player.anims.play('runplayer', true);
                player.setFlipX(false);
                player.setVelocityX(-3);
                movecnt = 1;
            } else if (cursors.right.isDown) {
                player.anims.play('runplayer', true);
                player.setFlipX(true);
                player.setVelocityX(3);
                movecnt = 2;
            } else {
                player.anims.play('idleplayer', true);
                player.setVelocityX(0);
            }
        
            if (cursors.up.isDown && isJump == true) {
                player.setVelocityY(-6.5);
                jumpsound.play();
                isJump = false;
                player.anims.play('jumpplayer', true);
            }

            if(cursors.down.isDown){
                isGrab = true
            }else{
                isGrab = false
            }
        
            if (fireKey.isDown && time > lastFired + fireRate) {
                fire.call(this);
                lastFired = time;
                lasersound.play();
            }
        }else{
            chrono = chrono;
            player.flipX = false;
            player.anims.play('winplayer',true);
            player.setVelocityX(0);
        }
            if(restart.isDown){
                location.reload();
            }
        }
    
}



function setCube2(){
    console.log(rndRange);
    if(rndRange < 25){
        rndRange++;
    }
    var rnd = Math.floor(Math.random() * rndRange );
    var rnd1 = Math.floor(Math.random() * rndRange );
    var rnd2 = Math.floor(Math.random() * rndRange );
    var rnd3 = Math.floor(Math.random() * rndRange );
    var rnd4 = Math.floor(Math.random() * rndRange );
    var rnd5 = Math.floor(Math.random() * rndRange );
    var rnd6 = Math.floor(Math.random() * rndRange );
    exit.x = Math.floor(Math.random() * (313 - 24) + 24);

    for(let i = 0; i < 7; i++){
        if(rnd < rnd1){
            var cube = THIS.matter.add.image(positionsCube[rnd][i],24, 'cubes',2)
            .setFixedRotation(true)
            .setFriction(2)
            .setCollisionCategory(cat1)
            .setCollidesWith([cat1])
            .setStatic(true)
            .setData('ID', 2)

        }else{
            var cube = THIS.matter.add.image(positionsCube[rnd][i],24, 'cubes',1)
            .setFixedRotation(true)
            .setFriction(2)
            .setCollisionCategory(cat1)
            .setCollidesWith([cat1])
            .setData('ID', 2)
        }
        //.setIgnoreGravity(true)

    }
    for(let i = 0; i < 6; i++){
        if(rnd2 > rnd3){
            var cube = THIS.matter.add.image(positionsCube[rnd1][i],72, 'cubes',2)
            .setFixedRotation(true)
            .setFriction(2)
            .setCollisionCategory(cat1)
            .setCollidesWith([cat1])
            .setStatic(true)
            .setData('ID', 2)

        }else{
            var cube = THIS.matter.add.image(positionsCube[rnd1][i],72, 'cubes', 1)
            .setFixedRotation(true)
            .setFriction(2)
            .setCollisionCategory(cat1)
            .setCollidesWith([cat1])
            .setData('ID', 2)
        }
    }
    for(let i = 0; i < 6; i++){
        if(rnd3 < rnd4){
            var cube = THIS.matter.add.image(positionsCube[rnd2][i],120, 'cubes', 2)
            .setFixedRotation(true)
            .setFriction(2)
            .setCollisionCategory(cat1)
            .setCollidesWith([cat1])
            .setStatic(true)
            .setData('ID', 2)
        }else{
            var cube = THIS.matter.add.image(positionsCube[rnd2][i],120, 'cubes', 1)
            .setFixedRotation(true)
            .setFriction(2)
            .setCollisionCategory(cat1)
            .setCollidesWith([cat1])
            .setData('ID', 2)
        }
    }
    for(let i = 0; i < 6; i++){
        if(rnd4 > rnd5){
        var cube = THIS.matter.add.image(positionsCube[rnd3][i],168, 'cubes', 2)
        .setFixedRotation(true)
            .setFriction(2)
            .setCollisionCategory(cat1)
            .setCollidesWith([cat1])
            .setStatic(true)
            .setData('ID', 2)
        }else{
            var cube = THIS.matter.add.image(positionsCube[rnd3][i],168, 'cubes', 1)
            .setFixedRotation(true)
            .setFriction(2)
            .setCollisionCategory(cat1)
            .setCollidesWith([cat1])
            .setData('ID', 2)
        }
    }
    for(let i = 0; i < 6; i++){
        if(rnd6 > rnd){
        var cube = THIS.matter.add.image(positionsCube[rnd4][i],216, 'cubes', 2)
        .setFixedRotation(true)
            .setFriction(2)
            .setCollisionCategory(cat1)
            .setCollidesWith([cat1])
            .setStatic(true)
            .setData('ID', 2)
        }else{
            var cube = THIS.matter.add.image(positionsCube[rnd4][i],216, 'cubes', 1)
            .setFixedRotation(true)
            .setFriction(2)
            .setCollisionCategory(cat1)
            .setCollidesWith([cat1])
            .setData('ID',2)
        }
    }
    for(let i = 0; i < 6; i++){
        if(rnd1 > rnd4){

        var cube = THIS.matter.add.image(positionsCube[rnd5][i],264, 'cubes', 2)
        .setFixedRotation(true)
            .setFriction(2)
            .setCollisionCategory(cat1)
            .setCollidesWith([cat1])
            .setStatic(true)
            .setData('ID', 2)
        }else{
            var cube = THIS.matter.add.image(positionsCube[rnd5][i],264, 'cubes', 1)
            .setFixedRotation(true)
            .setFriction(2)
            .setCollisionCategory(cat1)
            .setCollidesWith([cat1])
            .setData('ID', 2)
        }
    }
    for(let i = 0; i < 6; i++){
        if(rnd5 > rnd2){

        var cube = THIS.matter.add.image(positionsCube[rnd6][i],312, 'cubes', 2)
        .setFixedRotation(true)
            .setFriction(2)
            .setCollisionCategory(cat1)
            .setCollidesWith([cat1])
            .setStatic(true)
            .setData('ID', 2)
        }else{
            var cube = THIS.matter.add.image(positionsCube[rnd6][i],312, 'cubes', 1)
            .setFixedRotation(true)
            .setFriction(2)
            .setCollisionCategory(cat1)
            .setCollidesWith([cat1])
            .setData('ID', 2)
        }
    }

    for(let i = 0; i < 6; i++){
        if(rnd4 > rnd3){

        var cube = THIS.matter.add.image(positionsCube[6][i],360, 'cubes', 2)
        .setFixedRotation(true)
            .setFriction(2)
            .setCollisionCategory(cat1)
            .setCollidesWith([cat1])
            .setStatic(true)
            .setData('ID', 2)
        }else{
            var cube = THIS.matter.add.image(positionsCube[6][i],360, 'cubes', 1)
            .setFixedRotation(true)
            .setFriction(2)
            .setCollisionCategory(cat1)
            .setCollidesWith([cat1])
            .setData('ID', 2)
        }
    }
}
function deleteCube(){
    var allBodies = THIS.matter.world.localWorld.bodies;
    for( let i = 0; i < allBodies.length; i++){
        let cubeObjet = allBodies[i].gameObject;
        if(allBodies[i].gameObject != null){
            if(allBodies[i].gameObject.data != null){
                if(allBodies[i].gameObject.data.list.ID == 2){
                    allBodies[i].gameObject.setVisible(false);
                    THIS.matter.world.remove(allBodies[i]);

                }
            }
        }
    }
}
function createOneCube(){
    if(player.flipX){
        var cube = THIS.matter.add.image(player.x,player.y - 48, 'cubes', 1)
            .setFixedRotation(true)
            .setFriction(1)
            .setCollisionCategory(cat1)
            .setCollidesWith([cat1])
            .setData('ID', 2)
            .setVelocityX(+5)
    }else{
        var cube = THIS.matter.add.image(player.x,player.y - 48, 'cubes', 1)
            .setFixedRotation(true)
            .setFriction(1)
            .setCollisionCategory(cat1)
            .setCollidesWith([cat1])
            .setData('ID', 2)
            .setVelocityX(-5)
    }
}
function fire() {
    if(!isunderthebox){
        projectile.x = player.x;
        projectile.y = player.y - 50;
        if(player.flipX){
            projectile.setVelocityX(8);
        }else{
            projectile.setVelocityX(-8); 
        }
    }else{
        createOneCube()
        isunderthebox = false;
        boxplayer.setVisible(false)
    }
}

function formatChronoTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
  
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}


// function gpt(){
//     fetch('https://v2.openai.com/engines/davinci/completions', {
//     method: 'POST',
//     headers: {
//         'Authorization': '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',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         prompt: "Une phrase de test.",
//         max_tokens: 50
//     })
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error('Erreur:', error));
// }

var config = {
    type: Phaser.AUTO,
    pixelArt : true,
    width : 336,
    height : 432,
  //   height : 700,
    backgroundColor : '#E4E6F0',
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
    scene: [ExittheRoom],
    //parent: 'gameContainer',
    physics: {
      default: 'matter',
      arcade: {
        //gravity: { y: 1600 },
        debug : true
      },
      matter: {
        gravity: { y: 1, x : 0},
        enableSleep: false,
        debug: false
    }
    }
  };
const game = new Phaser.Game(config);