
export const displayMap = (locations) => {

    mapboxgl.accessToken = 'pk.eyJ1IjoibG9vdGVyb3AiLCJhIjoiY2w5c2p0dTF1MDQxOTNxcGlhM3lyZ3l6NyJ9.Imh6kcZ9yqD4_RiHv9nDxw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/looterop/cl9ssebvm002115mynvyqilkl',
        scrollZoom: false
        // center: [-118.113491, 34.111745],
        // zoom: 6,
        // interactive: false
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
        // Create Marker
        const el = document.createElement('div');
        el.className = 'marker';

        // Add Marker
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        }).setLngLat(loc.coordinates).addTo(map);

        // Add popup
        new mapboxgl.Popup({
            offset: 30
        })
            .setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
            .addTo(map);

        // Extend map bounds to include current location
        bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
};
