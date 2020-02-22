[![bitHound Overall Score](https://www.bithound.io/github/Lucien-Consulting/Google-Map-Marker/badges/score.svg)](https://www.bithound.io/github/Lucien-Consulting/Google-Map-Marker) [![bitHound Code](https://www.bithound.io/github/Lucien-Consulting/Google-Map-Marker/badges/code.svg)](https://www.bithound.io/github/Lucien-Consulting/Google-Map-Marker) [![bitHound Dev Dependencies](https://www.bithound.io/github/Lucien-Consulting/Google-Map-Marker/badges/devDependencies.svg)](https://www.bithound.io/github/Lucien-Consulting/Google-Map-Marker/master/dependencies/npm)
# Google Map Marker
Create custom map markers on your website using Google Maps and this simple Javascript Plugin.

Requires Google Maps API to also be included on page. 

## Install with NPM.

    npm install google-map-marker --save

## Pre-requesite

Include the Maps API on your page. (https://developers.google.com/maps/documentation/javascript/tutorial)

## Creating map markers

The markers are powered by a config object. Create the config object, instantiate and create the map.
```
        var config = {
            centerPoint: {
                lat: 33.7496844,
                lng: -84.7516932
            }, 
            zoom: 15, 
            markers: [
                {
                    marker : "http://lucienconsulting.com/_/images/map_logo.png", 
                    title : "Lucien Consulting",
                    latLng : {
                        lat: 33.7496844,
                        lng: -84.7516932
                    },
                    size : {
                        w: 50,
                        h: 76,
                    }
                }
            ],
            elementId: 'map-canvas'
        }

        var myMap = new MapMarker(config);
        myMap.createMap();
```

## Options

- `centerPoint`: object, containing lat and lng points. Optional (Will calculate the center if not supplied.)
- `zoom` (default: 12): number, desired zoom level of map. Optional.
- `elementId` (default: 'map-canvas'): string, of the desired element where you want your map to appear. Optional.
- `markers`: array, marker objects. **Required**
- `mapType` (default: 'road'): string, choice of `road` `satellite` `hybrid` `terrrain`. Optional.
- `scrollWheel` (default: false): boolean, if true, allow zooming on map using scroll wheel. Optional.

### Markers objects
- `marker` (default: 'EE4116'): string, hex color or url for the map marker. Defaults to orange. Optional.
- `title` (default: 'My Marker'): string, what you want the title to be. Optional.
- `latLng`: object, containing lat and lng points. **Required**
- `size` (default if img {w:50, h:50}): object, width and height of image. If using a color, this option is ignored. Optional.
