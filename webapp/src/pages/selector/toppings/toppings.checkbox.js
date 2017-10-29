import React from 'react'
import { FormGroup, Label } from 'reactstrap'
import { Field, reduxForm } from 'redux-form'

const wrapForm = reduxForm({
    // a unique name for the form
    form: 'toppings'
})

function CheckBox(props) {
    const { object } = props
    return (
        <FormGroup check>
            <Label check>
                <Field name={object.name} className="form-check-input" type="checkbox" component="input" value={object} />
                <div>{object.name}</div>
            </Label>
        </FormGroup>
    )
}

export default wrapForm(CheckBox)