import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export const WarningIcon: React.FC = () => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 512 512">
      <Circle cx="256" cy="256" r="256" fill="#f00" />
      <Path
        d="M256,128c13.3,0,24,10.7,24,24v128c0,13.3-10.7,24-24,24s-24-10.7-24-24V152C232,138.7,242.7,128,256,128z"
        fill="#fff"
      />
      <Path
        d="M256,368c13.3,0,24,10.7,24,24s-10.7,24-24,24s-24-10.7-24-24S242.7,368,256,368z"
        fill="#fff"
      />
    </Svg>
  );
};
