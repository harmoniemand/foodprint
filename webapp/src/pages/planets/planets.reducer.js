import c from './../../init/constants';

const initialState = {
    planets: [],
    planet: {},
    err: null,
}


export default function reducer(state = initialState, action) {
    if (action.type === c.FETCH_PLANETS) return Object.assign({}, state, { planets: action.payload.planets });
    if (action.type === c.FETCH_PLANET) return Object.assign({}, state, { planet: action.payload.planet });
    if (action.type === c.ERR_REPONSE) {
        return Object.assign({}, state, { err: action.payload.err });
    }
    return state;
}