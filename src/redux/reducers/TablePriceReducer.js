const initialState = {
    tablePrice: {},
    list: []
};

export const TablePricesReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case 'TABLE_PRICE_CREATE':
            newState.list = newState.list.concat(action.payload);
            return newState;
        case 'TABLE_PRICE_GET':
            newState.list = action.payload;
            return newState
        case 'TABLE_PRICE_GET_ONE':
            newState.tablePrice = action.payload;
            return newState;
        case 'TABLE_PRICE_UPDATE':
            const index = newState.list.findIndex((tablePrice) => (tablePrice._id === action.payload._id));
            newState.list = [].concat(newState.list)
            newState.list[index] = action.payload
            return newState;
        default:
            return state;
    }
};