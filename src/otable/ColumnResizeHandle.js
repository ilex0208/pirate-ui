import React, {Component, PropTypes} from 'react';
import { DOMMouseMoveTracker } from 'dt2react';
import classNames from 'classnames';
import PureRenderMixin from './mixins/PureRenderMixin';
import prefix from './_prefix';

const calcWidth = (value, min, max) => {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
};

class ColumnResizeHandle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnWidth: props.columnWidth,
      cursorDelta: 0,
      visible: false
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.isKeyDown && newProps.initialEvent && !this._mouseMoveTracker.isDragging()) {
      this._mouseMoveTracker.captureMouseMoves(newProps.initialEvent);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return  PureRenderMixin.shouldComponentUpdate.call(this, nextProps, nextState);
  }

  componentWillUnmount() {
    if (this._mouseMoveTracker) {
      this._mouseMoveTracker.releaseMouseMoves();
      this._mouseMoveTracker = null;
    }
  }

  _onMove = (deltaX, deltaY) => {

    if (!this.isKeyDown) {
      return;
    }

    var newWidth = this.state.cursorDelta + deltaX;
    var newColumnWidth = calcWidth(this.props.columnWidth + newWidth, 20);

    this.setState({
      columnWidth: newColumnWidth,
      cursorDelta: newWidth
    });

    this.props.onColumnResizeMove(newColumnWidth, this.props.columnLeft, this.props.columnFixed);
  }

  _onColumnResizeEnd = () => {

    this.isKeyDown = false;

    this.props.onColumnResizeEnd(
      this.state.columnWidth,
      this.state.cursorDelta
    );

    if (this._mouseMoveTracker) {
      this._mouseMoveTracker.releaseMouseMoves();
      this._mouseMoveTracker = null;
    }

    this.setState({
      visible: false
    });
  }

  _getMouseMoveTracker = () => {
    return this._mouseMoveTracker || new DOMMouseMoveTracker(
      this._onMove,
      this._onColumnResizeEnd,
      document.body
    );
  }

  _onColumnResizeMouseDown = (event) => {

    this._mouseMoveTracker = this._getMouseMoveTracker();
    this.isKeyDown = true;
    this.setState({
      visible: true,
      cursorDelta: 0
    });

    this.props.onColumnResize(
      this.props.columnWidth,
      this.props.columnLeft, {
        clientX: event.clientX,
        clientY: event.clientY,
        preventDefault: function() {}
      }
    );


  }

  render() {
    let {
      columnLeft,
      classPrefix
    } = this.props;
    let {
      columnWidth,
      visible
    } = this.state;

    let styles = {
      width: 6,
      left: columnWidth + columnLeft - 2
    };

    let classes = classNames({visible}, prefix(classPrefix)('column-resize-spanner'));

    return (
      <div
        className={classes}
        style={styles}
        onMouseDown={this._onColumnResizeMouseDown}
        ref="spanner"
      >
      </div>
    );
  }
}

ColumnResizeHandle.propTypes = {
  columnWidth: PropTypes.number,
  columnLeft: PropTypes.number,
  columnFixed: PropTypes.bool,
  onColumnResize: PropTypes.func,
  onColumnResizeEnd: PropTypes.func,
  onColumnResizeMove: PropTypes.func,
  classPrefix: PropTypes.string
};

ColumnResizeHandle.defaultProps = {
  classPrefix: 'ray-table'
};

export default ColumnResizeHandle;
