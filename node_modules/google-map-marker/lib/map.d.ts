declare var google: any;
declare var exports: any;
declare class MapMarker {
    version: string;
    map: any;
    centerPoint: any;
    zoom: number;
    elementId: string;
    markers: any;
    mapType: string;
    scrollWheel: boolean;
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
    constructor(options: any);
    /**
     * create map on page in supplied elementId
     * @public
     * @return {void}
     */
    createMap(): void;
    /**
     * uses the supplied markers to figure out the appropriate center point
     * @return {object} returns object containin a lat and lng
     */
    _calculateCenterPoint(): {
        lat: any;
        lng: any;
    };
    /**
     * markers requires an image/color, latLng in each object in the array
     * optional values:
     * mapSize (defaults to {w: 50, h: 50}), title (defaults to 'My Marker')
     * @private
     * @param {array} markers - an array of marker objects
     * @return {void}
     */
    _addMarkersToMap(): void;
}
