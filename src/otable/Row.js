import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import prefix from './_prefix';

class Row extends Component {
  render() {
    const {children, className, width, height, top, style, isHeaderRow, headerHeight, classPrefix} = this.props;

    let classes = classNames(
      prefix(classPrefix)('row'),
      isHeaderRow ? prefix(classPrefix)('row-header') : '',
      className);

    let styles = Object.assign({
      minWidth: width,
      height: isHeaderRow ? headerHeight : height,
      top
    }, style);

    return (
      <div
        className={classes}
        style={styles}
      >
        {children}
      </div>
    );
  }
}

Row.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  headerHeight: PropTypes.number,
  top: PropTypes.number,
  style: PropTypes.object,
  isHeaderRow: PropTypes.bool,
  classPrefix: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.any
};

Row.defaultProps = {
  classPrefix: 'ray-table',
  height: 36,
  headerHeight: 36,
  isHeaderRow: false
};

export default Row;
