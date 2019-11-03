const initialState = {
    parking: {},
    list: []
};

export const ParkingsReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case 'PARKINGS_CREATE':
            newState.list = newState.list.concat(action.payload);
            return newState;
        case 'PARKINGS_GET':
            newState.list = action.payload;
            return newState
        case 'PARKINGS_GET_ONE':
            newState.parking = action.payload;
            return newState;
        case 'PARKINGS_UPDATE':
            const index = newState.list.findIndex((parking) => (parking._id === action.payload._id));
            newState.list = [].concat(newState.list)
            newState.list[index] = action.payload
            return newState;
        default:
            return state;
    }
};