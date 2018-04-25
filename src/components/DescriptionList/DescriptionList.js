import React from 'react';
import { Row } from 'antd';

export default ({ className, title, col = 3, layout = 'horizontal', gutter = 32,
  children, size, ...restProps }) => {

  const column = col > 4 ? 4 : col;
  return (
    <div className='descriptionList' {...restProps}>
      {title ? <div className='title'>{title}</div> : null}
      <Row gutter={gutter}>
        {React.Children.map(children, child => React.cloneElement(child, { column }))}
      </Row>
    </div>
  );
};
