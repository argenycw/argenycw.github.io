<?php
session_start();
$_SESSION["PM"] = md5(time());

//require_once "./classes/ExplorSQL.php";
/*
if(!$GLOBALS ['ExplorSQL']->get_validation()){
  
  $msg =  $GLOBALS ['ExplorSQL']->get_msg();
  
  echo nl2br("<font size='20px'>".$msg."</font>");
  exit;
}*/
?>

<!DOCTYPE HTML>

<html>
<head>

  <title>HKUST Engineering Exploration Day Reply Form</title>
  <meta http-equiv="Content-type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width" />
  <link rel="stylesheet" href="css/reply_form.css"/>
  <script src="jquery/jquery-2.1.0.min.js"></script>
  <script src="js/reply_form.js"></script>
</head>
<body>

<form method="post" action="thankyou.php" id="reply_form">
	<div class="form-content">
		<div class="header_info">
			<p align="center" class="small" style="color:gray">SCHOOL OF ENGINEERING, HKUST   Tel: 2358 6960   Fax: 2358 1458  Email: enggexplore@ust.hk</p>
			<p align="center" class="small" style="color:gray">http://www.seng.ust.hk/nov17_reply</p>
			<p align="center">Reply Form</p>
			<p align="center">(to be returned on or before 5 November, 2017)</p>
		<div class="missing_prompt" style="padding-left: 10%;">
			At least one of the information is missing or incorrect. <br>
			<div class="server_bounceback">
				Please resubmit the form after checking: <br>
				1. All entries are filled with correct and valid information. <br>
				2. Your network works properly. <br>
			</div>
		</div>
		</div>
		<div class="box_info">
			<p align="center" class="blue"><b>Engineering Exploration Day</b></p>
			<p align="center" class="small blue">HKUST School of Engineering, JUPAS code: JS5200</p>
			<p>
			<table>
				<tr>
				<td valign="top" width="15%">Date:</td>
				<td>25 November, 2017 (Saturday)</td>
				</tr>
				<tr>
				<td valign="top" width="15%">Venue:</td>
				<td>HKUST campus, Clearwater Bay <a href="http://www.ust.hk/about-hkust/about-the-campus/map-directions-2015/" target="_blank">[Map]</a></td>
				</tr>
				<tr>
				<td  valign="top" width="15%">Duration:</td>
				<td>There will be various interesting activities going on at the Engineering Exploration Day.  For easy time management, visitors may spare around 3 hours to attend the talks, visit the display counters and mingle with our student ambassadors in the exploration journey. The latest information about the schedule and venue of the talks can be found on web page (http://www.seng.ust.hk/explor_day/).</td>
				</tr>
				<tr>
				<td valign="top" width="15%"><font color="red"><u>IMPORTANT</u></font></td>
				<td><font color="red"><u>To secure the interview opportunity, students must fill in the below reply form by 5 Nov to confirm. Email reply will not be accepted</u></font> Without receiving the reply via this online form, the School of Engineering will allocate the interview opportunity to other students. The interview notice will be emailed to interviewees around 1 week before the interview.</td>
				</tr>
			</table>
			</p>
		</div>
	   
		<br>
		<br>

		<div class="addressee">
		<table>
			<tr>
			  <td width="50">To:</td><td>School of Engineering</td>
			</tr>
			<tr>
			  <td width="50"></td><td>The Hong Kong University of Science and Technology</td>
			</tr>
		</table>
		</div>

		<div class="student_input">
			<h3><u>I. Personal information</u></h3>

			<div class="row">
			<p>
			<div class="col-3 fix">
			<p style="color:red;display:inline">*</p>Registration number:
			</div>
			<div class="col-9">
				EEDN17 / <input type="text" name="reg_num_first" size="10"> / <input type="text" name="reg_num_last" size="8">
			</div>
			<div class="flwithoutml"><span class="blue">[Please input the Ref. number under the name of recipient in the email invitation.]</span></div>
			</p>
			</div>

			<div class="row">
			<p>
			<div class="col-3">Name of applicant (in English):</div>
			<div class="col-9">
				<input type="text" name="surname" placeholder="Surname" size="14">&nbsp;&nbsp;
				<input type="text" name="first_name" placeholder="Other Name" size="14">
			</div>
			<div class="flwithoutml"><span class="blue">[should be the same as the one appeared in your JUPAS application]</span></div>
			</p>
			</div>
	<!--
			<div class="fl">
			  <div class="fll">HKID No. / Passport no.</div>
				<div class="flr">
				  <input type="text" size="45" maxlength="5" name="id_no" placeholder="First 5 alpha-numeric digits, e.g. K1234"></textarea>
				</div>
				 <div class="flwithoutml"> <p style="color:Brown">[Please make sure the numbers are correctly entered.The number will be used to match with your JUPAS application.]</p></div>
			</div>
	-->
			<div class="row">
			<p>
				<div class="col-3 fix">
				  Contact phone number:
				</div>
				<div class="col-9">
				  <input type="text" name="mobile" placeholder="Mobile" size="14">&nbsp;&nbsp;
				  <input type="text" name="home" placeholder="Home" size="14">
				</div>
			</p>
			</div>

			<div class="row">
				<div class="col-box">
					<label class="switch">
						<input type="checkbox" name="sms" checked><span class="slider round"></span>
					</label>
				</div>
				<div class="col-remain">
					I wish to receive SMS message for any update on my application status.
				</div>
			</div>

			<div class="row" id="jupas">
				<p>
				<div class="col-3">Are you joining JUPAS 2018?</div>
				<div class="col-9">
					<li><input type="radio" name="admission_scheme" value="JUPAS 2016">&emsp;Yes</li>
					<li>
						<input type="radio" name="admission_scheme" value="not_jupas_2016">&emsp;No. I shall apply through:
						<input type="text" size="30px" name="nonjupas_scheme" placeholder="Admission scheme (e.g. non-JUPAS) " disabled>
					</li>
				</div>
				</p>
			</div>

			<div class="row">
			<p>
				<div class="col-3">Elective subjects taken at HKDSE:</div>
				<div class="col-9 li-fix">
					<li>1. <select name="sub1">
					<option value="none">Select Science Subjects</option>
					<option value="Biology">Biology</option>
					<option value="Physics">Physics</option>
					<option value="Chemistry">Chemistry</option>
					<option value="Combined Sci(Bio & Chem)">Combined Sci(Bio & Chem)</option>
					<option value="Combined Sci(Bio & Phys)">Combined Sci(Bio & Phys)</option>
					<option value="Combined Sci(Chem & Phys)">Combined Sci(Chem & Phys)</option>
					<option value="ict">ICT</option>
					</select><font style="color:red;margin-left:0.5%"><b>^</b></font>
					</li>
					<li>2. <input type="text" name="sub2" placeholder="Any other subjects (incl M1/M2)" size="25"></li>
					<li>3. <input type="text" name="sub3" placeholder="Any other subjects" size="25"></li>
					<li>4. <input type="text" name="sub4" placeholder="Any other subjects" size="25"></li>
				</div>
			<font color="red"><b>^</b></font>Admission to School of Engineering will require at least one Science subject which could be Physics, Biology, Chemistry, Combined Science or ICT. Students who have not taken any Science subjects will not be invited to the interview.
			</p>
			</div>
			
			<div class="row" id="join_explor">
			<h3><u>II. Reply for participation in the Engineering Exploration Day</u></h3>
			<div class="row">
				<p>
				<div class="col-box"><input type="radio" name="participation" value="Yes"></div>
				<!-- <div class="flr_big">I WISH to participate in the Engineering Exploration Day on 23 Nov. My preference on the schedule is as follows. Please let me know if my registration is successful.</div> -->
				<div class="col-remain">
					I wish to participate in the Engineering Exploration Day on 25 Nov and indicate my preferred interview time below.  I understand that there is no guarantee my preference will be accommodated.
					<div class="row">&quot;1&quot;= the most preferred&emsp;&quot;2&quot;= preferred</div>	
					<div class="row fix">					
					<div class="col-m-3 fix">10:00am - 11:30am</div>
					<div class="col-m-9">
						<select name="timeslot1" type="schedule">
							<option value="1" selected="selected">1</option>
							<option value="2">2</option>
						</select>
					</div>
					</div>
					<div class="row fix">	
					<div class="col-m-3 fix">11:30am - 1:30pm</div>
					<div class="col-m-9">
						<select name="timeslot2" type="schedule">
						  <option value="1">1</option>
						  <option value="2" selected="selected">2</option>
						</select>
					</div>
					</div>
				</div>
				</p>
			</div>
			<div class="row">
				<p>
				<div class="col-box"><input type="radio" name="participation" value="No"></div>
				<div class="col-remain">
					Sorry, I am NOT available to attend Engineering Exploration Day, because <br>
					<textarea name="not_explor_reason" placeholder="Please specify reasons" maxlength="200" disabled></textarea><br>
					Please keep me informed if there are other activities in your school.
				</div>
				</p>
			</div>	
			</div>   
			<!--end participation-->

			<!--<h3><u>III. Interest in Dual Degree Program in Technology and Management</u></h3>

			<div class="fl">
			  <div class="dual_degree">Students in the School of Engineering may apply for enrollment in the elite and highly selective Dual Degree Program in Technology and Management after admission. For JUPAS applicants who have already decided to pursue the Dual Degree Program, they could be considered for guaranteed major in the Dual Degree Program before admission.
			  Please check the box below if you are interested in the Dual Degree Program. The Dual Degree Program Office will contact shortlisted applicants for interview. Selected applicants who demonstrate academic excellence, outstanding communication skills and good leadership potential, and receive a HKUST offer through the JUPAS Scheme will be guaranteed enrollment in the Dual Degree Program in the second year of study.
			  <br><br>

				<div class="fll_small"><input type="checkbox" name="interested_in_dual"></div>
				<div class="flr_big">I am interested to be considered by the Dual Degree Program in Technology and Management. I agree to release my application information to the Dual Degree Program Office for consideration of guaranteed enrollment in the Dual Degree Program in the second year of study.</div>

			  </div>

			</div> -->	
			<div class="missing_prompt">
				At least one of the information is missing or incorrect. <br>
				<div class="server_bounceback">
					Please resubmit the form after checking: <br>
					1. All entries are filled with correct and valid information. <br>
					2. Your network works properly. <br>
				</div>
			</div>	
			<div class="row final" align="center">
			<input type="submit" value="Submit"></input>
			</div>
		</div>  <!--end student_input-->
		<input id = "timestamp" name ="timestamp" type="hidden" value="">
		<!-- <input id = "ref_no" name ="ref_no" type="hidden" value=""> -->
		<input id = "email" name="email" type="hidden" value="">
		<input id = "email" name="PM" type="hidden" value="<?php echo $_SESSION['PM']; ?>"> 
	</div>
</form>

</body>
</html>

