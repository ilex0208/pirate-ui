import React, {Component, PropTypes} from 'react';
import EmptyContent from './EmptyContent';
import './card.scss';

/**
 * 卡片面板
 *
 * @class CardPanel
 * @extends {Component}
 * @author fe-tiangonglei
 */
class CardPanel extends Component {
  static EmptyContent = EmptyContent;
  constructor(props) {
    super(props);

  }

  render() {
    let {title, content} = this.props;
    return (
      <section className="card-panel">
        <section className="panel-header">
          <section className="title">
            <h3>
              <p className="title-content">{title}</p>
              <section className="title-content-right"></section>
            </h3>
            <section className="title-content-bottom"></section>
          </section>
        </section>
        <section className="panel-content">
          <section className="content-wrapper">
            <section className="content-wrapper-border">
              <section className="content-outer">
                {content}
              </section>
            </section>
          </section>
        </section>
      </section>
    );
  }
}

CardPanel.propTypes = {
  title: PropTypes.string,
  content: PropTypes.any
};

export default CardPanel;
