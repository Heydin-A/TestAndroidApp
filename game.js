const mapWidth = 150;
        const mapHeight = 50;
        const map = [0,0,0,0,0,0,0,0,0,0];
        
        canvas = document.getElementById("game");
        ctx = canvas.getContext('2d');
        
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;

        ctx.font = "30px Arial";
        
        const times = [];
        let fps;

        function refreshLoop() {
          window.requestAnimationFrame(() => {
            const now = performance.now();
            while (times.length > 0 && times[0] <= now - 1000) {
              times.shift();
            }
            times.push(now);
            fps = times.length;
              
            ctx.fillStyle = "black";
              
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "red";
              
            ctx.fillText(fps, 100, 100);
              
            refreshLoop();
          });
        }

refreshLoop();
        