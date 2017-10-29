import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import fetch from 'node-fetch';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import HttpProxyAgent from 'http-proxy-agent';

// function numberReducer(state, action) {
//     return action.type === 'INC' ? state + action.payload: state;
// }

const proxy = process.env.http_proxy || 'http://localhost:3128';
var agent = new HttpProxyAgent(proxy); 

function planetsReducer(state = {isFetching:false}, action) {
    if (action.type === 'FETCH_PERSONS') {
        const newState = Object.assign({},state, {isFetching:true}) 
        return newState
    }
    if (action.type === 'RECEIVE_PERSONS') {
        const newState = Object.assign({},state, {isFetching:false, data:action.payload.persons}) 
        return newState
    }
    if (action.type === 'FAIL') {
        const newState = Object.assign({},state, {isFetching:false, data:action.payload.err}) 
        return newState
    }
    return state
}


const middleware = applyMiddleware(promise, thunk, logger);
const store = createStore(planetsReducer, middleware);

store.subscribe(_ => console.log("store changed: done"));

store.dispatch((dispatch)=>{
    dispatch({type: "FETCH_PERSONS"})
    fetch('http://swapi.co/api/people/?search=r2', {agent})
    .then(response => response.json())
    .then(response => response.results)
    .then(persons => dispatch({type:'RECEIVE_PERSONS', payload:{persons}}))
    .catch(err => dispatch({type:'FAIL', payload:{err}}))
})

// store.dispatch({
//     type: "FETCH_PERSONS", 
//     payload:fetch('http://swapi.co/api/people/?search=r2', {agent})
// })
