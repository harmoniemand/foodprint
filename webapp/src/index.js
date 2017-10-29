import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import './index.css';
import App from './init/App';
import registerServiceWorker from './init/registerServiceWorker';
import Redux from './init/store';


ReactDOM.render(
    <Provider store={Redux.store}>
        <ConnectedRouter history={Redux.history}>
            <App />
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
