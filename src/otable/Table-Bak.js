import React, {Component, PropTypes} from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import { on, scrollLeft, scrollTop, addStyle, addClass, removeClass, toggleClass } from 'dt2react';
import prefix from './_prefix';
import RenderData from './RenderData';
import RenderRow from './RenderRow';
const execRowKey = '_' + (Math.random() * 1E18).toString(36).slice(0, 5).toUpperCase();

const isIE8 = ()=> !!navigator.userAgent.match(/MSIE 8.0/);
const ReactChildren = React.Children;

class RTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnWidth: 0,
      mouseAreaLeft: -1,
      dataKey: 0,
      scrollLeft: 0,
      scrollTop: 0,
      resizeColumnFixed: false
    };
  }

  componentDidMount() {
    this._onBodyScrollListener = on(this.refs.tableBody, 'scroll', this.handleBodyScroll);
  }

  componentDidUpdate(nextProps) {
    this.handleBodyScroll();
  }

  componentWillUnmount() {
    if (this._onBodyScrollListener) {
      this._onBodyScrollListener.off();
    }
  }

  getFixedCellGroups = () => {
    return findDOMNode(this.refs.table).querySelectorAll(`.${this.props.classPrefix}-cell-group.fixed`);
  }

  getCells = () => {

    let left = 0;                  // Cell left margin
    let isFixedColumn = false;     // IF there are fixed columns
    const headerCells = [];          // Table header cell
    const bodyCells = [];            // Table body cell
    const columns = this.props.children;
    // const { dataKey, columnWidth } = this.state;

    const {sortColumn, sortType, onSortColumn} = this.props;


    ReactChildren.map(columns, (column, index) => {

      let columnChildren = column.props.children;
      let {width, fixed, align, sortable, resizable} = column.props;

      if (columnChildren.length !== 2) {
        throw new Error(`Component <HeaderCell> and <Cell> is required, column index: ${index} `);
      }

      if (fixed) {
        isFixedColumn = true;
      }

      width = this.state[`${columnChildren[1].props.dataKey}_${index}_width`] || width;

      let cellProps = {
        width, fixed, left, align, resizable, sortable, index,
        height: this.props.rowHeight,
        headerHeight: this.props.headerHeight,
        firstColumn: (index === 0),
        lastColumn: (index === columns.length - 1),
        key: index
      };

      let headerCellsProps = {
        headerHeight: this.props.headerHeight || this.props.rowHeight,
        dataKey: columnChildren[1].props.dataKey,
        sortColumn, sortType, onSortColumn
      };

      if (resizable) {
        headerCellsProps.onColumnResizeEnd = this._onColumnResizeEnd;
        headerCellsProps.onColumnResize = this._onColumnResize;
        headerCellsProps.onColumnResizeMove = this._onColumnResizeMove;
      }

      headerCells.push(this.cloneCell(columnChildren[0], Object.assign(cellProps, headerCellsProps)));
      bodyCells.push(this.cloneCell(columnChildren[1], cellProps));

      left += width;
    });

    return {
      headerCells,
      bodyCells,
      isFixedColumn,
      allColumnsWidth: left
    };
  }

  _onTreeToggle = (rowKey, index) => {
    console.log('treeToggle:' + rowKey);
    toggleClass(findDOMNode(this.refs[`children_${rowKey}_${index}`]), 'open');
  }

  randerRowData = (bodyCells, rowData, props) => {
    const { onRowClick, classPrefix } = this.props;
    const hasChildren = this.props.isTree && rowData.children && Array.isArray(rowData.children) && rowData.children.length > 0;
    const renderRowProps = {
      key: props.index,
      rowIndex: props.index,
      width: props.rowWidth,
      height: props.rowHeight,
      top: props.top,
      onClick: () => {
        onRowClick && onRowClick(rowData);
      },
      rowData
    };

    const rrKey = `rr_${props.index}`;
    const row = (
      <RenderRow
        key={rrKey}
        renderRowProps={renderRowProps}
        cells={
          bodyCells.map((cell, key) => React.cloneElement(cell, {
            key: key,
            layer: props.layer,
            hasChildren: hasChildren,
            rowIndex: props.index,
            onTreeToggle: this._onTreeToggle,
            rowKey: execRowKey,
            rowData
          }, cell.props.children))
        }
      />
    );
    //insert children
    if (hasChildren) {
      props.layer++;

      let childrenClasses = classNames(prefix(classPrefix)('row-children'), {
        open: this.props.expand
      });
      let _refs = `children_${execRowKey}_${props.index}`;
      // let childrenStyles = {
      //   marginLeft: LAYER_WIDTH
      // };
      return (
        <RenderData
          key={_refs}
          childrenClasses={childrenClasses}
          layer={props.layer}
          _refs={_refs}
          index={props.index}
          row={row}
          rowData={rowData}
          bodyCells={bodyCells}
          randerRowData={this.randerRowData}
          _props={props}
        />);

    }

    return row;
  }

  cloneCell = (Cell, props) => {
    return React.cloneElement(Cell, props, Cell.props.children);
  }

  handleBodyScroll = () => {

    let {tableBody, tableHeader} = this.refs;
    let tableHeaderDom = findDOMNode(tableHeader);
    let groups = this.getFixedCellGroups();
    let handelClass = { addClass, removeClass };

    let left = scrollLeft(tableBody);
    let top = scrollTop(tableBody);

    this.scrollLeft = left;

    Array.from(groups).map((group) => {
      addStyle(group, { left: left + 'px' });
      let toggle = left > 1 ? 'addClass' : 'removeClass';
      !isIE8 && handelClass[toggle](group, 'shadow');
    });

    addStyle(tableHeaderDom, { left: (-left) + 'px' });

    let toggle = top > 1 ? 'addClass' : 'removeClass';
    !isIE8 && handelClass[toggle](tableHeaderDom, 'shadow');
  }

  _onColumnResizeEnd = (columnWidth, cursorDelta, dataKey, index) => {
    this.setState({
      isColumnResizing: false,
      mouseAreaLeft: -1,
      [`${dataKey}_${index}_width`]: columnWidth
    });
  }

  _onColumnResize = (width, left, event) => {
    this.setState({
      isColumnResizing: true
    });
  }

  _onColumnResizeMove = (width, left, fixed) => {

    this.setState({
      resizeColumnFixed: fixed,
      mouseAreaLeft: width + left
    });
  }

  render() {
    const {
      // children,
      className,
      width = 0,
      height,
      style,
      // rowHeight,
      classPrefix,
      isTree,
      id,
      headerHeight,
      rowHeight,
      data
    } = this.props;

    let {headerCells, bodyCells, allColumnsWidth, isFixedColumn} = this.getCells();
    let rowWidth = allColumnsWidth > width ? allColumnsWidth : width;

    //Check there are fixed columns
    this.isFixedColumn = isFixedColumn;

    const clesses = classNames(
      classPrefix,
      isTree ? prefix(classPrefix)('treetable') : '',
      className, {
        'column-resizing': this.state.isColumnResizing
      }
    );

    const tableStyles = Object.assign({ width: width || 'auto', height }, style);
    // table header
    const renderRowProps = {
      // ref: 'tableHeader',
      width: rowWidth,
      height: rowHeight,
      headerHeight: headerHeight,
      isHeaderRow: true,
      top: 0
    };

    // mouse Areas
    const scrollLeft = this.scrollLeft || 0;
    const {mouseAreaLeft, resizeColumnFixed} = this.state;

    const mouseAreaStyles = {
      height,
      left: (resizeColumnFixed ? mouseAreaLeft : mouseAreaLeft - scrollLeft)
    };

    // table body
    const bodyStyles = {
      top: isTree ? 0 : headerHeight || rowHeight,
      height: height - (headerHeight || rowHeight)
    };

    let top = 0;    //Row position
    let layer = 0;  //Tree layer
    let rows = (data.length > 0) ? data.map((rowData, index) => {
      let row = this.randerRowData(bodyCells, rowData, {
        index, top, rowWidth, rowHeight, layer
      });

      !isTree && (top += rowHeight);
      return row;
    }) : (
      <div className={prefix(classPrefix)('body-info')}>
        {this.props.locale.emptyMessage}
      </div>
    );

    return (
      <div className={clesses} style={tableStyles} ref='table' id={id}>
        <div
          className={prefix(classPrefix)('header-row-wrapper')}
        >
          <RenderRow renderRowProps={renderRowProps} cells={headerCells} />
        </div>
        <div
          ref="tableBody"
          className={prefix(classPrefix)('body-row-wrapper')}
          style={bodyStyles}
        >
          {rows}
        </div>
        {
          !isIE8 &&
            <div
              ref="mouseArea"
              className={prefix(classPrefix)('mouse-area')}
              style={mouseAreaStyles}
            ></div>
        }
      </div>
    );
  }
}

RTable.propTypes = {
  width: PropTypes.number,
  data: PropTypes.array.isRequired,
  height: PropTypes.number,
  rowHeight: PropTypes.number,
  headerHeight: PropTypes.number,
  scrollLeft: PropTypes.number,
  scrollTop: PropTypes.number,
  onRowClick: PropTypes.func,
  isTree: PropTypes.bool,
  expand: PropTypes.bool,
  locale: PropTypes.object,
  sortColumn: PropTypes.string,
  sortType: PropTypes.oneOf(['desc', 'asc']),
  /**
   * @callback
   * @params: sortColumn dataKey
   * @params: sortType
   */
  onSortColumn: PropTypes.func,
  classPrefix: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.any,
  style: PropTypes.any,
  id: PropTypes.any
};

RTable.defaultProps = {
  classPrefix: 'ray-table',
  height: 200,
  rowHeight: 36,
  sortType: 'asc',
  locale: {
    emptyMessage: 'No data found'
  }
};
export default RTable;
