const initialState = {
    vehicle: { },
    list: []
};

export const VehiclesReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case 'VEHICLES_CREATE':
            newState.list = newState.list.concat(action.payload);
            return newState;
        case 'VEHICLES_GET': 
            newState.list = action.payload;
            return newState
        case 'VEHICLES_GET_ONE':
            newState.vehicle = action.payload;
            return newState;
        case 'VEHICLES_UPDATE':
            const index = newState.list.findIndex((vehicle)=>(vehicle._id === action.payload._id));
            newState.list = [].concat(newState.list)
            newState.list[index] = action.payload
            return newState;
        default:
            return state;
    }
};