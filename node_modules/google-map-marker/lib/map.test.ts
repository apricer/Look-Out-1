import * as tap from 'tap';
import * as Marker from './map';

tap.test('Generate Center Point', {autoend: true}, (t) => {
    let myMap = new Marker.MapMarker({
        markers: [
            {
                latLng : {
                    lat: 33.7496844,
                    lng: -84.7516932
                }
            },
            {
                latLng : {
                    lat: 63.7506764,
                    lng: -54.7493308
                }
            }
        ]
    });
    let center = {
        lat: (33.7496844 + 63.7506764) / 2,
        lng: (-84.7516932 + -54.7493308) / 2
    }
    let cp = myMap._calculateCenterPoint();

    t.ok(cp);
    t.type(cp, 'object');
    t.ok(cp.lat);
    t.ok(cp.lng);
    t.equal(cp.lat, center.lat);
    t.equal(cp.lng, center.lng);

    let myMap2 = new Marker.MapMarker({
        markers: [
            {
                latLng : {
                    lat: 33.7496844,
                    lng: -84.7516932
                }
            }
        ]
    });
    let center2 = {
        lat: 33.7496844,
        lng: -84.7516932
    }

    let cp2 = myMap2._calculateCenterPoint();
    t.ok(cp2);
    t.type(cp2, 'object');
    t.ok(cp2.lat);
    t.ok(cp2.lng);
    t.equal(cp2.lat, center2.lat);
    t.equal(cp2.lng, center2.lng);
    // t.ok('center point code works');
    t.passing();
    t.end();
});