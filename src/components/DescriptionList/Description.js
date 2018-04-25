import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import responsive from './responsive';

const Description = ({ term, column, className, children, ...restProps }) => {
  return (
    <Col className='description' {...responsive[column]} {...restProps}>
      {term && <div className='term'>{term}</div>}
      {children && <div className='detail'>{children}</div>}
    </Col>
  );
};

Description.defaultProps = {
  term: '',
};

Description.propTypes = {
  term: PropTypes.node,
};

export default Description;
