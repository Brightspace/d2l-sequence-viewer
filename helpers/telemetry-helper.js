import d2lTelemetryBrowserClient from 'd2l-telemetry-browser-client';
import PerformanceHelper from './performance-helper';

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

	static logPerformanceEvent(id, measureName, endpoint) {
		if (!endpoint || !window.performance || !window.performance.getEntriesByName) {
			return;
		}

		const measures = window.performance.getEntriesByName(measureName);

		const client = new d2lTelemetryBrowserClient.Client({
			endpoint,
		});

		const eventBody = new d2lTelemetryBrowserClient.PerformanceEventBody()
			.setAction('Created')
			.setObject(encodeURIComponent(id), 'Sequence Viewer', id)
			.addUserTiming(measures);

		const event = new d2lTelemetryBrowserClient.TelemetryEvent()
			.setDate(new Date())
			.setType('PerformanceEvent')
			.setSourceId('learnerexperience')
			.setBody(eventBody);

		client.logUserEvent(event);

		PerformanceHelper.clearMeasure(measureName);
	}
}

export default TelemetryHelper;
