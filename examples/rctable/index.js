import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import RayTreeTable from './RayTreeTable';

class App extends Component {

  render() {
    return (
      <div className="container">
        <h2>RayTreeTable demo</h2>
        <RayTreeTable />
      </div>
    );
  }
}


ReactDOM.render(<App />,
    document.getElementById('app')
);
