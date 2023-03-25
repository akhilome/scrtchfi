const { ErrorResponseObject } = require('@akhilome/common');
const express = require('express');
const helmet = require('helmet');
const { handleFetchClinics } = require('./clinic.handler');

const app = express();

app.use(express.json());
app.use(helmet());

app.get('/clinics', handleFetchClinics);
app.all('*', (_, res) => res.status(404).json(new ErrorResponseObject('route not defined')));

exports.app = app;
