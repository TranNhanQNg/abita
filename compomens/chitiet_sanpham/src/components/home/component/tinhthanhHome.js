import React from 'react';
import { Text, Image,TouchableOpacity,StyleSheet,useWindowDimensions} from 'react-native';
import { useSelector} from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default TinhThanhHome = ({navigation}) => {	
  
  const w = useWindowDimensions().width;
  const h = useWindowDimensions().height;
  
  const TenTinh = useSelector(state => state.cart.TenTinh);
  
  return (
  
      <TouchableOpacity onPress={() => navigation.navigate("TinhThanh")}
      style={styles.viewImageTinhThanh}>
      
      <Image style = {styles.imageTinhThanh} source={require('../../icon/vitri.png')}/>
      <Text style={{ fontWeight:"300",textAlign:'center', color:'#FFF',fontSize: 12,}}> {' '+TenTinh}  </Text>
      <SimpleLineIcons name="arrow-down" size={15} color="#FFF"  />
      
    </TouchableOpacity>
   
  );
};

const styles = StyleSheet.create({

  headerA:{
   
    width:'100%',
  },
  

 // Tỉnh Thành phố
  imageTinhThanh:{
   marginLeft:20,
    width: 20, 
    height: 20,
   marginVertical:10
 },
 viewImageTinhThanh:{
   flexDirection: 'row',
   alignItems: 'center',
   
},
})