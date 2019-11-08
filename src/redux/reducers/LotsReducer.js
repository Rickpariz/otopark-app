const initialState = {
    lot: {},
    list: []
};

export const LotsReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case 'LOTS_CREATE':
            newState.list = newState.list.concat(action.payload);
            return newState;
        case 'LOTS_GET':
            newState.list = action.payload;
            return newState
        case 'LOTS_GET_ONE':
            newState.lot = action.payload;
            return newState;
        case 'LOTS_UPDATE':
            const index = newState.list.findIndex((lot) => (lot._id === action.payload._id));
            newState.list = [].concat(newState.list)
            newState.list[index] = action.payload
            return newState;
        default:
            return state;
    }
};