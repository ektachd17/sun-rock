// JavaScript Document

'use strict';

$(document).ready(function(e) {
	//Sliders
	$('#main-slider').owlCarousel({
		singleItem: true,
		navigation: true,
		navigationText: false,
		pagination: false,
		slideSpeed: 1000
	});
	
	//menu buttons
	var menu_btns = $('.menu-button');
	for (var i=0; i<menu_btns.length; i++) {
		menuShowing(menu_btns.eq(i));
	}
	
	function menuShowing(menu_btn) {
		var menu_cnt = menu_btn.next('.menu-container');
		var effect = "fade";
		if(menu_cnt.hasClass('menu-container-slide'))
			effect = "slide";
		menu_btn.on('click', function(e) {
			if(effect == "slide")
				menu_cnt.slideToggle();
			menu_cnt.toggleClass('active');
		});
	}
	
	//reshow hidden menus by js
	var menu_breakdown_width = 767;
	var slide_menus = $('.menu-container-slide');
	var menus_hidden = false;
	if (Modernizr.mq('(max-width: ' + menu_breakdown_width + 'px)'))
		menus_hidden = true;
	$(window).resize(function(e) {
		if (Modernizr.mq('(max-width: ' + menu_breakdown_width + 'px)')) {
			menus_hidden = true;
		} else {
			if(menus_hidden == true) {
				for (var i=0; i<slide_menus.length; i++) {
					slide_menus.eq(i).show();
				}
				menus_hidden = false;
			}
		}
	});
	
	
	//menu dropdown
	var top_menu_items = $('.menu-container > ul > li');
	for (var i=0; i<top_menu_items.length; i++) {
		var current_it = top_menu_items.eq(i);
		var current_it_dropdown = current_it.children('ul');
		if(current_it_dropdown.length == 1)
			dropDownSliding(current_it, current_it_dropdown);
	}
	
	function dropDownSliding(menu_it, dropdown_it) {
		menu_it.on('mouseenter', function(e) {
			dropdown_it.stop().slideDown(400);
		});
		menu_it.on('mouseleave', function(e) {
			dropdown_it.stop().slideUp(400);
		});
	}
	
	
	//tooltips
	$('[data-toggle="tooltip"]').tooltip();
	
	
	//in page scrolling
	$('.scroll-to').on('click', function(e) {
		e.preventDefault();
		$.scrollTo($(this).attr('href'), 800, {axis:'y'});
	});
	
	
	// on-scroll animations
	var on_scroll_anims = $('.onscroll-animate');
	for (var i=0; i<on_scroll_anims.length; i++) {
		var element = on_scroll_anims.eq(i);
		element.one('inview', function (event, visible) {
			var el = $(this);
			var anim = (el.data("animation") !== undefined) ? el.data("animation") : "fadeIn";
			var delay = (el.data("delay") !== undefined ) ? el.data("delay") : 200;

			var timer = setTimeout(function() {
				el.addClass(anim);
				clearTimeout(timer);
			}, delay);
		});
	}
	
	
	
	//add stroll plugin effects
	stroll.bind($('.stroll-list'));
	
	
	

	
});

$(window).load(function(e) {
	//force underscore to recount its position and show
	$(window).trigger('resize');
	$('.underscore').addClass('active');

	
	//fade out page loader
    $('#page-loader').fadeOut();
	
	
	//blog single slider
	var flex_carousel = $('#flex-carousel');
	var flex_slider = $('#flex-slider');
	if(flex_slider.length == 1 && flex_carousel.length == 1) {
		$(flex_carousel).flexslider({
			animation: "slide",
			controlNav: false,
			animationLoop: false,
			slideshow: false,
			itemWidth: 166,
			itemMargin: 10,
			asNavFor: '#flex-slider'
		});
		$(flex_slider).flexslider({
			animation: "slide",
			controlNav: false,
			animationLoop: false,
			slideshow: false,
			sync: "#flex-carousel"
		});
	}
	
	
	//parallax backgrounds
	var parallax_backgrounds = $('.parallax-background');
	for (var i=0; i<parallax_backgrounds.length; i++) {
		var el = parallax_backgrounds.eq(i);
		if(!el.attr("data-stellar-background-ratio"))
        	el.attr('data-stellar-background-ratio', 0.4);
    }
	
    $.stellar({
		horizontalScrolling: false,
		responsive: true
	});
});


//placeholder fallback for old browsers
if ( !("placeholder" in document.createElement("input")) ) {
    $("input[placeholder], textarea[placeholder]").each(function() {
	    var val = $(this).attr("placeholder");
        if ( this.value == "" ) {
    	    this.value = val;
        }
        $(this).focus(function() {
        	if ( this.value == val ) {
            	this.value = "";
            }
       	}).blur(function() {
        	if ( $.trim(this.value) == "" ) {
            	this.value = val;
            }
        })
  	});
 
    // Clear default placeholder values on form submit
    $('form').submit(function() {
    	$(this).find("input[placeholder], textarea[placeholder]").each(function() {
        	if ( this.value == $(this).attr("placeholder") ) {
            	this.value = "";
            }
        });
    });
}





