const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

const route = require('./routes');
var config = require("./sequlize-config");
var modals = require("./create-modal");

const env = dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('tiny'));

app.listen(PORT, () => {
    console.log(`Express Server started on Port ${app.get('port')} | Environment : ${app.get('env')}`);
    route.createRoutes();

    config.sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
            modals.createModals();
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
});

exports.app = app;