import React from 'react';
import { Route } from 'react-router'

import Ingredients from './selector/ingredients/ingredients.form';
import Salads from './selector/salads/salads.form';
import Toppings from './selector/toppings/toppings.form';
import Location from './selector/location.component';
import Payment from './payment/payment.component';



class MainView extends React.Component {
    
    
        render() {
            return (
                <div className="container-fluid mt-3">
                    <Route exact path="/" component={Salads} />
                    <Route exact path="/ingredients" component={Ingredients} />
                    <Route exact path="/toppings" component={Toppings} />
                    <Route exact path="/locations" component={Location} />
                    <Route exact path="/summary" component={Payment} />
                    {/* <Route exact path="/planet" component={Planet} /> */}
                </div>
            );
        }
    }

export default MainView