import React, {Component, PropTypes} from 'react';
import Cell from './Cell';
import ColumnResizeHandle from './ColumnResizeHandle';
import prefix from './_prefix';

const isIE8 = ()=> !!navigator.userAgent.match(/MSIE 8.0/);

class HeaderCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnWidth: props.width
    };
  }

  _onColumnResize = (width, left, event) => {
    this.setState({
      columnWidth: width,
      initialEvent: event
    });
    this.props.onColumnResize(width, left, event);
  }

  _onColumnResizeEnd = (columnWidth, cursorDelta) => {
    this.setState({
      columnWidth: columnWidth
    });

    this.props.onColumnResizeEnd(columnWidth, cursorDelta, this.props.dataKey, this.props.index);
  }

  handleClick = () => {
    const { sortable, dataKey, sortType, onSortColumn } = this.props;
    sortable && onSortColumn && onSortColumn(dataKey, sortType === 'asc' ? 'desc' : 'asc');
  }

  renderResizeSpanner = () => {

    const {resizable, left, onColumnResizeMove, fixed} = this.props;
    const {columnWidth, initialEvent} = this.state;

    if (!resizable) {
      return null;
    }

    return (
      <ColumnResizeHandle
        columnWidth={columnWidth}
        columnLeft={left}
        columnFixed={fixed}
        initialEvent={initialEvent}
        onColumnResizeMove={onColumnResizeMove}
        onColumnResize={this._onColumnResize}
        onColumnResizeEnd={this._onColumnResizeEnd}
      />
    );

  }

  renderSortColumn = () => {
    const { left, headerHeight, sortable, sortColumn, sortType, dataKey, classPrefix } = this.props;
    const { columnWidth } = this.state;

    const styles = {
      left: columnWidth + left - 16,
      top: headerHeight / 2 - 8
    };

    if (sortable) {

      const icon = (<i className={sortColumn === dataKey ? `fa fa-sort-${sortType}` : 'fa fa-sort'}></i>);
      return (
        <div style={styles} className={prefix(classPrefix)('sortable')}>
          {icon}
        </div>
      );
    }

    return null;
  }


  render() {
    const classes = prefix(this.props.classPrefix)('cell-header');
    const {sortable} = this.props;

    return (
      <div className={classes} >
        <Cell isHeaderCell {...this.props} onClick={this.handleClick} />
        {this.renderSortColumn()}
        {!isIE8 && this.renderResizeSpanner()}
      </div>
    );
  }
}

HeaderCell.propTypes = {
  sortable: PropTypes.bool,
  resizable: PropTypes.bool,
  onColumnResizeEnd: PropTypes.func,
  onColumnResize: PropTypes.func,
  onColumnResizeMove: PropTypes.func,
  onSortColumn: PropTypes.func,
  headerHeight: PropTypes.number,
  width: PropTypes.number,
  dataKey: PropTypes.string,
  sortType: PropTypes.string,
  index: PropTypes.any,
  left: PropTypes.any,
  fixed: PropTypes.any,
  sortColumn: PropTypes.any,
  classPrefix: PropTypes.string
};

HeaderCell.defaultProps = {
  classPrefix: 'ray-table'
};

export default HeaderCell;
