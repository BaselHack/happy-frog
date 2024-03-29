import axios from 'axios';

const BASE_URL = 'https://api.opensensemap.org/boxes';

export default {
  getData: item =>
    axios
      .get(`${BASE_URL}/${item.senseBoxID}/data/${item.sensorID}`)
      .then(response => [
        {
          x: response.data.map(row => row.createdAt),
          y: response.data.map(row => row.value),
          line: {color: '#17BECF'},
        },
      ]),
  getPonds: () =>
    axios
      .get(BASE_URL, {params: {grouptag: 'happy-frog-sensors'}})
      .then(response =>
        response.data.map(pond => ({
          center: pond.currentLocation.coordinates.slice(0, 2).reverse(),
          senseBoxID: pond._id,
          sensorID: pond.sensors[0]._id,
        })),
      ),
};
