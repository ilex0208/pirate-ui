import React, {Component, PropTypes} from 'react';
import Row from './Row';
import CellGroup from './CellGroup';

class RenderRow extends Component {
  render() {
    let {renderRowProps, cells} = this.props;
        //IF there are fixed columns, add a fixed group
    if (this.isFixedColumn) {

      let fixedCells = cells.filter(function(cell) {
        return cell.props.fixed;
      });

      let otherCells = cells.filter(function(cell) {
        return !cell.props.fixed;
      });

      let fixedCellGroupWidth = 0;

      fixedCells.map((item) => {
        fixedCellGroupWidth += item.props.width;
      });

      return (
        <Row {...renderRowProps}>
          <CellGroup
            fixed
            height={renderRowProps.isHeaderRow ? renderRowProps.headerHeight : renderRowProps.height}
            width={fixedCellGroupWidth}
          >
            {fixedCells}
          </CellGroup>
          <CellGroup>{otherCells}</CellGroup>
        </Row>
      );
    }

    return (
      <Row {...renderRowProps}>
        {cells}
      </Row>
    );
  }
}

RenderRow.propTypes = {
  renderRowProps: PropTypes.object,
  cells: PropTypes.any
};

export default RenderRow;