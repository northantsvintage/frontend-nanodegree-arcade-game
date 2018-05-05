/** *********** ENEMY **************
* Enemies our player must avoid
*/
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 100 + Math.floor(Math.random() * 250);
    this.sprite = 'images/enemy-bug.png';
};

/** Update the Enemy's position, required method for game
* Parameter: dt, a time delta between ticks
*/
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x = this.x + (this.speed * dt);
    } else {
        this.x = -this.x;
    };

    //If the player comes within 30px of an enemy's x and y coordinates, reset the game
    if(player.x >= this.x - 30 && player.x <= this.x + 30) {
        if(player.y >= this.y - 30 && player.y <= this.y + 30) {
            player.x = 200;
            player.y = 400;
        }
    };
    // if player reaches the water, it wins
    if (player.y < 80) {
        setTimeout(youWon(),500);
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** *********** PLAYER **************
* Now write your own player class
*/
var Player = function() {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-princess-girl.png';
};
// shows sprite on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// if Player reaches the water, Player returned in the starting position
Player.prototype.update = function() {
        if (this.y <= 0) {
        this.x = 200;
        this.y = 400;
    };
};

/** Player position changes 100px up or down or left or right
* depending on the arrow keys
*/
Player.prototype.handleInput = function(event) {
    if( event === 'left' && this.x > 0 )  
        this.x -= 100;
    else if( event === 'right' && this.x < 400)
        this.x += 100;
    else if( event === 'up' && this.y > 0)
        this.y -= 80;
    else if( event === 'down' && this.y < 400)
        this.y += 80;
};

/** *********** NEW PLAYER AND ENEMY OBJECTS ************** 
* Instantiated Player and Enemy Objects
* Enemys pushed into array
*/
var player = new Player();

var enemy1 = new Enemy(-150, 50);
var enemy2 = new Enemy(-100, 140);
var enemy3 = new Enemy(-50, 230);

var allEnemies = [];
(function() {
    allEnemies.push(enemy1);
    allEnemies.push(enemy2);
    allEnemies.push(enemy3);
})();

/** WINNING
* Win popup and overlay appear when player reaches the water
*/
function youWon() {
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('hidden');
    const won = document.getElementById('winner');
    won.classList.remove('hidden');
  }

/** RESTART
* Restart the game after winning
*/
const restart = document.getElementById('restart');
  
restart.addEventListener('click', function() {
  location.reload();
});  

/** GAME CONTROL
* This listens for key presses and sends the keys to your Player.handleInput()
*/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}); 