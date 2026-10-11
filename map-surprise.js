(() => {
    if (
        typeof poetryMap === "undefined" ||
        typeof searchableCultureEntries === "undefined" ||
        typeof categorySettings === "undefined"
    ) {
        console.warn(
            "Surprise me: map scripts must load first."
        );

        return;
    }

    let previousPlace = "";

    function showRandomPlace() {
        // Aynı konumu arama listesindeki tekrarlarından ayır.
        const uniquePlaces = new Map();

        searchableCultureEntries.forEach((entry) => {
            const settings = categorySettings[entry.category];

            if (
                !settings ||
                !Array.isArray(entry.coordinates) ||
                !entry.markers ||
                typeof entry.markers.getLayers !== "function"
            ) {
                return;
            }

            const key =
                `${entry.category}:${entry.coordinates.join(",")}`;

            if (!uniquePlaces.has(key)) {
                uniquePlaces.set(key, entry);
            }
        });

        const places = Array.from(uniquePlaces.entries());

        if (places.length === 0) {
            return;
        }

        // Üst üste aynı yer gelmesini önle.
        const alternatives = places.filter(
            ([key]) => key !== previousPlace
        );

        const candidates =
            alternatives.length > 0 ? alternatives : places;

        const randomIndex = Math.floor(
            Math.random() * candidates.length
        );

        const [key, entry] = candidates[randomIndex];

        previousPlace = key;

        // Mevcut arama fonksiyonunu kullan.
        if (typeof openCultureSearchResult === "function") {
            openCultureSearchResult(entry);
            return;
        }

        // Arama fonksiyonu yoksa noktayı doğrudan aç.
        poetryMap.closePopup();

        activeCategory = entry.category;

        Object.entries(categorySettings).forEach(
            ([category, settings]) => {
                if (category !== entry.category) {
                    poetryMap.removeLayer(settings.layer);
                }
            }
        );

        const selected = categorySettings[entry.category];

        if (!poetryMap.hasLayer(selected.layer)) {
            poetryMap.addLayer(selected.layer);
        }

        poetryMap.setView(entry.coordinates, 12, {
            animate: false
        });

        updateCategoryVisibility();

        const target = L.latLng(entry.coordinates);

        const marker = entry.markers.getLayers().find(
            (layer) => {
                return (
                    typeof layer.getLatLng === "function" &&
                    layer.getLatLng().distanceTo(target) < 10
                );
            }
        );

        if (!marker) {
            return;
        }

        if (
            typeof entry.markers.zoomToShowLayer === "function"
        ) {
            entry.markers.zoomToShowLayer(marker, () => {
                marker.openPopup();
            });
        } else {
            marker.openPopup();
        }
    }

    // Haritadan da yeni bir rastgele yer seçilebilsin.
    const SurpriseControl = L.Control.extend({
        options: {
            position: "bottomleft"
        },

        onAdd() {
            const container = L.DomUtil.create(
                "div",
                "culture-surprise-control"
            );

            const button = document.createElement("button");

            button.type = "button";
            button.className = "culture-surprise-button";
            button.textContent = "Surprise me ↗";
            button.title = "Discover a random place";

            button.addEventListener("click", () => {
                showRandomPlace();
            });

            container.append(button);

            L.DomEvent.disableClickPropagation(container);
            L.DomEvent.disableScrollPropagation(container);

            return container;
        }
    });

    new SurpriseControl().addTo(poetryMap);

    // Ana sayfadaki bağlantıdan gelindiyse otomatik aç.
    const parameters = new URLSearchParams(
        window.location.search
    );

    if (parameters.get("surprise") === "1") {
        poetryMap.whenReady(() => {
            requestAnimationFrame(() => {
                poetryMap.invalidateSize();
                showRandomPlace();
            });
        });
    }
})();