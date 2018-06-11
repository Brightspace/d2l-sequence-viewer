async function loadFixture(href, fixtureId) {
	const entities = await fetch( href )
		.then( res => res.json() );

	const element = fixture( fixtureId );
	element.href = href;
	element.currentActivity = href;
	element.entity = window.D2L.Hypermedia.Siren.Parse(entities);

	return element;
}