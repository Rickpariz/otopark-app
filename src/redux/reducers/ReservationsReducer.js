const initialState = {
    resevation: {},
    list: []
};

export const ReservationsReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case 'RESERVATIONS_CREATE':
            newState.list = newState.list.concat(action.payload);
            return newState;
        case 'RESERVATIONS_GET':
            newState.list = [...newState.list].concat(action.payload);
            return newState
        case 'RESERVATIONS_GET_ONE':
            newState.resevation = action.payload;
            return newState;
        case 'RESERVATIONS_UPDATE':
            const index = newState.list.findIndex((resevation) => (resevation._id === action.payload._id));
            newState.list = [].concat(newState.list)
            newState.list[index] = action.payload
            return newState;
        case 'RESERVATIONS_DELETE': 
            const newList = newState.list.filter(r => r._id !== action.payload.toString());
            newState.list = newList;
            return newState;
        case 'RESERVATIONS_CLEAR':
            newState.list = [];
            return newState;
        default:
            return state;
    }
};