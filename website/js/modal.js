(function (window, $) {
	var modalReady = false;

	function buildModal() {
		var html = [];

		if (modalReady) {
			return;
		}

		html.push('<div id="portal-mask" class="portal-mask"></div>');
		html.push('<div id="portal-modal" class="portal-modal">');
		html.push('<div class="portal-modal-title"><strong id="portal-modal-title">系统提示</strong><a href="#" class="js-modal-close">×</a></div>');
		html.push('<div class="portal-modal-body" id="portal-modal-body"></div>');
		html.push('<div class="portal-modal-actions" id="portal-modal-actions"></div>');
		html.push("</div>");

		$("body").append(html.join(""));
		modalReady = true;

		$(document).on("click", ".js-modal-close", function () {
			closeModal();
			return false;
		});

		$(document).on("click", "#portal-mask", function () {
			closeModal();
		});

		$(document).on("click", ".js-modal-login", function () {
			showLoginMaintenance();
			return false;
		});

		$(document).on("click", ".js-modal-register", function () {
			showRegister();
			return false;
		});

		$(window).on("resize scroll", positionModal);
	}

	function positionModal() {
		var $modal;
		var top;
		var left;

		if (!modalReady || !$("#portal-modal").is(":visible")) {
			return;
		}

		$modal = $("#portal-modal");
		top = $(window).scrollTop() + Math.max(45, Math.floor(($(window).height() - $modal.outerHeight()) / 2));
		left = $(window).scrollLeft() + Math.max(10, Math.floor(($(window).width() - $modal.outerWidth()) / 2));

		$modal.css({
			top: top + "px",
			left: left + "px"
		});

		$("#portal-mask").css({
			width: Math.max($(document).width(), $(window).width()) + "px",
			height: Math.max($(document).height(), $(window).height()) + "px"
		});
	}

	function openModal(title, lines, showMemberActions) {
		var bodyHtml = [];
		var actionHtml;
		var i;

		buildModal();

		for (i = 0; i < lines.length; i++) {
			bodyHtml.push("<p>" + lines[i] + "</p>");
		}

		if (showMemberActions) {
			actionHtml = '<input type="button" class="modal-button primary-button js-modal-login" value="登 录" /> <input type="button" class="modal-button js-modal-register" value="注 册" /> <input type="button" class="modal-button js-modal-close" value="关 闭" />';
		} else {
			actionHtml = '<input type="button" class="modal-button primary-button js-modal-close" value="确 定" />';
		}

		$("#portal-modal-title").text(title);
		$("#portal-modal-body").html(bodyHtml.join(""));
		$("#portal-modal-actions").html(actionHtml);
		$("#portal-mask").show();
		$("#portal-modal").show();
		positionModal();
	}

	function closeModal() {
		if (!modalReady) {
			return;
		}

		$("#portal-modal").hide();
		$("#portal-mask").hide();
	}

	function showArticle() {
		openModal("文章访问提示", ["该文章需要登录后阅读全文", "华夏资讯网会员系统正在升级维护"], true);
	}

	function showMore() {
		openModal("游客阅读提示", ["您正在浏览摘要内容", "登录后可查看全部文章"], true);
	}

	function showChannel(channelName) {
		openModal(channelName + "频道", ["请先登录用户", "登录后可以访问完整频道"], true);
	}

	function showRegister() {
		openModal("注册提示", ["抱歉，注册系统维护中，暂不开放。"], false);
	}

	function showLoginMaintenance() {
		openModal("登录提示", ["抱歉，用户系统维护中，暂时无法登录。"], false);
	}

	function showPasswordMaintenance() {
		openModal("密码找回", ["密码找回功能正在升级，请联系网站管理员。"], false);
	}

	window.PORTAL_MODAL = {
		showArticle: showArticle,
		showMore: showMore,
		showChannel: showChannel,
		showRegister: showRegister,
		showLoginMaintenance: showLoginMaintenance,
		showPasswordMaintenance: showPasswordMaintenance,
		close: closeModal
	};
})(window, jQuery);
