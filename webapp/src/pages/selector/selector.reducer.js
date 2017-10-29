import c from './../../init/constants';

const initialState = {
    ingredients: [],
    salads: [],
    toppings: [],
    err: null,
}


export default function reducer(state = initialState, action) {

    if (action.type === c.RECEIVE_INGREDIENTS) {
        console.log(action)
        return Object.assign({}, state, { ingredients: action.payload });
    }
    if (action.type === c.RECEIVE_LOCATIONS) {
        return Object.assign({}, state, { locations: action.payload });
    }
    if (action.type === c.RECEIVE_SALADS) {
        return Object.assign({}, state, { salads: action.payload });
    }
    if (action.type === c.RECEIVE_TOPPINGS) {
        return Object.assign({}, state, { toppings: action.payload });
    }
    if (action.type === c.RECEIVE_DATA) {
        console.log(action)
        return Object.assign({}, state, action.payload );
    }
    if (action.type === c.SAVE_DATA) {
        return Object.assign({}, state, { ["selected_" + action.payload.key]: action.payload.data.map(entry => entry.key) });
    }
    
    if (action.type === c.ERR_RESPONSE) {
        console.error('ERROR:', action.payload)
        return Object.assign({}, state, { err: action.payload });
    }
    return state;
}