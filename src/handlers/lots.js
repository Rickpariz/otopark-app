import { base_api_url, Axios } from './config';

export const getLots = (filters = null) => {
    return (dispatch) => {
        return Axios.get(`${base_api_url}vagas`, { params: { filters }}).then(({data}) => {
            dispatch({
                type: 'LOTS_GET',
                payload: data
            })

            return Promise.resolve(data);
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const createLot = (values) => {
    return (dispatch) => {
        return Axios.post(`${base_api_url}vagas`, values).then(({ data }) => {
            dispatch({
                type: 'LOTS_CREATE',
                payload: data
            })

            return Promise.resolve(data);
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const getLot = (lotId) => {
    return (dispatch) => {
        return Axios.get(`${base_api_url}vagas/${lotId}`).then(({ data }) => {
            dispatch({
                type: 'LOTS_GET_ONE',
                payload: data
            })

            return Promise.resolve(data);
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const updateLot = (values) => {
    return (dispatch) => {
        return Axios.put(`${base_api_url}vagas`, values).then(({ data }) => {
            dispatch({
                type: 'LOTS_UPDATE',
                payload: data
            })

            return Promise.resolve(data);
        })
        .catch(err => {
            console.log(err)
        })
    }
}