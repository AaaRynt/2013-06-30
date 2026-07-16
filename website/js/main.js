(function (window, $) {
	var data = window.PORTAL_DATA || {};
	var renderer = window.PORTAL_RENDER;
	var modal = window.PORTAL_MODAL;
	var random = window.PORTAL_RANDOM;
	var channelStates = {};
	var channelSettings = {
		china: {
			selector: "#china-news-list",
			headlineSelector: "#china-headline",
			layout: "dated",
			initialCount: 15,
			dataName: "china"
		},
		world: {
			selector: "#world-news-list",
			layout: "center",
			channelLabel: "国际",
			initialCount: 10,
			dataName: "world"
		},
		tech: {
			selector: "#tech-news-list",
			headlineSelector: "#tech-headline",
			layout: "plain",
			initialCount: 14,
			dataName: "tech"
		},
		games: {
			selector: "#games-news-list",
			layout: "plain",
			initialCount: 14,
			dataName: "games"
		},
		gaokao: {
			selector: "#gaokao-news-list",
			layout: "plain",
			initialCount: 4,
			dataName: "gaokao"
		},
		graduation: {
			selector: "#graduation-news-list",
			layout: "plain",
			initialCount: 4,
			dataName: "graduation"
		},
		fe_dev: {
			selector: "#fe-dev-news-list",
			layout: "plain",
			initialCount: 4,
			dataName: "fe_dev"
		},
		party: {
			selector: "#party-news-list",
			layout: "party",
			initialCount: 3,
			dataName: "party"
		}
	};

	function padNumber(number) {
		return number < 10 ? "0" + number : "" + number;
	}

	function getData(name) {
		var items = data[name];

		return items && typeof items.length === "number" ? items : [];
	}

	function updateClock() {
		var now = new Date();
		var timeText = padNumber(now.getHours()) + ":" + padNumber(now.getMinutes()) + ":" + padNumber(now.getSeconds());

		$("#portal-clock").text("2013年06月30日 星期日 " + timeText);
	}

	function updateOnlineCount() {
		var onlineCount = parseInt($("#online-count").text(), 10);
		var changeCount = Math.floor(Math.random() * 6) + 1;
		var changeDirection = Math.random() < 0.5 ? -1 : 1;

		if (isNaN(onlineCount)) {
			onlineCount = 23876;
		}

		$("#online-count").text(onlineCount + changeCount * changeDirection);
	}

	function renderChannel(channelName, showAll) {
		var settings = channelSettings[channelName];
		var items;
		var count;
		var startIndex = 0;

		if (!settings || !renderer) {
			return;
		}

		items = getData(settings.dataName);
		count = showAll ? items.length : settings.initialCount;

		if (settings.headlineSelector) {
			renderer.renderHeadline(settings.headlineSelector, items, 0);
			startIndex = 1;
			count = Math.max(0, count - 1);
		}

		renderer.renderNewsList(settings.selector, items, count, {
			layout: settings.layout,
			startIndex: startIndex,
			channelLabel: settings.channelLabel || "资讯"
		});
	}

	function renderAllChannels() {
		var channelName;

		for (channelName in channelSettings) {
			if (channelSettings.hasOwnProperty(channelName)) {
				channelStates[channelName] = false;
				renderChannel(channelName, false);
			}
		}
	}

	function renderFocusNews() {
		if (!renderer) {
			return;
		}

		renderer.renderFocus("#focus-primary", "#focus-primary-related", getData("gaokao"));
		renderer.renderFocus("#focus-secondary", "#focus-secondary-related", getData("world"));
	}

	function combineNews() {
		var names = ["china", "world", "tech", "games", "fe_dev", "gaokao", "graduation"];
		var combined = [];
		var items;
		var i;
		var j;

		for (i = 0; i < names.length; i++) {
			items = getData(names[i]);
			for (j = 0; j < items.length; j++) {
				combined.push(items[j]);
			}
		}

		return combined;
	}

	function renderRanking() {
		if (renderer && random) {
			renderer.renderRank("#news-rank-list", random.sample(combineNews(), 5));
		}
	}

	function renderForum() {
		if (renderer && random) {
			renderer.renderForumList("#forum-list", random.sample(getData("forum"), 8));
		}
	}

	function renderQuestions() {
		if (renderer && random) {
			renderer.renderQuestionList("#question-list", random.sample(getData("questions"), 5));
		}
	}

	function renderFlashNews() {
		var sources = [getData("china"), getData("world"), getData("tech"), getData("games"), getData("gaokao"), getData("graduation")];
		var titles = [];
		var item;
		var i;
		var j;

		for (i = 0; i < sources.length; i++) {
			for (j = 0; j < sources[i].length && j < 1; j++) {
				item = sources[i][j];
				if (item && item.title) {
					titles.push(item.title);
				}
			}
		}

		$("#flash-news-text").text(titles.join("　　"));
	}

	function bindMoreLinks() {
		$(document).on("click", ".js-more-link", function () {
			var channelName = $(this).attr("data-channel");

			if (!channelSettings[channelName]) {
				return false;
			}

			if (!channelStates[channelName]) {
				channelStates[channelName] = true;
				renderChannel(channelName, true);
				$(this).text("登录查看更多>>");

				if (channelName === "party") {
					$(".party-special").addClass("party-special-expanded");
				}
			} else if (modal) {
				modal.showMore();
			}

			return false;
		});
	}

	function bindArticleLinks() {
		$(document).on("click", ".js-article-link, .js-forum-post, .js-question-post", function () {
			if (modal) {
				modal.showArticle();
			}

			return false;
		});
	}

	function bindNavigation() {
		$(document).on("click", ".js-channel-link", function () {
			if (modal) {
				modal.showChannel($(this).attr("data-channel-name") || "新闻");
			}

			return false;
		});
	}

	function bindMemberActions() {
		$(".login-module form").on("submit", function () {
			if (modal) {
				modal.showLoginMaintenance();
			}

			return false;
		});

		$(".register-button").on("click", function () {
			if (modal) {
				modal.showRegister();
			}
			return false;
		});

		$(".js-password-link").on("click", function () {
			if (modal) {
				modal.showPasswordMaintenance();
			}
			return false;
		});
	}

	function bindRandomRefresh() {
		$(".js-forum-refresh").on("click", function () {
			renderForum();
			return false;
		});

		$(".js-question-refresh").on("click", function () {
			renderQuestions();
			return false;
		});
	}

	function bindAdvertisement() {
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

	function refreshCaptcha() {
		var characters = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
		var textColors = ["#8b0000", "#004d00", "#4b0082", "#7a3d00", "#111111", "#8a0055"];
		var backgroundColors = ["#f7e8b7", "#d9eed0", "#dce7f2", "#f1d9d0", "#e8ddf0", "#eeeecc"];
		var fontFamilies = ["Courier New, monospace", "Arial, sans-serif", "Times New Roman, serif", "Georgia, serif"];
		var html = [];
		var character;
		var className;
		var color;
		var fontFamily;
		var fontSize;
		var topOffset;
		var lineColor;
		var lineTop;
		var lineLeft;
		var lineWidth;
		var i;

		for (i = 0; i < 4; i++) {
			character = characters.charAt(Math.floor(Math.random() * characters.length));
			className = "captcha-char" + (i === 1 || Math.random() < 0.25 ? " captcha-char-blur" : "");
			color = textColors[Math.floor(Math.random() * textColors.length)];
			fontFamily = fontFamilies[Math.floor(Math.random() * fontFamilies.length)];
			fontSize = 13 + Math.floor(Math.random() * 4);
			topOffset = Math.floor(Math.random() * 5) - 2;
			html.push('<span class="' + className + '" unselectable="on" style="color:' + color + ";font-family:" + fontFamily + ";font-size:" + fontSize + "px;top:" + topOffset + 'px;">' + character + "</span>");
		}

		for (i = 0; i < 3; i++) {
			lineColor = textColors[Math.floor(Math.random() * textColors.length)];
			lineTop = 3 + Math.floor(Math.random() * 14);
			lineLeft = Math.floor(Math.random() * 9) - 5;
			lineWidth = 48 + Math.floor(Math.random() * 16);
			html.push('<span class="captcha-line" unselectable="on" style="background:' + lineColor + ";top:" + lineTop + "px;left:" + lineLeft + "px;width:" + lineWidth + 'px;"></span>');
		}

		$("#captcha-code")
			.css("background", backgroundColors[Math.floor(Math.random() * backgroundColors.length)])
			.html(html.join(""));
	}

	function bindCaptcha() {
		$("#captcha-code")
			.on("click", function () {
				refreshCaptcha();
				return false;
			})
			.on("selectstart copy cut contextmenu", function () {
				return false;
			});
	}

	function setHomepage(link) {
		try {
			link.style.behavior = "url(#default#homepage)";

			if (typeof link.setHomePage === "undefined") {
				window.alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
				return;
			}

			link.setHomePage(window.location.href);
		} catch (error) {
			window.alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
		}
	}

	function addFavorite() {
		try {
			if (!window.external) {
				window.alert("您好,您的浏览器不支持收藏功能,请您手动收藏本页!");
				return;
			}

			window.external.AddFavorite(window.location.href, document.title);
		} catch (error) {
			window.alert("您好,您的浏览器不支持收藏功能,请您手动收藏本页!");
		}
	}

	function bindLegacyBrowserActions() {
		$("#set-homepage").on("click", function () {
			setHomepage(this);
			return false;
		});

		$("#add-favorite").on("click", function () {
			addFavorite();
			return false;
		});
	}

	function bindSearchPlaceholder() {
		var keywords = ["毕业季", "棱镜门", "iOS 7", "土木专业", "高考志愿", "Google Reader", "斯诺登", "DOTA 2国服", "Windows 8.1", "GTA V", "战地4", "最难就业季", "华为P6", "PS4", "暑期新游", "劳动合同法", "天河二号", "埃及局势"];
		var $input = $("#search-keyword");
		var supportsPlaceholder = "placeholder" in document.createElement("input");
		var currentPlaceholder = "";

		function changePlaceholder() {
			currentPlaceholder = "试试搜索：" + keywords[Math.floor(Math.random() * keywords.length)];
			$input.attr("placeholder", currentPlaceholder);

			if (!supportsPlaceholder) {
				$input.val(currentPlaceholder).addClass("search-placeholder");
			}
		}

		$input.on("focus", function () {
			if (!supportsPlaceholder && $input.val() === currentPlaceholder) {
				$input.val("").removeClass("search-placeholder");
			}
		});

		$input.on("blur", function () {
			if ($input.val() === "") {
				changePlaceholder();
			}
		});

		changePlaceholder();
	}

	function showArticleFromRss() {
		var query = window.location.search || "";
		var parts = query.replace(/^\?/, "").split("&");
		var pair;
		var articleId = "";
		var i;

		for (i = 0; i < parts.length; i++) {
			pair = parts[i].split("=");
			if (pair[0] === "article" && pair[1]) {
				try {
					articleId = decodeURIComponent(pair[1].replace(/\+/g, " "));
				} catch (error) {
					articleId = pair[1];
				}
				break;
			}
		}

		if (articleId && modal) {
			modal.showArticle();
		}
	}

	$(function () {
		updateClock();
		refreshCaptcha();
		renderAllChannels();
		renderFocusNews();
		renderRanking();
		renderForum();
		renderQuestions();
		renderFlashNews();
		bindMoreLinks();
		bindArticleLinks();
		bindNavigation();
		bindMemberActions();
		bindRandomRefresh();
		bindAdvertisement();
		bindCaptcha();
		bindLegacyBrowserActions();
		bindSearchPlaceholder();
		showArticleFromRss();
		window.setInterval(updateClock, 1000);
		window.setInterval(updateOnlineCount, 5000);
		window.setInterval(refreshCaptcha, 60000);
	});
})(window, jQuery);
