
function centerModals() {
	 $('.modal').each(
	   function(i) {
		var $clone = $(this).clone().css('display', 'block')
		  .appendTo('body');
		var top = Math.round(($clone.height() - $clone.find(
		  '.modal-content').height()) / 2);
		top = top > 0 ? top : 0;
		$clone.remove();
		$(this).find('.modal-content').css("margin-top",
		  top - 50);
	   });
	}
	$('.modal').on('show.bs.modal', centerModals);
	$(window).on('resize', centerModals);

function showErrorModel(  errorCode,errorMsg){
		document.getElementById("errorTypeSpan").innerText = errorCode;
									document.getElementById("errorSpan").innerText = errorMsg;
									$('#errorModel').modal({
										  keyboard: true
									   })
	
	}