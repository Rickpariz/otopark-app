const initialState = {
    customer: {},
    list: []
};

export const CustomersReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case 'CUSTOMERS_CREATE':
            newState.list = newState.list.concat(action.payload);
            return newState;
        case 'CUSTOMERS_GET': 
            newState.list = action.payload;
            return newState
        case 'CUSTOMERS_GET_ONE':
            newState.customer = action.payload;
            return newState;
        case 'CUSTOMERS_UPDATE':
            const index = newState.list.findIndex((customer)=>(customer._id === action.payload._id));
            newState.list = [].concat(newState.list)
            newState.list[index] = action.payload
            return newState;
        default:
            return state;
    }
};