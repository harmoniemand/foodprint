import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchPlanets, fetchPlanetDetail } from './planets.action';

const wrapRedux = connect((store) => {
    return {
        planets: store.planetsReducer.planets,
        planet: store.planetsReducer.planet,
    }
});

class Planets extends React.Component {

    componentWillMount() {
        this.props.dispatch(fetchPlanets());
    }

    showDetail(url){
        Promise.resolve(this.props.dispatch(push('/planet')))
        .then(result => this.props.dispatch(fetchPlanetDetail(url)));
    }

    render() {
        const { planets } = this.props;
        const listElems = planets && planets.map(planet => (<button onClick={()=> this.showDetail(planet.url)} className="list-group-item list-group-item-action" key={planet.name}>{planet.name}</button>));
        return (<div className="list-group">{listElems}</div>)
    }
}


export default wrapRedux(Planets);