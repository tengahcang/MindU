import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CalendarIcon({ width, height, color }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
    >
      <Path
        fill={color}
        d="M20.667 17.583h-4.75c-.871 0-1.584.713-1.584 1.584v4.75c0 .87.713 1.583 1.584 1.583h4.75c.87 0 1.583-.712 1.583-1.583v-4.75c0-.871-.712-1.584-1.583-1.584Zm0-15.833v1.583H8V1.75C8 .88 7.287.167 6.417.167c-.871 0-1.584.712-1.584 1.583v1.583H3.25A3.152 3.152 0 0 0 .1 6.5L.082 28.667a3.166 3.166 0 0 0 3.167 3.166h22.167a3.176 3.176 0 0 0 3.166-3.166V6.5a3.176 3.176 0 0 0-3.166-3.167h-1.584V1.75c0-.87-.712-1.583-1.583-1.583-.87 0-1.583.712-1.583 1.583Zm3.166 26.917h-19c-.87 0-1.583-.713-1.583-1.584V11.25h22.167v15.833c0 .871-.713 1.584-1.584 1.584Z"
      />
    </Svg>
  );
}
export default CalendarIcon;