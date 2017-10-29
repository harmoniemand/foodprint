import React from 'react';
import { Form, Card, CardTitle, CardLink, CardSubtitle, CardHeader, } from 'reactstrap';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import CheckBox from './ingredients.checkbox';
import { saveData } from './../selector.actions';


// import korn from './icons/korn.svg'
// import weizen from './icons/weizen.svg'
// import cheese from './icons/cheese.svg'
// import turkey from './icons/turkey.svg'
// import egg from './icons/egg.svg'
// import salmon from './icons/salmon.svg'
// import salad from './icons/salad.svg'

const wrapRedux = connect((store) => {
  const selected = store.form.ingredients && store.form.ingredients.values  
  
  return {
    ingredients: store.selectorReducer.ingredients,
    selected
  }
});

const wrapForm = reduxForm({
  form: 'ingredients'
})



class View extends React.Component {


  next(values) {
    const {selected} = this.props 
    return Promise.resolve()
    .then(this.props.dispatch(selected && saveData('ingredients', Object.entries(selected).map(([key, value]) => ({key, value})).filter(entry => entry.value))))
    .then(this.props.dispatch(push('/toppings')))
  }

  render() {
    const { ingredients } = this.props;

    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>What do you like?</CardTitle>
            <CardSubtitle>Here you can choose your specific ingredients</CardSubtitle>
          </CardHeader>
          <div className="card-block">
            <Form onSubmit={this.next}>

              <div>
                {ingredients && ingredients.map(ingredient => <CheckBox key={ingredient.id} object={ingredient} />)}
              </div>

            </Form>
          </div>
          <CardLink href="#" onClick={(values) => this.next(values)} className="btn btn-primary">Choose Toppings</CardLink>
        </Card>

      </div>
    );
  }
}

export default wrapRedux(wrapForm(View))