import React from 'react';
import { Card, CardTitle, CardLink, CardSubtitle, CardHeader, } from 'reactstrap';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import 'google-maps';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import { fetchLocations, createSummary } from './selector.actions';

const Map = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={13}
        defaultCenter={props.center}
    >
        {props.children}
    </GoogleMap>
))

const wrapRedux = connect((store) => {
    const { selected_salads, selected_ingredients, selected_toppings, salads, ingredients, toppings } = store.selectorReducer;
    const result = {
        locations: store.selectorReducer.locations,
        salads: selected_salads && selected_salads.map(selected => salads.find(salad => salad.name === selected)),
        ingredients: selected_ingredients && selected_ingredients.map(selected => ingredients.find(ingredient => ingredient.name === selected)),
        toppings: selected_toppings && selected_toppings.map(selected => toppings.find(topping => topping.name === selected))
    }

    console.log(result)
    return result
});

class MapContainer extends React.Component {

    onMapClick(marker) {
        const { salads, toppings, ingredients } = this.props;
        const object = Object.assign({}, marker, { parts: { salads, toppings, ingredients } });
        return Promise.resolve()
            .then(_ => this.props.dispatch(createSummary(object)))
            .then(_ => this.props.dispatch(push('/summary')))
    }


    mapConfig = {
        center: {
            lat: 48.75232,
            lng: 9.16502
        },
        zoom: 9
    };

    CONFIG = {
        "GOOGLE_MAPS_API_KEY": "AIzaSyDZCECkpgwuCqFPaeKDeA2e_D2PY2_x9-8"
    }

    render() {
        const { locations } = this.props;
        const markers = locations && locations.map(marker => (<Marker onClick={(e) => this.onMapClick(marker)} key={marker._id} position={{ lat: marker.latitude, lng: marker.longitude }} />))
        return (
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Where would you like to order?</CardTitle>
                        <CardSubtitle>Here you can choose the specific foodprint box</CardSubtitle>
                    </CardHeader>
                    <div className="card-block">
                        <Map
                            center={this.mapConfig.center}
                            googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=" + this.CONFIG.GOOGLE_MAPS_API_KEY}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `350px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        >
                            {markers}
                        </Map>
                    </div>
                    <CardLink href="#" className="btn btn-primary">Choose Payment</CardLink>
                </Card>
            </div >
        )
    }
}

export default wrapRedux(MapContainer)