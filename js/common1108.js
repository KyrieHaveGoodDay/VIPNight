
AOS.init();


if ($(window).width() > 768) {
	// 版頭右上小AD輪撥
	var mySwiper = new Swiper('.slider_box .swiper-container', {
		effect: 'fade',
		loop: true,
		mousewheel: false,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		on: {
			init: function () {
				swiperAnimateCache(this);
				swiperAnimate(this);
			},
			slideChangeTransitionEnd: function () {
				swiperAnimate(this);
			}
		}
	});

}


// 行動裝置 品牌選單
$('.navbar-toggler').click(function () {
	$(this).toggleClass('is-open');
	$('.nav_wrap, .nav_mb').toggleClass('visible');
	$('.menuMask').toggleClass('cover-bg');
	$('body, html').toggleClass('act');
});
if ($(window).width() < 769) {
	mbMenu();
}
var resizeTimer = null;
$(window).bind('resize', function () {
	if (resizeTimer) clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function () {
		mbMenu();
	}, 300);
});
function mbMenu() {
	$('.nav_wrap ul li').click(function () {
		$(this).nextAll('li').removeClass('act');
		$(this).prevAll('li').removeClass('act');
		$(this).toggleClass('act');
	});
}

// 側邊欄控制
$(window).scroll(function () {
	if ($(window).scrollTop() >= 10) {
		$('.right_box').addClass('show');
	} else {
		$('.right_box').removeClass('show');
	}
});
$('.right_menu .arrow_box').click(function () {
	$('.right_menu .arRight').toggleClass('rotate');
	$('.right_menu .menu_box').toggleClass('gohide');
});
$('.left_menu .arrow_box').click(function () {
	$('.left_menu .arLeft').toggleClass('rotate');
	$('.left_menu .menu_box').toggleClass('gohide');
});
$('li.subevent a, .menuMask').click(function () {
	$('.left_menu .menu_box, .menuMask').toggleClass('show');
});
$(window).scroll(function () {
	if ($(window).scrollTop() >= 50) {
		$('.right_menu, .left_menu').addClass('subfixed');
	} else {
		$('.right_menu, .left_menu').removeClass('subfixed');
	}
});
// hashtag Smooth scrolling
var $clickTag = $('area[href^="#"], .menu_box a[href^="#"], .movie_box a[href^="#"], .right_box a[href^="#"], a.gotheme');
$clickTag.click(function (event) {
	var target = $(this.getAttribute('href'));
	if ($(window).width() < 769) {
		if (target.length) {
			event.preventDefault();
			$('html, body').stop().animate({
				scrollTop: target.offset().top - 50
			}, 300);
		}

		return false;
	} else {
		if (target.length) {
			event.preventDefault();
			$('html, body').stop().animate({
				scrollTop: target.offset().top
			}, 300);
		}
		return false;
	}
});

// modal 影片
var $videoSrc;
$('.video-btn').click(function () {
	$videoSrc = $(this).data("src");
});
$('#video_box').on('shown.bs.modal', function (e) {
	$("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
});
$('#video_box').on('hide.bs.modal', function (e) {
	$("#video").attr('src', $videoSrc);
})

if ($(window).width() > 767) {
	const t1 = gsap.timeline({ duration: 1 })
	t1.from('.main_vip', { ease: "bounce.out", y: -600 })
		.to('.main_vip', { ease: "bounce.out", y: 0 })
		.from('.slide1027', { ease: "bounce.out", y: -500 })
		.to('.slide1027', { ease: "bounce.out", y: 0 })
		.to('.pic', { y: 50, yoyo: true, repeat: -1 });
}
if ($(window).width() < 767) {
	const t1 = gsap.timeline({ duration: 1 })
	t1.from('.main_title_m', { ease: "bounce.out", y: -600 })
		.to('.main_title_m', { ease: "bounce.out", y: 0 })
		.from('.slide1027', { ease: "bounce.out", y: -700 })
		.to('.slide1027', { ease: "bounce.out", y: 0 })
		.to('.pic', { y: 30, yoyo: true, repeat: -1 });
}

// 背景圖片移動
$(window).scroll(function () {
	var bg3 = 900;
	var too = 0;
	var scrollPos = $(window).scrollTop();

	// console.log(typeof(too));
	bg_night(scrollPos);

	function bg_night(scrollPos) {

		too = bg3 - scrollPos;

		if (too <= 500) {
			$('.bg_move3').css('top', '500px')
		}
		else {	
			$('.bg_move3').css('top', '' + (too) + 'px')
		}
	}


})


// 倒數計時
function nowTime() {
	const second = 1000,
		minute = second * 60,
		hour = minute * 60,
		day = hour * 24;

	// 目標時間
	let myb = "2021/11/08 23:59:59";
	// 指定時間
	let wait = "2021/11/08 20:59:59";
	let timeout = new Date(wait).getTime();
	// 目標時間轉成毫秒
	let countDown = new Date(myb).getTime();
	// console.log(countDown);

	// 獲得現在時間的毫秒
	let now = new Date().getTime();
	// console.log(now);s

	// 目標時間毫秒-現在時間毫秒
	let distance = countDown - now;
	// console.log(now);
	// document.getElementById('days').innerText = Math.floor(distance / (day)) + '天';
	document.getElementById('hour').innerText = Math.floor(distance % (day) / (hour)) + "小時";
	document.getElementById('minute').innerText = Math.floor(distance % (hour) / (minute)) + '分鐘';
	document.getElementById('second').innerText = Math.floor(distance % (minute) / (second)) + '秒';

	// 指定時間到達要做的事情
	if (now > timeout) {
		if ($(window).width() < 767) {
			$('.night_title1_m').css('display', 'block');
			$('.night_title3h_M').css('display', 'none');
			$('#lastMinute').css('display', 'block');

		} else {
			$('.night_title1').css('display', 'block');
			$('#lastMinute').css('display', 'block');
			$('.night_title3h').css('display', 'none');
		}
	}

	// 設定目標時間到達後要做的事情
	if (distance < 0) {
		document.getElementById('hour').innerText = "00小時";
		document.getElementById('minute').innerText = '00分鐘';
		document.getElementById('second').innerText = '00秒';
		clearInterval(sh)
		if ($(window).width() < 415) {
			$('#lastMinute').css('left', '13%');
		}
	}
}

// 持續進行
var sh = setInterval(function () { nowTime() }, 16);



// 加載效果
$(document).ready(function () {
	setTimeout(function () {
		$('.loading-wrapper').fadeOut(500);
	}, 1000)

	if ($(window).width() > 767) {
		// console.log(1000);
		// 版頭動畫
		const t1 = gsap.timeline({ duration: 1 })
		t1.from('.night_title1', { ease: "bounce.out", xPercent: -200 })
			.from('#lastMinute', { ease: "bounce.out", y: -600 }, 1.3)
			.to('#lastMinute', { duration: 0.1, scale: 1.2, repeat: 3, yoyo: true })


		$('.light').each(function (index, item) {

			// 延遲時間
			let indexNum = Math.floor(Math.random() * index * 0.5);
			// 閃爍速度
			let durationNum = Math.random() * index * 0.1;
			let durationNumX1 = durationNum.toFixed(1);
			// 閃爍大小不一樣
			let shinyBox = [2, 1.8, 1.7, 2, 1.8, 1.6, 1.7, 1.8, 1.9, 2]
			let shinyNum = Math.floor(Math.random() * index + 1);
			let shinyToo = shinyBox[shinyNum]
			// gsap....
			gsap.to(item, { duration: durationNumX1, scale: shinyToo, opacity: 1, repeat: -1, yoyo: true, delay: indexNum })
		})
	} else {

		const t2 = gsap.timeline({ duration: 1 })
			.from('.night_title1_m', { ease: "bounce.out", xPercent: -100 })
			.from('#lastMinute', { ease: "bounce.out", y: -600 }, 1)
			.to('#lastMinute', { duration: 0.1, rotate: 0 })
			.to('#lastMinute', { duration: 0.1, scale: 1.2, repeat: 3, yoyo: true })
	
	}
})

// 顯示已完售字樣 移除連結
$('.over88 > a').attr('target', '');


