import '@polymer/polymer/polymer-legacy.js';
import 'd2l-localize-behavior/d2l-localize-behavior.js';

/* eslint-disable */
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.SequenceViewer = window.D2L.PolymerBehaviors.SequenceViewer || {};
/**
 * THIS FILE IS GENERATED. RUN `npm run build:lang` TO REGENERATE.
 * Localizes the SequenceViewer component.
 * @polymerBehavior D2L.PolymerBehaviors.SequenceViewer.LocalizeBehavior
 */
D2L.PolymerBehaviors.SequenceViewer.LocalizeBehaviorImpl = {
	properties: {
		/**
		 * Localization resources.
		 */
		resources: {
			value: function() {
				return {"ar":{},"de":{},"en":{"backToContent":"Back to Content","toggleNavMenu":"Toggle navigational slide out sidebar","goBack":"Go Back","activity":"Activity","endOfSequence":"End of Unit"},"es":{},"fr":{},"ja":{},"ko":{},"nb":{},"nl":{},"pt":{},"sv":{},"tr":{},"zh-TW":{},"zh":{}};
			}
		}
	}
};

/** @polymerBehavior D2L.PolymerBehaviors.SequenceViewer.LocalizeBehavior */
D2L.PolymerBehaviors.SequenceViewer.LocalizeBehavior = [
	D2L.PolymerBehaviors.LocalizeBehavior,
	D2L.PolymerBehaviors.SequenceViewer.LocalizeBehaviorImpl
];
