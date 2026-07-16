(function (window, $) {
	function showNotice(title, message) {
		var modal = window.PORTAL_MODAL;

		if (modal && modal.showNotice) {
			modal.showNotice(title, message);
		} else {
			window.alert(message);
		}
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

	function bindSearchActions() {
		$(".site-search form").on("submit", function () {
			var keyword = $("#search-keyword").val();

			if ($("#search-keyword").hasClass("search-placeholder")) {
				keyword = "";
			}

			if (!keyword) {
				showNotice("站内搜索", "请输入要搜索的关键词。");
			} else {
				showNotice("站内搜索", "正在搜索“" + keyword + "”，搜索服务正在升级维护。");
			}

			return false;
		});

		$(".js-advanced-search").on("click", function () {
			showNotice("高级搜索", "高级搜索功能正在升级维护。");
			return false;
		});
	}

	function bindSurveyActions() {
		$(".survey-module .small-button").on("click", function () {
			var $selected = $('.survey-module input[name="survey"]:checked');

			if (!$selected.length) {
				showNotice("今日调查", "请先选择一个调查选项。");
			} else {
				showNotice("今日调查", "投票系统维护中，您的选择暂时无法提交。");
			}

			return false;
		});

		$(".js-survey-results").on("click", function () {
			showNotice("调查结果", "调查结果统计系统正在升级维护。");
			return false;
		});
	}

	function bindNoticeLinks() {
		$(document).on("click", ".js-notice-link", function () {
			showNotice($(this).attr("data-notice-title") || "系统提示", $(this).attr("data-notice-message") || "该功能正在建设中。");
			return false;
		});

		$(".service-grid a").on("click", function () {
			showNotice("便民服务", $(this).text() + "服务正在升级维护。");
			return false;
		});

		$(".site-services a, .sub-nav a, .friend-links a, .portal-footer a").on("click", function () {
			showNotice($(this).text(), "该栏目正在建设中。");
			return false;
		});

		$(".flash-news > a").on("click", function () {
			showNotice("滚动新闻", "登录后可以查看完整滚动新闻。");
			return false;
		});

		$(".service-module .module-title > a").on("click", function () {
			showNotice("便民服务", "更多便民服务正在建设中。");
			return false;
		});

		$(".education-module > .module-title > a").on("click", function () {
			showNotice("教育频道", "教育频道页面正在建设中。");
			return false;
		});

		$(".survey-module .module-title > a").on("click", function () {
			showNotice("往期调查", "往期调查页面正在建设中。");
			return false;
		});
	}

	function init() {
		bindSearchPlaceholder();
		bindSearchActions();
		bindSurveyActions();
		bindNoticeLinks();
	}

	window.PORTAL_SITE_TOOLS = {
		init: init
	};
})(window, jQuery);
