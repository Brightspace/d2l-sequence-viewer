import d2lTelemetryBrowserClient from 'd2l-telemetry-browser-client';
import PerformanceHelper from './performance-helper.js';

class TelemetryHelper {
	constructor(endpoint) {
		this._client = !!endpoint && new d2lTelemetryBrowserClient.Client({endpoint});
	}

	_createEvent(eventType, eventBody) {
		return new d2lTelemetryBrowserClient.TelemetryEvent()
			.setDate(new Date())
			.setType(eventType)
			.setSourceId('learnerexperience')
			.setBody(eventBody);
	}

	logTelemetryEvent(id) {
		if (!this._client) {
			return;
		}

		const eventBody = new d2lTelemetryBrowserClient.EventBody()
			.setAction('Created')
			.setObject(encodeURIComponent(id), 'Sequence Viewer', id);

		const event = this._createEvent('TelemetryEvent', eventBody);

		this._client.logUserEvent(event);
	}

	logPerformanceEvent(id, measureName) {
		if (!this._client || !window.performance || !window.performance.getEntriesByName) {
			return;
		}

		const measures = PerformanceHelper.getPerformanceMeasureByName(measureName);

		const eventBody = new d2lTelemetryBrowserClient.PerformanceEventBody()
			.setAction('Created')
			.setObject(encodeURIComponent(id), 'Sequence Viewer', id)
			.addUserTiming(measures);

		const event = this._createEvent('PerformanceEvent', eventBody);

		this._client.logUserEvent(event);

		PerformanceHelper.clearMeasure(measureName);
	}
}

export default TelemetryHelper;
