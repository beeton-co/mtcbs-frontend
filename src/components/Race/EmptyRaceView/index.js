import React from 'react';
import {Alert} from 'antd';


export const EmptyRaceView = (props) => {
  const {description, message, type} = props;

  return (
          <div style={{ marginTop: 0 }} >
            <Alert
                    message={message}
                    description={description}
                    type={type}
                    showIcon
            />
          </div>
  );
};
