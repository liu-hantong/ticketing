import axios from 'axios';

const BuildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on the server
    return axios.create({
      baseURL: 'http://www.ticketing-hantong.xyz/',
      headers: req.headers,
    });
  } else {
    // we must be on the browser
    return axios.create({
      baseUrl: '/',
    });
  }
};

export default BuildClient;
