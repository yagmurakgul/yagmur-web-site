// YAKIN NOKTALARI KÜMELENDİRME

function createCultureClusterGroup(category) {
    return L.markerClusterGroup({
        maxClusterRadius: 55,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        spiderfyOnMaxZoom: true,
        animate: true,

        iconCreateFunction: function (cluster) {
            const count = cluster.getChildCount();

            return L.divIcon({
                html:
                    '<span class="culture-cluster-count">' +
                    count +
                    "</span>",
                className: "culture-cluster cluster-" + category,
                iconSize: [44, 44],
                iconAnchor: [22, 22]
            });
        }
    });
}

// ==================================================
// ŞAİRLER
// ==================================================

const poets = [
    {
        name: "Nâzım Hikmet Ran",
        born: 1902,
        died: 1963,
        place: "Thessaloniki, Greece",
        coordinates: [40.6401, 22.9444],
        image: "nazim-hikmet.jpg",
        verse: `ben artık şarkı dinlemek değil,
şarkı söylemek istiyorum...`
    },
    {
        name: "Orhan Veli Kanık",
        born: 1914,
        died: 1950,
        place: "Beykoz, İstanbul",
        coordinates: [41.1327, 29.1050],
        image: "orhan-veli.jpg",
        verse: `İstanbul'u dinliyorum, gözlerim kapalı;
Başımda eski alemlerin sarhoşluğu.`
    },
    {
        name: "Cemal Süreya",
        born: 1931,
        died: 1990,
        place: "Erzincan",
        coordinates: [39.7500, 39.4900],
        image: "cemal-sureya.jpg",
        verse: `Şimdi sen kalkıp gidiyorsun. Git
Gözlerin durur mu onlar da gidiyorlar. Gitsinler.`
    },
    {
        name: "Turgut Uyar",
        born: 1927,
        died: 1985,
        place: "Ankara",
        coordinates: [39.9334, 32.8597],
        image: "turgut-uyar.jpg",
        verse: `Senin bu ellerinde ne var bilmiyorum göğe bakalım
Tuttukça güçleniyorum kalabalık oluyorum.`
    },
    {
        name: "Edip Cansever",
        born: 1928,
        died: 1986,
        place: "İstanbul",
        coordinates: [41.0082, 28.9784],
        image: "edip-cansever.jpg",
        verse: `Biliyor musun az az yaşıyorsun içimde
Oysaki seninle güzel olmak var.`
    },
    {
        name: "Attilâ İlhan",
        born: 1925,
        died: 2005,
        place: "Menemen, İzmir",
        coordinates: [38.6075, 27.0694],
        image: "attila-ilhan.jpg",
        verse: `Ben sana mecburum bilemezsin
Adını mıh gibi aklımda tutuyorum.`
    },
    {
        name: "Necip Fazıl Kısakürek",
        born: 1904,
        died: 1983,
        place: "İstanbul",
        coordinates: [41.0082, 28.9784],
        image: "necip-fazil.jpg",
        verse: `Ne hasta bekler sabahı,
Ne taze ölüyü mezar.`
    },
    {
        name: "Yahya Kemal Beyatlı",
        born: 1884,
        died: 1958,
        place: "Skopje, North Macedonia",
        coordinates: [41.9981, 21.4254],
        image: "yahya-kemal.jpeg",
        verse: `Artık demir almak günü gelmişse zamandan
Meçhule giden bir gemi kalkar bu limandan.`
    },
    {
        name: "Cahit Sıtkı Tarancı",
        born: 1910,
        died: 1956,
        place: "Diyarbakır",
        coordinates: [37.9144, 40.2306],
        image: "cahit-sitki.jpg",
        verse: `Şakaklarıma kar mı yağdı ne var?
Benim mi Allahım bu çizgili yüz?`
    },
    {
        name: "Özdemir Asaf",
        born: 1923,
        died: 1981,
        place: "Ankara",
        coordinates: [39.9334, 32.8597],
        image: "ozdemir-asaf.jpg",
        verse: `Sana gitme demeyeceğim.
Üşüyorsun ceketimi al.`
    },
    {
        name: "Mehmet Âkif Ersoy",
        born: 1873,
        died: 1936,
        place: "Fatih, İstanbul",
        coordinates: [41.0170, 28.9400],
        image: "mehmet-akif.png",
        verse: `Şu Boğaz Harbi nedir? Var mı ki dünyâda eşi?
En kesîf orduların yükleniyor dördü beşi`
    }
];

// Aynı doğum yerindeki şairleri grupla.
// Bu değişken ikinci OpenLayers haritasında da kullanılıyor.
const birthplaces = [];

poets.forEach(function (poet) {
    let birthplace = birthplaces.find(function (item) {
        return item.place === poet.place;
    });

    if (!birthplace) {
        birthplace = {
            place: poet.place,
            coordinates: poet.coordinates,
            poets: []
        };

        birthplaces.push(birthplace);
    }

    birthplace.poets.push(poet);
});


// ==================================================
// ESERLER VE BULUNDUKLARI YERLER
// Koordinatlar yaklaşık bina konumlarını temsil eder.
// ==================================================

const artLocations = [
    {
        venue: "Mauritshuis",
        city: "The Hague, Netherlands",
        coordinates: [52.0809, 4.3140],
        source:
            "https://www.mauritshuis.nl/en/our-collection/artworks/670-girl-with-a-pearl-earring",
        artworks: [
            {
                title: "Girl with a Pearl Earring",
                artist: "Johannes Vermeer",
                date: "c. 1665",
                image: "girl-with-pearl-earring.jpg"
            }
        ]
    },
    {
        venue: "Museo del Cenacolo Vinciano",
        city: "Milan, Italy",
        coordinates: [45.4659, 9.1706],
        source: "https://cenacolovinciano.org/en/museum/",
        artworks: [
            {
                title: "The Last Supper",
                artist: "Leonardo da Vinci",
                date: "1495–1498",
                image: "last-supper.jpg",
                note:
                    "A wall painting in the refectory of Santa Maria delle Grazie."
            }
        ]
    },
    {
        venue: "Louvre Museum",
        city: "Paris, France",
        coordinates: [48.8606, 2.3376],
        source:
            "https://www.louvre.fr/en/explore/the-palace/from-the-mona-lisa-to-the-wedding-feast-at-cana",
        artworks: [
            {
                title: "Mona Lisa",
                artist: "Leonardo da Vinci",
                date: "Early 16th century",
                image: "mona-lisa.jpg"
            }
        ]
    },
    {
        venue: "National Museum",
        city: "Oslo, Norway",
        coordinates: [59.9110, 10.7300],
        source:
            "https://www.nasjonalmuseet.no/en/collection/object/NG.M.00939",
        artworks: [
            {
                title: "The Scream",
                artist: "Edvard Munch",
                date: "1893",
                image: "the-scream.jpg",
                note:
                    "This entry represents the National Museum's 1893 version."
            }
        ]
    },
    {
        venue: "The Museum of Modern Art — MoMA",
        city: "New York, United States",
        coordinates: [40.7614, -73.9776],
        source: "https://www.moma.org/collection/",
        artworks: [
            {
                title: "The Starry Night",
                artist: "Vincent van Gogh",
                date: "1889",
                image: "starry-night.jpg"
            },
            {
                title: "Les Demoiselles d’Avignon",
                artist: "Pablo Picasso",
                date: "1907",
                image: "demoiselles-avignon.jpg"
            },
            {
                title: "The Persistence of Memory",
                artist: "Salvador Dalí",
                date: "1931",
                image: "persistence-of-memory.jpg"
            }
        ]
    },
    {
        venue: "Art Institute of Chicago",
        city: "Chicago, United States",
        coordinates: [41.8796, -87.6237],
        source: "https://www.artic.edu/artworks/6565/american-gothic",
        artworks: [
            {
                title: "American Gothic",
                artist: "Grant Wood",
                date: "1930",
                image: "american-gothic.jpg"
            }
        ]
    },
    {
        venue: "Upper Belvedere",
        city: "Vienna, Austria",
        coordinates: [48.1915, 16.3809],
        source: "https://sammlung.belvedere.at/objects/6678/",
        artworks: [
            {
                title: "The Kiss",
                artist: "Gustav Klimt",
                date: "c. 1907–1909",
                image: "the-kiss.jpg"
            }
        ]
    },
    {
        venue: "Sistine Chapel",
        city: "Vatican City",
        coordinates: [41.9029, 12.4545],
        source:
            "https://www.museivaticani.va/content/museivaticani/en/collezioni/musei/cappella-sistina/volta/storie-centrali/creazione-di-adamo.html",
        artworks: [
            {
                title: "The Creation of Adam",
                artist: "Michelangelo",
                date: "Sistine ceiling: 1508–1512",
                image: "creation-of-adam.jpg",
                note: "A fresco on the ceiling of the Sistine Chapel."
            }
        ]
    }
];


// ==================================================
// ŞAİR BİLGİ KUTULARI
// ==================================================

function createPoetPopup(birthplace) {
    const popup = document.createElement("div");
    popup.className = "culture-popup";

    const location = document.createElement("p");
    location.className = "popup-location";
    location.textContent = "Birthplace: " + birthplace.place;
    popup.appendChild(location);

    birthplace.poets.forEach(function (poet) {
        const card = document.createElement("article");
        card.className = "map-poet-card";

        const heading = document.createElement("div");
        heading.className = "map-poet-heading";

        const image = document.createElement("img");
        image.src = "images/" + poet.image;
        image.alt = "Portrait of " + poet.name;
        image.width = 70;
        image.height = 86;

        const information = document.createElement("div");

        const name = document.createElement("h3");
        name.textContent = poet.name;

        const dates = document.createElement("p");
        dates.textContent = poet.born + "–" + poet.died;

        information.append(name, dates);
        heading.append(image, information);

        const quote = document.createElement("blockquote");
        quote.className = "map-verse";
        quote.lang = "tr";
        quote.textContent = poet.verse;

        card.append(heading, quote);
        popup.appendChild(card);
    });

    return popup;
}


// ==================================================
// ESER BİLGİ KUTULARI
// ==================================================

function createArtworkPopup(location) {
    const popup = document.createElement("div");
    popup.className = "culture-popup";

    const venue = document.createElement("h3");
    venue.textContent = location.venue;

    const city = document.createElement("p");
    city.className = "popup-location";
    city.textContent = location.city;

    popup.append(venue, city);

    location.artworks.forEach(function (artwork) {
        const card = document.createElement("article");
        card.className = "map-art-card";

        const image = document.createElement("img");
        image.src = "images/" + artwork.image;
        image.alt = artwork.title + " by " + artwork.artist;
        image.className = "map-art-image";

        const title = document.createElement("h4");
        title.textContent = artwork.title;

        const artist = document.createElement("p");
        artist.textContent = artwork.artist + " · " + artwork.date;

        card.append(image, title, artist);

        if (artwork.note) {
            const note = document.createElement("p");
            note.className = "artwork-note";
            note.textContent = artwork.note;
            card.appendChild(note);
        }

        popup.appendChild(card);
    });

    const source = document.createElement("a");
    source.href = location.source;
    source.target = "_blank";
    source.rel = "noopener noreferrer";
    source.className = "text-link";
    source.textContent = "Museum information ↗";

    popup.appendChild(source);

    return popup;
}


// ==================================================
// LEAFLET HARİTASI
// ==================================================

const poetryMap = L.map("leaflet-map", {
    minZoom: 1,
    maxZoom: 18,
    maxBounds: [
        [-85, -180],
        [85, 180]
    ],
    maxBoundsViscosity: 1
}).setView([40, 30], 5);

// Arka plan, kategori değiştiğinde de haritada kalır.
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    noWrap: true,
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">' +
        "OpenStreetMap</a> contributors"
}).addTo(poetryMap);


// ŞAİR NOKTALARI
const poetMarkers = createCultureClusterGroup("poets");

birthplaces.forEach(function (birthplace) {
    L.circleMarker(birthplace.coordinates, {
        radius: 8,
        color: "#66358a",
        weight: 2,
        fillColor: "#b77ac9",
        fillOpacity: 0.9
    })
        .bindPopup(createPoetPopup(birthplace), {
            minWidth: 230,
            maxWidth: 340,
            maxHeight: 360
        })
        .bindTooltip(birthplace.place)
        .addTo(poetMarkers);
});


// ESER NOKTALARI
const artworkMarkers = createCultureClusterGroup("artworks");

artLocations.forEach(function (location) {
    L.circleMarker(location.coordinates, {
        radius: 9,
        color: "#1d6669",
        weight: 2,
        fillColor: "#45a6a6",
        fillOpacity: 0.9
    })
        .bindPopup(createArtworkPopup(location), {
            minWidth: 230,
            maxWidth: 340,
            maxHeight: 400
        })
        .bindTooltip(location.venue)
        .addTo(artworkMarkers);
});


// KATEGORİ KATMANLARI

// RESTORAN VERİLERİ
// Koordinatlar yaklaşık konumları gösterir: [enlem, boylam].
// Michelin yıldızları Ekim 2026'da kontrol edilmiştir.

const restaurants = [
    {
        name: "Disfrutar",
        city: "Barcelona",
        country: "Spain",
        stars: 3,
        address: "Carrer de Villarroel, 163",
        coordinates: [41.3878, 2.1532],
        website:
            "https://guide.michelin.com/en/catalunya/barcelona/restaurant/disfrutar"
    },
    {
        name: "Osteria Francescana",
        city: "Modena",
        country: "Italy",
        stars: 3,
        address: "Via Stella, 22",
        coordinates: [44.6447, 10.9215],
        website:
            "https://guide.michelin.com/it/en/emilia-romagna/modena/restaurant/osteria-francescana"
    },
    {
        name: "Le Bernardin",
        city: "New York",
        country: "United States",
        stars: 3,
        address: "155 West 51st Street",
        coordinates: [40.7616, -73.9818],
        website:
            "https://guide.michelin.com/us/en/new-york-state/new-york/restaurant/le-bernardin"
    },
    {
        name: "Odette",
        city: "Singapore",
        country: "Singapore",
        stars: 3,
        address: "National Gallery, 1 St Andrew’s Road, #01-04",
        coordinates: [1.2904, 103.8516],
        website:
            "https://guide.michelin.com/gb/en/singapore-region/singapore/restaurant/odette"
    },
    {
        name: "Mikla",
        city: "Istanbul",
        country: "Türkiye",
        stars: 1,
        address: "The Marmara Pera, Meşrutiyet Caddesi No: 15",
        coordinates: [41.0318, 28.9753],
        website:
            "https://guide.michelin.com/tr/tr/istanbul-province/istanbul/restaurant/mikla"
    },
    {
        name: "TURK Fatih Tutak",
        city: "Istanbul",
        country: "Türkiye",
        stars: 2,
        address: "Bomonti, Yeniyol Sokak No: 2, Şişli",
        coordinates: [41.0607, 28.9784],
        website:
            "https://guide.michelin.com/en/istanbul-province/istanbul/restaurant/turk-fatih-tutak"
    },
    {
        name: "CORE by Clare Smyth",
        city: "London",
        country: "United Kingdom",
        stars: 3,
        address: "92 Kensington Park Road, Notting Hill",
        coordinates: [51.5154, -0.2055],
        website:
            "https://guide.michelin.com/gb/en/greater-london/london/restaurant/core-by-clare-smyth"
    },
    {
        name: "Plénitude – Cheval Blanc Paris",
        city: "Paris",
        country: "France",
        stars: 3,
        address: "Cheval Blanc Paris, 8 Quai du Louvre",
        coordinates: [48.8585, 2.3421],
        website:
            "https://guide.michelin.com/us/en/ile-de-france/paris/restaurant/plenitude-cheval-blanc-paris"
    },
    {
        name: "The Fat Duck",
        city: "Bray",
        country: "United Kingdom",
        stars: 3,
        address: "High Street, Bray",
        coordinates: [51.5083, -0.7023],
        website:
            "https://guide.michelin.com/gb/en/windsor-and-maidenhead/bray/restaurant/fat-duck"
    },
    {
        name: "El Celler de Can Roca",
        city: "Girona",
        country: "Spain",
        stars: 3,
        address: "Can Sunyer, 48",
        coordinates: [41.9934, 2.8078],
        website:
            "https://guide.michelin.com/en/catalunya/girona/restaurant/el-celler-de-can-roca"
    }
];

// RESTORAN YEMEKLERİ VE GÖRSELLERİ

const restaurantDishes = {
    "Disfrutar": {
        name: "Multispherical Pesto",
        image: "images/disfrutar-dish.jpg",
        description:
            "Pesto presented as delicate spheres, paired with smoked eel and pistachios."
    },

    "Osteria Francescana": {
        name: "Oops! I Dropped the Lemon Tart",
        image: "images/francescana-dish.webp",
        description:
            "A deliberately broken lemon tart that turns a kitchen accident into a carefully composed dessert."
    },

    "Le Bernardin": {
        name: "Tuna with Foie Gras",
        image: "images/le-bernardin-dish.webp",
        description:
            "Thinly pounded yellowfin tuna served with foie gras, toasted baguette and chives."
    },

    "Odette": {
        name: "Rosemary-Smoked Organic Egg",
        image: "images/odette-dish.jpg",
        description:
            "A slow-cooked egg paired with smoked potato foam, chorizo and crisp buckwheat."
    },

    "Mikla": {
        name: "Anchovy Crisp on Olive Oil Bread",
        image: "images/mikla-dish.webp",
        description:
            "Crisp anchovy on olive oil bread, served with lemon foam and chives."
    },

    "TURK Fatih Tutak": {
        name: "Mantı",
        image: "images/turk-dish.jpeg",
        description:
            "An interpretation of Turkish dumplings created as a tribute to the chef's mother."
    },

    "CORE by Clare Smyth": {
        name: "Potato and Roe",
        image: "images/core-dish.jpg",
        description:
            "A signature dish that places the humble potato at the centre of a fine-dining experience, complemented by fish roe."
    },

    "Plénitude – Cheval Blanc Paris": {
        name: "Langoustine with Lady Godiva Sauce",
        image: "images/plenitude-dish.png",
        description:
            "Langoustine paired with a layered sabayon featuring langoustine consommé, rosemary and chestnut honey."
    },

    "The Fat Duck": {
        name: "Sound of the Sea",
        image: "images/fat-duck-dish.jpeg",
        description:
            "Seafood arranged to evoke a shoreline, accompanied by the sound of waves."
    },

    "El Celler de Can Roca": {
        name: "Orange Chromaticism",
        image: "images/can-roca-dish.avif",
        description:
            "An autumn-inspired composition exploring orange tones through orange, quince, egg yolk and carrot."
    }
};

// YENİ RESTORAN BİLGİ KARTI

function createRestaurantPopup(restaurant) {
    const dish = restaurantDishes[restaurant.name];

    const container = document.createElement("div");
    container.className = "culture-popup restaurant-popup";

    const label = document.createElement("p");
    label.className = "restaurant-label";
    label.textContent = "A TASTE OF THE WORLD";

    const title = document.createElement("h3");
    title.textContent = restaurant.name;

    const location = document.createElement("p");
    location.className = "restaurant-location";
    location.textContent =
        restaurant.city + " · " + restaurant.country;

    const distinction = document.createElement("div");
    distinction.className = "michelin-badge";

    const stars = document.createElement("span");
    stars.className = "michelin-stars";
    stars.textContent = "★".repeat(restaurant.stars);
    stars.setAttribute("aria-hidden", "true");

    const starLabel = document.createElement("span");
    starLabel.textContent =
        restaurant.stars +
        " Michelin " +
        (restaurant.stars === 1 ? "Star" : "Stars");

    distinction.append(stars, starLabel);

    container.append(label, title, location, distinction);

    if (dish) {
        const image = document.createElement("img");
        image.className = "restaurant-dish-photo";
        image.alt = dish.name + " at " + restaurant.name;
        image.loading = "lazy";

        image.addEventListener("error", function () {
            image.hidden = true;
        });

        image.src = dish.image;

        const dishLabel = document.createElement("p");
        dishLabel.className = "restaurant-dish-label";
        dishLabel.textContent = "FEATURED DISH";

        const dishTitle = document.createElement("h4");
        dishTitle.className = "restaurant-dish-title";
        dishTitle.textContent = dish.name;

        const description = document.createElement("p");
        description.className = "restaurant-dish-description";
        description.textContent = dish.description;

        container.append(
            image,
            dishLabel,
            dishTitle,
            description
        );
    }

    const address = document.createElement("p");
    address.className = "restaurant-address";

    const addressLabel = document.createElement("strong");
    addressLabel.textContent = "Address: ";

    address.append(
        addressLabel,
        document.createTextNode(restaurant.address)
    );

    const link = document.createElement("a");
    link.className = "restaurant-link";
    link.href = restaurant.website;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Explore in the Michelin Guide ↗";

    const note = document.createElement("p");
    note.className = "restaurant-source-note";
    note.textContent =
        "Michelin stars checked October 2026. Featured dishes may come from earlier menus; availability can change.";

    container.append(address, link, note);

    return container;
}
// RESTORAN İŞARETÇİLERİ

const restaurantMarkers = createCultureClusterGroup("restaurants");

restaurants.forEach(function (restaurant) {
    L.circleMarker(restaurant.coordinates, {
        radius: 9,
        color: "#9b4777",
        weight: 2,
        fillColor: "#e69ab8",
        fillOpacity: 0.95
    })
        .bindTooltip(restaurant.name, {
            direction: "top",
            offset: [0, -8]
        })
        .bindPopup(createRestaurantPopup(restaurant), {
            maxWidth: 340,
            minWidth: 230,
            maxHeight: 380
        })
        .addTo(restaurantMarkers);
});

// KATEGORİLER

const poetsCategory = L.layerGroup().addTo(poetryMap);
const artworksCategory = L.layerGroup();
const restaurantsCategory = L.layerGroup();

// Radyo düğmeleri: aynı anda yalnızca bir kategori görünür.

L.control.layers(
    {
        "Poets": poetsCategory,
        "Artworks": artworksCategory,
        "Restaurants": restaurantsCategory
    },
    null,
    {
        collapsed: true,
        position: "topright"
    }
).addTo(poetryMap);

L.control.scale({
    imperial: false
}).addTo(poetryMap);

let activeCategory = "poets";

const mapStatus = document.getElementById("leaflet-status");

const categorySettings = {
    poets: {
        layer: poetsCategory,
        markers: poetMarkers,
        minimumZoom: 6,
        message:
            "Poets · Select a birthplace to see portraits and verses."
    },
    artworks: {
        layer: artworksCategory,
        markers: artworkMarkers,
        minimumZoom: 2,
        message:
            "Artworks · Select a museum to explore its artworks."
    },
    restaurants: {
        layer: restaurantsCategory,
        markers: restaurantMarkers,
        minimumZoom: 2,
        message:
            "Restaurants · Select a location to explore Michelin stars and restaurant details."
    }
};

// YAKINLAŞTIRMA SEVİYESİNE GÖRE GÖRÜNÜRLÜK

function updateCategoryVisibility() {
    const selected = categorySettings[activeCategory];
    const visible = poetryMap.getZoom() >= selected.minimumZoom;

    Object.entries(categorySettings).forEach(function ([key, setting]) {
        const shouldShow = key === activeCategory && visible;

        if (shouldShow) {
            if (!setting.layer.hasLayer(setting.markers)) {
                setting.layer.addLayer(setting.markers);
            }
        } else {
            if (setting.layer.hasLayer(setting.markers)) {
                setting.layer.removeLayer(setting.markers);
            }
        }
    });

    if (!visible) {
        poetryMap.closePopup();
    }

    if (mapStatus) {
        mapStatus.textContent = visible
            ? selected.message
            : "Zoom in to level " +
              selected.minimumZoom +
              " or above to see the selected locations.";
    }
}
// KATEGORİ DEĞİŞTİRME

poetryMap.on("baselayerchange", function (event) {
    poetryMap.closePopup();

    if (event.layer === poetsCategory) {
        activeCategory = "poets";
        poetryMap.setView([40, 30], 6);
    } else if (event.layer === artworksCategory) {
        activeCategory = "artworks";

        const bounds = L.latLngBounds(
            artLocations.map(function (location) {
                return location.coordinates;
            })
        );

        poetryMap.fitBounds(bounds, {
            padding: [35, 35],
            maxZoom: 5
        });
    } else if (event.layer === restaurantsCategory) {
        activeCategory = "restaurants";

        const bounds = L.latLngBounds(
            restaurants.map(function (restaurant) {
                return restaurant.coordinates;
            })
        );

        poetryMap.fitBounds(bounds, {
            padding: [35, 35],
            maxZoom: 5
        });
    }

    updateCategoryVisibility();
});

poetryMap.on("zoomend", updateCategoryVisibility);

updateCategoryVisibility();

// ==================================================
// FOTOĞRAFLI ŞAİR TABLOSU
// ==================================================

const poetTableBody = document.getElementById("poet-table-body");

if (poetTableBody) {
    poetTableBody.replaceChildren();

    poets.forEach(function (poet) {
        const row = document.createElement("tr");

        const portraitCell = document.createElement("td");
        const image = document.createElement("img");

        image.src = "images/" + poet.image;
        image.alt = "Portrait of " + poet.name;
        image.className = "poet-portrait";
        image.loading = "lazy";
        image.width = 72;
        image.height = 88;

        portraitCell.appendChild(image);

        const nameCell = document.createElement("th");
        nameCell.scope = "row";
        nameCell.textContent = poet.name;

        const datesCell = document.createElement("td");
        datesCell.textContent = poet.born + "–" + poet.died;

        const placeCell = document.createElement("td");
        placeCell.textContent = poet.place;

        row.append(portraitCell, nameCell, datesCell, placeCell);
        poetTableBody.appendChild(row);
    });
}


// ==================================================
// GÖRSELLİ ESER TABLOSU
// ==================================================

const artworkTableBody = document.getElementById("artwork-table-body");

if (artworkTableBody) {
    artworkTableBody.replaceChildren();

    artLocations.forEach(function (location) {
        location.artworks.forEach(function (artwork) {
            const row = document.createElement("tr");

            const imageCell = document.createElement("td");
            const image = document.createElement("img");

            image.src = "images/" + artwork.image;
            image.alt = artwork.title + " by " + artwork.artist;
            image.className = "artwork-thumbnail";
            image.loading = "lazy";

            imageCell.appendChild(image);

            const titleCell = document.createElement("th");
            titleCell.scope = "row";

            const title = document.createElement("div");
            title.textContent = artwork.title;

            const artist = document.createElement("div");
            artist.className = "detail";
            artist.textContent = artwork.artist + " · " + artwork.date;

            titleCell.append(title, artist);

            const locationCell = document.createElement("td");

            const venue = document.createElement("div");
            venue.textContent = location.venue;

            const city = document.createElement("div");
            city.className = "detail";
            city.textContent = location.city;

            locationCell.append(venue, city);

            row.append(imageCell, titleCell, locationCell);
            artworkTableBody.appendChild(row);
        });
    });
}

// AÇILIP KAPANAN HARİTA ARAMASI

function normalizeSearchText(text) {
    return String(text)
        .toLocaleLowerCase("tr")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ı/g, "i");
}

// Aranabilecek bütün kayıtlar
const cultureSearchEntries = [];

poets.forEach(function (poet) {
    cultureSearchEntries.push({
        title: poet.name,
        detail: "Poet · " + poet.place,
        category: "poets",
        coordinates: poet.coordinates,
        markers: poetMarkers
    });
});

artLocations.forEach(function (location) {
    // Müze adıyla da arama yapılabilir.
    cultureSearchEntries.push({
        title: location.name || location.museum || location.place,
        detail: "Museum · Artworks",
        category: "artworks",
        coordinates: location.coordinates,
        markers: artworkMarkers
    });

    const works = location.artworks || location.works || [];

    works.forEach(function (artwork) {
        cultureSearchEntries.push({
            title: artwork.title || artwork.name,
            detail: "Artwork · " + (artwork.artist || ""),
            category: "artworks",
            coordinates: location.coordinates,
            markers: artworkMarkers
        });
    });
});

restaurants.forEach(function (restaurant) {
    cultureSearchEntries.push({
        title: restaurant.name,
        detail:
            "Restaurant · " +
            restaurant.city +
            " · " +
            "★".repeat(restaurant.stars),
        category: "restaurants",
        coordinates: restaurant.coordinates,
        markers: restaurantMarkers
    });
});

// Eksik başlıklı kayıtları aramaya dahil etme.
const searchableCultureEntries = cultureSearchEntries.filter(
    function (entry) {
        return Boolean(entry.title);
    }
);

function openCultureSearchResult(entry) {
    poetryMap.closePopup();

    // Doğru kategoriyi seç.
    activeCategory = entry.category;

    Object.entries(categorySettings).forEach(function ([key, setting]) {
        if (key !== entry.category) {
            poetryMap.removeLayer(setting.layer);
        }
    });

    const selectedCategory = categorySettings[entry.category];

    if (!poetryMap.hasLayer(selectedCategory.layer)) {
        poetryMap.addLayer(selectedCategory.layer);
    }

    // Yakınlaş ve işaretçileri görünür yap.
    poetryMap.setView(entry.coordinates, 12, {
        animate: false
    });

    updateCategoryVisibility();

    // İlgili işaretçinin bilgi kartını aç.
    const target = L.latLng(entry.coordinates);

    const marker = entry.markers.getLayers().find(function (layer) {
        return (
            typeof layer.getLatLng === "function" &&
            layer.getLatLng().distanceTo(target) < 10
        );
    });

 if (marker) {
    entry.markers.zoomToShowLayer(marker, function () {
        marker.openPopup();
    });
}

// HARİTA ÜZERİNDEKİ ARAMA KONTROLÜ

const CultureSearchControl = L.Control.extend({
    options: {
        position: "topleft"
    },

    onAdd: function () {
        const container = L.DomUtil.create(
            "div",
            "culture-search-control"
        );

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "culture-search-toggle";
        toggle.textContent = "🔍";
        toggle.title = "Search the map";
        toggle.setAttribute("aria-label", "Search the map");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-controls", "culture-search-panel");

        const panel = document.createElement("div");
        panel.id = "culture-search-panel";
        panel.className = "culture-search-panel";
        panel.hidden = true;

        const label = document.createElement("label");
        label.htmlFor = "culture-search-input";
        label.textContent = "Discover a place";

        const input = document.createElement("input");
        input.id = "culture-search-input";
        input.type = "search";
        input.placeholder = "Search poets, artworks, restaurants…";
        input.autocomplete = "off";

        const results = document.createElement("div");
        results.className = "culture-search-results";

        const status = document.createElement("p");
        status.className = "culture-search-status";
        status.setAttribute("role", "status");
        status.textContent = "Type a name to explore the map.";

        panel.append(label, input, status, results);
        container.append(toggle, panel);

        // Arama kutusunu kullanırken harita hareket etmesin.
        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.disableScrollPropagation(container);

        function closeSearch() {
            panel.hidden = true;
            toggle.setAttribute("aria-expanded", "false");
        }

        function renderResults() {
            const query = normalizeSearchText(input.value.trim());

            results.replaceChildren();

            if (!query) {
                status.textContent = "Type a name to explore the map.";
                return;
            }

            const matches = searchableCultureEntries.filter(
                function (entry) {
                    const text = normalizeSearchText(
                        entry.title + " " + entry.detail
                    );

                    return text.includes(query);
                }
            );

            status.textContent = matches.length
                ? matches.length + " results found."
                : "No results found. Try another name.";

            matches.slice(0, 10).forEach(function (entry) {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "culture-search-result";

                const title = document.createElement("strong");
                title.textContent = entry.title;

                const detail = document.createElement("span");
                detail.textContent = entry.detail;

                button.append(title, detail);

                button.addEventListener("click", function () {
                    closeSearch();
                    toggle.focus();
                    openCultureSearchResult(entry);
                });

                results.append(button);
            });
        }

        toggle.addEventListener("click", function () {
            const opening = panel.hidden;

            panel.hidden = !opening;
            toggle.setAttribute("aria-expanded", String(opening));

            if (opening) {
                input.focus();
            }
        });

        input.addEventListener("input", renderResults);

        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                const firstResult = results.querySelector("button");

                if (firstResult) {
                    event.preventDefault();
                    firstResult.click();
                }
            }
        });

        container.addEventListener("keydown", function (event) {
            event.stopPropagation();

            if (event.key === "Escape") {
                closeSearch();
                toggle.focus();
            }
        });

        return container;
    }
});

new CultureSearchControl().addTo(poetryMap); }

// LEAFLET: SEÇİLİ KATEGORİYE GERİ DÖN

const CultureResetControl = L.Control.extend({
    options: {
        position: "topleft"
    },

    onAdd: function () {
        const container = L.DomUtil.create(
            "div",
            "map-reset-control"
        );

        const button = document.createElement("button");
        button.type = "button";
        button.className = "map-reset-button";
        button.textContent = "↺";
        button.title = "Show all selected locations";
        button.setAttribute(
            "aria-label",
            "Show all selected locations"
        );

        L.DomEvent.disableClickPropagation(container);

        button.addEventListener("click", function () {
            poetryMap.closePopup();

            let coordinates;

            if (activeCategory === "poets") {
                coordinates = poets.map(function (poet) {
                    return poet.coordinates;
                });
            } else if (activeCategory === "artworks") {
                coordinates = artLocations.map(function (location) {
                    return location.coordinates;
                });
            } else {
                coordinates = restaurants.map(function (restaurant) {
                    return restaurant.coordinates;
                });
            }

            poetryMap.fitBounds(L.latLngBounds(coordinates), {
                padding: [45, 45],
                maxZoom: 6,
                animate: false
            });

            updateCategoryVisibility();
        });

        container.append(button);

        return container;
    }
});

new CultureResetControl().addTo(poetryMap);

// FOTOĞRAFLI RESTORAN TABLOSU

const restaurantTableBody = document.getElementById(
    "restaurant-table-body"
);

if (restaurantTableBody) {
    restaurantTableBody.replaceChildren();

    restaurants.forEach(function (restaurant) {
        const dish = restaurantDishes[restaurant.name];
        const row = document.createElement("tr");

        // YEMEK FOTOĞRAFI
        const imageCell = document.createElement("td");

        if (dish) {
            const image = document.createElement("img");
            image.className = "restaurant-table-photo";
            image.alt = dish.name + " at " + restaurant.name;
            image.loading = "lazy";

            image.addEventListener("error", function () {
                image.hidden = true;
            });

            image.src = dish.image;
            imageCell.append(image);
        } else {
            imageCell.textContent = "—";
        }

        // RESTORAN ADI VE REHBER BAĞLANTISI
        const nameCell = document.createElement("th");
        nameCell.scope = "row";

        const link = document.createElement("a");
        link.href = restaurant.website;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = restaurant.name;

        nameCell.append(link);

        // KONUM
        const locationCell = document.createElement("td");
        locationCell.textContent =
            restaurant.city + ", " + restaurant.country;

        // MICHELIN YILDIZLARI
        const starsCell = document.createElement("td");

        const stars = document.createElement("span");
        stars.className = "restaurant-table-stars";
        stars.textContent = "★".repeat(restaurant.stars);
        stars.setAttribute(
            "aria-label",
            restaurant.stars +
                " Michelin " +
                (restaurant.stars === 1 ? "Star" : "Stars")
        );

        starsCell.append(stars);

        // YEMEK ADI VE AÇIKLAMASI
        const dishCell = document.createElement("td");

        if (dish) {
            const dishTitle = document.createElement("strong");
            dishTitle.className = "restaurant-table-dish-name";
            dishTitle.textContent = dish.name;

            const description = document.createElement("p");
            description.className = "restaurant-table-description";
            description.textContent = dish.description;

            dishCell.append(dishTitle, description);
        } else {
            dishCell.textContent = "—";
        }

        row.append(
            imageCell,
            nameCell,
            locationCell,
            starsCell,
            dishCell
        );

        restaurantTableBody.append(row);
    });
}