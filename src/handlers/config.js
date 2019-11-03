import axios from 'axios';
import qs from 'qs';
const base_api_url = 'http://localhost:3003/';

const Axios = axios;
Axios.defaults.headers.common = {
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
}

Axios.interceptors.request.use((config) => {

    config.paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'indices' });

    return config;

}, (error) => { });

export { Axios, base_api_url };