import { base_api_url, Axios } from './config';

export const getUsers = () => {
    return (dispatch) => {
        return Axios.get(`${base_api_url}usuarios`,)
        // .then(res => res.json())
        .then(data => {
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