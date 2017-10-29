import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap'
import Async from 'react-promise'


export default class Experts extends Component {

    planets = fetch('http://swapi.co/api/planets')
        .then(response => response.json())
        .then(response => {
            const data = response.results.map(planet => (<ListGroupItem tag="a" href="#" key={planet.name}>{planet.name}</ListGroupItem>));
            console.log(response.results)
            return data;
        })
        .catch(console.error)

    render() {
        return (
            <Async promise={this.planets} then={(planet => (<ListGroup>{planet}</ListGroup>))} />
        )
    }
}
