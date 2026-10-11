# Yağmur Akgül | Places & Stories

A personal Web GIS website that connects my academic background
with my interests in poetry, art, food, films and travel.

Created for Web GIS coursework at Hacettepe University.

## Live Website

[Explore the website](https://yagmurakgul.github.io/yagmur-web-site/)

## About the Project

This website explores the connections between places and stories.

Where was a poet born? Where is a famous artwork held?
Which real places appear in familiar films and series?

Through two interactive maps, visitors can explore cultural
locations, destinations I have visited and places on my wishlist.

The website has three pages:

- **Home:** A personal introduction and links to explore the maps.
- **About:** My education and an introduction to the project.
- **My Maps:** Interactive culture and travel maps, followed by
  expandable collections with photographs and descriptions.

## Development Journey

### 1. Finding an Idea

At the beginning of the assignment, I was unsure what kind of
website I wanted to create. I wanted to meet the Web GIS
requirements while building something that reflected my personality.

My first idea was to map the places I had visited. However,
I also wanted something distinctive, so I began thinking about
how my personal interests could be connected to geographic locations.

Poetry became the starting point. Instead of displaying only
destinations, I could use a map to explore the places behind
writers and their stories.

### 2. Building the First Pages

I started by creating the website structure in Visual Studio Code
using HTML and CSS.

I built the Home and About pages, added my photograph and organised
my education information. I chose a light pink background and
purple text as the website’s main colours.

This established the visual style before I developed the maps.

### 3. Creating the First Poetry Map

I selected 11 Turkish poets whose work I enjoy and mapped
their birthplaces using Leaflet.

The first version displayed purple points on the map.
Clicking a point showed information about the poets associated
with that location.

Some poets shared a birthplace, so I grouped their information
at the same point.

![Early poetry map displayed beside its code in Visual Studio Code](images/readme/first-poetry-map.png)

*An early version of the project, showing the poetry map
during development in Visual Studio Code and the browser.*

### 4. Adding Portraits and Selected Verses

I wanted the poetry map to include more than names and dates.

I added portraits and selected two-line excerpts from poems
I enjoy. These became part of the map popups, so visitors could
discover both the poets and their words by selecting a location.

### 5. Expanding the Cultural Theme

After developing the poetry collection, I wanted to include
other interests while keeping the work I had already completed.

I expanded the culture map with:

- Famous artworks and their museums or venues.
- Michelin-starred restaurants and featured dishes.
- Locations connected to films and television series.

I organised the collections into selectable layers.
Visitors can switch between categories and explore one
collection at a time.

### 6. Improving Map Interaction

As I added more locations, I worked on making the map easier
to navigate.

I added marker clustering to group nearby points when zooming out,
along with search and reset controls.

I also adjusted the map views for different categories.

During development, I encountered problems with layer switching,
map positioning and image paths. Resolving these issues helped me
understand how HTML, JavaScript and mapping libraries work together.

### 7. Creating the Travel Map

I kept my original travel idea as a separate map built with
OpenLayers.

This map has two categories: destinations I have visited
and places on my wishlist. Each destination includes a short note.

Using Leaflet and OpenLayers in the same project allowed me
to practise working with two different web mapping libraries.

### 8. Organising the Collections

As photographs and descriptions were added, the page became long.

I reorganised the collections into expandable sections.
Visitors can open the collection they want to explore,
while the other sections remain compact.

### 9. Personalising the Home Page

I added an AI-generated Sims-style character based on my photograph.
Its dance poses were combined into a looping GIF.

Clicking the character opens a speech bubble inviting visitors
to explore the maps.

I also added a “Surprise me” feature that selects a random
location from the culture map and opens its information popup.

### 10. Publishing the Website

I used Git and GitHub to track and upload the project.

I then configured GitHub Pages to publish the website,
making it accessible through a public link.

### 11. Final Version

The project developed from a simple poetry map into a personal
website with two interactive maps and four cultural collections.

The final culture map includes selectable categories,
marker clustering, image popups, search, a reset control
and a “Surprise me” button.

Throughout these changes, I kept the pink and purple design
consistent across the website.

![Final culture map with category selection, clustered markers, search, reset and Surprise me controls](images/readme/final-culture-map.png)

*The final culture map running locally alongside the project
in Visual Studio Code. Compared with the first version,
it offers more collections and ways to explore them.*

## Culture Map — Leaflet

The culture map contains four selectable categories.

| Category | Content |
| --- | --- |
| Poets | 11 selected Turkish poets, with birthplaces, portraits, life dates and selected verses |
| Artworks | 10 selected artworks and the museums or venues where they are held |
| Restaurants | 10 selected Michelin-starred restaurants, with locations and featured dishes |
| Movies & TV Locations | 9 places connected to films and television series, with photographs and descriptions |

### Poets

- Nâzım Hikmet Ran
- Orhan Veli Kanık
- Cemal Süreya
- Turgut Uyar
- Edip Cansever
- Attilâ İlhan
- Necip Fazıl Kısakürek
- Yahya Kemal Beyatlı
- Cahit Sıtkı Tarancı
- Özdemir Asaf
- Mehmet Akif Ersoy

### Artworks

- Girl with a Pearl Earring
- The Last Supper
- Mona Lisa
- The Scream
- The Starry Night
- Les Demoiselles d’Avignon
- American Gothic
- The Persistence of Memory
- The Kiss
- The Creation of Adam

### Movies & TV Locations

The collection includes places connected to:

- Breaking Bad
- How I Met Your Mother
- Sex and the City
- Friends
- Amélie
- Harry Potter
- LOST
- The Heirs
- Aşk-ı Memnu

The descriptions distinguish filming locations from places
that inspired fictional settings.

### Culture Map Features

- A collapsible category selector.
- Marker clustering for nearby locations.
- Popups with images and descriptions.
- Search for entries in the collections.
- A reset button for the selected category.
- Random location discovery through “Surprise me”.

## Travel Map — OpenLayers

The travel map displays two selectable categories.

### Visited Destinations

- France
- Belgium
- Germany
- Luxembourg

### Wishlist

- Spain
- Scotland
- Japan
- Thailand
- Taiwan
- Italy
- New Zealand
- Argentina

Selecting a destination opens a short note.
Nearby markers are grouped into clusters.

## Expandable Collections

Below the maps, visitors can open four collections:

- Poets
- Artworks
- Restaurants
- Movies & TV Locations

Each section contains a table with photographs and information.

## Home Page Interactions

The home page includes:

- An animated Sims-style character.
- A clickable speech bubble.
- An “Explore my maps” link.
- A “Surprise me” link that opens a random cultural location.

## Technologies

| Technology | Purpose |
| --- | --- |
| HTML5 | Page structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Map interactions and dynamic content |
| Leaflet | Culture map |
| Leaflet.markercluster | Clustering on the culture map |
| OpenLayers | Travel map |
| OpenStreetMap | Map data |
| Git and GitHub | Version control |
| GitHub Pages | Website hosting |
| Visual Studio Code | Development environment |

## Main Project Files

| File | Purpose |
| --- | --- |
| `index.html` | Home page |
| `about.html` | Education and project introduction |
| `poetry.html` | Maps and expandable collections |
| `style.css` | Main website styles |
| `page-updates.css` | Additional page and collection styles |
| `home.js` | Character speech bubble interaction |
| `poetry.js` | Main culture map, popups, search and collection rendering |
| `screen-locations.js` | Film and television locations, popups and table |
| `map-surprise.js` | Random location discovery |
| `openlayers-map.js` | Travel map and destination interactions |
| `images/` | Website photographs and animation |
| `images/readme/` | Development screenshots |
| `README.md` | Project documentation |

## Running Locally

1. Download or clone the repository.
2. Open the project folder in Visual Studio Code.
3. Install the Live Server extension if needed.
4. Right-click `index.html`.
5. Select **Open with Live Server**.

An internet connection is required to load map tiles and
the externally hosted mapping libraries.

No build step is required.

## Deployment

The website is published through GitHub Pages using:

- **Publishing source:** Deploy from a branch.
- **Branch:** `main`.
- **Folder:** Repository root.

Changes pushed to the publishing branch trigger a new deployment.

## Data Notes

- Coordinates are approximate and intended for exploration.
- Travel markers represent destinations rather than exact
  locations visited.
- Most countries are represented by their capitals;
  Scotland is represented by Edinburgh.
- Several poets share a birthplace, and several artworks
  share a museum.
- Film and television entries may represent filming sites,
  exterior locations or inspirations for fictional settings.
- The Pastis entry marks its former location.
- Michelin ratings and restaurant menus can change.
- Featured dishes may come from earlier menus and may not
  currently be available.

## What I Learned

Through this project, I practised:

- Creating and linking HTML pages.
- Styling a website with CSS.
- Adding interactions with JavaScript.
- Building maps with Leaflet and OpenLayers.
- Organising geographic information into selectable layers.
- Creating image popups and expandable tables.
- Using marker clustering and search controls.
- Managing image paths and debugging errors.
- Tracking changes with Git.
- Publishing a website with GitHub Pages.

The development process also helped me turn an initially uncertain
idea into a project connected to my own interests.

## Credits and Acknowledgements

Map data © OpenStreetMap contributors.
Additional basemap attribution is displayed on the maps.

Interactive maps use Leaflet, Leaflet.markercluster and OpenLayers.

Photographs, artworks and quoted verses belong to their respective
creators and rights holders. Their inclusion in this project does
not grant permission for reuse.

The Sims-style character was generated with AI using my photograph
as a reference and assembled into an animated GIF.

ChatGPT was used for brainstorming, coding guidance, troubleshooting
and drafting text during development.

This website was created for an educational project.

## Author

**Yağmur Akgül**
