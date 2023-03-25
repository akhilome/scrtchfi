const { default: axios } = require('axios');
const { normalizeDental, normalizeVet, mapToStateCode } = require('./utils');

const spoolClinics = async ({ type, url }) => {
  const { data } = await axios.get(url);

  if (type === 'dental') {
    return data.map(normalizeDental);
  } else {
    return data.map(normalizeVet);
  }
};

const spoolAllClinics = async () => {
  const dentalUrl = 'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json';
  const vetUrl = 'https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json';

  const [dental, vet] = await Promise.all([
    spoolClinics({ type: 'dental', url: dentalUrl }),
    spoolClinics({ type: 'vet', url: vetUrl }),
  ]);

  //! NOTE: a cache can be explored here as well
  //! that way, there'd be no need to hit the API
  //! for every single request

  return [...dental, ...vet];
};

const filterByProp = ({ data, key, value }) => {
  return data.filter((item) => item[key].toLowerCase() === value.toLowerCase());
};

const filterByAvailability = ({ data, key, value }) => {
  return data.filter((item) => {
    const parsedFrom = Number(item.availability.from.replace(':', ''));
    const parsedTo = Number(item.availability.to.replace(':', ''));
    const parsedValue = Number(value.replace(':', ''));

    if (key === 'from') {
      return parsedValue >= parsedFrom && parsedValue < parsedTo;
    }

    if (key === 'to') {
      return parsedValue > parsedFrom && parsedValue <= parsedTo;
    }
  });
};

/**
 * @typedef {object} ClinicsQuery
 * @property {string} state
 * @property {string} name
 * @property {string} from
 * @property {string} to
 *
 * @param {ClinicsQuery} query
 */
exports.searchClinics = async (query) => {
  let data = await spoolAllClinics();

  const { state, name, from, to } = query;

  if (state) {
    data = filterByProp({ data, key: 'stateCode', value: mapToStateCode(state) });
  }

  if (name) {
    data = filterByProp({ data, key: 'name', value: name });
  }

  if (from) {
    data = filterByAvailability({ data, key: 'from', value: from });
  }

  if (to) {
    data = filterByAvailability({ data, key: 'to', value: to });
  }

  return data;
};
