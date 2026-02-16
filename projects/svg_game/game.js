// The point and size class used in this program
function Point(x, y) {
    this.x = (x)? parseFloat(x) : 0.0;
    this.y = (y)? parseFloat(y) : 0.0;
}

function Size(w, h) {
    this.w = (w)? parseFloat(w) : 0.0;
    this.h = (h)? parseFloat(h) : 0.0;
}

// Helper function for checking intersection between two rectangles
function intersect(pos1, size1, pos2, size2) {
    return (pos1.x < pos2.x + size2.w && pos1.x + size1.w > pos2.x &&
            pos1.y < pos2.y + size2.h && pos1.y + size1.h > pos2.y);
}


// The player class used in this program
function Player() {
    this.node = document.getElementById("player");
    this.position = PLAYER_INIT_POS;
    this.motion = motionType.NONE;
    this.verticalSpeed = 0;
	this.name = (player_name)?player_name:"Anonymous";
}


Player.prototype.isOnPlatform = function() {
    var platforms = document.getElementById("platforms");
    for (var i = 0; i < platforms.childNodes.length; i++) {
        var node = platforms.childNodes.item(i);
        if (node.nodeName != "rect") continue;

        var x = parseFloat(node.getAttribute("x"));
        var y = parseFloat(node.getAttribute("y"));
        var w = parseFloat(node.getAttribute("width"));
        var h = parseFloat(node.getAttribute("height"));

        if (((this.position.x + PLAYER_SIZE.w > x && this.position.x < x + w) ||
             ((this.position.x + PLAYER_SIZE.w) == x && this.motion == motionType.RIGHT) ||
             (this.position.x == (x + w) && this.motion == motionType.LEFT)) &&
            this.position.y + PLAYER_SIZE.h == y) return node;
		}
    if (this.position.y + PLAYER_SIZE.h == SCREEN_SIZE.h) return true;

    return false;
}

Player.prototype.collidePlatform = function(position) {
    var platforms = document.getElementById("platforms");
    for (var i = 0; i < platforms.childNodes.length; i++) {
        var node = platforms.childNodes.item(i);
        if (node.nodeName != "rect") continue;
		var onMovingStage = (node.className.baseVal == "y-stage");

        var x = parseFloat(node.getAttribute("x"));
        var y = parseFloat(node.getAttribute("y"));
        var w = parseFloat(node.getAttribute("width"));
        var h = parseFloat(node.getAttribute("height"));
        var pos = new Point(x, y);
        var size = new Size(w, h);

        if (intersect(position, PLAYER_SIZE, pos, size)) {
			if (!onMovingStage)
				position.x = this.position.x;
            if (intersect(position, PLAYER_SIZE, pos, size)) {
				if (this.position.y >= y + h) {
					position.y = y + h;
				}
				else {
					if (onMovingStage) { // Case when the player on Y-Stage
						// knock head
						if (this.position.y > y) {
							position.y = y + h;
							continue;
						}
						// falling
						else if (this.position.y + PLAYER_SIZE.h < y) {
							position.y = y - PLAYER_SIZE.h;
							this.verticalSpeed = -node.getAttribute("speed");
							continue;
						}
						// rising
						else {
							this.verticalSpeed = node.getAttribute("speed");
							position.y = y - PLAYER_SIZE.h;
							continue;
						}
					} else { // Handle normally
						position.y = y - PLAYER_SIZE.h;
					}
				}
				this.verticalSpeed = 0;
            }
        }
    }
}

Player.prototype.collideScreen = function(position) {
    if (position.x < 0) position.x = 0;
    if (position.x + PLAYER_SIZE.w > SCREEN_SIZE.w) position.x = SCREEN_SIZE.w - PLAYER_SIZE.w;
    if (position.y < 0) {
        position.y = 0;
        this.verticalSpeed = 0;
    }
    if (position.y + PLAYER_SIZE.h > SCREEN_SIZE.h) {
        position.y = SCREEN_SIZE.h - PLAYER_SIZE.h;
        this.verticalSpeed = 0;
    }
}

//
// Below are constants used in the game
//
var MAX_TIME = 60;							// Max Time left
var PLAYER_SIZE = new Size(25, 40);         // The size of the player
var SCREEN_SIZE = new Size(600, 560);       // The size of the game screen
var PLAYER_INIT_POS  = new Point(260, 50);  // The initial position of the player

var MOVE_DISPLACEMENT = 5;                  // The speed of the player in motion
var JUMP_SPEED = 13;                        // The speed of the player jumping
var VERTICAL_DISPLACEMENT = 1;              // The displacement of vertical speed

var GAME_INTERVAL = 25;                     // The time interval of running the game

var BULLET_SIZE = new Size(10, 10);         // The size of a bullet
var BULLET_SPEED = 10.0;                    // The speed of a bullet
                                            //  = pixels it moves each game loop
var SHOOT_INTERVAL = 200.0;                 // The period when shooting is disabled
var MAX_BULLET_NUM = 8;               		// Max loads of bullets
var canShoot = true;                        // A flag indicating whether the player can shoot a bullet
var canShootMon = false;                    // A flag indicating whether the monster can shoot a bullet

var MONSTER_SIZE = new Size(40, 40);        // The size of a monster
var MONSTER_SPEED_FACTOR = 300;
var MONSTER_SCORE = 5;						// The score gained by killing one monster

var CREAM_SIZE = new Size(30, 30);       	// The size of cream
var CREAM_NUM = 8;							// The score gained by eating one cream
var CREAM_SCORE = 10;						// The score gained by eating one cream

var PORTAL_SIZE = new Size(20, 60);
var EXIT_SIZE = new Size(30, 50);
//
// Variables in the game
//
var time_remaining = MAX_TIME;				// Time left
var countDownTimer;
var game_over = false;						// Whether the game stops
var motionType = {NONE:0, LEFT:1, RIGHT:2}; // Motion enum

var player = null;                          // The player object
var gameInterval = null;                    // The interval
var playerFlip = false;						// Whether need to flip player
var monsterDefeated = 0;					// Number of monster killed in one level
var iceCreamCollected = 0;					// Number of icecream collected in one level

var originalScore = 0;						// The score accumulated in the previous levels
var score = 0;								// The score of this level
var cheat_mode = false;						// Cheat mode "C" - on; "V" - off
var player_name;
var canExit;								// indicate if the player can go to next lv
var level = 1;								// current level displayed

// This is an array storing disappeared platform
var removedPlatform = [];

// Sound effects
var player_dead_sound = new Audio('sound/playerdead.wav');
var enemy_dead_sound = new Audio('sound/enemydead.wav');
var player_shoot_sound = new Audio('sound/playershoot.wav');
var enemy_shoot_sound = new Audio('sound/enemyshoot.wav');
var eat_sound = new Audio('sound/eat.wav');
var crystal_sound = new Audio("sound/shine.wav");
var victory_sound = new Audio('sound/victory.mp3');
var bgm = new Audio('sound/tamco03.mp3');

//
// The load function
//
function load() {	
    // Attach keyboard events
    document.documentElement.addEventListener("keydown", keydown, false);
    document.documentElement.addEventListener("keyup", keyup, false);
	
	// Set the countdown timer
	document.getElementById("time-remain").innerHTML = time_remaining;
	countDownTimer = setInterval("countDown()", 1000);

    // Create the player (only in the first time)
	if (!player) {
		player = new Player();
		player_name = document.getElementById("player-name-input").value;
		player.name = (player_name?player_name:"Anonymous");
	}
	document.getElementById("player_name").innerHTML = player.name;

    // Create the monsters
    for (var i = 0; i < 5; i++) 
		createMonster(false);
	createMonster(true);
	
	// Create the good things
	for (var i = 0; i < CREAM_NUM; i++)
		createGoodThing();
	
	// Create the static bullets
	createStaticBullets(MAX_BULLET_NUM);
		
    // Start the game interval
    gameInterval = setInterval("gamePlay()", GAME_INTERVAL);
	
	// The boss will shoot after 5 seconds
	setTimeout("canShootMon = true", 5000);
	game_over = false;
	canExit = false;
	
	// Remove the starting screen
	var starting = document.getElementById("starting-screen");
	if (starting)
		starting.parentNode.removeChild(starting);
	
	// Setting of the BGM
	bgm.currentTime = 0;
	bgm.loop = true;
	bgm.play();
}

// This function goes to the next level
function nextLevel() {
	level++;
	document.getElementById("level").innerHTML = level;
	originalScore = score;
	monsterDefeated = 0;
	iceCreamCollected = 0;
	canExit = false;
	canShootMon = false;
	
	// Reset the countdown timer
	time_remaining = MAX_TIME - 5*(level-1);
	document.getElementById("time-remain").innerHTML = time_remaining;
	countDownTimer = setInterval("countDown()", 1000);
	
	// Reconstruct the disappearing platforms
	var platforms = document.getElementById("platforms");
	for (var i = 0; i < removedPlatform.length; i++) {
		platforms.appendChild(removedPlatform[i]);
	}
	removedPlatform = [];
	
	// Handle the player
    player.position = PLAYER_INIT_POS;
	player.node.setAttribute("x", player.position.x);
	player.node.setAttribute("y", player.position.y);
	player.node.setAttribute("fill", "rgb(200,200,200)");
	player.verticalSpeed = 0;
	
	// Reset the crystal
	var faces = document.getElementById("crystal").childNodes;
	document.getElementById("exit-crystal").removeAttribute("filter");
	for (var i = 0; i < faces.length; i++) {
		var face = faces[i];
		if (face.nodeName == "path")
			// Remove fill
			face.removeAttribute("fill");
		else if (face.nodeName == "animateTransform") {
			// Disable the floating effect
			face.setAttribute("attributeName", "");
		}
	}
	
	// Remove all monsters remaining
	var monsters = document.getElementById("monsters");
	while (monsters.firstChild) {
		monsters.removeChild(monsters.firstChild);
	}
	
	// Remove the bullets as well
	var mbullets = document.getElementById("monster-bullets");
	while (mbullets.firstChild) {mbullets.removeChild(mbullets.firstChild);}
	var bullets = document.getElementById("bullets");
	while (bullets.firstChild) {bullets.removeChild(bullets.firstChild);}
	
	// Create all monsters remaining
    for (var i = 0; i < (1 + level*4); i++) 
		createMonster(false);
	createMonster(true);
	
	// Create the good things
	for (var i = 0; i < (CREAM_NUM + level*2 - 2); i++)
		createGoodThing();
	// Refill the static bullets
	createStaticBullets(MAX_BULLET_NUM);
	// Start the game interval
    gameInterval = setInterval("gamePlay()", GAME_INTERVAL);
	
	// The boss will shoot after 5 seconds
	setTimeout("canShootMon = true", 5000);
	game_over = false;
	canExit = false;
	
	// Hide the statistic screen
	var stat = document.getElementById("level-clear-screen");
	stat.setAttribute("display", "none");
	
	// Setting of the BGM
	bgm.currentTime = 0;
	bgm.loop = true;
	bgm.play();
}

function inputNameBeforeRestart(target) {
	target.setAttribute("display", "none");
	// Display the player name prompt
	var input = document.getElementById("playername-reinput");
	input.value = player.name;
	var restart = document.getElementById("restart-hidden");
	restart.setAttribute("display", "block");
}

function restart() {
	// reset all variables
	level = 1;
	document.getElementById("level").innerHTML = level;
	score = 0;
	document.getElementById("score").innerHTML = score;
	originalScore = 0;
	monsterDefeated = 0;
	iceCreamCollected = 0;
	canShootMon = false;
	var restart = document.getElementById("restart-hidden");
	restart.setAttribute("display", "none");
	player_name = document.getElementById("playername-reinput").value;
	player.name = player_name;
	
	// Reset the countdown timer
	time_remaining = MAX_TIME;
	
	// Reconstruct the disappearing platforms
	var platforms = document.getElementById("platforms");
	for (var i = 0; i < removedPlatform.length; i++) {
		platforms.appendChild(removedPlatform[i]);
	}
	removedPlatform = [];
	
	// Reset the crystal
	var faces = document.getElementById("crystal").childNodes;
	document.getElementById("exit-crystal").removeAttribute("filter");
	for (var i = 0; i < faces.length; i++) {
		var face = faces[i];
		if (face.nodeName == "path")
			// Remove fill
			face.removeAttribute("fill");
		else if (face.nodeName == "animateTransform") {
			// Disable the floating effect
			face.setAttribute("attributeName", "");
		}
	}
	
	// Remove all monsters remaining
	var monsters = document.getElementById("monsters");
	while (monsters.firstChild) {
		monsters.removeChild(monsters.firstChild);
	}
	// Remove the bullets as well
	var mbullets = document.getElementById("monster-bullets");
	while (mbullets.firstChild) {mbullets.removeChild(mbullets.firstChild);}
	var bullets = document.getElementById("bullets");
	while (bullets.firstChild) {bullets.removeChild(bullets.firstChild);}
	
	// Remove all good thing remaining
	var goodthings = document.getElementById("good-things");
	while (goodthings.firstChild) {
		goodthings.removeChild(goodthings.firstChild);
	}
	
	// Reset player position
    player.position = PLAYER_INIT_POS;
	player.node.setAttribute("x", player.position.x);
	player.node.setAttribute("y", player.position.y);
	player.node.setAttribute("fill", "rgb(200,200,200)");
	player.name = player_name?player_name:"Anonymous";
	player.verticalSpeed = 0;
	
	// Clear the high score table
	var screen = document.getElementById("highscoretable");
	var highscore = document.getElementById("highscoretext");
	while (highscore.firstChild) {
		highscore.removeChild(highscore.firstChild);
	}
	screen.setAttribute("display", "none");
	
	// Reload
	load();
}

function countDown() {
	time_remaining--;
	document.getElementById("time-remain").innerHTML = time_remaining;
	if (time_remaining <= 0) {
		gameover();
	}
}

// Showing statistic after clearing a level
function showStat() {
	victory_sound.play();
	// Clear the game interval
	clearInterval(gameInterval);
	clearInterval(countDownTimer);
	game_over = true;
	
	bgm.pause();
	bgm.currentTime = 0;
	
	document.getElementById("stage-clear-stat").innerHTML = level * 100;
	document.getElementById("ice-cream-collected").innerHTML = iceCreamCollected;
	document.getElementById("monster-defeated-stat").innerHTML = monsterDefeated;
	document.getElementById("net-score-stat").innerHTML = monsterDefeated * MONSTER_SCORE + iceCreamCollected * CREAM_SCORE + level*100;
	document.getElementById("original-score-stat").innerHTML = originalScore;
	document.getElementById("time-remaining-stat").innerHTML = time_remaining;
	document.getElementById("total-score-stat").innerHTML = score + time_remaining + level * 100;
	// update the score on the right panel
	score += time_remaining + level*100;
	document.getElementById("score").innerHTML = score;
	// Display the level clear screen
	document.getElementById("level-clear-screen").setAttribute("display", "block");
	
}

// This function creates the monsters in the game
function createMonster(king) {
	var x = Math.random() * (SCREEN_SIZE.w - MONSTER_SIZE.w);
	var y = Math.random() * (SCREEN_SIZE.h - MONSTER_SIZE.h);
	var safePoint = new Point(player.position.x - PLAYER_SIZE.w*2, player.position.y - PLAYER_SIZE.h*2);
	var safeSize = new Size(PLAYER_SIZE.w * 5, PLAYER_SIZE.h * 5);
	while (intersect(safePoint, safeSize, new Point(x, y), MONSTER_SIZE)) {
		x = Math.random() * (SCREEN_SIZE.w - MONSTER_SIZE.w);
		y = Math.random() * (SCREEN_SIZE.h - MONSTER_SIZE.h);
	}
    var monster = document.createElementNS("http://www.w3.org/2000/svg", "use");
    monster.setAttribute("x", x);
    monster.setAttribute("y", y);
	if (king) {
		monster.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#monster-king");
		monster.setAttribute("id", "monster-king-obj");
	} else {
		monster.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#monster");
	}
	
	// Set the target XY
	var tx = Math.random() * (SCREEN_SIZE.w - MONSTER_SIZE.w);
	var ty = Math.random() * (SCREEN_SIZE.h - MONSTER_SIZE.h);
	monster.setAttribute("tx", tx);
	monster.setAttribute("ty", ty);
	
	// Set the speed/direction of moving
	var dxdy = dxy(x, y, tx, ty);
	monster.setAttribute("dx", dxdy[0]);
	monster.setAttribute("dy", dxdy[1]);
    document.getElementById("monsters").appendChild(monster);
}

function createGoodThing() {
	var cream = document.createElementNS("http://www.w3.org/2000/svg", "use");
	var x, y, ok = false;
	var platform_list = document.getElementById("platforms").getElementsByTagName("rect");
	while (!ok) {
		x = Math.floor(Math.random() * 15) * 40 + 5;
		y = Math.floor(Math.random() * 13) * 40 + 20;
		ok = true;
		// Check if overlap with any platform
		for (var i = 0; i < platform_list.length; i++) {
			var platform = platform_list[i];
			var platX = platform.getAttribute("x");
			var platY = platform.getAttribute("y");
			var sizeX = platform.getAttribute("width");
			var sizeY = platform.getAttribute("height");
			if (intersect(new Point(x, y), CREAM_SIZE, new Point(platX, platY), new Size(sizeX, sizeY))) {
				ok = false;
				break;
			}
		}
		if (!ok) continue;
		// Check if overlap with other goodthings
		var creams = document.getElementById("good-things").childNodes;
		for (var i = 0; i < creams.length; i++) {
			if (intersect(new Point(x, y), CREAM_SIZE, new Point(creams[i].getAttribute("x"), creams[i].getAttribute("y")), CREAM_SIZE)) {
				ok = false;
				break;
			}
		}
		// Check if overlap with player
		if (intersect(new Point(x, y), CREAM_SIZE, player.position, PLAYER_SIZE)) 
			ok = false;
	}
	cream.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#good-thing");
	cream.setAttribute("x", x);
	cream.setAttribute("y", y);
	
	// Generate random color
	var randR = Math.floor(Math.random() * 256);
	var randG = Math.floor(Math.random() * 256);
	var randB = Math.floor(Math.random() * 256);
	cream.setAttribute("fill", "rgb(" + randR +","+ randG +","+ randB + ")");
	document.getElementById("good-things").appendChild(cream);
}

function dxy(x, y, tx, ty) {
	var overall = Math.sqrt((ty-y)*(ty-y) + (tx-x)*(tx-x));
	var ratio = Math.abs(tx - x)/(Math.abs(tx - x) + Math.abs(ty - y));
	var dx = overall * ratio / MONSTER_SPEED_FACTOR;
	var dy = overall * (1 - ratio) / MONSTER_SPEED_FACTOR;
	return [dx, dy];
}

function createStaticBullets(n) {
	var section = document.getElementById("bullet-remain");
	// Make sure the area is clean before appending
	while (section.firstChild) {
		section.removeChild(section.firstChild);
	}
	var x = 25, y = 20;
	for (var i = 0; i < n; i++) {
		var bullet = document.createElementNS("http://www.w3.org/2000/svg", "use");
		bullet.setAttribute("x", x);
		bullet.setAttribute("y", y);
		bullet.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#bullet");
		section.appendChild(bullet);
		x += 25;
		if (x > 100) {
			x = 25; y += 20;
		}
	}
}

function moveMonster() {
	var monsters = document.getElementById("monsters");
	for (var i = 0; i < monsters.childNodes.length; i++) {
		var monster = monsters.childNodes.item(i);
		var tx = parseFloat(monster.getAttribute("tx")); var ty = parseFloat(monster.getAttribute("ty"));
		var dx = parseFloat(monster.getAttribute("dx")); var dy = parseFloat(monster.getAttribute("dy"));
		var x = parseFloat(monster.getAttribute("x")); var y = parseFloat(monster.getAttribute("y"));
		if (tx < x) {
			var arg = "translate(40,0) translate(" + x + "," + y + ") scale(-1,1) translate(" + (-x) + "," + (-y) + ")";
			monster.setAttribute("transform", arg);
		} else {
			monster.setAttribute("transform", "");
		}
		monster.setAttribute("x", x + dx * ((tx>x)?1:-1));
		monster.setAttribute("y", y + dy * ((ty>y)?1:-1));
		if (Math.abs(y - ty) < 5 && Math.abs(x - tx) < 5) {
			var tx = Math.random() * (SCREEN_SIZE.w - MONSTER_SIZE.w);
			var ty = Math.random() * (SCREEN_SIZE.h - MONSTER_SIZE.h);
			monster.setAttribute("tx", tx);
			monster.setAttribute("ty", ty);
			var dxdy = dxy(x, y, tx, ty);
			monster.setAttribute("dx", dxdy[0]);
			monster.setAttribute("dy", dxdy[1]);
		}
	}
}

//
// This function shoots a bullet from the player
//
function shootBullet() {
    // Disable shooting for a short period of time
    canShoot = false;
	setTimeout("canShoot = true", SHOOT_INTERVAL);
	var remain = document.getElementById("bullet-remain");
	if (remain.childNodes.length <= 0 && !cheat_mode) {
		return;
	}
    // Create the bullet using the use node
    var bullet = document.createElementNS("http://www.w3.org/2000/svg", "use");
    bullet.setAttribute("x", player.position.x + PLAYER_SIZE.w / 2 - BULLET_SIZE.w / 2);
    bullet.setAttribute("y", player.position.y + PLAYER_SIZE.h / 2 - BULLET_SIZE.h / 2);
	bullet.setAttribute("direction", playerFlip?-1:1);
    bullet.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#bullet");
	// Play sound
	player_shoot_sound.pause();
	player_shoot_sound.currentTime = 0;
	player_shoot_sound.play();
    document.getElementById("bullets").appendChild(bullet);
	if (!cheat_mode) remain.removeChild(remain.lastChild);
}


//
// This is the keydown handling function for the SVG document
//
function keydown(evt) {
	if (game_over) return;
    var keyCode = (evt.keyCode)? evt.keyCode : evt.getKeyCode();

    switch (keyCode) {
        case "A".charCodeAt(0):
            player.motion = motionType.LEFT;
			document.getElementById("player_bounce").setAttribute("values", "0 0;0 -4;0 0");
			playerFlip = true;
            break;

        case "D".charCodeAt(0):
            player.motion = motionType.RIGHT;
			document.getElementById("player_bounce").setAttribute("values", "0 0;0 -4;0 0");
			playerFlip = false;
            break;
			
        case "W".charCodeAt(0):
            if (player.isOnPlatform()) {
                player.verticalSpeed = JUMP_SPEED;
            }
            break;

        case "H".charCodeAt(0):
            if (canShoot) shootBullet();
            break;
			
		case "C".charCodeAt(0):
			cheat_mode = true;
			document.getElementById("cheat_display").style.display = "block";
			break;
			
		case "V".charCodeAt(0):
			cheat_mode = false;
			document.getElementById("cheat_display").style.display = "none";
			break
    }
}


//
// This is the keyup handling function for the SVG document
//
function keyup(evt) {
    // Get the key code
    var keyCode = (evt.keyCode)? evt.keyCode : evt.getKeyCode();

    switch (keyCode) {
        case "A".charCodeAt(0):
            if (player.motion == motionType.LEFT) {
				player.motion = motionType.NONE;
				document.getElementById("player_bounce").setAttribute("values", "0 0");
			}
            break;

        case "D".charCodeAt(0):
            if (player.motion == motionType.RIGHT) {
				player.motion = motionType.NONE;
				document.getElementById("player_bounce").setAttribute("values", "0 0");
			}
            break;
    }
}


function checkDisappearPlatform() {
	var node = player.isOnPlatform();
	if (typeof node === 'object' && node.getAttribute("class") == "d-stage") {
		node.style.opacity -= 0.05;
		if (node.style.opacity < 0) {
			removedPlatform.push(node);
			node.parentNode.removeChild(node);
		}
	} else {
		var dStages = document.getElementsByClassName("d-stage");
		for (var i = 0; i < dStages.length; i++) {
			dStages[i].style.opacity = 1.0;
		}
	}
}

function gameover() {
	// play dead sound and stop BGM
	player_dead_sound.play();
	bgm.pause();
	
	// Clear the game interval
	clearInterval(gameInterval);
	clearInterval(countDownTimer);

	// Get the high score table from cookies
	var table = getHighScoreTable();
	// Create the new score record
	var record = new ScoreRecord(player.name, score);
	// Insert the new score record
	var j = 0;
	for (;j < table.length; j++) {if (score > table[j].score) break;}
	table.splice(j, 0, record);
	// Store the new high score table
	setHighScoreTable(table);
	// Show the high score table
	showHighScoreTable(table);
	game_over = true;
	return;
}

// This function checks collision
function collisionDetection() {
    // Check whether the player collides with a monster/monster-bullet
    var monsters = document.getElementById("monsters");
	// Invoked when player loses
		
	if (!cheat_mode) {
		for (var i = 0; i < monsters.childNodes.length; i++) {
			var monster = monsters.childNodes.item(i);
			var x = parseInt(monster.getAttribute("x"));
			var y = parseInt(monster.getAttribute("y"));

			// GAME OVER
			if (intersect(new Point(x, y), MONSTER_SIZE, player.position, PLAYER_SIZE)) {
				gameover();		
			}
		}
		var bullets = document.getElementById("monster-bullets");
		for (var i = 0; i < bullets.childNodes.length; i++) {
			var bullet = bullets.childNodes.item(i);
			var x = parseInt(bullet.getAttribute("x"));
			var y = parseInt(bullet.getAttribute("y"));
			if (intersect(new Point(x, y), BULLET_SIZE, player.position, PLAYER_SIZE)) {
				gameover();
			}
		}
	}

    // Check whether a bullet hits a monster
    var bullets = document.getElementById("bullets");
    for (var i = 0; i < bullets.childNodes.length; i++) {
        var bullet = bullets.childNodes.item(i);
        var x = parseInt(bullet.getAttribute("x"));
        var y = parseInt(bullet.getAttribute("y"));

        for (var j = 0; j < monsters.childNodes.length; j++) {
            var monster = monsters.childNodes.item(j);
            var mx = parseInt(monster.getAttribute("x"));
            var my = parseInt(monster.getAttribute("y"));

            if (intersect(new Point(x, y), BULLET_SIZE, new Point(mx, my), MONSTER_SIZE)) {
				enemy_dead_sound.pause();
				enemy_dead_sound.currentTime = 0;
				enemy_dead_sound.play();
                monsters.removeChild(monster);
                bullets.removeChild(bullet);
				i--; j--;
				monsterDefeated++;
				
                // increase the score
				score += MONSTER_SCORE;
				document.getElementById("score").innerHTML = score;
            }
        }
    }
	
	// Check whether the player collides with a good thing
	var creams = document.getElementById("good-things");
	for (var i = 0; i < creams.childNodes.length; i++) {
		var cream = creams.childNodes.item(i);
		if (intersect(player.position, PLAYER_SIZE, new Point(cream.getAttribute("x"), cream.getAttribute("y")), CREAM_SIZE)) {
			eat_sound.currentTime = 0;
			eat_sound.play();
			var color = cream.getAttribute("fill");
			player.node.setAttribute("fill", color);
			document.getElementById("bullet").setAttribute("fill", color);
			creams.removeChild(cream);
			iceCreamCollected++;
			i--;
			
			// increase the score
			score += CREAM_SCORE;			
			document.getElementById("score").innerHTML = score;
		}
	}
	
	// Check whether the player enters the portals
	var orange_portal = document.getElementById("portal-orange");
	var blue_portal = document.getElementById("portal-blue");
	if (player.motion == motionType.LEFT && intersect(player.position, PLAYER_SIZE, new Point(orange_portal.getAttribute("x"),
								orange_portal.getAttribute("y")), PORTAL_SIZE)) {
		player.position.x = Math.floor(blue_portal.getAttribute("x")) + PORTAL_SIZE.w;
	} else if (player.motion == motionType.RIGHT && intersect(player.position, PLAYER_SIZE,
					new Point(blue_portal.getAttribute("x"), blue_portal.getAttribute("y")), PORTAL_SIZE)) {
		player.position.x = Math.floor(orange_portal.getAttribute("x"));
	}
	
	// Check whether the player enters the exit
	if (canExit) {
		var exit = document.getElementById("exit");
		var x = exit.getAttribute("x");
		var y = exit.getAttribute("y");
		if (intersect(player.position, PLAYER_SIZE, new Point(x,y), EXIT_SIZE)) {
			showStat();
		}
	}
}

function monsterKingShoot() {
	if (!canShootMon || document.getElementsByName("monster-king-bullet").length != 0) {
		return;
	}
	var king = document.getElementById("monster-king-obj");
	if (king == null) return;
	var x = parseInt(king.getAttribute("x"));
	var y = parseInt(king.getAttribute("y"));
	// Shoot when manhattan distance between king and player < 300.
	if ((Math.abs(player.position.x - x) + Math.abs(player.position.y - y)) < 300) {
		var bullet = document.createElementNS("http://www.w3.org/2000/svg", "use");
		bullet.setAttribute("x", x + MONSTER_SIZE.w / 2 - BULLET_SIZE.w / 2);
		bullet.setAttribute("y", y + MONSTER_SIZE.h / 2 - BULLET_SIZE.h / 2);
		
		// Calculate the fixed dx and dy value
		var dist = Math.abs(player.position.x - x) + Math.abs(player.position.y - y);
		dist = (dist<0.01)?0.01:dist;
		dx = BULLET_SPEED / 2 * (player.position.x - x) / dist;
		dy = BULLET_SPEED / 2 * (player.position.y - y) / dist;
		bullet.setAttribute("dx", dx);
		bullet.setAttribute("dy", dy);
		bullet.setAttribute("name", "monster-king-bullet");
		bullet.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#monster-bullet");
		// Play sound
		enemy_shoot_sound.pause();
		enemy_shoot_sound.currentTime = 0;
		enemy_shoot_sound.play();
		
		document.getElementById("monster-bullets").appendChild(bullet);
		canShootMon = false;
		setTimeout("canShootMon = true;", SHOOT_INTERVAL * 10);
	}
}

//
// This function updates the position of the bullets
//
function moveBullets() {
	// Handle bullet from player
    var bullets = document.getElementById("bullets");
    for (var i = 0; i < bullets.childNodes.length; i++) {
        var node = bullets.childNodes.item(i);
		// Update the position of the bullet
		var x = parseInt(node.getAttribute("x"));
		node.setAttribute("x", x + BULLET_SPEED * node.getAttribute("direction"));

		// If the bullet is not inside the screen delete it from the group
		if (x > SCREEN_SIZE.w) {
			bullets.removeChild(node);
			i--;
		}
    }
	
	// Handle bullet from monster king
	bullets = document.getElementById("monster-bullets");
	for (var i = 0; i < bullets.childNodes.length; i++) {
		var node = bullets.childNodes.item(i);
		var x = parseInt(node.getAttribute("x"));
		var y = parseInt(node.getAttribute("y"));
		node.setAttribute("x", x + parseFloat(node.getAttribute("dx")));
		node.setAttribute("y", y + parseFloat(node.getAttribute("dy")));
		if (x < 0 || x > SCREEN_SIZE.w || y < 0 || y > SCREEN_SIZE.h) {
			bullets.removeChild(node);
			i--;
		}			
	}
}

function movePlatform() {
	var platforms = document.getElementsByClassName("y-stage");
	for (var i = 0; i < platforms.length; i++) {
		var y = parseInt(platforms[i].getAttribute("y"));
		var y1 = parseInt(platforms[i].getAttribute("y1"));
		var y2 = parseInt(platforms[i].getAttribute("y2"));
		var speed = parseInt(platforms[i].getAttribute("speed"));
		// assume y1 < y2
		if (y > y2 || y < y1) {
			speed = -speed
			platforms[i].setAttribute("speed", speed);
		}
		platforms[i].setAttribute("y", y + speed);
	}
}

function checkExit() {
	if (canExit) return true;
	var goodthings = document.getElementById("good-things").childNodes;
	if (goodthings.length == 0) {
		// Enable the exit
		crystal_sound.play();
		var faces = document.getElementById("crystal").childNodes;
		for (var i = 0; i < faces.length; i++) {
			var face = faces[i];
			if (face.nodeName == "path")
				// Fill color
				face.setAttribute("fill", face.getAttribute("tofill"));
			else if (face.nodeName == "animateTransform") {
				// Enable the floating effect
				face.setAttribute("attributeName", "transform");
			}
		}
		var exit = document.getElementById("exit-crystal");		
		exit.setAttribute("filter", "url(#crystal-light)");
		return true;
	}
	return false;
}

//
// This function updates the position and motion of the player in the system
//
function gamePlay() {
    // Check collisions
    collisionDetection();
	
	// Platform should be moved/checked before the detection of player
	movePlatform();
	
	// Monster-king shoot bullet in certain condition
	monsterKingShoot();
	
    // Check whether the player is on a platform
    var isOnPlatform = player.isOnPlatform();
    
    // Update player position
    var displacement = new Point();

    // Move left or right
    if (player.motion == motionType.LEFT)
        displacement.x = -MOVE_DISPLACEMENT;
    if (player.motion == motionType.RIGHT)
        displacement.x = MOVE_DISPLACEMENT;

    // Fall
    if (!isOnPlatform && player.verticalSpeed <= 0) {
        displacement.y = -player.verticalSpeed;
        player.verticalSpeed -= VERTICAL_DISPLACEMENT;
    }
	// FIX: To reset the vertical speed after landing
	if (isOnPlatform && player.verticalSpeed < 0) {
		player.verticalSpeed = 0;
	}

    // Jump
    if (player.verticalSpeed > 0) {
        displacement.y = -player.verticalSpeed;
        player.verticalSpeed -= VERTICAL_DISPLACEMENT;
        if (player.verticalSpeed <= 0)
            player.verticalSpeed = 0;
    }

    // Get the new position of the player
    var position = new Point();
    position.x = player.position.x + displacement.x;
    position.y = player.position.y + displacement.y;

    // Check collision with platforms and screen
    player.collidePlatform(position);
    player.collideScreen(position);

    // Set the location back to the player object (before update the screen)
    player.position = position;

	// This can only be invoked after player's location is well set
	checkDisappearPlatform();
	
	// Check if the exit can be opened
	canExit = checkExit();
	
    // Move the bullets
    moveBullets();
	moveMonster();
    updateScreen();
}


//
// This function updates the position of the player's SVG object and
// set the appropriate translation of the game screen relative to the
// the position of the player
//
function updateScreen() {
    // Transform the player
    player.node.setAttribute("transform", "translate(" + player.position.x + "," + player.position.y + ")");	
	
	// Flip the player appropriately
	if (playerFlip)
		document.getElementById("player_animate").setAttribute("transform", "translate(25,0) scale(-1,1)");
	else document.getElementById("player_animate").setAttribute("transform", "");
}

function muteBGM() {
	if (game_over) return;
	if (bgm.muted) {
		bgm.muted = false;
		document.getElementById("mute-crossline").setAttribute("display", "none");
		bgm.play();
		// And unmute the sound effects
		player_dead_sound.muted = false;
		enemy_dead_sound.muted = false;
		player_shoot_sound.muted = false;
		enemy_shoot_sound.muted = false;
		eat_sound.muted = false;
		crystal_sound.muted = false;
		victory_sound.muted = false;
	} else {
		bgm.muted = true;
		// Mute Sound Effects as well
		player_dead_sound.muted = true;
		enemy_dead_sound.muted = true;
		player_shoot_sound.muted = true;
		enemy_shoot_sound.muted = true;
		eat_sound.muted = true;
		crystal_sound.muted = true;
		victory_sound.muted = true;
		document.getElementById("mute-crossline").setAttribute("display", "true");
	}
}
