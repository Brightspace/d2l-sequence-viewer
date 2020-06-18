import '@polymer/polymer/polymer-legacy.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-icons/d2l-icons.js';
import 'd2l-typography/d2l-typography.js';
import { IronA11yAnnouncer } from '@polymer/iron-a11y-announcer/iron-a11y-announcer.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import './d2l-sequence-viewer-iterator.js';
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
			#container {
				display: flex;
				align-items: center;
			}
			#header-left {
				display: flex;
				flex: 1;
			}
			:host([is-sidebar-closed]) #header-left-inner {
				max-width: 260px;
				border-right: none;
				box-shadow: none;
			}
			#header-left-inner {
				display: flex;
				flex: 1;
				z-index: 2;
				background: white;
				max-width: 570px;
				border-right: 1px solid #00000029;
				box-shadow: 2px 0 12px #00000029;
				-webkit-transition: max-width 0.4s ease-in-out;
				-moz-transition: max-width 0.4s ease-in-out;
				-o-transition: max-width 0.4s ease-in-out;
				transition: max-width 0.4s ease-in-out;
			}
			#header-right {
				display: flex;
				flex: 1;
				justify-content: flex-end;
				align-items: center;
			}
			#header-right .flyout-divider {
				padding: 0 24px;
			}
			#header-right d2l-sequence-viewer-iterator.next-button {
				padding-right: 24px;
			}
			.back-to-module {
				@apply --d2l-body-small-text;
				padding-left: 24px;
				margin-left: 0;
			}
			.flyout-menu {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-left: auto;
			}
			.d2l-flyout-menu {
				padding: 0 24px 0 15px;
			}
			.topic-name {
				@apply --d2l-body-compact-text;
				text-align: center;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				flex: 1;
			}
			.flyout-divider {
				color: var(--d2l-color-corundum);
			}
			@media(max-width: 929px) {
				.hidden-small {
					display: none;
				}
				#header-left {
					position: absolute;
					min-width: var(--sidebar-min-width);
					width: var(--sidebar-absolute-width);
				}
			}
			@media(max-width: 435px) {
				:host([is-sidebar-closed]) #header-left-inner {
					max-width: 130px;
				}
			}
			h1 {
				@apply --d2l-body-compact-text;
			}
		</style>
			<div id="container">
				<div id="header-left">
					<div id="header-left-inner">
						<div class="back-to-module">
							<slot name="d2l-back-to-module"></slot>
						</div>
						<div class="flyout-menu">
							<template is="dom-if" if="[[!isSingleTopicView]]">
								<d2l-icon class="flyout-divider" icon="d2l-tier2:divider-big"></d2l-icon>
								<div class="d2l-flyout-menu">
									<slot name="d2l-flyout-menu" d2l-flyout-menu=""></slot>
								</div>
							</template>
						</div>
					</div>
				</div>
				<div class="topic-name hidden-small">
					<h1>[[currentContentName]]</h1>
				</div>
				<div id="header-right">
					<template is="dom-if" if="[[!isSingleTopicView]]">
						<d2l-sequence-viewer-iterator class="iterator-icon prev-button" current-activity="{{href}}" href="[[previousActivityHref]]" token="[[token]]" icon="d2l-tier3:chevron-left-circle" previous="" on-click="_onPreviousPress"></d2l-sequence-viewer-iterator>
						<d2l-icon class="flyout-divider" icon="d2l-tier2:divider-big"></d2l-icon>
						<d2l-sequence-viewer-iterator class="iterator-icon next-button" current-activity="{{href}}" href="[[nextActivityHref]]" token="[[token]]" icon="d2l-tier3:chevron-right-circle" next="" on-click="_onNextPress"></d2l-sequence-viewer-iterator>
					</template>
				</div>
			</div>
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
				value: function() {
					return new TelemetryHelper();
				}
			},
			currentContentName: {
				type: String,
				computed: '_getCurrentContentName(entity)'
			},
			isSidebarClosed: {
				type: Boolean,
				value: true,
				reflectToAttribute: true
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
