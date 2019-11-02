import axios from 'axios';

const base_api_url = 'http://localhost:3003/';

const Axios = axios;
Axios.defaults.headers.common = {
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
}

export { Axios, base_api_url };