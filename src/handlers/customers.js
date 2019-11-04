import { base_api_url, Axios } from './config';

export const getCustomers = (filters = null) => {
    return (dispatch) => {
        return Axios.get(`${base_api_url}clientes`, { params: { filters }}).then(({data}) => {
            dispatch({
                type: 'CUSTOMERS_GET',
                payload: data
            })

            return Promise.resolve();
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const createCustomer = (values) => {
    return (dispatch) => {
        return Axios.post(`${base_api_url}clientes`, values).then(({ data }) => {
            dispatch({
                type: 'CUSTOMERS_CREATE',
                payload: data
            })

            return Promise.resolve();
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const getCustomer = (customerId) => {
    return (dispatch) => {
        return Axios.get(`${base_api_url}clientes/${customerId}`).then(({ data }) => {
            dispatch({
                type: 'CUSTOMERS_GET_ONE',
                payload: data
            })

            return Promise.resolve();
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const updateCustomer = (values) => {
    return (dispatch) => {
        return Axios.put(`${base_api_url}clientes`, values).then(({ data }) => {
            dispatch({
                type: 'CUSTOMERS_UPDATE',
                payload: data
            })

            return Promise.resolve();
        })
        .catch(err => {
            console.log(err)
        })
    }
}