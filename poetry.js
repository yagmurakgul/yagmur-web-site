// Haritayı Türkiye ve Balkanlar üzerinde açıyoruz.
// Koordinat sırası: [enlem, boylam]
const poetryMap = L.map("leaflet-map", {
    minZoom: 3,
    maxZoom: 18,
    maxBounds: [
        [-85, -180],
        [85, 180]
    ],
    maxBoundsViscosity: 1
}).setView([40, 30], 5);

// OpenStreetMap arka planı.
// noWrap: dünyanın yatay olarak tekrarlanmasını engeller.
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    noWrap: true,
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">' +
        "OpenStreetMap</a> contributors"
}).addTo(poetryMap);

// Bunlar yaklaşık şehir veya ilçe merkezi koordinatlarıdır.
const birthplaces = [
    {
        place: "Thessaloniki, Greece",
        coordinates: [40.6401, 22.9444],
        poets: [
            { name: "Nâzım Hikmet Ran", born: 1902, died: 1963 }
        ]
    },
    {
        place: "Beykoz, İstanbul",
        coordinates: [41.1327, 29.1050],
        poets: [
            { name: "Orhan Veli Kanık", born: 1914, died: 1950 }
        ]
    },
    {
        place: "Erzincan",
        coordinates: [39.7500, 39.4900],
        poets: [
            { name: "Cemal Süreya", born: 1931, died: 1990 }
        ]
    },
    {
        place: "Ankara",
        coordinates: [39.9334, 32.8597],
        poets: [
            { name: "Turgut Uyar", born: 1927, died: 1985 },
            { name: "Özdemir Asaf", born: 1923, died: 1981 }
        ]
    },
    {
        place: "İstanbul",
        coordinates: [41.0082, 28.9784],
        poets: [
            { name: "Edip Cansever", born: 1928, died: 1986 },
            { name: "Necip Fazıl Kısakürek", born: 1904, died: 1983 }
        ]
    },
    {
        place: "Menemen, İzmir",
        coordinates: [38.6075, 27.0694],
        poets: [
            { name: "Attilâ İlhan", born: 1925, died: 2005 }
        ]
    },
    {
        place: "Skopje, North Macedonia",
        coordinates: [41.9981, 21.4254],
        poets: [
            { name: "Yahya Kemal Beyatlı", born: 1884, died: 1958 }
        ]
    },
    {
        place: "Diyarbakır",
        coordinates: [37.9144, 40.2306],
        poets: [
            { name: "Cahit Sıtkı Tarancı", born: 1910, died: 1956 }
        ]
    },
    {
        place: "Fatih, İstanbul",
        coordinates: [41.0170, 28.9400],
        poets: [
            { name: "Mehmet Âkif Ersoy", born: 1873, died: 1936 }
        ]
    }
];

// İşaretçileri tek bir grupta topluyoruz.
const poetMarkers = L.layerGroup();

birthplaces.forEach(function (birthplace) {
    const poetDetails = birthplace.poets.map(function (poet) {
        return `
            <div class="poet-entry">
                <h3>${poet.name}</h3>
                <p>
                    <strong>Born:</strong> ${poet.born}<br>
                    <strong>Died:</strong> ${poet.died}
                </p>
            </div>
        `;
    }).join("");

    const popupContent = `
        <div class="poet-popup">
            <p><strong>Birthplace:</strong> ${birthplace.place}</p>
            ${poetDetails}
        </div>
    `;

    L.circleMarker(birthplace.coordinates, {
        radius: 8,
        color: "#66358a",
        weight: 2,
        fillColor: "#b77ac9",
        fillOpacity: 0.9
    })
        .bindPopup(popupContent)
        .bindTooltip(birthplace.place)
        .addTo(poetMarkers);
});

// Zoom 6 ve üzerinde işaretçileri gösteriyoruz.
const markerZoomThreshold = 6;
const mapStatus = document.getElementById("leaflet-status");

function updateMarkerVisibility() {
    if (poetryMap.getZoom() >= markerZoomThreshold) {
        if (!poetryMap.hasLayer(poetMarkers)) {
            poetMarkers.addTo(poetryMap);
        }

        mapStatus.textContent =
            "Click a purple point to discover the poets.";
    } else {
        poetryMap.removeLayer(poetMarkers);

        mapStatus.textContent =
            "Zoom in to level 6 or above to see the birthplaces.";
    }
}

poetryMap.on("zoomend", updateMarkerVisibility);

// Sayfa ilk açıldığında da kontrol et.
updateMarkerVisibility();