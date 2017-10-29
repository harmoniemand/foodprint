import React from 'react';
import { Form, Card, CardTitle, CardLink, CardSubtitle, CardHeader, } from 'reactstrap';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import CheckBox from './toppings.checkbox';
import { saveData } from './../selector.actions';

const wrapRedux = connect((store) => {
    const selected = store.form.toppings && store.form.toppings.values
    return {
        toppings: store.selectorReducer.toppings,
        selected
    }
});

const wrapForm = reduxForm({
    form: 'toppings'
})


class View extends React.Component {


    next(values) {
        const { selected } = this.props
        return Promise.resolve()
            .then(this.props.dispatch(selected && saveData('toppings', Object.entries(selected).map(([key, value]) => ({ key, value })).filter(entry => entry.value))))
            .then(this.props.dispatch(push('/locations')))
    }

    render() {
        const { toppings } = this.props;

        return (
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Which Topping do you want?</CardTitle>
                        <CardSubtitle>Here you can choose your specific toppings</CardSubtitle>
                    </CardHeader>
                    <div className="card-block">
                        <Form onSubmit={this.next}>

                            <div>
                                {toppings && toppings.map(salad => <CheckBox key={salad.id} object={salad} />)}
                            </div>

                        </Form>
                    </div>
                    <CardLink href="#" onClick={(values) => this.next(values)} className="btn btn-primary">Choose Location</CardLink>
                </Card>

            </div>
        );
    }
}

export default wrapRedux(wrapForm(View))