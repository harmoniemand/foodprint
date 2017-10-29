import c from './../../init/constants';

export function fetchPlanets() {
    return function (dispatch) {
        return fetch('https://swapi.co/api/planets/')
            .then(response => response.json())
            .then(response => dispatch({ type: c.FETCH_PLANETS, payload: { planets: response.results } }))
            .catch(err => dispatch({ type: c.ERR_REPONSE, payload: { err } }))
    }
}

export function fetchPlanetDetail(url = '') {
    return function (dispatch) {
        return fetch(url)
            .then(response => response.json())
            .then(response => dispatch({ type: c.FETCH_PLANET, payload: { planet: response } }))
            .catch(err => dispatch({ type: c.ERR_REPONSE, payload: { err } }))
    }
}