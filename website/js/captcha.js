(function (window, $) {
	function refresh() {
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

	function init() {
		refresh();

		$("#captcha-code")
			.on("click", function () {
				refresh();
				return false;
			})
			.on("selectstart copy cut contextmenu", function () {
				return false;
			});

		window.setInterval(refresh, 60000);
	}

	window.PORTAL_CAPTCHA = {
		init: init,
		refresh: refresh
	};
})(window, jQuery);
