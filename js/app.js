// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;   
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
        this.x -= 505;
    }
    this.x += this.speed * dt * 3;
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/char-boy.png";
};

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
    if (this.y === 0) {
        console.log("You Win!!!");
        this.x = 202.5;
        this.y = 383;
    } else {
        this.checkCollisions(allEnemies);
    }
};

// This function checks if collision has occured
// between enemy & player. If so, then game is
// over and player is reset to its originial
// position
Player.prototype.checkCollisions = function(enemies) {
    if (this.y !== 0) {
        for (var i = 0; i < enemies.length; ++i) {
            var thisEnemey = enemies[i];
            if (player.x <= thisEnemey.x + 40 &&
                player.y <= thisEnemey.y + 40 &&
                thisEnemey.x <= player.x + 40 &&
                thisEnemey.y <= player.y + 40) {
                console.log("Game over :(");
                this.x = 202.5;
                this.y = 383;
            }
        }
    }
};

// This function renders the player on the
// canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This function handles the key inputs &
// accordingly moves the player on the canvas
Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'up') {
        if (this.y - this.speed > 0) {
            this.y -= this.speed;
        } else {
            this.y = 0;
        }
    } else if (keyCode === 'down') {
        if (this.y + this.speed < 383) {
            this.y += this.speed;
        } else {
            this.y = 383;
        }
    } else if (keyCode === 'left') {
        if (this.x - this.speed > 0) {
            this.x -= this.speed;
        } else {
            this.x = 0;
        }
    } else if (keyCode === 'right') {
        if (this.x + this.speed < 400) {
            this.x += 50;
        } else {
            this.x = 400;
        }
    }
};

// Instantiate and push all enemy objects
// in an array allEnemies
var allEnemies = [];
allEnemies.push(new Enemy(10, 20, Math.random() * 200 / 2),
                new Enemy(100, 150, Math.random() * 180 / 2),
                new Enemy(60, 80, Math.random() * 150 / 2));

// Place the player object in a variable called player
var player = new Player(202.5, 383, 50);


// This listens for key presses and sends the
// keys to the Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
