import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Text, View,} from 'react-native';
import styles from './stylesHome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const {linearGradientxemthem,textTieudeDanhMuc} =styles;
export default TieudeHome = ({props}) => {
	return(
		<LinearGradient
          colors={[ '#FFFFFF','#CCCCCC','#FFFFFF'  ]}
          style={linearGradientxemthem}
        > 
      <Text style={textTieudeDanhMuc}>
        <SimpleLineIcons name="grid" size={15} color="red" style={{margin:10}} />  {props}
      </Text>
    </LinearGradient>
		);
};
