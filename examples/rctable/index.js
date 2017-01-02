import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import RCTreeTable from './RCTreeTable';

class App extends Component {

  render() {
    return (
      <div className="container">
        <h2>RCTreeTable demo</h2>
        <RCTreeTable />
      </div>
    );
  }
}


ReactDOM.render(<App />,
    document.getElementById('app')
);
