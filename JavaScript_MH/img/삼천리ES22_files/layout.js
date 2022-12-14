

var scroll = {
	disable : function(){
		document.body.style.overflow = 'hidden'
	},
	enable : function(){
		document.body.style.overflow = 'visible'
	},
	parentEnable : function(){
		$('body', parent.document).css('overflow', 'visible');
	},
}


var layout = {
	gnb: function() {
        layout.gnb = document.querySelector('#gnb > ul');
        layout.gnb.addEventListener('mouseenter', function() {
			$('#header').addClass('on');
			if(!layout.gnb.initHeight) {
				layout.gnb.initHeight = layout.headerEl.offsetHeight;
			}
        });
        layout.headerEl.addEventListener('mouseleave', function() {
            $('#header').removeClass('on').removeAttr('style');
			$('#gnb .isset.on').removeClass('on');
			$('#gnb .depth3').hide();
        });
		$(layout.gnb).find('.isset > a').on('click', function() {
			if(!($(this).next().hasClass('depth4') && window.innerWidth >= 1280)) {
				event.preventDefault();
			}
		})
		// gnb 3depth on / off
		$(layout.gnb).find('.depth2 .isset').on('click', function() {
			var th = event.currentTarget;
			$('#gnb .isset').each(function(idx, el) {
				if(el == th) return true;
				el.classList.remove('on');
				$(el).find('.depth3').hide();
			})
			$(this).toggleClass('on');
			if($(this).hasClass('on')) {
				$(this).find('.depth3').attr('style','display: block');
				layout.headerHeight = getHeaderHeight();
				$(layout.headerEl).attr('style','height:'+layout.headerHeight+'px');
			}else {
				$(this).find('.depth3').attr('style','display: none');
				layout.headerHeight = getHeaderHeight();
				$(layout.headerEl).removeAttr('style');
			}
		})

        function getHeaderHeight() {
            var initHeight = 0;
            layout.dep2 = document.querySelectorAll('#gnb .depth2');
            for(var i = 0; i < layout.dep2.length; i++) {
                if(layout.dep2[i].clientHeight > initHeight) {
					initHeight = layout.dep2[i].clientHeight;
				}
            }
			layout.gnb.initHeight > initHeight + document.querySelector('#gnb').clientHeight ? initHeight = layout.gnb.initHeight : initHeight += document.querySelector('#gnb').clientHeight;
            return initHeight;
        }
    },
	allMenu: function() {
		layout.allMenu.btn = document.getElementById('hAllMenu');
		layout.allMenu.wrap = document.getElementById('allMenu');

		$('#allMenu .allMenu_con').html($('.gnb > ul').clone());
		$('#allMenu .allMenu_con > ul').addClass('allMenu_gnb');

		layout.allMenu.btn.addEventListener('click', function() {
			this.classList.contains('on') ? $(this).classList.remove('on') : this.classList.add('on');
			if(this.classList.contains('on')) {
				layout.allMenu.wrap.classList.add('on');
				scroll.disable()
			}else {
				layout.allMenu.wrap.classList.remove('on');
				scroll.enable()
			}
			$(layout.allMenu.wrap).find('.depth1 ul').removeAttr('style');
			$(layout.allMenu.wrap).find('.depth1 .on').removeClass('on');
		})
		//allMenu - CLOSE event
		$(document).on('click','.allMenu_close', function(e){
			e.preventDefault();

			layout.allMenu.btn.classList.remove('on');
			layout.allMenu.wrap.classList.remove('on');
			scroll.enable()
		});
		$('#allMenu .depth3 .isset').on('click', function() {
			var th = event.currentTarget;
			event.preventDefault();
			$('#allMenu .depth3 .isset').each(function(idx, el) {
				if(el == th) return true;
				el.classList.remove('on');
				$(el).find('.depth3').hide();
			})
			$(this).toggleClass('on');
			if($(this).hasClass('on')) {
				$(this).find('.depth4').stop().slideDown(200);
			}else {
				$(this).find('.depth4').stop().slideUp(200);
			}
		})
		$('#allMenu .depth4 a').on('click', function() {
			event.stopPropagation();
		})
		$('#allMenu .depth1 a').on('click', function() {
			if(window.innerWidth >= 1280) return;
			if(!($(this).next('ul').hasClass('depth4') || $(this).parent('li').hasClass('depth1'))) $(this).parent('li').toggleClass('on');
			if($(this).next('ul').length >= 1) event.preventDefault();
			if(!$(this).next('ul').hasClass('depth4')) {
				$(this).next('ul').stop().slideToggle();
			}
		})
	},
	smart: function() {
		layout.smart.btn = document.querySelectorAll('.smart_btn');
		layout.smart.wrap = document.querySelector('#smartLink');
		$(layout.smart.btn).on('click', function() {
			$(this).toggleClass('on');
			if($(this).hasClass('on')) {
				layout.smart.wrap.classList.add('on');
				scroll.disable()
			}else {
				layout.smart.wrap.classList.remove('on');
				scroll.enable()
			}
		})
		$(document).on('click','.close_smart', function(e){
			e.preventDefault();

			$(layout.smart.btn).removeClass('on');
			layout.smart.wrap.classList.remove('on');
			scroll.enable()
		});
	},
	pop: function() {
		layout.pop.btn = document.querySelector('#hAlrim');
		layout.pop.wrap = document.querySelector('#mainPop');
		layout.pop.btn.addEventListener('click', function() {
			$(this).toggleClass('on');
			if($(this).hasClass('on')) {
				layout.pop.wrap.classList.add('on');
				scroll.disable()
			}else {
				layout.pop.wrap.classList.remove('on');
				scroll.enable()
			}
		})
		$(document).on('click','#closeMainPop', function(e){
			e.preventDefault();

			layout.pop.btn.classList.remove('on');
			layout.pop.wrap.classList.remove('on');
			scroll.enable()
		});


		// slide
		$('#mainPop .notice_slide .notice_item').length < 3 ? $('#mainPop .notice_slide').addClass('minimal') : '';
		$('#mainPop .notice_slide .notice_item').length < 2 ? $('#mainPop .notice_slide').addClass('tb_minimal') : '';
		layout.pop.slide = new Swiper('#mainPop .notice_slide', {
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            // loop: true,
            speed: 1000,
            autoplay: {
                delay: 7000,
                disableOnInteraction: false,
            },
            navigation: {
                prevEl: "#mainPop .nc_contr .prev",
                nextEl: "#mainPop .nc_contr .next",
            },
			pagination: {
                el: "#mainPop .nc_paging",
                type: "fraction",
                clickable: true,
                bulletClass: 'paging',
            },
			breakpoints: {
				'768': {
					slidesPerView: 1,
				},
				'1025': {
					slidesPerView: 2,
				},
				'1440': {
					slidesPerView: 3,
				}
			}
        });
		// 사내
		layout.pop.newsIns = new Swiper('#mainPop .inside .swiper-container', {
            observer: true,
            observeParents: true,
            slidesPerView: 1,
			direction: "vertical",
            loop: true,
            speed: 500,
            loopAdditionalSlides: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                prevEl: "#mainPop .inside .top",
                nextEl: "#mainPop .inside .bottom",
            },
        });
		// 사외
		layout.pop.newsOus = new Swiper('#mainPop .outside .swiper-container', {
            observer: true,
            observeParents: true,
            slidesPerView: 1,
			direction: "vertical",
            loop: true,
            speed: 500,
            loopAdditionalSlides: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                prevEl: "#mainPop .outside .top",
                nextEl: "#mainPop .outside .bottom",
            },
        });
	},
	scroll : function(){
		//스크롤 이벤트 0.15초 한번 실행
		if(layout.scrollTimeout) {

			clearTimeout(layout.scrollTimeout);

		}

		layout.scrollTimeout = setTimeout(function() {

			var _scrollTop   = (isIe) ? document.querySelector('html').scrollTop : window.pageYOffset;
			var _innerHeight = window.innerHeight;

			var _headerH     = layout.headerEl.offsetHeight;
			var _conTop      = layout.conEl.offsetTop;
			var _footerTop   = layout.footerEl.offsetTop;
			var _footerH     = layout.footerEl.offsetHeight;



			//scroll up down 구분
			if(layout.lastScrollTop < _scrollTop && _conTop < _scrollTop){

				$(".header:not(.down)").addClass('down');
				$(".floating:not(.down)").addClass('down');

			}else if(layout.lastScrollTop  > _scrollTop && _conTop < _scrollTop){

				$(".header.down").removeClass('down');
				$(".floating.down").removeClass('down');
			}

			if(_scrollTop == 0 || layout.lastScrollTop == 0) {
				$(".header.down").removeClass('down');
				$(".floating.down").removeClass('down');
			}

			//header
			if(_headerH < _scrollTop ) {

				$(".header:not(._fixed)").addClass('_fixed');
				$('.floating_menu').addClass('scroll');
			}else{

				$(".header._fixed").removeClass('_fixed');
				$('.floating_menu').removeClass('scroll');

			}

			//floating fixed
			if(_footerTop < _scrollTop + _innerHeight) {

				$(".floating_menu").addClass('on').css('bottom', _footerH);

			}else{

				$(".floating_menu").removeClass('on').removeAttr('style');

			}

			layout.lastScrollTop = _scrollTop;
		}, 10);
	},

	resize : function(){
		//스크롤 이벤트 0.15초 한번 실행
		if(layout.resizeTimeout) {

			clearTimeout(layout.resizeTimeout);

		}

		layout.resizeTimeout = setTimeout(function() {

			var resizeWidth   =  window.innerWidth;

			layout.scroll();

			// if( window.matchMedia("(max-width: 800px)").matches ){
			// 	$('.floating_menu .floating_item.as').hide();
			// } else {
			// 	$('.floating_menu .floating_item.as').show();
			// }

			layout.lastResizeWidth = resizeWidth;

		}, 150);
	},
	familySite : function(){
		//family_site
		$(document).on('click', '.ft_family_site > a', function(e){
			e.preventDefault();
			$(this).toggleClass('on').next('ul').slideToggle(200);
		});
	},
	floating: function() {
		if($('.statusBar').length >= 1) return;
		setTimeout(function() {
			if(!$('.floating_menu').hasClass('act')) {
				$('.floating_menu').addClass('act');
			}
		}, 500);
		$('#floatingTop').on('click', function() {
            gsap.to(window, .75, {
                ease: Power2.easeOut,
                scrollTo: 0,
            })
        });
		// if( window.matchMedia("(max-width: 800px)").matches ){
		// 	$('.floating_menu .floating_item.as').hide();
		// } else {
		// 	$('.floating_menu .floating_item.as').show();
		// }
		
	},

	sub_nav: function() {
		layout.sub_nav.contents = document.getElementsByClassName('contents_tit');
		layout.sub_nav.length = layout.sub_nav.contents.length;
		layout.sub_nav.contentsArry = [];

		layout.sub_nav.getContentsList = function() {
			layout.sub_nav.contentsArry = [];
			$.each(layout.sub_nav.contents, function(idx, el) {
		        var obj = {
					'el': el,
		            idx: idx,
		            title: $(this).html(),
		            setTop: Math.round($(this).offset().top)
		        }
		        layout.sub_nav.contentsArry.push(obj);
		    });
		    return layout.sub_nav.contentsArry;
		}
		layout.sub_nav.init = function() {
			layout.sub_nav.calc();
			if ($('.side_nav').length === 0) {
		        layout.sub_nav.create();
		    };
			act_addSideNav();
			layout.sub_nav.calc();


			window.addEventListener('scroll', throttle(function() {
				layout.sub_nav.calc();
			}, 100));
		};
		layout.sub_nav.debounce;
		layout.sub_nav.calc = function() {
			layout.sub_nav.contentsArry = layout.sub_nav.getContentsList();
			layout.sub_nav.topH = $('#header').height();
			if(window.innerWidth < 1280) layout.sub_nav.topH = $('.side_nav').height();
			layout.sub_nav.scrollY = $('#header').hasClass('down') ? window.pageYOffset : window.pageYOffset + layout.sub_nav.topH;
		    for (let i = layout.sub_nav.contentsArry.length; i > 0; i--) {
		        if (layout.sub_nav.contentsArry[i - 1].setTop <= layout.sub_nav.scrollY || Math.abs(layout.sub_nav.contentsArry[i - 1].setTop - layout.sub_nav.scrollY) <= 100) {
                // if (layout.sub_nav.contentsArry[i - 1].setTop <= layout.sub_nav.scrollY) {
		            layout.sub_nav.contentsArry[i - 1].setAct = 'on';
					if(layout.sub_nav.els != undefined) layout.sub_nav.els.eq(i - 1).addClass('on').siblings().removeClass('on');

					var later = function() {
						layout.sub_nav.debounce = null;
						sideFixList(layout.sub_nav.els.eq(i-1));
					}
					clearTimeout(layout.sub_nav.debounce);
					layout.sub_nav.debounce = setTimeout(later, 50);
		            break;
		        }
		    }
		}
		layout.sub_nav.create = function() {
			var setHtml = '<div class="side_nav">';
			setHtml += '<ul class="side_nav_list">';
			for (var el = 0; el < layout.sub_nav.contentsArry.length; el++) {
				layout.sub_nav.contentsArry[el].setAct ? setHtml += '<li class="on"><a href="#" data-idx="' + layout.sub_nav.contentsArry[el].idx + '">' + layout.sub_nav.contentsArry[el].title + '</a></li>' : setHtml += '<li><a href="#" data-idx="' + layout.sub_nav.contentsArry[el].idx + '">' + layout.sub_nav.contentsArry[el].title + '</a></li>'
			};
			setHtml += '</ul></div>';
			$('#container').append(setHtml);
			layout.sub_nav.els = $('.side_nav .side_nav_list li');

			layout.sub_nav.bgArea();
			layout.sub_nav.fullSubVisual();
		}

		layout.sub_nav.animating = false;
		function sideFixList(_el) {
			var el = _el,
				left = 0;
			for(var i = 0; i < el.index(); i++) {
				left += $('.side_nav_list li').eq(i).outerWidth();
			}
			if(!layout.sub_nav.animating) {
				layout.sub_nav.animating = true;
				el.closest('.side_nav_list').stop().animate({scrollLeft: left}, function() {
					layout.sub_nav.animating = false;
				});
			}
		}

		function act_addSideNav() {
		    $('.side_nav a').off('click').on('click', function(e) {
		        e.preventDefault();
				var th = $(this);
				layout.sub_nav.clickEl = th.parent();


				$('html, body').stop().scrollTop(
		            layout.sub_nav.getContentTop(layout.sub_nav.contentsArry[th.data('idx')].setTop)

					// $('html, body').scrollTop(
					// 	layout.sub_nav.getContentTop(layout.sub_nav.contentsArry[th.data('idx')].setTop)
					// )
				)
				// layout.sub_nav.calc();
		    })
		    // act_sideNavScroll();
		}
		layout.sub_nav.getContentTop = function(objTop) {
			layout.sub_nav.topH = $('#header').outerHeight();
			if(window.innerWidth >= 1280) {
				return (window.pageYOffset > objTop) ? objTop - layout.sub_nav.topH : objTop;
			}
			layout.sub_nav.topH = $('.side_nav').outerHeight();
			if(window.pageYOffset > objTop && $('#header').hasClass('down')) {
				layout.sub_nav.topH += $('#header').outerHeight();
			}else if(window.pageYOffset < objTop && !$('#header').hasClass('down')) {
				layout.sub_nav.topH -= $('#header').outerHeight();
			}
			return objTop - layout.sub_nav.topH;
		}
		// 모바일 가로 스크롤
		// function act_sideNavScroll() {
		//     if (parseInt(window.innerWidth) < 1300) {
		//         $('.side_nav_list').on('mousewheel', function(e) {
		//             e.preventDefault();
		//             let deltaY = $(this).scrollLeft() + e.originalEvent.deltaY;
		//             $(this).stop().animate({
		//                 scrollLeft: deltaY
		//             }, 300);
		//         })
		//     } else {
		//         $('.side_nav_list').off('mousewheel');
		//     }
		// }
		layout.sub_nav.fullSubVisual = function() {
			if(document.querySelectorAll('.sub_visual.full').length < 1) return;
			$('.side_nav').hide();
			ScrollTrigger.create({
				trigger : document.querySelector('.sub_visual.full'),
				start: 'top top',
				end: 'bottom top',
				markers: false,
				onEnter: function() {
					$('.side_nav').hide();
				},
				onEnterBack: function() {
					$('.side_nav').hide();
				},
				onLeave: function() {
					$('.side_nav').show();
				},
				onLeaveBack: function() {
					$('.side_nav').hide();
				}
			})
		}

		layout.sub_nav.bgArea = function() {
			document.querySelectorAll('.bg_area').forEach(function(_el, idx) {
				var el = _el;
				ScrollTrigger.create({
					trigger: el,
					start: 'top bottom',
					end: 'bottom 50%',
					markers: false,
					onEnter: function() {
						$('.side_nav').addClass('_white');
						$('#floatingTop').addClass('_write');
					},
					onEnterBack: function() {
						$('.side_nav').addClass('_white');
						$('#floatingTop').addClass('_write');
					},
					onLeave: function() {
						$('.side_nav').removeClass('_white');
						$('#floatingTop').removeClass('_write');
					},
					onLeaveBack: function() {
						$('.side_nav').removeClass('_white');
						$('#floatingTop').removeClass('_write');
					},
				})
			})
	    },
		layout.sub_nav.init();
		// act_addSideNav();
	},
	init : function (){

		//aos실행
		setTimeout(function(){
			AOS.init({ easing: 'ease-out', duration:700, once : true });
		}, 300);


		//el 정의
		layout.conEl         = document.querySelector('#con');
		layout.footerEl      = document.querySelector('#footer');
		layout.headerEl      = document.querySelector('#header');


		//scroll event
		layout.lastScrollTop = 0;
		layout.scrollTimeout = null;
		layout.scroll();
		window.addEventListener("scroll", layout.scroll);


		//resize event
		layout.lastResizeWidth = 0;
		layout.resizeTimeout = null;
		layout.resize();
		window.addEventListener("resize", layout.resize);

		layout.floating();
		setTimeout(function() {
			$('.sub_visual .sv_text_box').addClass('on');
		}, 200);


		// footer familySite
		layout.familySite();

		//event
		layout.gnb();

		layout.allMenu();

		layout.smart();

		layout.pop();
	},
}



$(function(){
	layout.init();
});
