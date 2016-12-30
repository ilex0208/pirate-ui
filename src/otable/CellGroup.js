import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import prefix from './_prefix';

class HeaderCell extends Component {
  render() {
    let {
      children,
      fixed,
      width,
      left,
      height,
      style,
      className,
      classPrefix
    } = this.props;

    let classes = classNames(
      className,
      prefix(classPrefix)('cell-group'),
      fixed ? 'fixed' : ''
    );
    let styles = Object.assign({ width, left, height }, style);

    return (
      <div className={classes} style={styles}>
        {children}
      </div>
    );
  }
}

HeaderCell.propTypes = {
  fixed: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  left: PropTypes.number,
  style: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.any,
  classPrefix: PropTypes.string
};

HeaderCell.defaultProps = {
  classPrefix: 'ray-table'
};

export default HeaderCell;
