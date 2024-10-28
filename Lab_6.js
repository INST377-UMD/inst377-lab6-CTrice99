
// Initialize the map centered on the US with zoom level appropriate for the entire US
const map = L.map('map').setView([37.0902, -95.7129], 4);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Function to generate a random latitude or longitude in a given range
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

// Generate random latitude and longitude coordinates for three markers
const markers = [
    { id: 1, lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-100, -90, 3) },
    { id: 2, lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-100, -90, 3) },
    { id: 3, lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-100, -90, 3) },
];

// Function to place markers on the map and fetch locality information
markers.forEach((marker) => {
    // Add a marker at the generated coordinates
    const leafletMarker = L.marker([marker.lat, marker.lon]).addTo(map);
    leafletMarker.bindPopup(`Marker ${marker.id}`);

    // Display latitude and longitude in separate spans below the map
    document.getElementById(`lat${marker.id}`).textContent = marker.lat;
    document.getElementById(`lon${marker.id}`).textContent = marker.lon;

    // Fetch locality information using the BigDataCloud reverse geocode API
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${marker.lat}&longitude=${marker.lon}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            // Extract locality information
            const locality = data.locality || 'Locality not found';

            // Display locality in its dedicated span
            document.getElementById(`loc${marker.id}`).textContent = locality;
        })
        .catch(error => {
            console.error(`Error fetching locality for Marker ${marker.id}:`, error);
        });
});
