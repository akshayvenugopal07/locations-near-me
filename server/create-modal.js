var modal = require('./location-model');
const dotenv = require('dotenv');

const env = dotenv.config();

const createModals = function () {

    var canRefreshService = process.env.CREATE_TABLE_AND_POPULATE;

    modal.locationModal.sync({ force: canRefreshService }).then(() => {

        console.log('location table created');

        if (canRefreshService) {

            const locationCount = 500; //no of locations needed
            const distanceLimit = 1500000; //in meters

            // add any center point and define distance limit and no of points to create locations
            const center = { latitude: 18.812718, longitude: 20.253928 };

            const randomLocations = generateMapPoints(center, distanceLimit, locationCount);

            modal.locationModal.bulkCreate(randomLocations);
        }
    });
}

//Generate a number of mappoints
function generateMapPoints(centerpoint, distance, amount) {
    let mappoints = [];
    for (let i = 0; i < amount; i++) {
        mappoints.push(randomGeo(centerpoint, distance, i));
    }
    return mappoints;
}

function randomGeo(center, radius, index) {
    let y0 = center.latitude;
    let x0 = center.longitude;
    let rd = radius / 111300; //about 111300 meters in one degree

    let u = Math.random();
    let v = Math.random();

    let w = rd * Math.sqrt(u);
    let t = 2 * Math.PI * v;
    let x = w * Math.cos(t);
    let y = w * Math.sin(t);

    //Adjust the x-coordinate for the shrinking of the east-west distances
    let xp = x / Math.cos(y0);

    let newlat = y + y0;
    let newlon = x + x0;

    return {
        'latitude': newlat.toFixed(5),
        'longitude': newlon.toFixed(5),
        'name': 'Name ' + index
    };
}

exports.createModals = createModals;
