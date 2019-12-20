import axios from 'axios';
import qs from 'qs';
import { notification } from 'antd';
const base_api_url = 'http://192.168.0.110:3003/';

const Axios = axios;
Axios.defaults.headers.common = {
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
}

Axios.interceptors.request.use((config) => {

    config.paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'indices' });

    return config;

}, (error) => {
    return error;
 });

 Axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if(error && error.response && error.response.status) {
        switch(error.response.status) {
            case 412: 
                notification.info({
                    message: error.response.data,
                });
                break;
            case 500:
                notification.error({
                    message: error.response.data || 'Erro ao processar dados'
                });
                break;
            default:
                notification.error({
                    message: 'Erro no servidor'
                });
                break;
        }
    } else {
        notification.error({
            message: 'Erro ao processar dados'
        });
    }

    return Promise.reject(error);
});

export { Axios, base_api_url };