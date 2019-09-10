import 'd2l-telemetry-browser-client/d2l-telemetry-browser-client.js';

/* eslint-disable */
    window.D2L = window.D2L || {};
    window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
    window.D2L.PolymerBehaviors.SequenceViewer = window.D2L.PolymerBehaviors.SequenceViewer || {};
/**
 * Behavior for sending telemetry messages to the telemetry service
 * @polymerBehavior
 */
D2L.PolymerBehaviors.SequenceViewer.TelemtryBehaviorImpl = {

    _doSomething: function() {
        console.log({hi: 'something'});
    },
};

/** @polymerBehavior D2L.PolymerBehaviors.SequenceViewer.TelemetryBehavior */
D2L.PolymerBehaviors.SequenceViewer.TelemetryBehavior = [
	D2L.PolymerBehaviors.TelemetryBehavior,
	D2L.PolymerBehaviors.SequenceViewer.TelemtryBehaviorImpl
];