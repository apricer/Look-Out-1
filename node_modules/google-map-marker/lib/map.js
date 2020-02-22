var MapMarker = (function () {
    /**
     * @constructor
     * mapMarker initializes map with custom markers
     * @param  {object}   options - list of options for setting up your map
     *                    options.centerPoint - lat, long coordinates (IE: {lat: 24.2131, lng: 14.45245})]
     *                    options.zoom - Integer of zoom level - Defaults to 12
     *                    options.markers - Array of Map Objects
     *                    options.elementId - DOM Element ID - Defaults to 'map-canvas'
     *                    options.mapType - choice of `road` `satellite` `hybrid` `terrrain`
     */
    function MapMarker(options) {
        this.version = '1.2.3';
        this.zoom = 12;
        this.elementId = 'map-canvas';
        this.mapType = 'road';
        this.scrollWheel = false;
        this.centerPoint = options.centerPoint;
        this.zoom = options.zoom;
        this.markers = options.markers;
        this.elementId = options.elementId;
        this.mapType = options.mapType;
        this.scrollWheel = options.scrollWheel;
    }
    /**
     * create map on page in supplied elementId
     * @public
     * @return {void}
     */
    MapMarker.prototype.createMap = function () {
        // throw error if google maps API is not included
        if (!google.maps) {
            throw new Error('This plugin requires the google maps api to be included on the page. ' +
                'Visit https://developers.google.com/maps/documentation/javascript/tutorial ' +
                'for instructions.');
        }
        // throw error if markers is not an array
        if (!this.markers || this.markers.length < 1) {
            throw new Error('options.markers is not a valid array.');
        }
        // calculate centerPoint if it's not defined
        if (!this.centerPoint) {
            this.centerPoint = this._calculateCenterPoint();
        }
        var mapType;
        switch (this.mapType) {
            case 'satellite':
                mapType = google.maps.MapTypeId.SATELLITE;
                break;
            case 'terrain':
                mapType = google.maps.MapTypeId.TERRAIN;
                break;
            case 'hybrid':
                mapType = google.maps.MapTypeId.HYBRID;
                break;
            case 'road':
            default:
                mapType = google.maps.MapTypeId.ROADMAP;
        }
        var mapOptions = {
            center: new google.maps.LatLng(this.centerPoint.lat, this.centerPoint.lng),
            mapTypeId: mapType,
            scrollwheel: this.scrollWheel,
            zoom: this.zoom
        };
        this.map = new google.maps.Map(document.getElementById(this.elementId), mapOptions);
        this._addMarkersToMap();
    };
    /**
     * uses the supplied markers to figure out the appropriate center point
     * @return {object} returns object containin a lat and lng
     */
    MapMarker.prototype._calculateCenterPoint = function () {
        var markers = this.markers;
        var markerCount = markers.length;
        var maxLat, minLat, maxLng, minLng;
        var lat, lng;
        if (markerCount > 1) {
            markers.sort(function (a, b) {
                return a.latLng.lat - b.latLng.lat;
            });
            maxLat = markers[0].latLng.lat;
            minLat = markers[markerCount - 1].latLng.lat;
            console.log(maxLat, minLat);
            markers.sort(function (a, b) {
                return a.latLng.lng - b.latLng.lng;
            });
            maxLng = markers[0].latLng.lng;
            minLng = markers[markerCount - 1].latLng.lng;
            lat = (maxLat + minLat) / 2;
            lng = (maxLng + minLng) / 2;
        }
        else {
            lat = markers[0].latLng.lat;
            lng = markers[0].latLng.lng;
        }
        return { lat: lat, lng: lng };
    };
    /**
     * markers requires an image/color, latLng in each object in the array
     * optional values:
     * mapSize (defaults to {w: 50, h: 50}), title (defaults to 'My Marker')
     * @private
     * @param {array} markers - an array of marker objects
     * @return {void}
     */
    MapMarker.prototype._addMarkersToMap = function () {
        var markers = this.markers;
        var i = 0;
        for (var _i = 0; _i < markers.length; _i++) {
            var marker = markers[_i];
            var pos = {
                lat: marker.latLng.lat,
                lng: marker.latLng.lng
            }, w = void 0, h = void 0, img = marker.marker, title = marker.title, mapMarker = void 0;
            if (marker.size) {
                w = marker.size.w;
                h = marker.size.h;
            }
            if (img.indexOf('/') === -1) {
                // the image is a color
                img = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + img;
                w = 21;
                h = 34;
            }
            if (!pos.lat) {
                throw new Error('mapConfig.markers.latLng' +
                    ' is not defined. Array Index = ' + i);
            }
            mapMarker = new google.maps.Marker({
                icon: new google.maps.MarkerImage(img, new google.maps.Size(w, h)),
                map: this.map,
                position: new google.maps.LatLng(pos.lat, pos.lng),
                title: title,
                zindex: i
            });
            i++;
        }
    };
    return MapMarker;
})();
// this is for node, and is specifically for testing,
// it prevents an error in the browser.
if (typeof exports !== 'undefined') {
    // this has to be in es5 or typescript ignores the line... annoying
    exports.MapMarker = MapMarker;
}
