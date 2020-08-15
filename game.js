    canvas = document.getElementById("game");
    ctx = canvas.getContext('2d');
        
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    ctx.font = "30px Arial";
    
    //Test Images

    var player = new Image();
    var grass = new Image();
    var dirt = new Image();
    var stone = new Image();
    var flower = new Image();
    var glowstone = new Image();
    var air = new Image();

    player.src = 'Assets/player.png';
    grass.src = 'Assets/grass.png';
    dirt.src = 'Assets/dirt.png';
    stone.src = 'Assets/stone.png';
    flower.src = 'Assets/flower.png';
    glowstone.src = 'Assets/glowstone.png';
    air.src = '';

    //Game Variables
    
    const mapWidth = 10;
    const mapHeight = 4;
    const map = [0,0,0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,0,0,
                 0,5,0,4,0,0,0,0,0,0,
                 1,1,1,1,1,1,1,1,1,1,
                 2,2,2,2,2,2,2,2,2,2,
                 3,3,3,3,3,3,3,3,3,3];

    var scaleX, scaleY;

    var mouseDown = false;
    
    var playerX = 50;
    var playerY = 50;

    var hotbarSelection = 0;

    var hotbar = [3,1,2,4,5];

    //Fps Counter Variables
    const times = [];
    let fps = 0;


    function renderMap() {
        scaleX = canvas.width / mapWidth;
        scaleY = canvas.height / 1;
        
        var yOffset = -1;
        
        var bufferImage = new Image();
        
        for (i=0; i < map.length; i++) {
            if (i%mapWidth == 0) {
                yOffset++;   
            }
            switch(map[i]) {
                case 0:
                    //Air - Empty
                    bufferImage = air;
                    break;
                case 1:
                    bufferImage = grass;
                    break;
                case 2:
                    bufferImage = dirt;
                    break;
                case 3:
                    bufferImage = stone;
                    break;
                case 4:
                    bufferImage = flower;
                    break;
                case 5:
                    bufferImage = glowstone;
                    
                    ctx.save(); //Save previus ctx state to restore after the shadow is drawn
                    //Draw the shadow / glow effect
                    ctx.shadowBlur = 25; //Strength
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    ctx.shadowColor = "blue"; //Shadow Color
                    break;
                default:
                    bufferImage = air;
                    break;
            }
            //Draw Tile
            ctx.drawImage(bufferImage,scaleX*(i%mapWidth),(scaleX)*yOffset,scaleX,scaleX);
            ctx.restore(); // Reset Ctx drawing options after drawing with a shadow
        }
    }

    function drawPlayer() {
        scaleX = canvas.width / mapWidth;
        ctx.drawImage(player,
                      playerX, //(scaleX)*(4), //X
                      playerY,//25+(scaleX)*1, //Y
                      scaleX, //Width
                      scaleX); //Height 
    }

    function drawHotbar() {
        ctx.save();
        ctx.strokeStyle = 'grey';
        ctx.lineWidth = 10;
        
        ctx.strokeRect((canvas.width/2)-(scaleX*.65),canvas.height-100,scaleX*.65,scaleX*.65);
        ctx.drawImage(dirt, (canvas.width/2)-(scaleX*.62),canvas.height-97,scaleX*.60,scaleX*.60);
        
        ctx.strokeRect((canvas.width/2)-(scaleX*.65)-(scaleX*.9),canvas.height-100,scaleX*.65,scaleX*.65);
        ctx.drawImage(grass, (canvas.width/2)-(scaleX*.62)-(scaleX*.9),canvas.height-97,scaleX*.60,scaleX*.60);
        
        ctx.strokeRect((canvas.width/2)-(scaleX*.65)-(scaleX*1.8),canvas.height-100,scaleX*.65,scaleX*.65);
        ctx.drawImage(stone, (canvas.width/2)-(scaleX*.62)-(scaleX*1.8),canvas.height-97,scaleX*.60,scaleX*.60);
                
        ctx.strokeRect((canvas.width/2)-(scaleX*.65)+(scaleX*.9),canvas.height-100,scaleX*.65,scaleX*.65);
        ctx.drawImage(flower, (canvas.width/2)-(scaleX*.62)+(scaleX*.9),canvas.height-97,scaleX*.60,scaleX*.60);
        
        ctx.strokeRect((canvas.width/2)-(scaleX*.65)+(scaleX*1.8),canvas.height-100,scaleX*.65,scaleX*.65);
        ctx.drawImage(glowstone, (canvas.width/2)-(scaleX*.62)+(scaleX*1.8),canvas.height-97,scaleX*.60,scaleX*.60);
        
        ctx.restore();
    }

    //Main Draw Loop
    function refreshLoop() {
        window.requestAnimationFrame(() => {
            
            //Clear Screen - Black
            ctx.fillStyle = "black";  
            ctx.fillRect(0, 0, canvas.width, canvas.height+25);
            
            //Update
            
            
            
            //Draw
            
            renderMap();
            //drawPlayer();
            drawHotbar();

            
            
            //Debug Info
            
            //Draw Fps
            ctx.fillStyle = "red";
            ctx.fillText(fps, 25, 25);
            //Draw Screen Size - Width x Height
            //ctx.fillText(canvas.width + " x " + canvas.height, 75,25);
            //ctx.fillText(Math.round(scaleX), 225, 25);
            //ctx.fillText(Math.round(scaleY), 300, 25);
            
            
            
            //Calculate FPS
            const now = performance.now();
            while (times.length > 0 && times[0] <= now - 1000) {
                times.shift();
            }
            times.push(now);
            fps = times.length;
              
            //Loop
            refreshLoop();
        }); 
    }

refreshLoop();

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        playerX-=10;
    }
    if(event.keyCode == 39) {
        playerX+=10;
    }
});

function mouseHandler(mouse, touch) {
    let mouseX, mouseY;
    if (touch) {
        mouseX = event.touches[0].clientX;
        mouseY = event.touches[0].clientY;
    } else {       
        mouseX = event.clientX;
        mouseY = event.clientY;
    }
    
    //Hot bar clicks
    
    if (mouseX >= (canvas.width/2)-(scaleX*.65)-(scaleX*1.8) && mouseX <= (canvas.width/2)-(scaleX*.65)-(scaleX*1.8) + (scaleX*.65) && mouseY >= canvas.height-100 && mouseY <= (canvas.height-100) + (scaleX*.65)) {
        hotbarSelection = 0;  
    } else if (mouseX >= (canvas.width/2)-(scaleX*.65)-(scaleX*.9) && mouseX <= (canvas.width/2)-(scaleX*.65)-(scaleX*.9) + (scaleX*.65) && mouseY >= canvas.height-100 && mouseY <= (canvas.height-100) + (scaleX*.65)) {
        hotbarSelection = 1;        
    } else if (mouseX >= (canvas.width/2)-(scaleX*.65) && mouseX <= (canvas.width/2)-(scaleX*.65) + (scaleX*.65) && mouseY >= canvas.height-100 && mouseY <= (canvas.height-100) + (scaleX*.65)) {
        hotbarSelection = 2;
    } else if (mouseX >= (canvas.width/2)-(scaleX*.65)+(scaleX*.9) && mouseX <= (canvas.width/2)-(scaleX*.65)+(scaleX*.9) + (scaleX*.65) && mouseY >= canvas.height-100 && mouseY <= (canvas.height-100) + (scaleX*.65)) {
        hotbarSelection = 3;
    } else if (mouseX >= (canvas.width/2)-(scaleX*.65)+(scaleX*1.8) && mouseX <= (canvas.width/2)-(scaleX*.65)+(scaleX*1.8) + (scaleX*.65) && mouseY >= canvas.height-100 && mouseY <= (canvas.height-100) + (scaleX*.65)) {
        hotbarSelection = 4;
    } else {
        
    //Draw to map      
  
    let mapClickX = Math.floor(mouseX/scaleX);
    let mapClickY = Math.floor(mouseY/scaleX);

    map[mapClickX+(mapWidth*mapClickY)] = hotbar[hotbarSelection];
        
    }

    //console.log(mouseX/scaleX + " " + mouseY);  
}

document.addEventListener('mousedown', function(event) {
    mouseDown = true;
    //console.log('Mouse Down');
});
                          
document.addEventListener('mouseup', function(event) {
    mouseDown = false;   
    //console.log('Mouse Up');
});

document.addEventListener('mousemove', function(event) {
    if (mouseDown) {
        mouseHandler(event, false);   
    }
});

document.addEventListener('click', function(event) {
    mouseHandler(event, false);   
});

document.addEventListener('touchstart', function(event) {
   mouseDown = true; 
});

document.addEventListener('touchend', function(event) {
    mouseDown = false;   
});

document.addEventListener('touchmove', function(event) {
   if (mouseDown) {
        mouseHandler(event, true);   
   }
});

window.onresize = function() {
    //Update Screen Size If Changed
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight; 
    ctx.font = "30px Arial";
}

function fullscreen(){
           var el = document.getElementById('game');
 
           if(el.webkitRequestFullScreen) {
               el.webkitRequestFullScreen();
           }
          else {
             el.mozRequestFullScreen();
          }            
}
        
