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

		if (window.PORTAL_ADVERTISEMENT) {
			window.PORTAL_ADVERTISEMENT.init();
		}

		if (window.PORTAL_CAPTCHA) {
			window.PORTAL_CAPTCHA.init();
		}

		if (window.PORTAL_LEGACY) {
			window.PORTAL_LEGACY.init();
		}

		if (window.PORTAL_SITE_TOOLS) {
			window.PORTAL_SITE_TOOLS.init();
		}

		showArticleFromRss();
		window.setInterval(updateClock, 1000);
		window.setInterval(updateOnlineCount, 5000);
	});
})(window, jQuery);
