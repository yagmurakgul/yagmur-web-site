(() => {
    const locations = [
        {
            name: "Twisters — Isleta",
            production: "Breaking Bad",
            city: "Albuquerque, United States",
            type: "Filming location",
            connection: "Los Pollos Hermanos",
            coordinates: [35.0146, -106.6864],
            image: "images/breaking-bad-twisters.webp",
            description:
                "This Twisters restaurant was used as Los Pollos Hermanos, " +
                "the restaurant associated with Gus Fring.",
            source: "https://www.mytwisters.com/location/isleta/"
        },
        {
            name: "McGee’s Pub",
            production: "How I Met Your Mother",
            city: "New York City, United States",
            type: "Inspiration",
            connection: "MacLaren’s Pub",
            coordinates: [40.7645, -73.9825],
            image: "images/himym-mcgees.jpeg",
            description:
                "McGee’s inspired the fictional MacLaren’s Pub. " +
                "It is an inspiration for the setting rather than " +
                "the regular filming location.",
            source: "https://mcgeespubny.com/"
        },
        {
            name: "Pastis — Original Location",
            production: "Sex and the City",
            city: "New York City, United States",
            type: "Former filming location",
            connection: "Pastis",
            coordinates: [40.7397, -74.0064],
            image: "images/satc-pastis.jpg",
            description:
                "The original Pastis at 9 Ninth Avenue appeared in the " +
                "series. The restaurant later reopened at " +
                "52 Gansevoort Street.",
            source:
                "https://www.cbsnews.com/newyork/news/" +
                "7-nyc-spots-made-famous-by-sex-the-city/"
        },
        {
            name: "Friends Apartment Building",
            production: "Friends",
            city: "New York City, United States",
            type: "Exterior filming location",
            connection: "The Friends apartment building",
            coordinates: [40.7320, -74.0053],
            image: "images/friends-building.jpeg",
            description:
                "This building appears in exterior shots of the " +
                "Friends apartment building. The Little Owl occupies " +
                "the ground floor; it is not the Central Perk set.",
            source: "https://www.experience-nyc.com/post/friends-apartment"
        },
        {
            name: "Café des Deux Moulins",
            production: "Amélie",
            city: "Paris, France",
            type: "Filming location",
            connection: "Amélie’s workplace",
            coordinates: [48.8848, 2.3330],
            image: "images/amelie-cafe.jpeg",
            description:
                "This café in Montmartre appears as Amélie’s " +
                "workplace in the film.",
            source: "https://www.cafedesdeuxmoulins.com/histoire"
        },
        {
            name: "Christ Church — Hall Staircase",
            production: "Harry Potter",
            city: "Oxford, United Kingdom",
            type: "Filming location & inspiration",
            connection: "Hogwarts staircase",
            coordinates: [51.7500, -1.2558],
            image: "images/harry-potter-christ-church.jpg",
            description:
                "The staircase was used in the films. Christ Church’s " +
                "dining hall also inspired the Great Hall, which " +
                "was recreated as a studio set.",
            source: "https://www.chch.ox.ac.uk/visit/things-to-see"
        },
        {
            name: "Kualoa Ranch",
            production: "LOST",
            city: "Oʻahu, Hawaii, United States",
            type: "Filming location",
            connection: "The island’s landscapes",
            coordinates: [21.5206, -157.8377],
            image: "images/lost-kualoa-ranch.webp",
            description:
                "Kualoa Ranch was one of several locations on Oʻahu " +
                "used to create the island landscapes seen in LOST.",
            source: "https://www.kualoa.com/film-and-tv"
        },
        {
            name: "Pyeongchang-dong House",
            production: "The Heirs",
            city: "Seoul, South Korea",
            type: "Reported exterior filming location",
            connection: "Kim Tan’s house exterior",
            coordinates: [37.6143, 126.9712],
            image: "images/the-heirs-house.jpg",
            description:
                "Filming-location guides identify this entrance as " +
                "an exterior of Kim Tan’s house. Interior scenes were " +
                "filmed elsewhere. The map point is approximate.",
            source: "https://hanlyu-map.com/contents/the-heirs-ba1c8d"
        },
        {
            name: "Vehbi Koç Büyükdere Evi",
            production: "Aşk-ı Memnu",
            city: "Istanbul, Türkiye",
            type: "Filming location",
            connection: "Ziyagil Yalısı",
            coordinates: [41.1648, 29.0475],
            image: "images/aski-memnu-yali.webp",
            description:
                "This waterfront house is familiar to viewers " +
                "as the Ziyagil family mansion in Aşk-ı Memnu.",
            source:
                "https://www.vkv.org.tr/tr/kultur/vehbi-koc-evi-130"
        }
    ];

    // HARİTADA AÇILAN BİLGİ KARTI

    function createPopup(location) {
        const container = document.createElement("div");
        container.className = "culture-popup screen-popup";

        const production = document.createElement("p");
        production.className = "screen-production";
        production.textContent = location.production;

        const image = document.createElement("img");
        image.className = "screen-photo";
        image.alt = location.name;
        image.loading = "lazy";

        image.addEventListener("error", () => {
            image.hidden = true;
        });

        image.src = location.image;

        const title = document.createElement("h3");
        title.textContent = location.name;

        const city = document.createElement("p");
        city.className = "popup-location";
        city.textContent = location.city;

        const type = document.createElement("p");
        type.className = "screen-type";
        type.textContent = location.type;

        const connection = document.createElement("p");
        connection.className = "screen-connection";
        connection.textContent = `On screen: ${location.connection}`;

        const description = document.createElement("p");
        description.className = "screen-description";
        description.textContent = location.description;

        const source = document.createElement("a");
        source.className = "text-link";
        source.href = location.source;
        source.target = "_blank";
        source.rel = "noopener noreferrer";
        source.textContent = "Location information ↗";

        container.append(
            production,
            image,
            title,
            city,
            type,
            connection,
            description,
            source
        );

        return container;
    }

    // NOKTALAR VE KÜMELEME

    const markers = createCultureClusterGroup("screen");

    locations.forEach((location) => {
        const marker = L.circleMarker(location.coordinates, {
            radius: 9,
            color: "#714096",
            weight: 2,
            fillColor: "#c09adb",
            fillOpacity: 0.95
        });

        marker.bindTooltip(
            `${location.production} · ${location.name}`
        );

        marker.bindPopup(createPopup(location), {
            minWidth: 230,
            maxWidth: 340,
            maxHeight: 400
        });

        markers.addLayer(marker);
    });

    // KATMAN MENÜSÜNE EKLE

    const screenLayer = L.layerGroup();

    categorySettings.screen = {
        layer: screenLayer,
        markers: markers,
        minimumZoom: 2,
        message:
            "Movies & TV Locations · Discover filming locations " +
            "and places that inspired your favourite films and series."
    };

    window.cultureLayerControl.addBaseLayer(
        screenLayer,
        "Movies & TV Locations"
    );

    // SEÇİLEN KATEGORİYE GÖRE HARİTA GÖRÜNÜMÜ

    function fitSelectedCategory() {
        poetryMap.closePopup();

        if (activeCategory === "poets") {
            poetryMap.setView([39, 35], 6, {
                animate: false
            });
        } else {
            let records;

            if (activeCategory === "artworks") {
                records = artLocations;
            } else if (activeCategory === "restaurants") {
                records = restaurants;
            } else {
                records = locations;
            }

            const bounds = L.latLngBounds(
                records.map((record) => record.coordinates)
            );

            if (bounds.isValid()) {
                poetryMap.fitBounds(bounds, {
                    padding: [40, 40],
                    maxZoom: 5,
                    animate: false
                });
            }
        }

        const minimumZoom =
            categorySettings[activeCategory].minimumZoom;

        if (poetryMap.getZoom() < minimumZoom) {
            poetryMap.setZoom(minimumZoom, {
                animate: false
            });
        }

        updateCategoryVisibility();
    }

    poetryMap.off("baselayerchange");

    poetryMap.on("baselayerchange", (event) => {
        const selected = Object.entries(categorySettings).find(
            ([key, setting]) => setting.layer === event.layer
        );

        if (!selected) {
            return;
        }

        activeCategory = selected[0];

        fitSelectedCategory();
    });

    // ARAMA LİSTESİNE FİLM VE DİZİLERİ EKLE

    locations.forEach((location) => {
        searchableCultureEntries.push({
            title: location.name,
            detail:
                `${location.production} · ${location.city} · ` +
                location.connection,
            category: "screen",
            coordinates: location.coordinates,
            markers: markers
        });
    });

    // HARİTAYI SIFIRLAMA BUTONU

    const resetButton = document.querySelector(
        "#leaflet-map .map-reset-button"
    );

    if (resetButton) {
        resetButton.addEventListener(
            "click",
            (event) => {
                event.stopImmediatePropagation();

                fitSelectedCategory();
            },
            true
        );
    }

    // SAYFANIN ALTINDAKİ FOTOĞRAFLI TABLO

    const tableBody = document.getElementById(
        "screen-table-body"
    );

    if (tableBody) {
        tableBody.replaceChildren();

        locations.forEach((location) => {
            const row = document.createElement("tr");

            // FOTOĞRAF

            const imageCell = document.createElement("td");

            const image = document.createElement("img");
            image.className = "screen-table-photo";
            image.alt = location.name;
            image.loading = "lazy";

            image.addEventListener("error", () => {
                image.hidden = true;
            });

            image.src = location.image;

            imageCell.append(image);

            // FİLM / DİZİ ADI

            const productionCell = document.createElement("th");
            productionCell.scope = "row";
            productionCell.textContent = location.production;

            // GERÇEK MEKÂN

            const locationCell = document.createElement("td");

            const locationLink = document.createElement("a");
            locationLink.href = location.source;
            locationLink.target = "_blank";
            locationLink.rel = "noopener noreferrer";
            locationLink.textContent = location.name;

            const city = document.createElement("p");
            city.className = "screen-table-city";
            city.textContent = location.city;

            locationCell.append(locationLink, city);

            // AÇIKLAMA

            const connectionCell = document.createElement("td");

            const connection = document.createElement("strong");
            connection.className = "screen-table-connection";
            connection.textContent = location.connection;

            const type = document.createElement("span");
            type.className = "screen-table-type";
            type.textContent = location.type;

            const description = document.createElement("p");
            description.className = "screen-table-description";
            description.textContent = location.description;

            connectionCell.append(
                connection,
                type,
                description
            );

            row.append(
                imageCell,
                productionCell,
                locationCell,
                connectionCell
            );

            tableBody.append(row);
        });
    }

    updateCategoryVisibility();
})();