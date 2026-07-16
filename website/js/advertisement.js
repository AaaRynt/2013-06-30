(function (window, $) {
	function init() {
		var advertisements = [
			{
				src: "assets/tanki.jpg",
				title: "只为渴望强大的你！",
				width: 305,
				height: 79,
				top: 0
			},
			{
				src: "assets/film.jpg",
				title: "怪兽来袭 影城立即选座",
				width: 305,
				height: 171,
				top: -46
			},
			{
				src: "assets/english.png",
				title: "不学好英语 怎么带路？",
				width: 305,
				height: 124,
				top: -22
			},
			{
				src: "assets/nurse.png",
				title: "卫校小妹 同城交友",
				width: 305,
				height: 172,
				top: -46
			}
		];
		var currentIndex = 0;
		var timer = null;
		var $advertisement = $(".header-ad");
		var $image = $("#ad-image");
		var $title = $("#ad-title");
		var preloadImage;
		var i;

		function updateSwitch(index) {
			$(".ad-switch a").removeClass("current");
			$('.ad-switch a[data-ad-index="' + index + '"]').addClass("current");
		}

		function showAdvertisement(index, useAnimation) {
			var advertisement = advertisements[index];

			if (!advertisement) {
				return;
			}

			currentIndex = index;
			updateSwitch(index);

			if (useAnimation) {
				$image.stop(true, true).fadeOut(180, function () {
					$image
						.attr("src", advertisement.src)
						.attr("alt", advertisement.title)
						.css({
							width: advertisement.width + "px",
							height: advertisement.height + "px",
							marginTop: advertisement.top + "px"
						})
						.fadeIn(180);
				});
				$title.stop(true, true).fadeOut(180, function () {
					$title.text(advertisement.title).fadeIn(180);
				});
			} else {
				$image
					.attr("src", advertisement.src)
					.attr("alt", advertisement.title)
					.css({
						width: advertisement.width + "px",
						height: advertisement.height + "px",
						marginTop: advertisement.top + "px"
					})
					.show();
				$title.text(advertisement.title).show();
			}
		}

		function showNextAdvertisement() {
			showAdvertisement((currentIndex + 1) % advertisements.length, true);
		}

		function stopAdvertisement() {
			if (timer !== null) {
				window.clearInterval(timer);
				timer = null;
			}
		}

		function startAdvertisement() {
			stopAdvertisement();
			timer = window.setInterval(showNextAdvertisement, 5000);
		}

		for (i = 0; i < advertisements.length; i++) {
			preloadImage = new Image();
			preloadImage.src = advertisements[i].src;
		}

		$(".ad-switch a").on("click", function () {
			var index = parseInt($(this).attr("data-ad-index"), 10);

			if (!isNaN(index)) {
				showAdvertisement(index, true);
				startAdvertisement();
			}

			return false;
		});

		$advertisement.on("mouseenter", function () {
			stopAdvertisement();
		});

		$advertisement.on("mouseleave", function () {
			startAdvertisement();
		});

		showAdvertisement(0, false);
		startAdvertisement();
	}

	window.PORTAL_ADVERTISEMENT = {
		init: init
	};
})(window, jQuery);
