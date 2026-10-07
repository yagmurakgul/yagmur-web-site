(() => {
    // VERİLER
    // OpenLayers koordinat sırası: [boylam, enlem]

    const travelLocations = [
        {
            name: "France",
            category: "visited",
            coordinates: [2.3522, 48.8566],
            note: "Art, architecture and café culture — a country with so much to explore."
        },
        {
            name: "Belgium",
            category: "visited",
            coordinates: [4.3517, 50.8503],
            note: "Historic town squares, chocolate and charming streets."
        },
        {
            name: "Germany",
            category: "visited",
            coordinates: [13.4050, 52.5200],
            note: "A mix of historic landmarks, modern cities and green spaces."
        },
        {
            name: "Luxembourg",
            category: "visited",
            coordinates: [6.1319, 49.6116],
            note: "A small country with an old town, dramatic valleys and impressive views."
        },
        {
            name: "Spain",
            category: "wishlist",
            coordinates: [-3.7038, 40.4168],
            note: "I would love to explore its art museums, colourful streets and local food."
        },
        {
            name: "Scotland",
            category: "wishlist",
            coordinates: [-3.1883, 55.9533],
            note: "I would love to see the Highlands, explore Edinburgh and visit historic castles."
        },
        {
            name: "Japan",
            category: "wishlist",
            coordinates: [139.6917, 35.6895],
            note: "I want to experience the contrast between busy cities, quiet temples and traditional gardens."
        },
        {
            name: "Thailand",
            category: "wishlist",
            coordinates: [100.5018, 13.7563],
            note: "I would love to discover its temples, taste local dishes and spend time by the sea."
        },
        {
            name: "Taiwan",
            category: "wishlist",
            coordinates: [121.5654, 25.0330],
            note: "Night markets, mountain scenery and tea culture are what draw me here."
        },
        {
            name: "Italy",
            category: "wishlist",
            coordinates: [12.4964, 41.9028],
            note: "I want to see the artworks I admire in person and explore the streets around them."
        },
        {
            name: "New Zealand",
            category: "wishlist",
            coordinates: [174.7762, -41.2866],
            note: "I would love to explore its mountains, lakes and walking trails."
        },
        {
            name: "Argentina",
            category: "wishlist",
            coordinates: [-58.3816, -34.6037],
            note: "I want to experience Buenos Aires and discover the landscapes of Patagonia."
        }
    ];

    const minimumMarkerZoom = 2;
    let activeCategory = "visited";

    const status = document.getElementById("ol-status");
    const popupElement = document.getElementById("travel-popup");
    const popupTitle = document.getElementById("travel-popup-title");
    const popupNote = document.getElementById("travel-popup-note");
    const popupCategory = document.getElementById(
        "travel-popup-category"
    );

    // HER KATEGORİ İÇİN NOKTA KAYNAĞI

    function createSource(category) {
        const features = travelLocations
            .filter(location => location.category === category)
            .map(location => {
                return new ol.Feature({
                    geometry: new ol.geom.Point(
                        ol.proj.fromLonLat(location.coordinates)
                    ),
                    destination: location
                });
            });

        return new ol.source.Vector({
            features: features,
            wrapX: false
        });
    }

    const visitedSource = createSource("visited");
    const wishlistSource = createSource("wishlist");

    // KÜMELENEN NOKTALAR

    function createTravelLayer(source, category) {
        const color = category === "visited"
            ? "#8651a0"
            : "#c2638e";

        const styleCache = new Map();

        return new ol.layer.Vector({
            visible: category === "visited",

            source: new ol.source.Cluster({
                distance: 45,
                minDistance: 15,
                source: source,
                wrapX: false
            }),

            style: function (feature) {
                const count = feature.get("features").length;

                if (!styleCache.has(count)) {
                    styleCache.set(
                        count,
                        new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: count > 1 ? 20 : 9,
                                fill: new ol.style.Fill({
                                    color: color
                                }),
                                stroke: new ol.style.Stroke({
                                    color: "#ffffff",
                                    width: 3
                                })
                            }),

                            text: count > 1
                                ? new ol.style.Text({
                                    text: String(count),
                                    font: "bold 14px sans-serif",
                                    fill: new ol.style.Fill({
                                        color: "#ffffff"
                                    })
                                })
                                : undefined
                        })
                    );
                }

                return styleCache.get(count);
            }
        });
    }

    const visitedLayer = createTravelLayer(
        visitedSource,
        "visited"
    );

    const wishlistLayer = createTravelLayer(
        wishlistSource,
        "wishlist"
    );

    // HARİTA: DÜNYA TEKRARLANMAZ

    const travelMap = new ol.Map({
        target: "ol-map",

        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM({
                    wrapX: false
                })
            }),
            visitedLayer,
            wishlistLayer
        ],

        view: new ol.View({
            center: ol.proj.fromLonLat([7, 50]),
            zoom: 5,
            minZoom: 1,
            maxZoom: 18,
            extent: ol.proj.get("EPSG:3857").getExtent(),
            showFullExtent: true
        })
    });

    travelMap.addControl(new ol.control.ScaleLine());

    // HARİTA ÜZERİNDE BİLGİ KARTI

    const popup = new ol.Overlay({
        element: popupElement,
        positioning: "bottom-center",
        offset: [0, -16],
        stopEvent: true,
        autoPan: {
            animation: {
                duration: 250
            }
        }
    });

    travelMap.addOverlay(popup);

    function closePopup() {
        popup.setPosition(undefined);
        popupElement.hidden = true;
    }

    document.getElementById("travel-popup-close")
        .addEventListener("click", closePopup);

    popupElement.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closePopup();
        }
    });

    // KATMAN MENÜSÜ: BAŞLANGIÇTA KAPALI

    const menu = document.createElement("div");
    menu.className = "travel-layer-control ol-unselectable";

    const menuButton = document.createElement("button");
    menuButton.type = "button";
    menuButton.className = "travel-layer-toggle";
    menuButton.textContent = "▱";
    menuButton.title = "Choose a travel layer";
    menuButton.setAttribute("aria-label", "Choose a travel layer");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-controls", "travel-layer-panel");

    const panel = document.createElement("div");
    panel.id = "travel-layer-panel";
    panel.className = "travel-layer-panel";
    panel.hidden = true;

    const menuHeading = document.createElement("p");
    menuHeading.textContent = "MY TRAVEL MAP";
    panel.append(menuHeading);

    const options = [
        {
            value: "visited",
            label: "Visited",
            count: 4
        },
        {
            value: "wishlist",
            label: "Wishlist",
            count: 8
        }
    ];

    options.forEach(option => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        const text = document.createElement("span");

        input.type = "radio";
        input.name = "travel-category";
        input.value = option.value;
        input.checked = option.value === activeCategory;

        text.textContent = option.label + " · " + option.count;

        input.addEventListener("change", () => {
            if (!input.checked) return;

            activeCategory = option.value;
            closePopup();
            updateVisibility();
            fitSelectedLocations();
        });

        label.append(input, text);
        panel.append(label);
    });

    menuButton.addEventListener("click", () => {
        panel.hidden = !panel.hidden;

        menuButton.setAttribute(
            "aria-expanded",
            String(!panel.hidden)
        );
    });

    menu.addEventListener("keydown", event => {
        event.stopPropagation();

        if (event.key === "Escape") {
            panel.hidden = true;
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.focus();
        }
    });

    menu.append(menuButton, panel);

    travelMap.addControl(
        new ol.control.Control({
            element: menu
        })
    );

    // YAKINLAŞTIRMA EŞİĞİ VE KATEGORİ GÖRÜNÜRLÜĞÜ

    function updateVisibility() {
        const zoom = travelMap.getView().getZoom();
        const showPoints = zoom >= minimumMarkerZoom;

        visitedLayer.setVisible(
            activeCategory === "visited" && showPoints
        );

        wishlistLayer.setVisible(
            activeCategory === "wishlist" && showPoints
        );

        if (!showPoints) {
            closePopup();

            status.textContent =
                "Zoom in to level 2 or above to see destinations.";
        } else {
            status.textContent = activeCategory === "visited"
                ? "Visited · 4 destinations. Select a point to read more."
                : "Wishlist · 8 destinations. Select a point to read more.";
        }
    }

    function fitSelectedLocations() {
        const source = activeCategory === "visited"
            ? visitedSource
            : wishlistSource;

        const view = travelMap.getView();

        view.fit(source.getExtent(), {
            padding: [55, 55, 55, 55],
            maxZoom: 6
        });

        // Noktaların görünürlük eşiğinin altında kalmasını önle.
        if (view.getZoom() < minimumMarkerZoom) {
            view.setZoom(minimumMarkerZoom);
        }
    }

    travelMap.getView().on("change:resolution", updateVisibility);

    // NOKTAYA VEYA KÜMEYE TIKLAMA

    travelMap.on("singleclick", event => {
        const selectedLayer = activeCategory === "visited"
            ? visitedLayer
            : wishlistLayer;

        const cluster = travelMap.forEachFeatureAtPixel(
            event.pixel,
            feature => feature,
            {
                hitTolerance: 6,
                layerFilter: layer => layer === selectedLayer
            }
        );

        if (!cluster) {
            closePopup();
            return;
        }

        const members = cluster.get("features");

        if (members.length > 1) {
            closePopup();

            const extent = ol.extent.createEmpty();

            members.forEach(feature => {
                ol.extent.extend(
                    extent,
                    feature.getGeometry().getExtent()
                );
            });

            travelMap.getView().fit(extent, {
                padding: [70, 70, 70, 70],
                duration: 350,
                maxZoom: 12
            });

            return;
        }

        const feature = members[0];
        const destination = feature.get("destination");

        popupTitle.textContent = destination.name;
        popupNote.textContent = destination.note;

        popupCategory.textContent =
            destination.category === "visited"
                ? "BEEN THERE"
                : "ON MY WISHLIST";

        popupElement.hidden = false;

        popup.setPosition(
            feature.getGeometry().getCoordinates()
        );
    });

    // TIKLANABİLİR NOKTALARDA İMLEÇ

    travelMap.on("pointermove", event => {
        if (event.dragging) return;

        const selectedLayer = activeCategory === "visited"
            ? visitedLayer
            : wishlistLayer;

        const hit = travelMap.hasFeatureAtPixel(event.pixel, {
            hitTolerance: 6,
            layerFilter: layer => layer === selectedLayer
        });

        travelMap.getTargetElement().style.cursor =
            hit ? "pointer" : "";
    });

    // OPENLAYERS: SEÇİLİ KATEGORİYE GERİ DÖN

    const resetContainer = document.createElement("div");
    resetContainer.className =
        "travel-reset-control ol-unselectable";

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "map-reset-button";
    resetButton.textContent = "↺";
    resetButton.title = "Show all selected destinations";
    resetButton.setAttribute(
        "aria-label",
        "Show all selected destinations"
    );

    resetButton.addEventListener("click", () => {
        closePopup();
        fitSelectedLocations();
        updateVisibility();
    });

    resetContainer.append(resetButton);

    travelMap.addControl(
        new ol.control.Control({
            element: resetContainer
        })
    );

    updateVisibility();
    fitSelectedLocations();
})();