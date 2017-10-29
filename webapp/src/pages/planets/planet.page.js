import React from 'react';
import { connect } from 'react-redux';

const wrapRedux = connect((store) => {
    return {
        planet: store.planetsReducer.planet,
    }
});

class Planet extends React.Component {

    render() {
        const planet = this.props.planet;
        const view = planet.name && (
            <div className="card">
                <div className="card-header">
                    Planet Detail View
                    </div>
                <div className="card-block">
                    <h4 className="card-title">{planet.name}</h4>
                    <p className="card-text">Polpulation:{planet.population}</p>
                    <small>{planet.rotation_period},{planet.orbital_period}</small>
                </div>
            </div>
        )
        return (view || <div className="text-warning">No Planet Found!</div>);
    }
}

export default wrapRedux(Planet)