// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
        this.x -= 505; 
    }
    this.x += this.speed * dt * 4 ;    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
    this.sprite = "images/char-boy.png";
    this.x = 200;
    this.y = 400;
};
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
    if (this.y === 0) {
        alert("You Win!!!");
        this.x = 200;
        this.y = 400;
    } else {
        this.checkCollisions(allEnemies);
    }
};

Player.prototype.checkCollisions = function(enemies) {
    if (this.y !== 0) {
        for (var i = 0; i < enemies.length; ++i) {
            if (enemies[i].x + 20 <= this.x && enemies[i].y + 20 <= this.y) {
                alert("Game over :()");
                this.x = 200;
                this.y = 400;
            }
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'up') { 
        if (this.y - 50 > 0) {
            this.y -= 50;
        } else {
            this.y = 0;
        }      
    } else if (keyCode === 'down') { 
        if (this.y + 50 < 400) {
            this.y += 50;
        } else {
            this.y = 400;
        } 
    } else if (keyCode === 'left') { 
        if (this.x - 50 > 0) {
            this.x -= 50;
        } else {
            this.x = 0;
        }
    } else if (keyCode === 'right' && (this.x + 50 < 450)) {
        this.x += 50;
    }
};

// Now instantiate your objects.
var enemy1 = new Enemy(10, 20, Math.random() * 200 / 2);
var enemy2 = new Enemy(100, 150, Math.random() * 180 / 2);
// Place all enemy objects in an array called allEnemies
var allEnemies = [ enemy1, enemy2];
// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
