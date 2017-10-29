import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { reducer as storageReducerWrapper, createMiddleware, createLoader, LOAD, SAVE } from 'redux-storage';
import { reducer as formReducer } from 'redux-form';
import createEngine from 'redux-storage-engine-sessionstorage';

import c from './constants';
import selectorReducer from './../pages/selector/selector.reducer';
import paymentReducer from './../pages/payment/payment.reducer';

const engine = createEngine('react-state');
const storage = createMiddleware(engine, ['ERR_RECEIVE_PLANETS', 'ERR_RECEIVE_PLANET_DETAILS', '@@router/LOCATION_CHANGE', ]);
const load = createLoader(engine);
function storageReducer(state = { loaded: false }, action) {
    if (action.type === LOAD) return { ...state, loaded: true }
    // if (action.type === SAVE) console.log('Something has changed and written to disk!')
    return state
}


const history = createHistory();

const middleware = applyMiddleware(routerMiddleware(history), promise(), thunk, storage);
const enhancer = window.devToolsExtension ? window.devToolsExtension() : f => f;
const reducers = storageReducerWrapper(combineReducers({ selectorReducer, router: routerReducer, storageReducer, form:formReducer, paymentReducer }));
const store = createStore(reducers, enhancer, middleware);

// store.subscribe(_ => console.log("============================"));
load(store)
    .then((newState) => console.log('Loaded state:', newState))
    .catch(() => console.log('Failed to load previous state'));



export default { store, history };

