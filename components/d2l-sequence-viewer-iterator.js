import '@polymer/polymer/polymer-legacy.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-navigation/d2l-navigation-button-notification-icon.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../localize-behavior.js';

export class D2LSequenceViewerIterator extends mixinBehaviors([
	D2L.PolymerBehaviors.Siren.EntityBehavior,
	D2L.PolymerBehaviors.SequenceViewer.LocalizeBehavior
], PolymerElement) {
	static get template() {
		return html`
		<style>
			d2l-navigation-button-notification-icon {
				display: inline-block;
				height: 60px;
			}
			d2l-navigation-button-notification-icon[disabled] {
				opacity: 0.5;
				height: 60px;
			}
		</style>
		<d2l-navigation-button-notification-icon
			id="iteratorButton"
			disabled="[[disabled]]"
			aria-disabled$="[[disabled]]"
			icon="[[icon]]"
			type="button"
			text="[[localize(iterateTo)]]"
			on-click="_onClick">
		</d2l-navigation-button-notification-icon>
`;
	}

	static get is() {
		return 'd2l-sequence-viewer-iterator';
	}
	static get properties() {
		return {
			href: {
				type: String
			},
			disabled: {
				type: Boolean
			},
			currentActivity: {
				type: String,
				reflectToAttribute: true,
				notify: true
			},
			icon: {
				type: String
			},
			next: {
				type: Boolean
			},
			previous: {
				type: Boolean
			},
			link: {
				type: Object
			},
			iterateTo: {
				type: String,
				computed: 'getIterateTo()'
			},
			isMultiPage: {
				type: Boolean
			},
			multiPageHasNext: {
				type: Boolean
			},
			multiPageHasPrev: {
				type: Boolean
			},
			augmentedReleaseCondition: {
				type: Boolean
			},
			_setUpMultiPageTopicListener: Function
		};
	}
	static get observers() {
		return [
			'_setLink(entity)',
			'_setDisabled(href)'
		];
	}

	ready() {
		super.ready();
		this._setUpMultiPageTopicListener = this._setUpMultiPageTopic.bind(this);
	}

	connectedCallback() {
		super.connectedCallback();
		window.addEventListener('message', this._setUpMultiPageTopicListener);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener('message', this._setUpMultiPageTopicListener);
	}

	_setUpMultiPageTopic(e) {
		const data = typeof e.data === 'object' ? e.data : JSON.parse(e.data);

		if (data && data.handler === 'd2l.nav.customize') {
			this.isMultiPage = true;
			this.multiPageHasNext = Boolean(data.hasNext);
			this.multiPageHasPrev = Boolean(data.hasPrev);
		}
		if (data && data.handler === 'd2l.nav.reset') {
			this.isMultiPage = false;
			this.multiPageHasNext = false;
			this.multiPageHasPrev = false;
		}
	}

	getIterateTo() {
		if (this.next) {
			return 'iterateToNext';
		}
		else if (this.previous) {
			return 'iterateToPrevious';
		}
	}

	async _onClick() {
		if (this._isMultiPageNavigation()) {
			const multiPageEvent = new CustomEvent('d2l-sequence-viewer-multipage-navigation', {
				detail: this._getMultiPageAction()
			});
			window.dispatchEvent(multiPageEvent);
			return;
		}

		if (this.link && this.link.href) {
			if (!this.augmentedReleaseCondition) {
				this.currentActivity = this.link.href;
				this.dispatchEvent(new CustomEvent('iterate', { composed: true, bubbles: true }));
			} else {
				// go fetch the current activity again first
				const currentActivityRefetch = await window.D2L.Siren.EntityStore.fetch(this.currentActivity, this.token, true);
				await this._setCurrentActivity(currentActivityRefetch);
			}

			this.dispatchEvent(new CustomEvent('iterate', { composed: true, bubbles: true }));

		}
	}

	async _setCurrentActivity(currentActivityRefetch) {
		if (!currentActivityRefetch || !currentActivityRefetch.entity || !currentActivityRefetch.entity.properties) {
			return;
		}

		const currentActivityParentHref = this._getUpHref(currentActivityRefetch.entity);
		const actualNextActivityHref = this._getNextActivityHref(currentActivityRefetch.entity);
		const actualPreviousActivityHref = this._getPreviousActivityHref(currentActivityRefetch.entity);

		if (this.next && actualNextActivityHref) {
			await this._fetchParentIfNeeded(currentActivityParentHref, this.link.href, actualNextActivityHref);
			this.currentActivity = actualNextActivityHref;
		}
		else if (this.previous && actualPreviousActivityHref) {
			await this._fetchParentIfNeeded(currentActivityParentHref, this.link.href, actualPreviousActivityHref);
			this.currentActivity = actualPreviousActivityHref;
		}
	}

	async _fetchParentIfNeeded(parentHref, expectedActivityTarget, actualActivityTarget) {
		if (actualActivityTarget !== expectedActivityTarget && parentHref) {
			await window.D2L.Siren.EntityStore.fetch(parentHref, this.token, true);
		}
	}

	_getUpHref(entity) {
		const upLink = entity && entity.getLinkByRel('up') || '';
		return upLink.href || null;
	}

	_getNextActivityHref(entity) {
		const nextActivityLink = entity && entity.getLinkByRel('https://sequences.api.brightspace.com/rels/next-activity') || '';
		return nextActivityLink.href || null;
	}

	_getPreviousActivityHref(entity) {
		const previousActivityLink = entity && entity.getLinkByRel('https://sequences.api.brightspace.com/rels/previous-activity') || '';
		return previousActivityLink.href || null;
	}

	_setLink(entity) {

		if (!entity) {
			return;
		}
		this.link = entity.getLinkByRel('self');
	}
	_setDisabled(href) {
		this.disabled = href ? false : true;
	}
	_getMultiPageAction() {
		if (this.next) {
			return 'next';
		} else if (this.previous) {
			return 'prev';
		}
		return '';
	}

	_isMultiPageNavigation() {
		if (this.isMultiPage) {
			if (this.next && this.multiPageHasNext) return true;
			if (this.previous && this.multiPageHasPrev) return true;
		}
		return false;
	}
}
customElements.define(D2LSequenceViewerIterator.is, D2LSequenceViewerIterator);
