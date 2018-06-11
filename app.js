/* global System */
(function() {
	'use strict';

	System.config({
		map: {
			'ifrau/client': 'https://s.brightspace.com/lib/ifrau/0.24.1/ifrau/client.js'
		}
	});

	window.iFrameResizer = {
		heightCalculationMethod: 'lowestElement'
	};

	System.import('ifrau/client').then(function(Client) {
		new Client({
			id: 'd2l-sequence-viewer',
			syncFont: true,
			syncLang: true,
			syncTitle: true,
			resize: true,
			resizerOptions: {
				heightCalculationMethod: 'lowestElement'
			}
		})
			.connect()
			.then(function(client) {
				Promise.all([
					client.request('options'),
					client.request('orgUnit'),
					client.request('valenceHost'),
					client.request('frau-jwt-new-jwt', ['*:*:*'] )
				]).then(function(vars) {
					var token = vars[3] || '';
					var  el = document.getElementById('sqv');
					var href = vars[0] && vars[0].href || '';
					el.setAttribute('token', token);
					el.setAttribute('href', href);
					var initializeEvent = JSON.stringify({
						'eventType': 'initialize'
					});
					var origin = window.location.protocol + '//' + window.location.host;

					// send the initializeEvent to polymer
					window.postMessage(initializeEvent, origin);

					var readyEvent = JSON.stringify({
						'eventType': 'ready',
					});

					// send the readyEvent to the LMS
					window.parent.postMessage(readyEvent, '*');
				});
			});
	});
})();
