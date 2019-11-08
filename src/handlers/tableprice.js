import { base_api_url, Axios } from './config';

export const getTablePrices = (filters = null) => {
    return (dispatch) => {
        return Axios.get(`${base_api_url}tabeladeprecos`, { params: { filters }}).then(({data}) => {
            dispatch({
                type: 'TABLE_PRICE_GET',
                payload: data
            })

            return Promise.resolve(data);
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const createTablePrice = (values) => {
    return (dispatch) => {
        return Axios.post(`${base_api_url}tabeladeprecos`, values).then(({ data }) => {
            dispatch({
                type: 'TABLE_PRICE_CREATE',
                payload: data
            })

            return Promise.resolve(data);
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const getTablePrice = (lotId) => {
    return (dispatch) => {
        return Axios.get(`${base_api_url}tabeladeprecos/${lotId}`).then(({ data }) => {
            dispatch({
                type: 'TABLE_PRICE_GET_ONE',
                payload: data
            })

            return Promise.resolve(data);
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const updateTablePrice = (values) => {
    return (dispatch) => {
        return Axios.put(`${base_api_url}tabeladeprecos`, values).then(({ data }) => {
            dispatch({
                type: 'TABLE_PRICE_UPDATE',
                payload: data
            })

            return Promise.resolve(data);
        })
        .catch(err => {
            console.log(err)
        })
    }
}