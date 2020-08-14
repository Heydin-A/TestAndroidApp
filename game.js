    canvas = document.getElementById("game");
    ctx = canvas.getContext('2d');
        
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    ctx.font = "30px Arial";
    
    //Test Images
    var grass = new Image();
    var dirt = new Image();
    var stone = new Image();
    var flower = new Image();
    grass.src = 'Assets/grass.png';
    dirt.src = 'Assets/dirt.png';
    stone.src = 'Assets/stone.png';
    flower.src = 'Assets/flower.png';

    //Game Variables
    
    const mapWidth = 10;
    const mapHeight = 4;
    const map = [0,0,0,4,0,0,0,0,0,0,
                 1,1,1,1,1,1,1,1,1,1,
                 2,2,2,2,2,2,2,2,2,2,
                 3,3,3,3,3,3,3,3,3,3];
    

    //Fps Counter Variables
    const times = [];
    let fps = 0;


    function renderMap() {
        var scaleX = canvas.width / mapWidth;
        var scaleY = canvas.height / 1;
        
        var yOffset = 0;
        
        ctx.fillText(Math.round(scaleX), 225, 25);
        ctx.fillText(Math.round(scaleY), 300, 25);
        
        for (i=0; i < map.length; i++) {
            if (i%mapWidth == 0) {
                yOffset++;   
            }
            switch(map[i]) {
                case 0:
                    //Air - Empty
                    break;
                case 1:
                    ctx.drawImage(grass,(scaleX)*(i%mapWidth),25+(scaleX)*yOffset,scaleX,scaleX);
                    break;
                case 2:
                    ctx.drawImage(dirt,(scaleX)*(i%mapWidth),25+(scaleX)*yOffset,scaleX,scaleX);
                    break;
                case 3:
                    ctx.drawImage(stone,(scaleX)*(i%mapWidth),25+(scaleX)*yOffset,scaleX,scaleX);
                    break;
                case 4:
                    ctx.drawImage(flower,(scaleX)*(i%mapWidth),25+(scaleX)*yOffset,scaleX,scaleX);
                    break;
            }
        }
    }

    //Main Draw Loop
    function refreshLoop() {
        window.requestAnimationFrame(() => {
            
            //Clear Screen - Black
            ctx.fillStyle = "black";  
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            //Debug Info
            
            //Draw Fps
            ctx.fillStyle = "red";
            ctx.fillText(fps, 25, 25);
            //Draw Screen Size - Width x Height
            ctx.fillText(canvas.width + " x " + canvas.height, 75,25);
            
            
            
            //Update
            
            
            
            //Draw
            
            renderMap();
            
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

window.onresize = function() {
    //Update Screen Size If Changed
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight; 
    ctx.font = "30px Arial";
}
        
