// *********** ENEMY **************

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // movement coordinates
    this.x = x;
    this.y = y;
    this.speed = 100 + Math.floor(Math.random() * 250);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// *********** PLAYER **************

// Now write your own player class
var Player = function(){
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
}



// Win Game
// Make the win popup and overlay appear
function winGame() {
  const OVERLAY = document.getElementById('overlay');
  OVERLAY.classList.remove('hidden');

  const WIN = document.getElementById('win');
  WIN.classList.remove('hidden');
}

// Restart the game after winning if click on the restart button
const RESTART = document.getElementById('restart');

RESTART.addEventListener('click', function() {
  location.reload();
});



Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function() {
        if (this.y <= 50) {
        this.x = 202;
        this.y = 480;
        this.sprite = 'images/char-boy.png';
    }

}

Player.prototype.handleInput = function(event) {
    console.log(event.type);
    if (event === 'right' && this.x < 400){
        this.x += 100;
    } else if(event === 'left' && this.x >99){
        this.x -= 100;
    } else if(event === 'up' && this.y === 480){
        this.y -= 50;
    } else if(event === 'up' && this.y > 90){
        this.y -= 85;
    }else if(event === 'up' && this.y === 90){
        this.score += 100;
        this.y = 620;
        this.x = 200;
    } else if (event === 'down' && this.y < 400){
        if (this.y === 430){
            this.y += 50;
        } else{
            this.y += 85;
        }
    }
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x = this.x + (this.speed * dt);
    } else {
        this.x = -this.x;
    }

        //If the player comes within 10px of an enemy's x and y coordinates, reset the game
        if(player.x >= this.x - 10 && player.x <= this.x + 10){
            if(player.y >= this.y - 10 && player.y <= this.y + 10){
                player.x = 200;
                player.y = 400;
            }
        }

        if (player.y <= 100) {
            winGame();
        }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// // Place the player object in a variable called player
var player = new Player();
// Now instantiate your objects.
var enemy1 = new Enemy(-150, 50);
var enemy2 = new Enemy(-100, 140);
var enemy3 = new Enemy(-50, 230);
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
(function() {
    allEnemies.push(enemy1);
    allEnemies.push(enemy2);
    allEnemies.push(enemy3);
})();

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


