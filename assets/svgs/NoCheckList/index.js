import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function NoCheckList({ width, height }) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 36 40" fill="none">
        <Path d="M4.5 8.33333C4.5 7.44928 4.81607 6.60143 5.37868 5.97631C5.94129 5.35119 6.70435 5 7.5 5H28.5C29.2956 5 30.0587 5.35119 30.6213 5.97631C31.1839 6.60143 31.5 7.44928 31.5 8.33333V31.6667C31.5 32.5507 31.1839 33.3986 30.6213 34.0237C30.0587 34.6488 29.2956 35 28.5 35H7.5C6.70435 35 5.94129 34.6488 5.37868 34.0237C4.81607 33.3986 4.5 32.5507 4.5 31.6667V8.33333Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  );
}

export default NoCheckList;