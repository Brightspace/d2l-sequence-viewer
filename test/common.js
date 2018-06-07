(function() {
    'use strict';

    function timeout(ms) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    async function loadEntityForFixture(fileName, fixtureName, debounceTime) {
        const entities = await fetch(fileName)
            .then(res => res.json());

        const element = fixture(fixtureName);
        element.entity = D2L.Hypermedia.Siren.Parse(entities);

        if (debounceTime) {
            await timeout(debounceTime);
        }

        return element;
    }

    window.loadEntityForFixture = loadEntityForFixture;
})();