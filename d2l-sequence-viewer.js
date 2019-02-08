import 'd2l-typography/d2l-typography.js';
import 'd2l-colors/d2l-colors.js';
import './components/sequence-viewer-header.js';
import './localize-behavior.js';
import '@polymer/polymer/polymer-legacy.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-link/d2l-link.js';
import 'd2l-sequence-navigator/d2l-sequence-navigator.js';
import 'd2l-sequence-navigator/components/d2l-lesson-header.js';
import 'd2l-sequence-navigator/components/d2l-sequence-end.js';
import 'd2l-sequences/components/d2l-sequences-content-router.js';
import 'd2l-navigation/d2l-navigation-button-notification-icon.js';
import 'd2l-navigation/d2l-navigation-band.js';
import 'd2l-navigation/d2l-navigation-link-back.js';
import 'polymer-frau-jwt/frau-jwt-local.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

/*
* @polymer
* @extends Polymer.Element
* @appliesMixin D2L.PolymerBehaviors.Siren.EntityBehavior
* @appliesMixin D2L.PolymerBehaviors.SequenceViewer.LocalizeBehavior
*/
class D2LSequenceViewer extends mixinBehaviors([
	D2L.PolymerBehaviors.Siren.EntityBehavior,
	D2L.PolymerBehaviors.Siren.SirenActionBehaviorImpl,
	D2L.PolymerBehaviors.SequenceViewer.LocalizeBehavior
], PolymerElement) {
	static get template() {
		return html`
		<custom-style include="d2l-typography">
			<style is="custom-style" include="d2l-typography">
				:host {
					--viewer-max-width: 1170px;
					--sidebar-position: calc(50% - var(--viewer-max-width) / 2);

					display: block;
					color: var(--d2l-color-ferrite);
					@apply --d2l-body-standard-text;
				}
				.back-icon {
					padding-bottom: 0.2rem;
					height: 60px;
					font-size: 0px;
					display: inline-block;
				}
				.topbar {
					position: fixed;
					top: 4px;
					width: 100%;
					height: 30px;
					z-index: 3;
					box-shadow: 2px 0px 3px 2px rgba(214,220,229,0.5); /* 50% D6DCE5 */
					flex-flow: row;
				}
				#sidebar-occlude {
					width: calc(var(--sidebar-position) - 25px);
					height: 100%;
					background: white;
					position: fixed;
					top: 56px;
					left: 0px;
					z-index: 2;
				}
				#sidebar {
					width: 330px;
					height: calc(100% + 56px - 5px);
					position: fixed;
					z-index: 1;
					top: 56px;
					bottom: 0px;
					padding: 0px;
					background: white;
					left: calc(var(--sidebar-position) - 25px);
					transition: margin-left 0.5s;
				}
				#sidebar.offscreen {
					margin-left: -400px;
				}
				.viewer {
					position: relative;
					top: 56px;
					bottom: 0px;
					width: 100%;
					overflow-y: auto;
				}
				.viewframe {
					padding: 0 30px;
					height: calc(100vh - 40px - 8px - 4px);
					max-width: var(--viewer-max-width);
					margin: auto;
				}
				.viewframe:focus {
					outline: none;
				}
				.hide {
					display: none;
				}
				.flyout-icon {
					font-size: 0px;
					display: block;
					height: 50px;
				}

				.d2l-sequence-viewer-navicon-container {
					height: 50px;
				}

				@media(max-width: 1220px) {
					#sidebar {
						left: 0;
					}
				}

				@media(max-width: 929px) {
					.viewframe {
						padding: 0 24px;
					}
				}
				@media(max-width: 767px) {
					.viewframe {
						padding: 0 18px;
					}
				}
			</style>
		</custom-style>
		<frau-jwt-local token="{{token}}" scope="*:*:* content:files:read content:topics:read content:topics:mark-read"></frau-jwt-local>
		<d2l-navigation-band></d2l-navigation-band>
		<d2l-sequence-viewer-header class="topbar" href="{{href}}" token="[[token]]" role="banner" on-iterate="_onIterate">
			<span slot="d2l-flyout-menu">
				<d2l-navigation-button-notification-icon icon="d2l-tier3:menu-hamburger" class="flyout-icon" on-click="_toggleSlideSidebar">[[localize('toggleNavMenu')]]
				</d2l-navigation-button-notification-icon>
			</span>
			<div slot="d2l-back-to-module" class="d2l-sequence-viewer-navicon-container">
				<d2l-navigation-link-back text="[[localize('backToContent')]]" on-click="_onClickBack" href="[[backToContentLink]]">
				</d2l-navigation-link-back>
			</div>
		</d2l-sequence-viewer-header>
		<div id="sidebar-occlude">
		</div>
		<div id="sidebar" class="offscreen">
			<d2l-sequence-navigator href="{{href}}" token="[[token]]" role="navigation">
				<span slot="lesson-header">
					<d2l-lesson-header id="sidebarHeader" href="[[_rootHref]]" current-activity="{{href}}" token="[[token]]"></d2l-lesson-header>
				</span>
				<span slot="end-of-lesson">
					<d2l-sequence-end href="[[_sequenceEndHref]]" current-activity="{{href}}" text="[[localize('endOfSequence')]]"></d2l-sequence-end>
				</span>
			</d2l-sequence-navigator>
		</div>
		<div id="viewframe" class="viewframe" on-click="_closeSlidebar" role="main" tabindex="0">
			<d2l-sequences-content-router id="viewer" class="viewer" on-sequences-return-mixin-click-back="_onClickBack" href="{{href}}" token="[[token]]"></d2l-sequences-content-router>
		</div>
`;
	}

	static get is() {
		return 'd2l-sequence-viewer';
	}
	static get properties() {
		return {
			href: {
				type: String,
				reflectToAttribute: true,
				observer: '_hrefChanged',
				notify: true
			},
			_rootHref: {
				type: String,
				computed: '_getRootHref(entity)'
			},
			_sequenceEndHref: {
				type: String,
				computed: '_getSequenceEndHref(entity)'
			},
			title: {
				type: Object,
				computed: '_getTitle(entity)',
				observer: '_titleChanged'
			},
			getToken: {
				type: Object,
				computed: '_getToken(token)'
			},
			returnUrl: {
				type: String
			},
			// The "back to content home" and "I'm done" buttons
			// will take the user to this address.
			backToContentLink: {
				type: String,
				computed: '_getBackToContentLink(entity)'
			},
			_blurListener: {
				type: Object
			}
		};
	}
	static get observers() {
		return ['_pushState(href)', '_setLastViewedContentObject(entity)'];
	}
	ready() {
		super.ready();
		const styles = JSON.parse(document.getElementsByTagName('html')[0].getAttribute('data-asv-css-vars'));
		const navbarstyles = JSON.parse(document.getElementsByTagName('html')[0].getAttribute('data-css-vars'));
		this.updateStyles(
			styles
		);
		this.updateStyles(
			navbarstyles
		);
	}
	_hrefChanged() {
		this.$.viewframe.focus();
	}
	_titleChanged(title) {
		document.title = title;
	}
	_pushState(href) {
		const stateObject = {
			href: href,
			app: D2LSequenceViewer.is
		};
		// check if history.state belongs to the sequence viewer
		if (history.state && history.state.app === D2LSequenceViewer.is) {
			// check if we've already executed pushState for this topic
			if (history.state.href !== href) {
				history.pushState(stateObject, null, '?url=' + encodeURIComponent(href) || '');
			}
		} else {
			// if it's the first state being pushed by sequence viewer, use replaceState.
			history.replaceState(stateObject, null, '?url=' + encodeURIComponent(href) || '');
		}
	}
	_getBackToContentLink(entity) {
		const defaultReturnUrl = entity && entity.getLinkByRel('https://sequences.api.brightspace.com/rels/default-return-url') || '';
		return this.returnUrl || defaultReturnUrl && defaultReturnUrl.href || document.referrer || '';
	}
	connectedCallback() {
		super.connectedCallback();

		// For ASV, the blur event is an indicator than an iframe took focus
		// from our full-screen application.  Currently, the only thing that
		// can do this is a content iframe.
		this._blurListener = window.addEventListener('blur', () => {
			this._closeSlidebar();
		});
		this._onPopStateListener = window.addEventListener('popstate', (event) => {
			if (event.state && event.state.href) {
				this.href = event.state.href;
				event.preventDefault();
			}
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener('blur', this._blurListener);
		this._blurListener = null;
		window.removeEventListener('popstate', this._onPopStateListener);
	}
	_closeSlidebar() {
		setTimeout(() => {
			if (document.hasFocus()) {
				this.$.sidebar.classList.add('offscreen');
			}
		}, 1);
	}
	_onClickBack() {
		if (!this.backToContentLink) {
			return;
		}

		if (window.parent === window) {
			window.location.href = this.backToContentLink;
			return;
		}

		// If we're in an iframe we need to post a message to do the navigation for us
		window.parent.postMessage(JSON.stringify({
			eventType: 'd2l-sequence-viewer-return',
			returnUrl: this.backToContentLink
		}), '*');
	}
	_onIterate() {
		this.$.viewframe.focus();
	}
	_getTitle(entity) {
		return entity && entity.properties && entity.properties.title || '';
	}
	_getToken(token) {
		return () => { return Promise.resolve(token); };
	}
	_toggleSlideSidebar() {
		this.$.sidebar.classList.toggle('offscreen');
		this.$.sidebarHeader.shadowRoot.querySelector('a').focus();
	}
	_getRootHref(entity) {
		const rootLink = entity && entity.getLinkByRel('https://sequences.api.brightspace.com/rels/sequence-root');
		return rootLink && rootLink.href || '';
	}
	_getSequenceEndHref(entity) {
		const rootHref = this._getRootHref(entity);
		return rootHref && rootHref + '/end-of-sequence' || '';
	}
	_setLastViewedContentObject(entity) {
		let action;
		const actionSubEntity = entity && entity.getSubEntityByRel('about');

		if (actionSubEntity) {
			action = actionSubEntity && actionSubEntity.getActionByName('set-last-viewed-content-object');
		} else {
			action = entity && entity.getActionByName('set-last-viewed-content-object');	
		}
		
		if (action) {
			this.performSirenAction(action);
		}
	}
}
customElements.define(D2LSequenceViewer.is, D2LSequenceViewer);
