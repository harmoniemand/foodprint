import React from 'react';
import { Card, CardTitle, CardLink, CardSubtitle, CardHeader, ListGroup, ListGroupItem, CardFooter, Table } from 'reactstrap';
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import QRcode from 'qrcode.react'
import { } from './payment.actions';



const wrapRedux = connect((store) => {
    return {
        summary: store.paymentReducer.summary,
    }
});


class View extends React.Component {


    render() {
        const { parts, company, latitude, longitude } = this.props.summary;
        const sum = parts && parts.ingredients.map(ingredient => ingredient.price).concat(parts.toppings.map(topping => topping.price)).concat(parts.salads.map(salad => salad.coefficient)).reduce((pv, cv) => pv + cv, 0)
        const price = sum && Math.round(sum)

        const send = Object.assign({}, {station:company, latitude, longitude, price })
        console.log(send)
        return (
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Station: {this.props.summary.company}</CardTitle>
                        <CardSubtitle>Your personal QR code!</CardSubtitle>
                    </CardHeader>
                    <div className="row mt-1">
                        <div className="col"></div>
                        {parts && <QRcode value={JSON.stringify(this.props.summary.parts)} />}
                        <div className="col"></div>
                    </div>

                    <Table className="mt-2">
                        <thead>
                            <tr>
                                <th>Ingredients</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parts && parts.salads.map(salad =>
                                <tr key={salad.id}><td>{salad.name}</td><td>{salad.coefficient}€</td></tr>
                            )}
                            {parts && parts.ingredients.map(ingredient =>
                                <tr key={ingredient.id}><td>{ingredient.name}</td><td>{ingredient.price}€</td></tr>
                            )}
                            {parts && parts.toppings.map(topping =>
                                <tr key={topping.id}><td>{topping.name}</td><td>{topping.price}€</td></tr>
                            )}
                        </tbody>
                    </Table>

                    <CardFooter>
                        <div className="display-4">Price: {price}€</div>
                    </CardFooter>
                </Card>
            </div>
        )
    }
}

export default wrapRedux(View);