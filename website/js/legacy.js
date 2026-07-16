(function (window, $) {
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

	function init() {
		$("#set-homepage").on("click", function () {
			setHomepage(this);
			return false;
		});

		$("#add-favorite").on("click", function () {
			addFavorite();
			return false;
		});
	}

	window.PORTAL_LEGACY = {
		init: init
	};
})(window, jQuery);
