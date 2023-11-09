import * as React from 'react';
import Svg, { Path } from 'react-native-svg';


function AddIcon({width,height,color}){
  return(
<Svg xmlns="http://www.w3.org/2000/svg"  width={width} height={height} viewBox="0 0 39 38" fill="none">
  <Path d="M6.83334 14.25H14.75V6.33331H24.25V14.25H32.1667V23.75H24.25V31.6666H14.75V23.75H6.83334V14.25ZM17.9167 20.5833V28.5H21.0833V20.5833H29V17.4166H21.0833V9.49998H17.9167V17.4166H10V20.5833H17.9167Z" fill={color}/>
</Svg>
  );
}

export default AddIcon