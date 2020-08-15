var modal = require('./location-model');
const dotenv = require('dotenv');

const env = dotenv.config();

const createModals = function () {

    var canRefreshService = process.env.CREATE_TABLE_AND_POPULATE;

    modal.locationModal.sync({ force: canRefreshService }).then(() => {

        console.log('location table created');

        if (canRefreshService) {

            const locationCount = 100; //no of locations needed
            const distanceLimit = 400000; //in meters

            // add any center point and define distance limit and no of points to create locations
            const centerKochi = { latitude: 10.033767, longitude: 76.402485 }; // Kochi
            const centerTrichur = { latitude: 10.570847, longitude: 76.361450 }; // thrissur
            const centerKozhikode = { latitude: 11.345411, longitude: 75.949964 }; // kozhikode
            const centerKollam = { latitude: 8.992922, longitude: 76.825522 }; // kollam
            const centerTvm = { latitude: 8.597995, longitude: 77.080438 }; // tvm

            const randomLocationsKochi = generateMapPoints(centerKochi, distanceLimit, locationCount);
            const randomLocationsTrichur = generateMapPoints(centerTrichur, distanceLimit, locationCount);
            const randomLocationKozhikode = generateMapPoints(centerKozhikode, distanceLimit, locationCount);
            const randomLocationsKollam = generateMapPoints(centerKollam, distanceLimit, locationCount);
            const randomLocationsTvm = generateMapPoints(centerTvm, distanceLimit, locationCount);

            modal.locationModal.bulkCreate(randomLocationsKochi);
            modal.locationModal.bulkCreate(randomLocationsTrichur);
            modal.locationModal.bulkCreate(randomLocationKozhikode);
            modal.locationModal.bulkCreate(randomLocationsKollam);
            modal.locationModal.bulkCreate(randomLocationsTvm);
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
