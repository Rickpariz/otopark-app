import { base_api_url, Axios } from './config';

export const getParkings = () => {
    return (dispatch) => {
        return Axios.get(`${base_api_url}estacionamentos`).then(({data}) => {
            dispatch({
                type: 'PARKINGS_GET',
                payload: data
            })

            return Promise.resolve();
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const createParking = (values) => {
    return (dispatch) => {
        return Axios.post(`${base_api_url}estacionamentos`, values).then(({ data }) => {
            dispatch({
                type: 'PARKINGS_CREATE',
                payload: data
            })

            return Promise.resolve();
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const getParking = (userId) => {
    return (dispatch) => {
        return Axios.get(`${base_api_url}estacionamentos/${userId}`).then(({ data }) => {
            dispatch({
                type: 'PARKINGS_GET_ONE',
                payload: data
            })

            return Promise.resolve();
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const updateParking = (values) => {
    return (dispatch) => {
        return Axios.put(`${base_api_url}estacionamentos`, values).then(({ data }) => {
            dispatch({
                type: 'PARKINGS_UPDATE',
                payload: data
            })

            return Promise.resolve();
        })
        .catch(err => {
            console.log(err)
        })
    }
}