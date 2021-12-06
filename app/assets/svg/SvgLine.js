import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {useTheme} from "../../config/Theme";

function SvgComponent(props) {
    const {colors} = useTheme();
    return (
        <Svg width={120} height={1} viewBox="0 0 120 1" fill="none" {...props}>
            <Path fill={colors.border} d="M0 0h120v1H0z"/>
        </Svg>
    );
}

const SvgLine = React.memo(SvgComponent);
export default SvgLine;
