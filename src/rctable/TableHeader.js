import React, { PropTypes } from 'react';
import {simpleEqual} from './../common/simpleCompare';

export default React.createClass({
  propTypes: {
    prefixCls: PropTypes.string,
    rowStyle: PropTypes.object,
    rows: PropTypes.array
  },
  shouldComponentUpdate(nextProps) {
    return !simpleEqual(nextProps, this.props);
  },
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
});
