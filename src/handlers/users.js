import { base_api_url, Axios } from './config';

export const getUsers = () => {
    return (dispatch) => {
        return Axios.get(`${base_api_url}usuarios`).then(({data}) => {
            dispatch({
                type: 'USERS_GET',
                payload: data
            })

            return Promise.resolve();
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const createUser = (values) => {
    return (dispatch) => {
        return Axios.post(`${base_api_url}usuarios`, values).then(({ data }) => {
            dispatch({
                type: 'USERS_CREATE',
                payload: data
            })

            return Promise.resolve();
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const getUser = (userId) => {
    return (dispatch) => {
        return Axios.get(`${base_api_url}usuarios/${userId}`).then(({ data }) => {
            dispatch({
                type: 'USERS_GET_ONE',
                payload: data
            })

            return Promise.resolve();
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const updateUser = (values) => {
    return (dispatch) => {
        return Axios.put(`${base_api_url}usuarios`, values).then(({ data }) => {
            dispatch({
                type: 'USERS_UPDATE',
                payload: data
            })

            return Promise.resolve();
        })
        .catch(err => {
            console.log(err)
        })
    }
}