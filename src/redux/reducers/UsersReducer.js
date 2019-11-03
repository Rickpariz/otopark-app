const initialState = {
    user: {
        nome: '',
        email: '',
        senha: '',
        tipo: '',
        status: true
    },
    list: []
};

export const UsersReducers = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case 'USERS_CREATE':
            newState.list = newState.list.concat(action.payload);
            return newState;
        case 'USERS_GET': 
            newState.list = action.payload;
            return newState
        case 'USERS_GET_ONE':
            newState.user = action.payload;
            return newState;
        case 'USERS_UPDATE':
            const index = newState.list.findIndex((user)=>(user._id === action.payload._id));
            newState.list = [].concat(newState.list)
            newState.list[index] = action.payload
            return newState;
        default:
            return state;
    }
};