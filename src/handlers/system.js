import { Axios, base_api_url } from "./config";

export const login = (values) => {
    return (dispatch) => {
        return Axios.post(`${base_api_url}system/login`, values).then(({ data }) => {
            dispatch({
                type: 'SYSTEM_LOGIN',
                payload: data
            })

            return Promise.resolve(data);
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const setSystemParking = (parking) => {
    return {
        type: 'SYSTEM_SET_PARKING',
        payload: parking
    }
}