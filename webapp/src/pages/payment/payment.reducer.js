import c from './../../init/constants';

const initialState = {
    summary: {},
    err: null,
}


export default function reducer(state = initialState, action) {

    if (action.type === c.CREATE_SUMMARY) {
        console.log(action)
        return Object.assign({}, state, { summary: action.payload });
    }
    if (action.type === c.ERR_RESPONSE) {
        console.error('ERROR:', action.payload)
        return Object.assign({}, state, { err: action.payload });
    }
    return state;
}