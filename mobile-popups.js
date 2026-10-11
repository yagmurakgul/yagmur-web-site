(() => {
    if (
        typeof poetryMap === "undefined" ||
        typeof categorySettings === "undefined"
    ) {
        return;
    }

    const smallScreen = window.matchMedia(
        "(max-width: 760px)"
    ).matches;

    poetryMap.options.closePopupOnClick = false;

    Object.values(categorySettings).forEach((category) => {
        const group = category.markers;

        if (!group || typeof group.eachLayer !== "function") {
            return;
        }

        group.eachLayer((marker) => {
            const popup = marker.getPopup();

            if (!popup) {
                return;
            }

            marker.options.bubblingMouseEvents = false;

            popup.options.closeOnClick = false;
            popup.options.closeButton = true;

            if (smallScreen) {
                // Kart açılınca harita kayıp noktayı kaldırmasın.
                popup.options.autoPan = false;
                popup.options.keepInView = false;

                const mapWidth =
                    poetryMap.getContainer().clientWidth;

                popup.options.minWidth = Math.min(
                    230,
                    Math.max(120, mapWidth - 60)
                );

                popup.options.maxWidth = Math.min(
                    300,
                    Math.max(120, mapWidth - 60)
                );

                popup.options.maxHeight = 260;
            }

            // Bu noktalardaki varsayılan aç/kapat tıklamasını
            // yalnızca açan bir tıklama ile değiştir.
            marker.off("click");

            marker.on("click", (event) => {
                if (event.originalEvent) {
                    L.DomEvent.stopPropagation(
                        event.originalEvent
                    );
                }

                // İkinci dokunma açık kartı kapatmasın.
                if (!marker.isPopupOpen()) {
                    marker.openPopup();
                }
            });
        });
    });

    poetryMap.on("popupopen", (event) => {
        const element = event.popup.getElement();

        if (element) {
            L.DomEvent.disableClickPropagation(element);
            L.DomEvent.disableScrollPropagation(element);
        }
    });
})();