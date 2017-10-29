import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import pick from  './pick.svg'
import { connect } from 'react-redux'
import {fetchAll} from './selector/selector.actions'
const wrapRedux = connect((store) => {
  return {
   
  }
});

class MainView extends React.Component {
  
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
  
      this.props.dispatch(fetchAll())
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  
    render() {
      return (
        <div>
          <Navbar color="faded" light>
            <NavbarBrand href="/"></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/components/">Components</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }

export default wrapRedux(MainView)