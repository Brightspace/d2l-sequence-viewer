import '@polymer/polymer/polymer-legacy.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-icons/d2l-icons.js';
import 'd2l-icons/tier2-icons.js';
import 'd2l-icons/tier3-icons.js';
import 'd2l-typography/d2l-typography.js';
import 'd2l-sequences/components/d2l-sequences-iterator.js';
import { IronA11yAnnouncer } from '@polymer/iron-a11y-announcer/iron-a11y-announcer.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../localize-behavior.js';
import TelemetryHelper from '../helpers/telemetry-helper';

/**
* @polymer
* @customelement
* @extends Polymer.Element
* @extends Polymer.mixinBehaviors
* @appliesMixin D2L.PolymerBehaviors.Siren.EntityBehavior
*/
class D2LSequenceViewerHeader extends mixinBehaviors([
	D2L.PolymerBehaviors.Siren.EntityBehavior,
	D2L.PolymerBehaviors.SequenceViewer.LocalizeBehavior
],
PolymerElement) {
	static get template() {
		return html`
		<style>
			:host {
				display: flex;
				flex-flow: row wrap;
				align-items: center;
				width: 100%;
				padding-top: 10px;
				padding-bottom: 10px;
				background-color: white;
			}
			.iterator-icon {
				width: 30px;
				font-size: 0px;
				display: block;
			}
			.flyout-divider {
				color: var(--d2l-color-corundum);
				height: 23px;
				width: 23px;
				font-size: 0px;
				display: block;
			}
			.back-to-module {
				@apply --d2l-body-small-text;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				padding-left: 8px;
			}
			.topic-name {
				@apply --d2l-body-compact-text;
				text-align: center;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.pad-side {
				flex: 1 1 0px;
			}
			.pad-mid {
				flex: 0 0 1230px;
				display: flex;
				align-items: center;
			}
			.col1 {
				flex: 0 0 30px;
			}
			.col2 {
				flex: 0 0 30px;
			}
			.col3 {
				flex: 0 0 20px;
			}
			.col4 {
				flex: 0 0 23px;
			}
			.col5 {
				flex: 0 0 8px;
			}
			.col6 {
				flex: 0 0 8px;
			}
			.col7 {
				flex: 0 0 165px;
			}
			.col8 {
				flex: 2 2 200px;
			}
			.col9 {
				flex: 1 1 100px;
			}
			.col10 {
				flex: 0 0 30px;
			}
			.col11 {
				flex: 0 0 20px;
			}
			.col12 {
				flex: 0 0 23px;
			}
			.col13 {
				flex: 0 0 20px;
			}
			.col14 {
				flex: 0 0 30px;
			}
			.col15 {
				flex: 0 0 30px;
			}
			@media(max-width: 1230px) {
				.pad-side {
					flex: 0 0 0px;
				}
				.pad-mid {
					flex: 1 1 300px;
					display: flex;
					align-items: center;
				}
			}
			@media(max-width: 720px) {
				.hidden-small {
					display: none;
				}
				.col1 {
					flex: 0 0 25px;
				}
				.col3 {
					flex: 0 0 0px;
				}
				.col4 {
					flex: 0 0 0px;
				}
				.col5 {
					flex: 0 0 22px;
				}
				.col6 {
					flex: 0 0 0px;
				}
				.col7{
					flex: 0 0 125px;
				}
				.col8 {
					flex: 1 1 0px;
				}
				.col9 {
					flex: 0 0 22px;
				}
				.col11 {
					flex: 0 0 0px;
				}
				.col13 {
					flex: 0 0 0px;
				}
				.col15 {
					flex: 0 0 15px;
				}
			}
			h1 {
				@apply --d2l-body-compact-text;
			}
		</style>
			<div class="pad-side"></div>
			<div class="pad-mid">
				<div class="col1"></div>
					<slot name="d2l-flyout-menu" d2l-flyout-menu="" class="col2"></slot>
				<div class="col3"></div>
				<template is="dom-if" if="[[!isSingleTopicView]]">
					<d2l-icon class="flyout-divider hidden-small col4" icon="d2l-tier2:divider-big"></d2l-icon>
				</template>
				<div class="col5"></div>
				<div class="hidden-small col6">
				</div>
				<div class="back-to-module col7">
					<slot name="d2l-back-to-module"></slot>
				</div>
				<div class="topic-name col8 hidden-small">
				<h1>
					[[currentContentName]]
				</h1>
				</div>
				<div class="col9"></div>
				<template is="dom-if" if="[[!isSingleTopicView]]">
					<d2l-sequences-iterator class="iterator-icon prev-button col10" current-activity="{{href}}" href="[[previousActivityHref]]" token="[[token]]" icon="d2l-tier3:chevron-left-circle" previous="" on-click="_onPreviousPress"></d2l-sequences-iterator>
					<div class="col11"></div>
					<d2l-icon class="flyout-divider col12" icon="d2l-tier2:divider-big"></d2l-icon>
					<div class="col13"></div>
					<d2l-sequences-iterator class="iterator-icon next-button col14" current-activity="{{href}}" href="[[nextActivityHref]]" token="[[token]]" icon="d2l-tier3:chevron-right-circle" next="" on-click="_onNextPress"></d2l-sequences-iterator>
					<div class="col15"></div>
				</template>
			</div>
			<div class="pad-side"></div>
		`;
	}

	static get is() {
		return 'd2l-sequence-viewer-header';
	}
	static get properties() {
		return {
			href: {
				type: String,
				reflectToAttribute: true,
				notify: true
			},
			nextActivityHref: {
				type: String,
				computed: '_getNextActivityHref(entity)'
			},
			previousActivityHref: {
				type: String,
				computed: '_getPreviousActivityHref(entity)'
			},
			isSingleTopicView: {
				type: Boolean,
				value: false
			},
			telemetryClient: {
				type: typeof TelemetryHelper,
				value: new TelemetryHelper()
			},
			currentContentName: {
				type: String,
				computed: '_getCurrentContentName(entity)'
			}
		};
	}
	static get observers() {
		return ['_announceTopic(entity)'];
	}
	connectedCallback() {
		super.connectedCallback();
		IronA11yAnnouncer.requestAvailability();
		this.mode = 'polite';
	}
	_announceTopic() {
		this.fire('iron-announce', {
			text: this.currentContentName
		});
	}

	_getNextActivityHref(entity) {
		const nextActivityHref = entity && entity.getLinkByRel('https://sequences.api.brightspace.com/rels/next-activity') || '';
		return nextActivityHref.href || null;
	}

	_getPreviousActivityHref(entity) {
		const previousActivityHref = entity && entity.getLinkByRel('https://sequences.api.brightspace.com/rels/previous-activity') || '';
		return previousActivityHref.href || null;
	}

	_onPreviousPress() {
		this.telemetryClient.logTelemetryEvent('prev-nav-button');
	}

	_onNextPress() {
		this.telemetryClient.logTelemetryEvent('next-nav-button');
	}
	_getCurrentContentName(entity) {
		const title = entity && entity.properties.title;
		if (title) {
			return title;
		}
		return entity && entity.hasClass('end-of-sequence') && this._getLangTerm('endOfSequence');
	}

	_getLangTerm(langTermKey) {
		return this.localize ? this.localize(langTermKey) : '';
	}
}
customElements.define(D2LSequenceViewerHeader.is, D2LSequenceViewerHeader);
