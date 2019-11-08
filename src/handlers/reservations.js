import { base_api_url, Axios } from './config';

export const getReservations = (filters = null) => {
    return (dispatch) => {
        return Axios.get(`${base_api_url}reservas`, { params: { filters }}).then(({data}) => {
            dispatch({
                type: 'RESERVATIONS_GET',
                payload: data
            })

            return Promise.resolve(data);
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const createReservation = (values) => {
    return (dispatch) => {
        return Axios.post(`${base_api_url}reservas`, values).then(({ data }) => {
            dispatch({
                type: 'RESERVATIONS_CREATE',
                payload: data
            })

            dispatch({
                type: 'LOTS_UPDATE',
                payload: data.vaga
            })

            dispatch({
                type: 'CUSTOMERS_UPDATE',
                payload: data.cliente
            })

            dispatch({
                type: 'VEHICLES_UPDATE',
                payload: data.veiculo
            })

            return Promise.resolve(data);
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const getReservation = (userId) => {
    return (dispatch) => {
        return Axios.get(`${base_api_url}reservas/${userId}`).then(({ data }) => {
            dispatch({
                type: 'RESERVATIONS_GET_ONE',
                payload: data
            })

            return Promise.resolve(data);
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const updateReservation = (values) => {
    return (dispatch) => {
        return Axios.put(`${base_api_url}reservas`, values).then(({ data }) => {
            dispatch({
                type: 'RESERVATIONS_UPDATE',
                payload: data
            })

            return Promise.resolve(data);
        })
        .catch(err => {
            console.log(err)
        })
    }
}