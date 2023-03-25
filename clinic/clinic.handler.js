const { SuccessResponseObject } = require('@akhilome/common');
const { searchClinics } = require('./clinic.service');

exports.handleFetchClinics = async (req, res) => {
  const data = await searchClinics(req.query);

  res.json(new SuccessResponseObject('clinics retrieved', data));
};
