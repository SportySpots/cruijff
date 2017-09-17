import React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';

export default props => {
  let scale = props.scale || 1;

  return (
    <Svg width={64 * scale} height={74 * scale} viewBox="0 0 63 74" xmlns="http://www.w3.org/2000/svg">
      <G fill="none" fill-rule="evenodd">
        <Rect fill="#07D654" width="63" height="74" rx="5"/>
        <Path fill="#FFF" d="M10.023 10.57h42.954v52.86H10.023"/>
        <Path fill="#248232" d="M0 42.286h42v10.57H0zM21 21.143h42v10.57H21z"/>
        <Path fill="#2BA84A" d="M0 10.57h10.5v52.86H0M52.5 10.57H63v52.86H52.5"/>
        <Path d="M0 63.43h63V74H0z"/>
        <Path fill="#248232" d="M10.5 0h42v10.57h-42zM10.5 63.43h42V74h-42z"/>
      </G>
    </Svg>
  );
}
