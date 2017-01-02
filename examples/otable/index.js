import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TreeTable from './TreeTable';

class App extends Component {

  render() {
    return (
      <div className="doc-page">
        <div className="container">
          <h2>Tree Table</h2>
          <TreeTable />
        </div>
      </div>
    );
  }
}


ReactDOM.render(<App />,
    document.getElementById('app')
);
