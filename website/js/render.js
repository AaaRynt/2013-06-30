(function (window, $) {
	function getArray(data) {
		return data && typeof data.length === "number" ? data : [];
	}

	function escapeHtml(text) {
		return String(text || "")
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;");
	}

	function getTypeName(type) {
		var typeNames = {
			"hard-news": "新闻",
			analysis: "分析",
			explainer: "解读",
			impact: "影响",
			reaction: "回应",
			human: "人物",
			scene: "现场",
			service: "服务",
			comparison: "对比",
			rumor: "传闻",
			review: "盘点",
			guide: "指南",
			controversy: "争议",
			question: "问答",
			advert: "广告"
		};

		return typeNames[type] || "资讯";
	}

	function getTypeClass(type) {
		var typeClasses = {
			"hard-news": "news-type-hard-news",
			analysis: "news-type-analysis",
			explainer: "news-type-explainer",
			impact: "news-type-impact",
			reaction: "news-type-reaction",
			human: "news-type-human",
			scene: "news-type-scene",
			service: "news-type-service",
			comparison: "news-type-comparison",
			rumor: "news-type-rumor",
			review: "news-type-review",
			guide: "news-type-guide",
			controversy: "news-type-controversy",
			question: "news-type-question",
			advert: "news-type-advert"
		};

		return typeClasses[type] || "news-type-default";
	}

	function getArticleLink(item) {
		return '<a href="#" class="js-article-link">' + escapeHtml(item && item.title) + "</a>";
	}

	function renderNewsList(selector, data, limit, options) {
		var items = getArray(data);
		var settings = options || {};
		var layout = settings.layout || "plain";
		var startIndex = settings.startIndex || 0;
		var endIndex = Math.min(items.length, startIndex + limit);
		var channelLabel = settings.channelLabel || "资讯";
		var html = [];
		var item;
		var typeLabel;
		var i;

		for (i = startIndex; i < endIndex; i++) {
			item = items[i] || {};
			typeLabel = getTypeName(item.headlineType);

			if (layout === "dated") {
				html.push("<li>" + getArticleLink(item) + "<span>" + escapeHtml(item.date || "--/--") + "</span></li>");
			} else if (layout === "center") {
				html.push("<li" + (i === startIndex ? ' class="important"' : "") + "><span>[" + escapeHtml(channelLabel) + "]</span>" + getArticleLink(item) + "<em>" + escapeHtml(item.date || "--/--") + "</em></li>");
			} else if (layout === "party") {
				html.push("<li>" + getArticleLink(item) + "</li>");
			} else {
				html.push('<li><span class="news-type ' + getTypeClass(item.headlineType) + '">[' + escapeHtml(typeLabel) + "]</span>" + getArticleLink(item) + "</li>");
			}
		}

		if (!html.length) {
			html.push('<li class="empty-data">本栏目数据暂未更新</li>');
		}

		$(selector).html(html.join(""));
	}

	function renderHeadline(selector, data, index) {
		var items = getArray(data);
		var itemIndex = typeof index === "number" ? index : 0;

		if (items[itemIndex]) {
			$(selector).html(getArticleLink(items[itemIndex]));
		} else {
			$(selector).html('<span class="empty-data">本栏目数据暂未更新</span>');
		}
	}

	function renderFocus(titleSelector, relatedSelector, data) {
		var items = getArray(data);
		var related = [];
		var i;

		if (!items.length) {
			$(titleSelector).html('<span class="empty-data">焦点内容暂未更新</span>');
			$(relatedSelector).empty();
			return;
		}

		$(titleSelector).html(getArticleLink(items[0]));

		for (i = 1; i < items.length && i < 5; i++) {
			related.push(getArticleLink(items[i]));
		}

		$(relatedSelector).html(related.join("　"));
	}

	function renderRank(selector, items) {
		var data = getArray(items);
		var html = [];
		var i;

		for (i = 0; i < data.length && i < 5; i++) {
			html.push("<li" + (i < 3 ? ' class="rank-top"' : "") + "><em>" + (i + 1) + "</em>" + getArticleLink(data[i]) + "</li>");
		}

		$(selector).html(html.join(""));
	}

	function getForumViews(item) {
		var comments = parseInt(item && item.comments, 10) || 0;
		var titleLength = item && item.title ? item.title.length : 10;

		return 680 + comments * 13 + titleLength * 29;
	}

	function renderForumList(selector, items) {
		var data = getArray(items);
		var columns = [[], []];
		var item;
		var columnIndex;
		var comments;
		var html;
		var i;

		for (i = 0; i < data.length && i < 8; i++) {
			item = data[i] || {};
			comments = parseInt(item.comments, 10) || 0;
			columnIndex = i < 4 ? 0 : 1;
			columns[columnIndex].push('<li class="forum-entry"><a href="#" class="js-forum-post">' + escapeHtml(item.title) + "</a><p>网友：" + escapeHtml(item.user || "匿名网友") + "　浏览：" + getForumViews(item) + " 回复：" + comments + "</p></li>");
		}

		html = '<ul class="news-list community-list">' + columns[0].join("") + '</ul><ul class="news-list community-list second">' + columns[1].join("") + "</ul>";
		$(selector).html(html);
	}

	function renderQuestionList(selector, items) {
		var data = getArray(items);
		var html = [];
		var item;
		var answers;
		var views;
		var follows;
		var i;

		for (i = 0; i < data.length && i < 5; i++) {
			item = data[i] || {};
			answers = parseInt(item.comments, 10) || 0;
			views = 920 + answers * 17 + (item.title ? item.title.length * 31 : 0);
			follows = Math.max(3, Math.floor(answers / 4));
			html.push('<li class="question-entry"><a href="#" class="js-question-post">' + escapeHtml(item.title) + "</a><p>回答：" + answers + "　浏览：" + views + "　关注：" + follows + "</p></li>");
		}

		$(selector).html('<ul class="news-list question-list">' + html.join("") + "</ul>");
	}

	window.PORTAL_RENDER = {
		renderNewsList: renderNewsList,
		renderHeadline: renderHeadline,
		renderFocus: renderFocus,
		renderRank: renderRank,
		renderForumList: renderForumList,
		renderQuestionList: renderQuestionList
	};

	window.renderNewsList = renderNewsList;
})(window, jQuery);
