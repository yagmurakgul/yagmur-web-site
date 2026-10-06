// Şairin doğum yılından renk kategorisini belirler.
function getBirthPeriod(year) {
    if (year < 1900) {
        return "early";
    }

    if (year < 1925) {
        return "middle";
    }

    return "late";
}

const periodColors = {
    early: "#66358a",
    middle: "#287f83",
    late: "#b66a20",
    mixed: "#c74785"
};

// Leaflet'teki ortak verilerden OpenLayers noktaları oluştur.
const birthplaceFeatures = birthplaces.map(function (birthplace) {
    // Leaflet: [enlem, boylam]
    // OpenLayers fromLonLat: [boylam, enlem]
    const latitude = birthplace.coordinates[0];
    const longitude = birthplace.coordinates[1];

    const periods = birthplace.poets.map(function (poet) {
        return getBirthPeriod(poet.born);
    });

    const uniquePeriods = [...new Set(periods)];

    const category = uniquePeriods.length === 1
        ? uniquePeriods[0]
        : "mixed";

    return new ol.Feature({
        geometry: new ol.geom.Point(
            ol.proj.fromLonLat([longitude, latitude])
        ),
        place: birthplace.place,
        poets: birthplace.poets,
        category: category
    });
});

const birthplaceSource = new ol.source.Vector({
    features: birthplaceFeatures,
    wrapX: false
});

const birthplaceLayer = new ol.layer.Vector({
    source: birthplaceSource,

    style: function (feature) {
        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: 8,
                fill: new ol.style.Fill({
                    color: periodColors[feature.get("category")]
                }),
                stroke: new ol.style.Stroke({
                    color: "#ffffff",
                    width: 2
                })
            })
        });
    }
});

const olView = new ol.View({
    center: ol.proj.fromLonLat([30, 40]),
    zoom: 5,
    minZoom: 3,
    maxZoom: 18,
    extent: ol.proj.get("EPSG:3857").getExtent(),
    showFullExtent: true
});

const secondMap = new ol.Map({
    target: "ol-map",

    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM({
                wrapX: false
            })
        }),
        birthplaceLayer
    ],

    view: olView
});

const olStatus = document.getElementById("ol-status");
const olDetails = document.getElementById("ol-details");

// İlk haritadaki gibi zoom 6 ve üzerinde noktaları göster.
function updateOpenLayersMarkers() {
    const pointsVisible = olView.getZoom() >= 6;

    birthplaceLayer.setVisible(pointsVisible);

    olStatus.textContent = pointsVisible
        ? "Click a coloured point to discover the poets."
        : "Zoom in to level 6 or above to see the birthplaces.";

    if (!pointsVisible) {
        olDetails.textContent =
            "Zoom in, then select a point to see the poets’ details.";
    }
}

olView.on("change:resolution", updateOpenLayersMarkers);
updateOpenLayersMarkers();

// Noktaya tıklanınca haritanın altına bilgileri yaz.
secondMap.on("singleclick", function (event) {
    const feature = secondMap.forEachFeatureAtPixel(
        event.pixel,
        function (feature) {
            return feature;
        },
        {
            hitTolerance: 5,
            layerFilter: function (layer) {
                return layer === birthplaceLayer;
            }
        }
    );

    if (!feature) {
        olDetails.textContent =
            "Select a coloured point to see the poets’ details.";
        return;
    }

    const poetInformation = feature.get("poets").map(function (poet) {
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

    olDetails.innerHTML = `
        <p><strong>Birthplace:</strong> ${feature.get("place")}</p>
        ${poetInformation}
    `;
});