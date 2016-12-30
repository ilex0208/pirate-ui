import React, {Component, PropTypes} from 'react';
import {Cell} from '../src/otable';

class StatesCell extends Component {
  render() {
    let { rowData, dataKey, ...props } = this.props;
    let clesses = 'icon icon-big ' + (rowData[dataKey] === 'ENABLED' ? 'icon-ok-circle green' : 'icon-info gray');
    return (
      <Cell {...props}>
        <i className={clesses}></i>
      </Cell>
    );
  }
}

StatesCell.propTypes = {
  rowData: PropTypes.any,
  dataKey: PropTypes.any
};

export default StatesCell;
