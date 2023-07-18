$(document).ready(function() {

   
	$.validator.addMethod("noSpace", function (value, element) {
	  	  return value.indexOf(" ") < 0 && value != ""; 
	}, "no space please ");
	
	 $.validator.addMethod("noUppercaseUserName", function (value, element) {
	  	 return (/^[^A-Z]*$/).test(value);
	 }, "Invalid Username, uppercase not allowed. ");
	  
	 $.validator.addMethod("noSpecialChar", function (value, element) {
	 	 return (/^[A-Za-z0-9- ]*$/).test(value);
	 },"Character Not Allowed ");
	 
	  $.validator.addMethod("noSpecialCharUsername", function (value, element) {
	 	 return (/^[A-Za-z0-9- ]*$/).test(value);
	 },"Invalid Username, Character Not Allowed.");
	 
	  $.validator.addMethod("noSpecialCharAddress", function (value, element) {
	 	 return (/^[.,A-Za-z0-9- ]*$/).test(value);
	  },"Character Not Allowed ");
	  
	   $.validator.addMethod("noSpecialCharSenderId", function (value, element) {
	 	 return (/^[!@A-Za-z0-9- ]*$/).test(value);
	  },"Character Not Allowed ");
	
	 $.validator.addMethod("pwcheckspechars", function (value, element) { // has a special characters
         return (/[!@#$%^&*()_=\[\]{};':"\\|,.<>\/?+-]/).test(value) 
     },"Password must contain at least one special character");

     $.validator.addMethod("pwchecklowercase", function (value, element) {
         return /[a-z]/.test(value) 
     },"Password must contain at least one lowercase letter");
     
     $.validator.addMethod("pwcheckuppercase", function (value, element) {
         return /[A-Z]/.test(value) 
     },"Password must contain at least one uppercase letter");
     
     $.validator.addMethod("pwchecknumber", function (value, element) {
         return /\d/.test(value) 
     },"The password must contain at least one numeric number ");
     
     $.validator.addMethod("emailCheck", function (value, element) { // has a special characters
         return (/[.]/).test(value) 
     },"The email should be in the format: abc@domain.tld");
     
     $.validator.addMethod("captchaCheck", function (value1, element) {
		 //alert(value1);
	 	 return (document.getElementById('txtCaptcha').value == value1);
	 },"invalid captcha "); 
	 
	  $.validator.addMethod("otpCheck", function (value1, element) {
		 //alert(value1);
	 	 return (document.getElementById('txtOtp').value == value1);
	 },"invalid otp "); 
	 
	 $.validator.addMethod("extension", function (value, element, param) {
                param = typeof param === "string" ? param.replace(/,/g, '|') : "jpg|jpeg|png|doc|docx|xls|xlsx|pdf";
                return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
            }, "Please enter a value with a valid extension.");
            
     $.validator.addMethod('filesize', function (value, element, param) {
        param = 2097152;
    	return this.optional(element) || (element.files[0].size <= param)
	 }, 'File size must be less than 2 MB');       
	 
     
  $("#register-form").validate({
	errorElement: "span",
    rules: {
      "name" : {
         noSpecialChar: true,
         required : true
      },
      "customer.country" : {
         required : true
      },
      "customer.crNo" : {
         noSpecialChar: true,
          minlength: 3,
          maxlength: 15,
         required : true
      },
      "customerContact.name" : {
         noSpecialChar: true
      },
      "customerContact.email" : {
          email: true,
          minlength: 8,
          maxlength: 50
      },
      "customerContact.mobileNo" : {
         minlength: 8,
    	maxlength: 11,
    	number : true
      },
      sector : {
         required : true
      },
      "customerSender.senderId" : {
          required : true,
          noSpecialCharSenderId: true,
          minlength: 3,
          maxlength: 11
      },
      "customer.crExpiryDateStr"  : {
         required : true
      },
      "systemUser.username" : {
    	  minlength: 6,
          maxlength: 35,
          required: true,
          noSpace: true,
          noUppercaseUserName: true,
          noSpecialCharUsername: true
      },
      "systemUser.email" : {
    	  required: true,
          email: true,
          emailCheck:true,
          minlength: 8,
          maxlength: 50
      },
      "systemUser.password" : {
    	  minlength: 8,
          maxlength: 35,
          required: true,pwchecklowercase: true,
          pwcheckuppercase: true,
          pwchecknumber: true,
          pwcheckspechars: true
      },
      confirmPassword: {
          required: true,
          minlength: 8,
          maxlength: 35,
          equalTo: "#password"
      }, 
      "customer.customerName" : {
      	minlength: 6,
      	noSpecialChar: true,
    	required: true
      },
      "systemUser.mobileNo" : {
    	minlength: 8,
    	maxlength: 11,
    	required: true,
    	number : true
    	
      },
      "customer.uploadCrFile": {
            required: true,
            extension:true,
            filesize:true
            
        },
        "customer.uploadSignatoryFile" : {
            required: true,
            extension:true,
            filesize:true
        },
       "customer.uploadAuthorizationFile" : {
            required: true,
            extension:true,
            filesize:true
        },
      captchaCode :{
    	  captchaCheck:true,
      	  required : true
      	},
      	"customer.address" : {
      	  noSpecialCharAddress: true
      },
      "customer.postalCode" : {
      	 number: true
      },
       "customer.telephone" : {
         minlength: 8,
    	 maxlength: 11,
      	 number: true
      },
      "customer.city" : {
      	noSpecialChar: true,
    	required: true
      },
       "customer.city" : {
      	noSpecialChar: true
      },
       otp :{
          otpCheck:true,
      	  required : true
      	}
       
      
    },
    messages : {
            email: {
        email: "The email should be in the format: abc@domain.tld"
      },
      "customer.uploadCrFile": {
                    required: "Please upload your Company Registration document for verification"
                    
                },
      captchaCode:
        {
  	  required:"Please enter the Captcha Code.<br/>",
  	  
        },
         confirmPassword:
        {
  	  equalTo:"Password and Confirm Password should be same.",
  	  
        }
    }
  });
  
  $("#register-form").on("submit", function(){
    if($("#register-form").valid()){
    //alert("hii")	
    $("#pageloader").show();
    
    }
   });
  
});

//verifying Existing Username
//var ctx='/imap';
$(function() {
	$('#username').change(function() {
		//alert(ctx)
		username = $("#username").val();
		//check user exists or not
			$.ajax({
				url : ctx+'/is-userid-exists/'+username,
				//url : 'http://82.178.28.185/is-userid-exists/'+username,
				//url : 'http://isms.om/is-userid-exists/'+username,
				dataType : 'text',
				type : 'GET',
				success : function(response) {
					//alert(response);
				if(response !=''){
					//alert(response)
					if(response =='YES'){
						  $("#usernameExist").html('Username already registered, try another username');
						  $('#username').removeClass('valid').addClass('error');
						  //$("#username").val("");	
						}else{
							$("#usernameExist").html('');
						}
				}else{
				    $("#username-error").html('');
					$("#usernameExist").html('Unkown Erorr,kindly contact to admin');
					  $('#username').removeClass('valid').addClass('error');
					  //$("#username").val("");	
				}	
				
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$("#usernameExist").html('');
				}
			});


		
	});
});


function getOtpEdit() {
	 
	var countryCode = document.getElementById("countryCode").value;
	var mobileNo = document.getElementById("mobileNo").value;
	var email = document.getElementById("email").value;
	var customerId = document.getElementById("customerId").value;
	
    
	var abc = "";
	$.ajax({
		url : ctx + '/generateOtpEdit/' + countryCode+mobileNo + '/' + email + '/' + customerId,
		contentType : "text/plain",
		dataType : "text",
		type : 'GET',
		success : function(data) {
			if(data!="limitexceeded"){
			 document.getElementById("txtOtp").value = data;
			}else{
			$('#hiddenDivlim').show();
			}
		},
	   async:false
	});
}


function myFunction(){
		$("#hiddenDivlim").hide();
		//return false;
	}