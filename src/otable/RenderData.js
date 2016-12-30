
import React, {Component, PropTypes} from 'react';

class RenderData extends Component {
  render() {
    let {childrenClasses, layer, _refs, index, row, rowData, bodyCells, randerRowData, _props} = this.props;
    return (
      <div
        className={childrenClasses}
        data-layer={layer}
        ref={_refs}
        key={index}
      >
        {row}
        <div className="children" >
          {rowData.children.map((child, index) => randerRowData(bodyCells, child, Object.assign({}, _props, { index })))}
        </div>
      </div>
    );
  }
}

RenderData.propTypes = {
  childrenClasses: PropTypes.any,
  layer: PropTypes.any,
  _refs: PropTypes.any,
  index: PropTypes.any,
  row: PropTypes.any,
  rowData: PropTypes.any,
  bodyCells: PropTypes.any,
  randerRowData: PropTypes.any,
  _props: PropTypes.any
};

export default RenderData;
