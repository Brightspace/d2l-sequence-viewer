import d2lTelemetryBrowserClient from 'd2l-telemetry-browser-client';

class TelemetryHelper {
	static logTelemetryEvent(id, endpoint) {
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
}

export default TelemetryHelper;
