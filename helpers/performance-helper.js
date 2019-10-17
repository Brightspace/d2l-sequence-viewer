export function perfMeasure(measureName, startMark, endMark) {
	if (!window.performance || !window.performance.measure || window.performance.getEntriesByName(measureName).length) {
		return;
	}

	window.performance.measure(measureName, startMark, endMark);
	clearMarks([startMark, endMark]);
}

export function clearMeasure(measureName) {
	if (!window.performance || !window.performance.clearMeasures) {
		return;
	}

	window.performance.clearMeasures(measureName);
}

export function perfMark(markName) {
	if (!window.performance || !window.performance.mark) {
		return;
	}

	window.performance.mark(markName);
}

function clearMarks(markNames) {
	if (!window.performance || !window.performance.clearMeasures) {
		return;
	}

	markNames.forEach((mark) => window.performance.clearMarks(mark));
}
