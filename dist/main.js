(function ($) {
	$.fn.buttonLoader = function (action) {
			var self = $(this);
			if (action == 'start') {
					if ($(self).attr("disabled") == "disabled") {
							e.preventDefault();
					}
					$('.has-spinner').attr("disabled", "disabled");
					$(self).attr('data-btn-text', $(self).text());
					$(self).addClass('loading');
					$(self).val('Добавлено!');
					$(self).parents(".tovar_addcart").find(".plus-minus-input").css("display", "none");
			}
			if (action == 'stop') {
					$(self).html($(self).attr('data-btn-text'));
					$(self).removeClass('loading');
					$('.has-spinner').removeAttr("disabled");
					$(self).val('В корзину');
					$(self).parents(".tovar_addcart").find(".plus-minus-input").css("display", "flex");
					$(self).parents(".tovar_item__top").find(".tovar_added").css("opacity", "1");
			}
	}
})(jQuery);

jQuery(document).ready(function(){
	if (document.querySelector('.plus-minus-input')) {
		$('[data-quantity="plus"]').on("click",function(e){
				e.preventDefault();
				fieldName = $(this).attr('data-field');
				var currentVal = parseInt($('input[name='+fieldName+']').val());
				if (!isNaN(currentVal)) {
						$('input[name='+fieldName+']').val(currentVal + 1);
				} else {
						$('input[name='+fieldName+']').val(1);
				}
				if (currentVal == 0) {
					$(this).parents(".plus-minus-input").find(".minus").removeClass("disabled");
				}
		});
		$('[data-quantity="minus"]').click(function(e) {
				e.preventDefault();
				fieldName = $(this).attr('data-field');
				var currentVal = parseInt($('input[name='+fieldName+']').val());

				if (currentVal == 1) {
			$(".minus").addClass("disabled");
				}
				if (!isNaN(currentVal) && currentVal > 1) {
						$('input[name='+fieldName+']').val(currentVal - 1);
				} else {
						$('input[name='+fieldName+']').val(1);
				}
		});
	}
	if (document.querySelector('.addcart__sumbit')) {
		$('.addcart__sumbit').click(function () {
	      var btn = $(this);
	      $(btn).buttonLoader('start');
	      setTimeout(function () {
	          $(btn).buttonLoader('stop');
	      }, 800);
	  });
	}
});

$('img[src$=".svg"]').each(function() {
	var $img = jQuery(this);
	var imgURL = $img.attr('src');
	var attributes = $img.prop("attributes");

	$.get(imgURL, function(data) {
		var $svg = jQuery(data).find('svg');

		$svg = $svg.removeAttr('xmlns:a');

		$.each(attributes, function() {
			$svg.attr(this.name, this.value);
		});

		$img.replaceWith($svg);
	}, 'xml');
});
