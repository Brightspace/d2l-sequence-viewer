import d2lTelemetryBrowserClient from 'd2l-telemetry-browser-client';
import PerformanceHelper from './performance-helper';

class TelemetryHelper {
	static _createClient(endpoint) {
		return new d2lTelemetryBrowserClient.Client({endpoint});
	}

	static _createEvent(eventType, eventBody) {
		return new d2lTelemetryBrowserClient.TelemetryEvent()
			.setDate(new Date())
			.setType(eventType)
			.setSourceId('learnerexperience')
			.setBody(eventBody);
	}

	static logTelemetryEvent(id, endpoint) {
		if (!endpoint) {
			return;
		}

		const client = this._createClient(endpoint);

		const eventBody = new d2lTelemetryBrowserClient.EventBody()
			.setAction('Created')
			.setObject(encodeURIComponent(id), 'Sequence Viewer', id);

		const event = this._createEvent('TelemetryEvent', eventBody);

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

		const event = this._createEvent('PerformanceEvent', eventBody);

		client.logUserEvent(event);

		PerformanceHelper.clearMeasure(measureName);
	}
}

export default TelemetryHelper;
