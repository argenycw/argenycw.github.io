
<?php
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$ip = $_SERVER['HTTP_CLIENT_IP']?$_SERVER['HTTP_CLIENT_IP']:($_SERVER['HTTP_X_FORWARDE‌​D_FOR']?$_SERVER['HTTP_X_FORWARDED_FOR']:$_SERVER['REMOTE_ADDR']);
		$choice = $_POST["choice"];
		$advice = $_POST["advice"];
		$connected = mysqli_connect("localhost", "user1192", "vovy4kepax", "1192_db");
		$connected->set_charset("utf8");
		if (!$connected) {
			die("Error: Connection Failed. Please try again later.");
		}
		$sql = "INSERT INTO Choices (ip_address, choice, advice, input_date)
				VALUES ('$ip', $choice, '$advice', CURDATE());";
		$result = $connected->query($sql);
		if ($result == true) {
			setcookie("voted", "$choice");
			header("Refresh: 0");
		} else {
			echo "<script>alert('Error: Submission Failed. Please try again later.');</script>";
		}
		$connected->close();
	}
?>

<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1" charset="UTF-8">
<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<!-- Responsive row col-md-12 -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="css/headfoot.css">
<title>Argen's Page</title>
<style>
/* Content */
body {
	background-color: rgb(210, 240, 255);
	min-width: 320px;
}
h3 {
	font-family: "Cambria";
	font-size: 26px;
	text-align: center;
}
textarea {
	width: 60%;
	min-width: 300px;
	max-width: 800px;
	min-height: 50px;
	max-height: 100px;
}
.poll {
	float: left;
	display: none;
}
.thankyou {
	display: none;
	padding-top: 100px;
	font-size: 20px;
}
.footer-holder {
	float: left;
	width: 100%;
}
.explanation {
	color: rgb(80, 80, 80);
	font-size: 16px;
	margin-top: 30px;
	margin-left: 20%;
	margin-right: 20%;
}

.row {
	float: left;
	width: 100%;
}
.col-5 {
	float: left;
	width: 45%;
}

.decision-boxes {
	float: left;
	margin-left: 15%;
	margin-right: 15%;
	width: auto;
}
.decision-box {
	border: 2px solid black;
	border-radius: 8px;
	padding: 20px 20px 20px 20px;
	margin: 2% 2% 2% 2%;
	font-family: Cambria;
}
.decision-box .title {
	font-size: 20px;
}
.decision-box hr {
	padding-bottom: 0; 
	margin-bottom: 0;
	border: 0;
    height: 1.5px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
}
.decision-box p {
	padding-top: 10px;
	font-size: 16px;
}
.decision-box li {
	list-style-type: none;
	text-align: left;
	padding-left: 20px;
}
#btn-1 {background-color: rgb(120, 170, 255);}
#btn-1:hover {background-color: rgb(150, 200, 255);}
#btn-2 {background-color: rgb(240, 200, 100);}
#btn-2:hover {background-color: rgb(255, 230, 130);}
#btn-3 {background-color: rgb(255, 110, 110);}
#btn-3:hover {background-color: rgb(255, 140, 140);}
#btn-4 {background-color: rgb(120, 240, 120);}
#btn-4:hover {background-color: rgb(150, 255, 150);}
.confirm {
	font-size: 18px;
	margin-bottom: 100px;
}
input[type=submit] {
	margin-top: 40px;
	background-color: rgb(210, 240, 255);
	border: 1px solid black;
	border-radius: 14px;
	font-size: 18px; 
	font-family: inherit;
	height: 30px; 
	width: 100px; 
	cursor: pointer;
}
input[type=submit]:hover {background-color: rgb(180, 220, 230);}
*:focus {outline: none;}

@media screen and (max-width: 768px) {
.explanation {
	font-size: 18px;
	margin-top: 30px;
	margin-left: 5%;
	margin-right: 5%;
}
.col-5 {
	width: 100%;
}
.decision-boxes {
	margin-left: 5%;
	margin-right: 5%;
}
}
@media screen and (max-width: 425px) {
.decision-box {
	border: 2px solid black;
	border-radius: 8px;
	padding: 10px 5px 10px 5px;
	margin: 5px 5px 5px 5px;
	font-family: Cambria;
}
.decision-box hr {
	margin-top: 10px;
}
</style>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
var choice = ["Little Boring HTML Game", "Savable Javascript Game", "Horror RPG Game", "Blog"];
$(document).ready(function(){
	$(function(){
		$(".nav-bar-holder").load("nav-bar.html");
		$(".footer-holder").load("footer.html");
	});

	var toggle = 0;
	$(".nav-bar-holder").on("click", ".dropdown-btn", function() {
		if (toggle == 0) {
			$(".dropdown-content").css("top", "10vh");
			$(".dropdown-btn").html('<i class="fa fa-times"></i>');
			toggle = 1;
		} else {
			$(".dropdown-content").css("top", "-40vh");
			$(".dropdown-btn").html('<i class="fa fa-bars"></i>');
			toggle = 0;
		}
	});
	
	<?php if ($voted = $_COOKIE['voted']): ?>
		$("#toMake").html(choice[<?php echo "$voted";?> - 1]);
		$(".poll").css("display", "none");
		$(".thankyou").css("display", "block");
	<?php else:?>
		$(".poll").css("display", "block");
		$(".thankyou").css("display", "none");	
	<?php endif;?>
});

function selectBox(id) {
	$("input[name='choice']").val(id); // 1,2,3,4
	for (var i = 1; i <= 4; i++) $("#btn-"+i).css("box-shadow", "none");
	$("#btn-"+id).css("box-shadow", "0 0 4pt 4pt yellow");
	$(".selected").html(choice[id-1] + '<br><div align="center"><input type="submit" value="confirm"></div>');
}

</script>

</head>
<body>
<div class="nav-bar-holder"></div>
<div class="nav-bar-pusher">
	<br>
	<h3>Time to plan for my next project...</h3>
</div>
<div class="poll">
	<div class="explanation">
	<p>
	You know... It's almost summer. I will be free <i>sometimes</i>.
	I have been deciding what to make in the next step recently. 
	Therefore I would like to host a poll for my next <b>"boring"</b> project 🤤. 
	And I will try my best to finish that project before the end of the summer semester (vacation?).
	</p>
	<p>
	Press "confirm" to submit your choice after selecting one.<br>
	Here comes the choices:
	</p>
	</div>
	<div class="decision-boxes">
		<div class="row">
		<button class="decision-box col-5 unselectable" id="btn-1" onclick="selectBox(1)">
			<span class="title">
			Little Boring HTML Game<hr>
			</span>
			<p>A small boring game for extreme nonsense, can be viewed as programming practice.
			Will be published at <b>Interesting Work</b>. A similar game is
			<a href="http://cwyan.student.ust.hk/Interesting%20Work" target="_blank">CatchUs</a>.</p>			
			<li>Fun: ★☆☆☆☆</li>
			<li>Time to finish: ★☆☆☆☆&emsp;(About 30 hours)</li>
			<li>Help needed: ☆☆☆☆☆&emsp;(No need)</li>
		</button>

		<button class="decision-box col-5 unselectable" id="btn-2" onclick="selectBox(2)">
			<span class="title">
			Savable Javascript Game<hr>
			</span>
			<p>A larger game that can save. At the moment should be an adventure game
			equipped with growth and maze system. Attempt to be like IO game.
			</p>
			<li>Fun: ★★★★☆</li>
			<li>Time to finish: ★★★★☆&emsp;(About 3 weeks)</li>
			<li>Help needed: ★★☆☆☆&emsp;(Graphics/audio resources)</li>
		</button>
		</div>
		
		<div class="row">
		<button class="decision-box col-5 unselectable" id="btn-3" onclick="selectBox(3)">
			<span class="title">
			Horror RPG Game<hr>
			</span>
			<p>A story focused horror RPG game created using RPG maker VA. Can be treated as
			a continuation of previous abandoned projects.
			</p>
			<li>Fun: ★★★★★</li>
			<li>Time to finish: ★★★★★&emsp;(Unknown)</li>
			<li>Help needed: ★★★★☆&emsp;(Graphics/audio/scripting resource)</li>
		</button>
		
		<button class="decision-box col-5 unselectable" id="btn-4" onclick="selectBox(4)">
			<span class="title">
			<i>Blog</i><hr>
			</span>
			<p>The "blog" in this website. It will be somehow like a progress report of my current works.
			Polling like this will be conducted there. Visitors can also leave a note.
			</p>
			<li>Fun: ★★☆☆☆</li>
			<li>Time to finish: ★★★★☆&emsp;(About 3 weeks)</li>
			<li>Help needed: ★★★☆☆&emsp;(A little co-op)</li>
		</button>	
		</div>		
		<div class="confirm">
		<form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
		You may also want to type some additional advice for me.<br>
		<textarea name="advice" maxlength="50" placeholder="內容請不多於50字，多謝合作。"></textarea><br>
		You have selected: <span class="selected"></span>
		<input name="choice" type="hidden" value="0" />
		</form>

		</div>
	</div>
</div>
<div class="thankyou">
	<p align="center">
		Thank you for your vote.<br>
		I will consider making 
		<b><span id="toMake"></span></b>
		🤤.
	</p>
	<p align="center" style="font-size: 16px; padding-bottom:5%;">
		<img src="/image/pineapple-100.png"><br>
		[Here should be a diagram showing the ratio of votes between 4 choices.]<br>
		[but still in progess 🤤]
	</p>
</div>
<div class="footer-holder"></div>
</body>
</html>
