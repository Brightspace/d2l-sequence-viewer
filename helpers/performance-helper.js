class PerformanceHelper {
	static perfMeasure(measureName, startMark, endMark) {
		if (!window.performance || !window.performance.measure || window.performance.getEntriesByName(measureName).length) {
			return;
		}

		window.performance.measure(measureName, startMark, endMark);
		this.clearMarks([startMark, endMark]);
	}

	static clearMeasure(measureName) {
		if (!window.performance || !window.performance.clearMeasures) {
			return;
		}

		window.performance.clearMeasures(measureName);
	}

	static perfMark(markName) {
		if (!window.performance || !window.performance.mark) {
			return;
		}

		window.performance.mark(markName);
	}

	static clearMarks(markNames) {
		if (!window.performance || !window.performance.clearMeasures) {
			return;
		}

		markNames.forEach((mark) => window.performance.clearMarks(mark));
	}
}

export default PerformanceHelper;
