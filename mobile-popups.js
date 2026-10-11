(() => {
    if (
        typeof poetryMap === "undefined" ||
        typeof categorySettings === "undefined"
    ) {
        return;
    }

    // Haritaya dokunmak açık bilgi kartını kapatmasın.
    poetryMap.options.closePopupOnClick = false;

    Object.values(categorySettings).forEach((category) => {
        const group = category.markers;

        if (!group || typeof group.eachLayer !== "function") {
            return;
        }

        group.eachLayer((marker) => {
            // Noktaya dokunma olayı haritaya aktarılmasın.
            marker.options.bubblingMouseEvents = false;

            const popup = marker.getPopup();

            if (popup) {
                popup.options.closeOnClick = false;
                popup.options.closeButton = true;
            }
        });
    });

    // Kartın içindeki dokunma ve kaydırmaları ayır.
    poetryMap.on("popupopen", (event) => {
        const element = event.popup.getElement();

        if (element) {
            L.DomEvent.disableClickPropagation(element);
            L.DomEvent.disableScrollPropagation(element);
        }
    });
})();