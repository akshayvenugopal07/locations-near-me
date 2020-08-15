const server = require('./server.js');
var modal = require("./sequlize-config");

const createRoutes = function () {
    server.app.get('/nearbyMe', (req, res) => {
        const nearByMeQuery = 'SELECT name, latitude, longitude, SQRT(POW(69.1 * (latitude - ' + req.query.lat + '), 2) + POW(69.1 * (' + req.query.lng + ' - longitude) * COS(latitude / 57.3), 2)) AS distance FROM locations HAVING distance < ' + req.query.range + ' ORDER BY distance';
        modal.sequelize.query(nearByMeQuery,
            {
                type: modal.sequelize.QueryTypes.SELECT,
                raw: true
            }
        ).then((result) => {
            const responseData = {
                'status': 1,
                'message': 'Success',
                'data': result
            };
            res.status(200).json(responseData);
        }).catch((error) => {
            const responseData = {
                'status': 0,
                'message': 'Error',
                'data': error
            };
            res.status(200).json(responseData);
        });
    });


    server.app.get('/listAll', (req, res) => {
        const nearByMeQuery = 'SELECT * FROM `locations`';
        modal.sequelize.query(nearByMeQuery,
            {
                type: modal.sequelize.QueryTypes.SELECT,
                raw: true
            }
        ).then((result) => {
            const responseData = {
                'status': 1,
                'message': 'Success',
                'data': result
            };
            res.status(200).json(responseData);
        }).catch((error) => {
            const responseData = {
                'status': 0,
                'message': 'Error',
                'data': error
            };
            res.status(200).json(responseData);
        });
    });
}

exports.createRoutes = createRoutes;

