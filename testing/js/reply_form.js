$(document).ready(function(){

    $('input[name=admission_scheme]').bind('change', function() {
        if(this.value==='not_jupas_2016') {
            $('input[name=nonjupas_scheme]').removeAttr('disabled');
        }
        else {
            var tmp=$('input[name=nonjupas_scheme]');
            tmp.attr("disabled", "disabled");
            tmp.val("");
        }
    });

    $('input[name=participation]').bind('change', function() {
        if(this.value==='No') {
           $('textarea[name=not_explor_reason]').removeAttr('disabled');
        }
        else {
            var tmp=$('textarea[name=not_explor_reason]');
            tmp.attr("disabled", "disabled");
            tmp.val("");
        }
    });

    $('select[type=schedule]').bind('change',function(){
        if(this.value=='1') {
            $('select[type=schedule]').not(this).val(2);
        }
        else {
            $('select[type=schedule]').not(this).val(1);
        }
    });

    $('input[type=submit]').bind('click',function(){
        $( "*" ).removeClass("required_input");
		$(".missing_prompt").css("display", "none");
		$(".server_bounceback").css("display", "none");
        var reg_num_first=$('input[name=reg_num_first]').val();
        var reg_num_last=$('input[name=reg_num_last]').val();
        var surname=$('input[name=surname]').val();
        var first_name=$('input[name=first_name]').val();
        var id_no=$('input[name=id_no]').val();
        var mobile=$('input[name=mobile]').val();
        var home=$('input[name=home]').val();
        var sms=$('input[name=sms]').is(':checked');
        sms = sms ? "Yes" : "No";
        var admission_scheme=$('input[name=admission_scheme]:checked').val();
        if(typeof admission_scheme!="undefined" && admission_scheme==="not_jupas_2016") {
            admission_scheme=$.trim($('input[name=nonjupas_scheme]').val());
        }

        var sub1=$('select[name=sub1]').val();
        var sub2=$('input[name=sub2]').val();
        var sub3=$('input[name=sub3]').val();
        var sub4=$('input[name=sub4]').val();
        var participation=$('input[name=participation]:checked').val();
        var timeslot1=$('select[name=timeslot1]').val();
        var timeslot2=$('select[name=timeslot2]').val();

        if(participation==="No") {
            // morning="";
            // aftermoon="";
            participation="No.\n"+$.trim($('textarea[name=not_explor_reason]').val());

        }
        // var interested_in_dual=$('input[name=interested_in_dual]').is(':checked');
        // interested_in_dual = interested_in_dual ? "Yes" : "No";


    if(isEmpty(reg_num_first)) {
        $('input[name=reg_num_first]').addClass("required_input");
    }

    if(isEmpty(reg_num_last)) {
        $('input[name=reg_num_last]').addClass("required_input");
    }

     if(isEmpty(surname)) {
        $('input[name=surname]').addClass("required_input");
    }

    if(isEmpty(first_name)) {
        $('input[name=first_name]').addClass("required_input");
    }

    var regex = new RegExp("[A-Z][0-9][0-9][0-9][0-9]");
    if(isEmpty(id_no) || !regex.test(id_no)) {
        $('input[name=id_no]').addClass("required_input");
    }

    if(isEmpty(mobile)) {
        $('input[name=mobile]').addClass("required_input");
    }
    if(isEmpty(home)) {
        $('input[name=home]').addClass("required_input");
    }

    if(isEmpty(admission_scheme)) {
        $('#jupas').addClass("required_input");
    }
    // else {
    //     if(admission_scheme==="No" && isEmpty(nonjupas_scheme)) {
    //         $('#jupas').addClass("required_input");
    //     }
    // }


    if(isEmpty(sub1)) {
        $('select[name=sub1]').addClass("required_input");
    }
    if(isEmpty(sub2)) {
        $('input[name=sub2]').addClass("required_input");
    }
    if(isEmpty(sub3)) {
        sub3="none";
    }
    if(isEmpty(sub4)) {
        sub4="none";
    }
    if(isEmpty(participation)) {
        $('#join_explor').addClass("required_input");
    }
    // else {
    //     if(participation==="No" && isEmpty(not_explor_reason)){
    //         $('#join_explor').addClass("required_input");
    //     }
    // }

    if(timeslot1 === timeslot2){
        $('select[name=timeslot1]').addClass("required_input");
        $('select[name=timeslot2]').addClass("required_input");
    }


    if ($(".required_input").length > 0){
		$(".form-content").addClass("required_input");
		$(".missing_prompt").css("display", "inline-block");
        alert("Please input all the information correctly");
        return false;
    }


    else {
        //	var name=first_name+", "+surname;
        var name=surname+", "+first_name;
        var done=false;
        // var inputArray = new Array(
        //                            "EEDN13/"+reg_num_first+"/"+reg_num_last,
        //                            name,
        //                            id_no,
        //                            mobile,
        //                            home,
        //                            sms,
        //                            admission_scheme,
        //                            sub1,
        //                            sub2,
        //                            sub3,
        //                            sub4,
        //                            participation,
        //                            morning,
        //                            aftermoon,
        //                            interested_in_dual
        //                     );
        var inputArray = new Array(
                                   "EEDN17/"+reg_num_first+"/"+reg_num_last,
                                   name,
                                   id_no,
                                   mobile,
                                   home,
                                   sms,
                                   admission_scheme,
                                   sub1,
                                   sub2,
                                   sub3,
                                   sub4,
                                   participation,
                                   timeslot1,
                                   timeslot2,
                                   first_name,
                                   surname
                            );
          $.ajax({
            type: 'POST',
            url: 'classes/ExplorPOST.php',
            data: {
                toDo: 'insert_students',
                inputArray:inputArray
            },
            dataType: 'json',
            success: function(response) {
                if(response==="nonexistent")
                {
                    alert("Error: Nonexistent Registration Number or name not match.");
					$(".form-content").addClass("required_input");
					$(".missing_prompt").css("display", "inline-block");
					$(".server_bounceback").css("display", "inline-block");
                }
                else{
                    // $('#ref_no').val(toRefNo(response[0]));
                    $('#timestamp').val(response[0]);
                    $('#email').val(response[1]);
                    done=true;
                }


            },
            error: function() {
                alert("Error");
				$(".form-content").addClass("required_input");
				$(".missing_prompt").css("display", "inline-block");
				$(".server_bounceback").css("display", "inline-block");				
            },
            async: false
        });

          if(!done){
            return false;
          }

    }
    });  //end input[type=submit]
});

function isEmpty(test) {
    test=$.trim(test);
    if(test===null || test==="" || typeof test==="undefined" || test==="none" || test==="No.") {
        return true;
    }
    else {
        return false;
    }
}

function toRefNo(rec_no) {
    if(rec_no.length===6) {
        return "SENG-"+rec_no;
    }
    else {
        return toRefNo("0"+rec_no);
    }
}
