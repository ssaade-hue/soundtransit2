// Initialize Leaflet map
let map;
let markers = [];
let currentSelectedMarker = null;
let comparisonStations = [];
let filteredStops = [...soundTransitStops];

function initMap() {
    // Center of Seattle area
    const centerLat = 47.6062;
    const centerLng = -122.3321;

    // Create map
    map = L.map('map').setView([centerLat, centerLng], 11);

    // Add dark theme tiles
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap, &copy; CartoDB',
        maxZoom: 19,
        minZoom: 9
    }).addTo(map);

    // Add markers for each stop
    soundTransitStops.forEach(stop => {
        addMarker(stop);
    });

    // Populate stops list
    populateStopsList();

    // Initialize charts
    updateTopStationsChart();

    // Setup search
    setupSearch();

    // Remove loading state
    const mapElement = document.getElementById('map');
    mapElement.classList.remove('loading');
}

function getMarkerColor(type) {
    switch(type) {
        case 'Light Rail':
            return '#00a651';
        default:
            return '#666';
    }
}

function getMarkerSize(ridership) {
    // Scale marker size based on daily ridership
    // Min size: 24px, Max size: 48px
    const minSize = 24;
    const maxSize = 48;
    const minRiders = 1400;
    const maxRiders = 14200;
    
    const size = minSize + ((ridership - minRiders) / (maxRiders - minRiders)) * (maxSize - minSize);
    return Math.max(minSize, Math.min(maxSize, size));
}

function getMarkerIcon(type, ridership) {
    const color = getMarkerColor(type);
    const size = getMarkerSize(ridership);
    const iconSize = size;
    
    return L.divIcon({
        className: 'custom-marker',
        html: `
            <div style="
                background-color: ${color};
                width: ${iconSize}px;
                height: ${iconSize}px;
                border-radius: 50%;
                border: 3px solid white;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: ${iconSize * 0.4}px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                cursor: pointer;
            ">
                L
            </div>
        `,
        iconSize: [iconSize, iconSize],
        iconAnchor: [iconSize/2, iconSize/2],
        popupAnchor: [0, -iconSize/2]
    });
}

function addMarker(stop) {
    const marker = L.marker([stop.lat, stop.lng], {
        icon: getMarkerIcon(stop.type, stop.dailyRidership),
        title: stop.name
    });

    const popupContent = `
        <div style="min-width: 280px;">
            <h3 style="margin: 0 0 10px 0; color: #00d4ff;">${stop.name}</h3>
            <p style="margin: 5px 0;"><strong>Type:</strong> ${stop.type}</p>
            <p style="margin: 5px 0;"><strong>Line:</strong> ${stop.line}</p>
            <p style="margin: 5px 0;"><strong>Address:</strong> ${stop.address}</p>
            <hr style="margin: 10px 0; border: none; border-top: 1px solid #444;">
            <p style="margin: 5px 0; font-weight: bold; color: #00d4ff;">📊 Ridership Data</p>
            <p style="margin: 5px 0;"><strong>Daily:</strong> ${stop.dailyRidership.toLocaleString()} passengers</p>
            <p style="margin: 5px 0;"><strong>Weekly:</strong> ${stop.weeklyRidership.toLocaleString()} passengers</p>
            <p style="margin: 5px 0;"><strong>Annual:</strong> ${stop.annualRidership.toLocaleString()} passengers</p>
            <button onclick="addToComparison({name: '${stop.name}', dailyRidership: ${stop.dailyRidership}, weeklyRidership: ${stop.weeklyRidership}, annualRidership: ${stop.annualRidership}})" style="
                width: 100%;
                margin-top: 10px;
                padding: 8px;
                background: rgba(0, 212, 255, 0.2);
                border: 1px solid rgba(0, 212, 255, 0.3);
                color: #00d4ff;
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
                font-size: 12px;
            ">+ Compare</button>
            <hr style="margin: 10px 0; border: none; border-top: 1px solid #444;">
            <p style="margin: 10px 0 0 0; font-size: 11px; color: #999;">
                Coordinates: ${stop.lat.toFixed(4)}, ${stop.lng.toFixed(4)}
            </p>
        </div>
    `;

    marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'stop-popup'
    });

    marker.on('click', function() {
        currentSelectedMarker = stop;
        updateStopsPanel(stop);
    });

    marker.addTo(map);
    markers.push({ marker, stop });
}

function populateStopsList() {
    const stopsList = document.getElementById('stopsList');
    if (!stopsList) return;
    
    stopsList.innerHTML = '';

    // Group filtered stops by type
    const grouped = {};
    filteredStops.forEach(stop => {
        if (!grouped[stop.type]) {
            grouped[stop.type] = [];
        }
        grouped[stop.type].push(stop);
    });

    // Display grouped stops
    Object.keys(grouped).forEach(type => {
        const typeElement = document.createElement('div');
        typeElement.innerHTML = `<h3 style="
            margin: 15px 0 10px 0;
            color: #00d4ff;
            font-size: 13px;
            text-transform: uppercase;
            font-weight: bold;
        ">${type}</h3>`;
        stopsList.appendChild(typeElement);

        grouped[type].forEach(stop => {
            const stopElement = document.createElement('div');
            stopElement.className = 'stop-item';
            stopElement.style.cursor = 'pointer';
            stopElement.innerHTML = `
                <h3>${stop.name}</h3>
                <p><strong>${stop.line}</strong></p>
                <p>${stop.address}</p>
                <p style="margin-top: 8px; font-size: 11px; color: #00d4ff; font-weight: bold;">
                    ${stop.dailyRidership.toLocaleString()} daily riders
                </p>
            `;

            stopElement.addEventListener('click', () => {
                // Center map on this stop
                map.setView([stop.lat, stop.lng], 14);
                // Find and click the marker
                const markerItem = markers.find(m => m.stop.name === stop.name);
                if (markerItem) {
                    markerItem.marker.openPopup();
                }
                updateStopsPanel(stop);
            });

            stopsList.appendChild(stopElement);
        });
    });
}

function updateStopsPanel(stop) {
    const panel = document.getElementById('infoPanel');
    const color = getMarkerColor(stop.type);
    
    panel.innerHTML = `
        <h2>L Station</h2>
        <div style="background: linear-gradient(135deg, rgba(0, 100, 200, 0.1), rgba(0, 200, 255, 0.05)); padding: 15px; border-radius: 4px; border-left: 3px solid #00d4ff;">
            <h3 style="margin: 0 0 10px 0; color: #00d4ff; font-size: 16px;">${stop.name}</h3>
            <p style="margin: 8px 0; color: #b0b0b0;"><strong style="color: #00d4ff;">Type:</strong> <span style="color: #00d4ff;">${stop.type}</span></p>
            <p style="margin: 8px 0; color: #b0b0b0;"><strong style="color: #00d4ff;">Line:</strong> ${stop.line}</p>
            <p style="margin: 8px 0; color: #b0b0b0;"><strong style="color: #00d4ff;">Address:</strong> ${stop.address}</p>
            
            <hr style="margin: 12px 0; border: none; border-top: 1px solid rgba(0, 200, 255, 0.2);">
            
            <div style="background: linear-gradient(135deg, rgba(0, 100, 200, 0.1), rgba(0, 200, 255, 0.05)); padding: 10px; border-radius: 3px; margin: 10px 0; border: 1px solid rgba(0, 200, 255, 0.2);">
                <p style="margin: 0 0 10px 0; font-weight: bold; color: #00d4ff; font-size: 14px;">📊 Ridership Statistics</p>
                <div style="background: rgba(0, 100, 200, 0.1); padding: 8px; border-radius: 3px; margin-bottom: 8px; border: 1px solid rgba(0, 200, 255, 0.2);">
                    <p style="margin: 0; font-size: 13px; color: #b0b0b0;"><strong>Daily:</strong></p>
                    <p style="margin: 4px 0 0 0; font-size: 14px; color: #00d4ff; font-weight: bold;">${stop.dailyRidership.toLocaleString()}</p>
                    <p style="margin: 2px 0 0 0; font-size: 11px; color: #666;">passengers per day</p>
                </div>
                <div style="background: rgba(0, 100, 200, 0.1); padding: 8px; border-radius: 3px; margin-bottom: 8px; border: 1px solid rgba(0, 200, 255, 0.2);">
                    <p style="margin: 0; font-size: 13px; color: #b0b0b0;"><strong>Weekly:</strong></p>
                    <p style="margin: 4px 0 0 0; font-size: 14px; color: #00d4ff; font-weight: bold;">${stop.weeklyRidership.toLocaleString()}</p>
                    <p style="margin: 2px 0 0 0; font-size: 11px; color: #666;">passengers per week</p>
                </div>
                <div style="background: rgba(0, 100, 200, 0.1); padding: 8px; border-radius: 3px; border: 1px solid rgba(0, 200, 255, 0.2);">
                    <p style="margin: 0; font-size: 13px; color: #b0b0b0;"><strong>Annual:</strong></p>
                    <p style="margin: 4px 0 0 0; font-size: 14px; color: #00d4ff; font-weight: bold;">${stop.annualRidership.toLocaleString()}</p>
                    <p style="margin: 2px 0 0 0; font-size: 11px; color: #666;">passengers per year</p>
                </div>
            </div>
            
            <p style="margin: 10px 0 0 0; font-size: 11px; color: #666;">
                <strong>Coordinates:</strong> ${stop.lat.toFixed(4)}, ${stop.lng.toFixed(4)}
            </p>
            <button onclick="closePanelSelection()" style="
                margin-top: 12px;
                padding: 8px 12px;
                background: rgba(0, 212, 255, 0.2);
                color: #00d4ff;
                border: 1px solid rgba(0, 212, 255, 0.3);
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
                width: 100%;
            ">Close</button>
        </div>
    `;
}

function closePanelSelection() {
    currentSelectedMarker = null;
    populateStopsList();
}

// Add some custom styles for popups
const style = document.createElement('style');
style.textContent = `
    .stop-popup .leaflet-popup-content {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .stop-popup .leaflet-popup-content h3 {
        margin-top: 0;
    }
`;
document.head.appendChild(style);

// Search and Filter Functions
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        filterStations(query, null);
    });
}

function filterStations(query, ridershipLevel) {
    filteredStops = soundTransitStops.filter(stop => {
        const matchesQuery = stop.name.toLowerCase().includes(query) || 
                            stop.address.toLowerCase().includes(query);
        
        if (ridershipLevel === 'high') return matchesQuery && stop.dailyRidership > 8000;
        if (ridershipLevel === 'medium') return matchesQuery && stop.dailyRidership >= 5000 && stop.dailyRidership <= 8000;
        if (ridershipLevel === 'low') return matchesQuery && stop.dailyRidership < 5000;
        
        return matchesQuery;
    });

    // Update markers visibility
    markers.forEach(m => {
        const isVisible = filteredStops.some(s => s.name === m.stop.name);
        if (isVisible) {
            m.marker.setOpacity(1);
        } else {
            m.marker.setOpacity(0.2);
        }
    });

    populateStopsList();
}

function filterByRidership(level) {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    filterStations(query, level === 'all' ? null : level);
}

// Comparison Functions
function addToComparison(stop) {
    if (comparisonStations.length >= 3 && !comparisonStations.some(s => s.name === stop.name)) {
        alert('Maximum 3 stations can be compared');
        return;
    }

    if (comparisonStations.some(s => s.name === stop.name)) {
        comparisonStations = comparisonStations.filter(s => s.name !== stop.name);
    } else {
        comparisonStations.push(stop);
    }

    updateComparisonPanel();
}

function updateComparisonPanel() {
    const content = document.getElementById('comparisonContent');
    
    if (comparisonStations.length === 0) {
        content.innerHTML = '<p style="color: #666; text-align: center;">No stations selected</p>';
        return;
    }

    let html = '';
    comparisonStations.forEach(stop => {
        html += `
            <div class="comparison-item">
                <div style="color: #00d4ff; font-weight: 600; margin-bottom: 8px;">${stop.name}</div>
                <div class="comparison-stat">
                    <span>Daily:</span>
                    <span class="comparison-stat-value">${stop.dailyRidership.toLocaleString()}</span>
                </div>
                <div class="comparison-stat">
                    <span>Weekly:</span>
                    <span class="comparison-stat-value">${stop.weeklyRidership.toLocaleString()}</span>
                </div>
                <div class="comparison-stat">
                    <span>Annual:</span>
                    <span class="comparison-stat-value">${stop.annualRidership.toLocaleString()}</span>
                </div>
            </div>
        `;
    });

    content.innerHTML = html;
}

function clearComparison() {
    comparisonStations = [];
    updateComparisonPanel();
}

// Charts Functions
function updateTopStationsChart() {
    const sorted = [...soundTransitStops].sort((a, b) => b.dailyRidership - a.dailyRidership);
    const top5 = sorted.slice(0, 5);

    let html = '';
    top5.forEach((stop, index) => {
        const percentage = (stop.dailyRidership / sorted[0].dailyRidership) * 100;
        html += `
            <div class="chart-item">
                <div class="chart-item-title">${index + 1}. ${stop.name.split(' Station')[0]}</div>
                <div style="background: rgba(0, 100, 200, 0.2); height: 6px; border-radius: 3px; overflow: hidden; margin: 6px 0;">
                    <div style="background: linear-gradient(90deg, #00d4ff, #00ff88); width: ${percentage}%; height: 100%;"></div>
                </div>
                <div class="chart-item-value">${stop.dailyRidership.toLocaleString()}</div>
            </div>
        `;
    });

    document.getElementById('topStationsChart').innerHTML = html;
}

// Initialize map when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
} else {
    initMap();
}
