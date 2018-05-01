import React from 'react';
export const GenerateSVGGradient = (props) => {
  const{id, offset1, stopColor1, offset2, stopColor2} = props;
  return (
          <svg height="0" width="0">
            <defs>
              <linearGradient id={id}>
                <stop offset={offset1} stopColor={stopColor1}/>
                <stop offset={offset2} stopColor={stopColor2}/>
              </linearGradient>
            </defs>
          </svg>
  );
};