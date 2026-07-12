(function (window) {
	function getArray(data) {
		return data && typeof data.length === "number" ? data : [];
	}

	function randomInt(minimum, maximum) {
		return minimum + Math.floor(Math.random() * (maximum - minimum + 1));
	}

	function sample(data, count) {
		var source = getArray(data);
		var copy = [];
		var result = [];
		var swapIndex;
		var swapValue;
		var i;

		for (i = 0; i < source.length; i++) {
			copy.push(source[i]);
		}

		for (i = copy.length - 1; i > 0; i--) {
			swapIndex = randomInt(0, i);
			swapValue = copy[i];
			copy[i] = copy[swapIndex];
			copy[swapIndex] = swapValue;
		}

		for (i = 0; i < copy.length && i < count; i++) {
			result.push(copy[i]);
		}

		return result;
	}

	window.PORTAL_RANDOM = {
		randomInt: randomInt,
		sample: sample
	};
})(window);
