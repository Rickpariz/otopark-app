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
        case 'USER_CREATE':
            newState.list = newState.list.concat(action.payload);
            return newState;
        case 'USERS_GET': 
            newState.list = action.payload;
            return newState
        default:
            return state;
    }
};