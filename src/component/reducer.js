const initStatus = {
    count: 0,
    list: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return {
                ...state, count: state.count + 1
            };
        case 'reduce':
            return {
                ...state, count: state.count - 1
            };
        case 'getList':
            return {
                ...state, list: action.payload.list
            }
        default:
            throw 'Error';
    }
}

export {
    initStatus,
    reducer
}