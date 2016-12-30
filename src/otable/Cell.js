import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import prefix from './_prefix';

const LAYER_WIDTH = 30;

class Cell extends Component {
  constructor(props) {
    super(props);
  }

  renderCell = (content) => {
    let { width, left, height, style, className, firstColumn,
      lastColumn, isHeaderCell, headerHeight, layer,
      onTreeToggle, hasChildren, rowIndex, rowKey, align,
      sortable, classPrefix } = this.props;
    const classes = classNames(
      prefix(classPrefix)('cell'),
      className, {
        'sortable': sortable && isHeaderCell,
        'first': firstColumn,
        'last': lastColumn
      });
    const layerWidth = layer * LAYER_WIDTH;

    width = !isHeaderCell && firstColumn ? width - layerWidth : width;

    const styles = Object.assign({
      height: isHeaderCell ? headerHeight : height,
      zIndex: layer,
      width: width,
      left: !isHeaderCell && firstColumn ? left + layerWidth : left
    }, style);


    let contentStyles = {
      width: width,
      textAlign: align
    };

    if (sortable) {
      contentStyles.paddingRight = 28;
    }

    return (
      <div className={classes} style={styles}>
        <div className={prefix(classPrefix)('cell-wrap1')}>
          <div className={prefix(classPrefix)('cell-wrap2')}>
            <div className={prefix(classPrefix)('cell-wrap3')}>
              {
                <div
                  className={prefix(classPrefix)('cell-content')}
                  style={contentStyles}
                >
                    {
                       hasChildren && firstColumn ? (
                         <i
                           className="expand-icon fa fa-min"
                           onClick={(e) => onTreeToggle(rowKey, rowIndex, e)}
                         >
                         </i>) : null
                    }
                    {content}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
   );
  }

  render() {
    const {
      children,
      rowData,
      isHeaderCell,
      // fixed,
      dataKey
    } = this.props;

    if (isHeaderCell) {
      return this.renderCell(children);
    }
    return this.renderCell(children || rowData[dataKey]);
  }
}

Cell.propTypes = {
  dataKey: PropTypes.string,

  align: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string,
  isHeaderCell: PropTypes.bool,

  width: PropTypes.number,
  height: PropTypes.number,
  left: PropTypes.number,
  headerHeight: PropTypes.number,

  rowData: PropTypes.object,
  rowIndex: PropTypes.number,

  cellData: PropTypes.any,
  cellRenderer: PropTypes.func,

  fixed: PropTypes.bool,

  style: PropTypes.object,
  firstColumn: PropTypes.bool,
  lastColumn: PropTypes.bool,
  hasChildren: PropTypes.bool,

  onTreeToggle: PropTypes.func,

  layer: PropTypes.any,
  children: PropTypes.any,
  classPrefix: PropTypes.string,
  rowKey: PropTypes.string,
  sortable: PropTypes.any
};

Cell.defaultProps = {
  classPrefix: 'ray-table',
  align: 'left',
  headerHeight: 36,
  height: 36
};

export default Cell;
