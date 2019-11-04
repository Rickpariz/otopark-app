const initialState = {
    user: {},
    parking: {}
};

export const SystemReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case 'SYSTEM_LOGIN': 
            newState.user = action.payload;
            return newState;
        case 'SYSTEM_SET_PARKING': 
            newState.parking = action.payload;
            return newState;
        default:
            return state;
    }
};