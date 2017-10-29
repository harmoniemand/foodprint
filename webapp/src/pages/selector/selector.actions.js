import c from './../../init/constants'
import data from './data.json'

export function fetchAll() {
    return function (dispatch) {
        return Promise.resolve(data)
            .then(all => dispatch({ type: c.RECEIVE_DATA, payload: all }))
            .catch(err => dispatch({ type: c.ERR_RESPONSE, payload: err }))
    }
}

export function fetchIngredients() {
    return function (dispatch) {
        return fetch('http://localhost:8080/data.json')
            .then(response => response.json())
            .then(response => response.ingredients)
            .then(ingredients => dispatch({ type: c.RECEIVE_INGREDIENTS, payload: ingredients }))
            .catch(err => dispatch({ type: c.ERR_RESPONSE, payload: err }))
    }
}

export function fetchSalads() {
    return function (dispatch) {
        return fetch('http://localhost:8080/data.json')
            .then(response => response.json())
            .then(response => response.salads)
            .then(salads => dispatch({ type: c.RECEIVE_SALADS, payload: salads }))
            .catch(err => dispatch({ type: c.ERR_RESPONSE, payload: err }))
    }
}
export function fetchToppings() {
    return function (dispatch) {
        return fetch('http://localhost:8080/data.json')
            .then(response => response.json())
            .then(response => response.toppings)
            .then(toppings => dispatch({ type: c.RECEIVE_TOPPINGS, payload: toppings }))
            .catch(err => dispatch({ type: c.ERR_RESPONSE, payload: err }))
    }
}

export function fetchLocations() {
    return function (dispatch) {
        return fetch('http://localhost:8080/data.json')
            .then(response => response.json())
            .then(response => response.locations)
            .then(locations => dispatch({ type: c.RECEIVE_LOCATIONS, payload: locations }))
            .catch(err => dispatch({ type: c.ERR_RESPONSE, payload: err }))
    }
}

export function getAddressData(latitude, longitude) {
    return function (dispatch) {
        return fetch('http://maps.googleapis.com/maps/api/geocode/json?key&')
            .then(response => response.json())
            .then(response => response.locations)
            .then(locations => dispatch({ type: c.RECEIVE_LOCATIONS, payload: locations }))
            .catch(err => dispatch({ type: c.ERR_RESPONSE, payload: err }))
    }
}

export function saveData(key, data) {
    return function (dispatch) {
        return Promise.resolve()
            .then(_ => dispatch({ type: c.SAVE_DATA, payload: { key, data } }))
            .catch(err => dispatch({ type: c.ERR_RESPONSE, payload: err }))
    }
}

export function createSummary(object) {
    return {
        type: c.CREATE_SUMMARY,
        payload: object,
    }
}