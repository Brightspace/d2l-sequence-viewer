import '@polymer/polymer/polymer-legacy.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-icons/d2l-icons.js';
import 'd2l-icons/tier2-icons.js';
import 'd2l-icons/tier3-icons.js';
import 'd2l-typography/d2l-typography.js';
import 'd2l-sequences/components/d2l-sequences-iterator.js';
import 'd2l-sequences/components/d2l-sequences-topic-name.js';
import { IronA11yAnnouncer } from '@polymer/iron-a11y-announcer/iron-a11y-announcer.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
/**
* @polymer
* @customelement
* @extends Polymer.Element
* @extends Polymer.mixinBehaviors
* @appliesMixin D2L.PolymerBehaviors.Siren.EntityBehavior
*/
class D2LSequenceViewerHeader extends mixinBehaviors([D2L.PolymerBehaviors.Siren.EntityBehavior], PolymerElement) {
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
				flex: 0 0 40px;
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
				flex: 0 0 20px;
			}
			.col6 {
				flex: 0 0 23px;
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
					visibility: hidden;
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
		</style>
			<div class="pad-side"></div>
			<div class="pad-mid">
				<div class="col1"></div>
					<slot name="d2l-flyout-menu" d2l-flyout-menu="" class="col2"></slot>
				<div class="col3"></div>
				<d2l-icon class="flyout-divider hidden-small col4" icon="d2l-tier2:divider-big"></d2l-icon>
				<div class="col5"></div>
				<div class="hidden-small col6">
				</div>
				<div class="back-to-module col7">
					<slot name="d2l-back-to-module"></slot>
				</div>
				<d2l-sequences-topic-name id="topicName" class="topic-name col8 hidden-small" href="[[href]]" token="[[token]]" role="heading"></d2l-sequences-topic-name>
				<div class="col9"></div>
				<d2l-sequences-iterator class="iterator-icon prev-button col10" href="{{href}}" token="[[token]]" icon="d2l-tier3:chevron-left-circle" previous=""></d2l-sequences-iterator>
				<div class="col11"></div>
				<d2l-icon class="flyout-divider col12" icon="d2l-tier2:divider-big"></d2l-icon>
				<div class="col13"></div>
				<d2l-sequences-iterator class="iterator-icon next-button col14" href="{{href}}" token="[[token]]" icon="d2l-tier3:chevron-right-circle" next=""></d2l-sequences-iterator>
				<div class="col15"></div>
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
			text: this.$.topicName.innerText.trim()
		});
	}
}
customElements.define(D2LSequenceViewerHeader.is, D2LSequenceViewerHeader);
