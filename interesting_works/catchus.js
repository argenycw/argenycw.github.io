
/* This function is called only when exit of the game page */
function catchUsInit() {
	win = false;
	score = 0;
	num_us = 0;
	x = []; y = []; direction = [];	
	$(".game-border").css("display", "none");
	$(".game-unplayable").css("display", "none");
	$(".game-input").css("display", "block");
	$(".game-border").html('<div id="cast-area"></div>');
	$(".game-score").css("display", "none");
	$(".game-score").html('Current Score:&nbsp;<span id="us-score"></span>');
	$(".game-score").css("position", "static");
	$(".game-score").css("top", "");
	$(".game-score").css("left", "");
	$(".game-score").css("text-align", "right");
	$(".game-score").css("color", "#222");
	$(".game-score").css("font-size", "14px");
	$(".game-score").removeClass("unselectable");
	$("#us-score").css("font-size", "");
}

// Check whether the screen is smaller than the minimum requirement of the game
function validScreen() {
	if ($(window).width() < 1200) return false;
	return true;
}

function startCatchUs() {
	num_us = document.getElementById("num_us").value;
	if (num_us > max_us) {alert("ERROR: The input number is too large. (Max: 10)"); return;}
	else if (num_us < 1) {alert("ERROR: Invalid input."); return;}
	us_x = [];
	us_y = [];
	direction = [];
	$(".game-border").css("display", "block");
	$(".game-input").css("display", "none");
	for (var i = 0; i < num_us; i++) {
		us_x.push($(".game-border").position().left + 30 + Math.random() * ($(".game-border").width()*0.8));
		us_y.push($(".game-border").position().top + 30 + Math.random() * ($(".game-border").height()*0.8));
		document.getElementById("cast-area").innerHTML += 
		'<div class="escape unselectable" id="esc-'+i+'" style="font-size: '+(10+Math.random()*20)+'px;">'+
		us_type[(i<=1)?i:(i==2)?i:Math.floor(Math.random()*5)]+'</div>';
		direction.push(Math.floor(Math.random()*360)); // 0 - 359, true bearing	
	}
	randomMove();
	initDraw(document.getElementById('cast-area'));
	$("#us-score").text(score);
	$(".game-score").show();
	function randomMove() {
		if (currentPage != 4 || win) return;
		if (!validScreen()) {
			catchUsInit();
			return;
		}
		for (var i = 0; i < num_us; i++) {
			var usid = "#esc-" + i;
			var dx, dy;
			direction[i] += Math.random()*40 - Math.random()*40;
			
			if ($(window).height() - us_y[i] < offset && (direction[i] > 110 && direction[i] < 250)) direction[i] += Math.random()*80 - Math.random()*80; // push it upward
			if (us_y[i] < offset && (direction[i] > 290 || direction[i] < 70)) direction[i] -= Math.random()*80 - Math.random()*80; // push it downward
			if ($(window).width() - us_x[i] < offset && (direction[i] < 160 && direction[i] > 20)) direction[i] += Math.random()*80 - Math.random()*80; // push it to left	
			if (us_x[i] < 120 + offset && (direction[i] < 340 && direction[i] > 200)) direction[i] -= Math.random()*80 - Math.random()*80; // push it to right
			if (direction[i] >= 360) direction[i] = direction[i]%360;
			else if (direction[i] < 0) direction[i] += 360;
			
			if (direction[i] < 45 || direction[i] > 315 || (direction[i] > 145 && direction[i] < 225)) { // 315-45, 145-225
				if (direction[i] > 90 && direction[i] < 270) dy = 2 + Math.random() * 5;
				else dy = -2 - Math.random() * 5;
				if (direction[i] > 0 && direction[i] < 180) dx = Math.abs(dy * Math.tan((direction[i]) * Math.PI/180));
				else dx = (-1) *  Math.abs(dy * Math.tan((direction[i]) * Math.PI/180));
			} else { // 45-145, 225-315
				if (direction[i] <= 145) dx = 2 + Math.random() * 5;
				else dx = -2 - Math.random() * 5;
				if (direction[i] > 90 && direction[i] < 270) dy = Math.abs(dx * Math.tan((90-direction[i]) * Math.PI/180));
				else dy = (-1) * Math.abs(dx * Math.tan((90-direction[i]) * Math.PI/180));
			}

			var finx = us_x[i] + dx;
			var finy = us_y[i] + dy;
			if (finx < $(".game-border").position().left + $(".game-border").width()- 25 && finx > $(".game-border").position().left + 25) us_x[i] = finx;
			if (finy < $(".game-border").position().top + $(".game-border").height()- 25 && finy > $(".game-border").position().top + 25) us_y[i] = finy;
			$(usid).animate({left: us_x[i], top: us_y[i]}, 30, function() { // speed 30 = ~33fps
				randomMove();
			});
		}
	}
}

/* Credit to Spencer Lockhart and sergeykish @stackoverflow */
function initDraw(canvas) {
    function setMousePosition(e) {
        var ev = e || window.event; // Moz || IE
        if (ev.pageX) { // Moz/chrome
			console.log();
            mouse.x = ev.pageX - $(".game-border").offset().left + $(".game-border").position().left;
            mouse.y = ev.pageY - $(".game-border").offset().top + $(".game-border").position().top;
        } else if (ev.clientX) { //IE
            mouse.x = ev.clientX + document.body.scrollLeft - $(".game-border").offset().left + $(".game-border").position().left;
            mouse.y = ev.clientY + document.body.scrollTop - $(".game-border").offset().top + $(".game-border").position().top;
        }
    };

    var mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
    };
    var element = null;

    canvas.onmousemove = function (e) {
        setMousePosition(e);
        if (element !== null) {
            element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
            element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
			element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
            element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
        }
    }
	    
	canvas.onmouseup = function (e) {
		if (element !== null && !win) {
			var found_us = false;
			var temp_score = 0;
			for (var i = 0; i < num_us; i++) {	
				var tag_id = "#esc-"+i;
				if ($(tag_id).css("display") == "none") continue;	 				
				var usx = $(tag_id).position().left;
				var usy = $(tag_id).position().top;
				// if enclosed by the box
				if (usx > $(".rectangle").position().left && usx < $(".rectangle").position().left + $(".rectangle").width() &&
					usy > $(".rectangle").position().top && usy < $(".rectangle").position().top + $(".rectangle").height()) {
					if ($(tag_id).text() == 'u' || $(tag_id).text() == 's') temp_score += 10;
					else {element = null; $(".rectangle").remove(); gameEnd(false); return 0;}
					$(tag_id).hide();
				} else {
					if (($(tag_id).text() == "u" || $(tag_id).text() == "s")) found_us = true;
				}
			}
			element = null;
			$(".rectangle").remove();
			if (!found_us) gameEnd(true);
			score += temp_score;
			$("#us-score").text(score);
			function gameEnd(isWin) {
				win = true;
				for (var i = 0; i < num_us; i++) {
					var tag_id = "#esc-"+i;
					$(tag_id).remove();
				}
				num_us = 0;
				if (isWin) {
					$(".game-score").css("color", "#FF0");
					$(".game-score").html('You Win !<br>'+$(".game-score").html());
				} else {
					$(".game-score").css("color", "#F00");
					$(".game-score").html('Game Over<br>'+$(".game-score").html());
				}
				$(".game-score").css("position","absolute");
				$(".game-score").css("font-size", "50px");
				$("#us-score").css("font-size", "50px");
				$(".game-score").addClass("unselectable");
				var win_x = $(".game-border").position().left + $(".game-border").width()/2 - $(".game-score").width()/2;
				var win_y = $(".game-border").position().top + $(".game-border").height()/2 - $(".game-score").height()/2;
				$(".game-score").css("left", win_x);
				$(".game-score").css("top", win_y);
				$(".game-score").css("text-align", "center");
			}
		}
    }
	
    canvas.onmousedown = function (e) {
		if (!win) {
        mouse.startX = mouse.x;
        mouse.startY = mouse.y;
        element = document.createElement('div');
        element.className = 'rectangle';
        element.style.left = mouse.x + 'px';
        element.style.top = mouse.y + 'px';
        canvas.appendChild(element);
		}
    }
}
