import { base_api_url, Axios } from './config';

export const getVehicles = (filters = null) => {
    return (dispatch) => {
        return Axios.get(`${base_api_url}veiculos`, { params: { filters }}).then(({data}) => {
            dispatch({
                type: 'VEHICLES_GET',
                payload: data
            })

            return Promise.resolve(data);
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const createVehicle = (values) => {
    return (dispatch) => {
        return Axios.post(`${base_api_url}veiculos`, values).then(({ data }) => {
            dispatch({
                type: 'VEHICLES_CREATE',
                payload: data
            })

            return Promise.resolve(data);
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const getVehicle = (vehicleId) => {
    return (dispatch) => {
        return Axios.get(`${base_api_url}veiculos/${vehicleId}`).then(({ data }) => {
            dispatch({
                type: 'VEHICLES_GET_ONE',
                payload: data
            })

            return Promise.resolve(data);
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const updateVehicle = (values) => {
    return (dispatch) => {
        return Axios.put(`${base_api_url}veiculos`, values).then(({ data }) => {
            dispatch({
                type: 'VEHICLES_UPDATE',
                payload: data
            })

            return Promise.resolve(data);
        })
        .catch(err => {
            console.log(err)
        })
    }
}