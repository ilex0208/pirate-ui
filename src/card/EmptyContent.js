import React, {PropTypes} from 'react';

/**
 * 空数据
 */
const EmptyContent = props => {
  let {info} = props;
  return (
    <div className="card-empty-content">
      <section className="empty-info">
        {info}
      </section>
    </div>
  );
};

EmptyContent.propTypes = {
  info: PropTypes.any
};

EmptyContent.defaultProps = {
  info: '۞暂无数据'
};

export default EmptyContent;
