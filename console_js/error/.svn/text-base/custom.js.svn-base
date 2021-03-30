var main_color = "323a45";

var page_background_color = "dfe3e9"; 

var color2 = "f9fafc";

var color3 = "9ea7b3";

var Heading_Font = "Microsoft Yahei"; // thats your special Heading font

var Site_Font = "Microsoft Yahei"; // thats your special body content font


$(document).ready(function() {
	
	// Load Animation
	$('body').delay(500).animate({opacity:'1'}, 900);
	
	// Global Color
	$('head style').append('h1, h1a, h2, h2 a, h3, h3 a, h4, h4 a, h5, h5 a, h6, h6 a  {font-family:"'+Heading_Font+'"; } html, body, div, p, table, tr, td, th, tbody, tfoot, ul, li, ol, dl, dd, dt, fieldset, cite, input, select, textarea, button, a, section, article, aside, header, footer, nav {font-family:"'+Site_Font+'"; }  body {background-color:#'+page_background_color+';} .tabs li a:hover, #contact-form .btn {background-color:#'+main_color+'; }  h1 {color:#'+main_color+'} header, footer {background-color:#'+color2+';}  .form-dark, span.section-icon {background-color:#'+color3+';} ::selection {background-color:#'+main_color+'; color:#fff;} ::-moz-selection {background-color:#'+main_color+'; color:#fff;} ');

	
	// Tooltip
	$('a.tips').tooltip();
	
	// tabs
	$('.tab-content-wrapper .tb-content').not('.tab-content-wrapper .tb-content:first').hide();
	$('.tabs li a[href^=#]').click(function(event) {
			event.preventDefault();
			$(this.hash).prev().delay(100).slideUp('slow');
			$('.tb-content').delay(200).slideUp('slow');
			$(this.hash).delay(300).slideDown('slow');	
	});
	
	
	// Year Update
	var curYear = new Date().getFullYear();
	$('.year').html(curYear);
	
	// Subscription Form Validation
	   $("#subscribe-form input").focus(function() {
		  $(this).prev("label").hide();
		  $(this).prev().prev("label").hide();	 		 	
	  });
	   
	  $("#subscribe-form").submit(function() {
		  // validate and process form here
		  var emailSubscribe = $("#emailSubscribe").val();
		  if (emailSubscribe == "") {
				$('#emailSubscribe').addClass('reqfld');
				$('<span class="error" style="display:none;"><i class="fa fa-exclamation-circle"></i> Enter Your Email Address</span>').insertBefore('#subscribe-form .input-group').fadeIn(400);
				$("#emailSubscribe").focus(function() {  $('#emailSubscribe').removeClass('reqfld');  $(this).parent().prev().fadeOut(400);});
				return false;
		   } else if(emailSubscribe.indexOf('@') == -1 || emailSubscribe.indexOf('.') == -1) {
				$('#emailSubscribe').addClass('reqfld');
				$('<span class="error" style="display:none;">Invalid!</span>').insertBefore('#subscribe-form .input-group').fadeIn(400);
				$("#emailSubscribe").focus(function() {  $('#emailSubscribe').removeClass('reqfld');  $(this).parent().prev().fadeOut(400);});
				return false;
		  }
		  
		  var dataString = 'emailSubscribe=' + emailSubscribe;
		  $.ajax({
			type: "POST",
			url: "form/subscribe.php",
			data: dataString,
			success: function() {
			  $("#subscribe-form").hide();
			  $("<div id='subscribesuccess' class='alert alert-success' style='margin:2em; border:#"+sub_successBox_Border_Color+" 1px "+sub_successBoxBorderStyle+"; background:#"+sub_successBoxColor+";' ></div>").insertAfter('#subscribe-form');
			  $('#subscribesuccess').html("<h5 style='color:#"+sub_textColor+";'>"+sub_submitMessage+"</h5>")
			  .hide().delay(300)
			  .fadeIn(1500);
			  
			  $('#subscribe-form').delay(6000).slideUp('fast');
			  
			}
		  });
		  return false;
	});	
	

	   

	  
	  
});
