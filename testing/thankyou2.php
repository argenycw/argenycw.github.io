<?php
session_start();
?>
<!DOCTYPE HTML>
<html>
<head>
	<title>Response</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="css/reply_form.css"/>
</head>
<body>
	<div class="form-content">
		<div class="header_info">
			<p align="center" class="small" style="color:gray">SCHOOL OF ENGINEERING, HKUST   Tel: 2358 6960   Fax: 2358 1458  Email: enggexplore@ust.hk</p>
			<p align="center">Response</p>
		</div>
		<div style="margin: 30px 0 50px 0;">
		<div class="box_info" style="padding: 30px 30px 30px 30px">
		<?php
		if(!isset($_SESSION['PM']) || $_SESSION['PM'] !== $_POST['PM']){
			echo "Sorry! Your Enrolment is FAILED. Please make sure your information is correct and <font color='red'>RESUBMIT</font>.";
		} else {
			if($_POST['timestamp']!="" && $_POST['email']!="") {
				echo '<p align="center" style="padding:0; margin:0">Thank you!</p><br>'.
					"Your submission is received on " . htmlspecialchars($_POST['timestamp'], ENT_QUOTES) .
					"." . "<br><br>Thank you for your response. Good luck with your HKDSE examination! We look forward to seeing you at UST in future!";
				include('mail.php');
			}
			else {
				echo "Sorry! Your Enrolment is FAILED. Please make sure your information is correct and <font color='red'>RESUBMIT</font>.";
			}
		}
		?>
		</div>
		</div>
	</div>
</body>
</html>
