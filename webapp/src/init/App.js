import React from 'react';
// import logo from './logo.svg';
import Header from './../pages/main.header'
import Main from './../pages/main.page'
import 'bootstrap-material-design/dist/css/bootstrap-material-design.css';
import './style.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
          <Main />

      </div>
    );
  }
}

export default App;
