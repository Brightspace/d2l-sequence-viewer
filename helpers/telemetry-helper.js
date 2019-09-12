import d2lTelemetryBrowserClient from 'd2l-telemetry-browser-client';

class TelemetryHelper {
    static logTelemetryEvent(id) {
        const client = new d2lTelemetryBrowserClient.Client({
            endpoint: '123abc',
          });

        console.log({client});

        const eventBody = new d2lTelemetryBrowserClient.EventBody()
            .setAction('Created')
            .setObject(encodeURIComponent(id), 'Article', id);

        const event = new d2lTelemetryBrowserClient.TelemetryEvent()
            .setDate(new Date())
            .setType('TelemetryEvent')
            .setSourceId('activityfeed')
            .setBody(eventBody);

        console.log({event});

        client.logUserEvent(event);

        // log the event here
    }
}

export default TelemetryHelper;