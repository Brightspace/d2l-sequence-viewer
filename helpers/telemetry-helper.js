import d2lTelemetryBrowserClient from 'd2l-telemetry-browser-client';

class TelemetryHelper {
	static logTelemetryEvent(id, endpoint) {
		if (!endpoint) {
			return;
		}

		const client = new d2lTelemetryBrowserClient.Client({
			endpoint,
		});

		const eventBody = new d2lTelemetryBrowserClient.EventBody()
			.setAction('Created')
			.setObject(encodeURIComponent(id), 'Sequence Viewer', id);

		const event = new d2lTelemetryBrowserClient.TelemetryEvent()
			.setDate(new Date())
			.setType('TelemetryEvent')
			.setSourceId('learnerexperience')
			.setBody(eventBody);

		client.logUserEvent(event);
	}

	// static logPerformanceEvent() {
	// 	const observer = new PerformanceObserver((entries) => {
	// 		entries.getEntries().forEach((entry) => {
	// 			console.log({entry});
	// 		});
	// 	});
	//
	// 	console.log({observer});
	// }

	static perfMeasure(name, startMark, endmark = name) {
		if (!window.performance || !window.performance.measure) {
			return;
		}

		window.performance.measure(name, startMark, endmark);
	}
	static perfMark(name) {
		if (!window.performance || !window.performance.mark) {
			return;
		}
		window.performance.mark(name);
	}

	static logPerformanceEvent2(id = 'test-id', endpoint = 'test-endpoint') {
		const measures = [];

		if (window.performance && window.performance.getEntriesByType) {
			measures.push(...window.performance.getEntriesByType('measure'));
		}

		console.log({measures});

		// const client = new d2lTelemetryBrowserClient.Client({
		// 	endpoint,
		// });
		//
		// const eventBody = new d2lTelemetryBrowserClient.PerformanceEventBody()
		// 	.setAction('Created')
		// 	.setObject(encodeURIComponent(id), 'Sequence Viewer', id)
		// 	.addUserTiming(measures);
		//
		// const event = new d2lTelemetryBrowserClient.TelemetryEvent()
		// 	.setDate(new Date())
		// 	.setType('PerformanceEvent')
		// 	.setSourceId('learnerexperience')
		// 	.setBody(eventBody);
		//
		// console.log({event});

		// client.logUserEvent(event);
	}
}

export default TelemetryHelper;
