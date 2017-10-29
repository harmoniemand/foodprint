import React from 'react';
import { Form, Card, CardTitle, CardLink, CardSubtitle, CardHeader, } from 'reactstrap';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import CheckBox from './salads.checkbox';
import { saveData} from './../selector.actions';

const wrapRedux = connect((store) => {
    const selected = store.form.salads && store.form.salads.values  
    return {
        salads: store.selectorReducer.salads,
        selected      
    }
});

const wrapForm = reduxForm({
    form: 'salads'
})


class View extends React.Component {


    next(values) {
        const {selected} = this.props 
        return Promise.resolve()
        .then(this.props.dispatch(selected && saveData('salads', Object.entries(selected).map(([key, value]) => ({key, value})).filter(entry => entry.value))))
        .then(this.props.dispatch(push('/ingredients')))
    }

    render() {
        const { salads } = this.props;

        return (
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Which Salad do you want?</CardTitle>
                        <CardSubtitle>Here you can choose your specific salads</CardSubtitle>
                    </CardHeader>
                    <div className="card-block">
                        <Form onSubmit={this.next}>

                            <div>
                                {salads && salads.map(salad => <CheckBox key={salad.id} object={salad} />)}
                            </div>

                        </Form>
                    </div>
                    <CardLink href="#" onClick={(values) => this.next(values)} className="btn btn-primary">Choose Salad</CardLink>
                </Card>

            </div>
        );
    }
}

export default wrapRedux(wrapForm(View))