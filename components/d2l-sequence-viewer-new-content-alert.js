import 'd2l-typography/d2l-typography.js';
import 'd2l-colors/d2l-colors.js';
import '../localize-behavior.js';
import '@brightspace-ui/core/components/button/button-icon.js';
import '@polymer/polymer/polymer-legacy.js';
import { D2LPoller } from 'd2l-poller/d2l-poller.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

/**
 * @polymer
 * @customElement
 * @extends Polymer.Element
 * @extends Polymer.mixinBehaviors
 * @appliesMixin D2L.PolymerBehaviors.SequenceViewer.LocalizeBehavior
 */

class D2LSequenceViewerNewContentAlert extends mixinBehaviors([
	D2L.PolymerBehaviors.SequenceViewer.LocalizeBehavior
], PolymerElement) {
	static get template() {
		return html`
			<custom-style include="d2l-typography">
				<style is="custom-style" include="d2l-typography">
					:host {
						display: none;
						width: calc(100% - 36px);
						max-width: 400px;
						position: absolute;
						z-index: 1;
						left: 50%;
						transform: translateX(-50%);
						bottom: 15%;
					}

					:host([new-content-released]) {
						display: inline-block !important;
						visibility: visible;
					}

					#new-content-alert {
						--d2l-alert-icon-dimensions: 18px;
						background: white;
						border: 1px solid var(--d2l-color-titanius);
						border-left: 6px solid var(--d2l-color-celestine);
						border-radius: 7px;
						padding: 12px var(--d2l-alert-icon-dimensions) 12px 30px;
						display: flex;
						align-items: center;
						justify-content: space-between;
					}

					:host(:dir(rtl)) #new-content-alert {
						border-left: 2px solid var(--d2l-color-titanius);
						border-right: 6px solid var(--d2l-color-celestine);
						padding-right: 30px;
						padding-left: var(--d2l-alert-icon-dimensions);
					}

					#new-content-alert-message {
						display: flex;
						flex-direction: column;
						max-width: calc(100% - var(--d2l-alert-icon-dimensions) - var(--d2l-alert-icon-dimensions));
						width: 100%;
						word-break: break-word;
					}

					:host([is-single-link]) #new-content-alert-message {
						flex-direction: row;
					}

					@media screen and (max-width: 767px) {
						:host {
							--d2l-alert-icon-dimensions: 24px;
						}

						#new-content-alert-message div,a.alert-link {
							padding: 4px 0;
							align-self: center;
							text-align: center;
						}

						:host([is-single-link]) #new-content-alert-message {
							flex-direction: column;
						}
					}

					@media screen and (min-width: 768px) {
						:host([is-single-link]) {
							max-width: 615px;
						}
						:host([is-single-link]) a.alert-link {
							margin: 0 0.5rem;
						}
					}
				</style>
			</custom-style>
			<div id="new-content-alert">
				<div id="new-content-alert-message">
					<div>[[localize('newContentAvailable')]]</div>
					<template is="dom-if" if="[[!isSingleLink]]">
						<template is="dom-repeat" items="[[_newContent]]">
							<a class="alert-link" href="[[item.href]]" tabindex="1">
								[[item.name]]
							</a>
						</template>
					</template>
					<template is="dom-if" if="[[isSingleLink]]">
						<a class="alert-link" href="[[_firstContent.href]]" tabindex="1">
							[[localize('contentLinkText')]]
						</a>
					</template>
				</div>
				<d2l-button-icon
					tabindex="1"
					icon="tier1:close-default"
					text="[[localize('close')]]"
					on-tap="_dismissAlert">
				</d2l-button-icon>
			</div>
		`;
	}

	static get is() {
		return 'd2l-sequence-viewer-new-content-alert';
	}

	static get properties() {
		return {
			token: String,
			latestMetSetEndpoint: String,
			newContentReleased: {
				type: Boolean,
				reflectToAttribute: true,
				computed: '_isNewContentReleased(_newContent)'
			},
			isSingleLink: {
				type: Boolean,
				reflectToAttribute: true,
				computed: '_hasSingleLink(_newContent)'
			},
			hrefForObserving: String,
			_newContent: {
				type: Array,
				value: []
			},
			_firstContent: {
				type: Object,
				computed: '_getFirstContent(_newContent)'
			},
			_poller: Object,
			_pollIncrement: {
				type: Number,
				value: 5000
			},
			_pollMax: {
				type: Number,
				value: 60000
			},
			_pollInterval: {
				type: Number,
				value: 0
			}
		};
	}

	static get observers() {
		return ['_resetPolling(hrefForObserving)'];
	}

	constructor() {
		super();
		this._poller = new D2LPoller();
		this._resetPolling = this._resetPolling.bind(this);
		this._stopPolling = this._stopPolling.bind(this);
		this._poll = this._poll.bind(this);
	}

	connectedCallback() {
		super.connectedCallback();
		window.addEventListener('d2l-poll', this._poll);
		window.addEventListener('focus', this._resetPolling);
		window.addEventListener('blur', this._stopPolling);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this._stopPolling();
		window.removeEventListener('d2l-poll', this._poll);
		window.removeEventListener('focus', this._resetPolling);
		window.removeEventListener('blur', this._stopPolling);
	}

	_isNewContentReleased(newContent) {
		return newContent.length > 0;
	}

	_getFirstContent([first]) {
		return first;
	}

	_hasSingleLink(newContent) {
		return newContent.length === 1;
	}

	async _resetPolling() {
		this._pollInterval = 0;
		await this._poll();
	}

	_stopPolling() {
		this._poller.teardownPolling();
	}

	async _poll() {
		await this._fetchLatestReleasedContent();
		if (this._pollInterval < this._pollMax) {
			this._pollInterval += this._pollIncrement;
			this._poller.setupPolling(this._pollInterval);
		}
	}

	_dismissAlert() {
		this._newContent = [];
	}

	async _fetchLatestReleasedContent() {
		if (this.latestMetSetEndpoint) {
			await window.D2L.Siren.EntityStore.fetch(this.latestMetSetEndpoint, this.token, true)
				.then(({ entity }) => {
					if (entity.properties.newConditionsSetsAreMet) {
						const newContentEntities = entity.getSubEntitiesByRel('newly-released-object');
						const newContent = newContentEntities
							.map(content => {
								return {
									href: content.getLinkByRel('self').href,
									name: content.properties.name
								};
							});

						this._newContent = [...this._newContent, ...newContent]
							.filter((content, index, self) => self.findIndex(c => c.href === content.href) === index);
					}

					this.latestMetSetEndpoint = entity.getLinkByRel('next').href;
				});
		}
	}
}

customElements.define(D2LSequenceViewerNewContentAlert.is, D2LSequenceViewerNewContentAlert);
