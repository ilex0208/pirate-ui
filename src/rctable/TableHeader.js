// @author ilex.h
// modified with rctable
import React, { Component, PropTypes } from 'react';
import {simpleEqual} from './../common/simpleCompare';

/**
 * table header
 */
class TableHeader extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    rowStyle: PropTypes.object,
    rows: PropTypes.array
  }

  shouldComponentUpdate(nextProps) {
    return !simpleEqual(nextProps, this.props);
  }

  render() {
    const { prefixCls, rowStyle, rows } = this.props;
    return (
      <thead className={`${prefixCls}-thead`}>
        {
          rows.map((row, index) => (
            <tr key={index} style={rowStyle}>
              {row.map((cellProps, i) => <th {...cellProps} key={i} />)}
            </tr>
          ))
        }
      </thead>
    );
  }
}

export default TableHeader;
