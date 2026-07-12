(function ($) {
	function padNumber(number) {
		return number < 10 ? "0" + number : "" + number;
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

	$(function () {
		updateClock();
		window.setInterval(updateClock, 1000);
		window.setInterval(updateOnlineCount, 5000);
	});
})(jQuery);
