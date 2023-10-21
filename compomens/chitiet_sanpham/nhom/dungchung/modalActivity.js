import React from 'react';
import {View,Modal,ActivityIndicator} from 'react-native';

export default ModalActivity =({modalVisible})=>{
  
  return(
  <View> 
<Modal animationType="fade"
        transparent={true}
        visible={modalVisible}
    >
     <View style={{opacity:1, flex:1, justifyContent:'center'}}>
        <ActivityIndicator size="large" color="#00ff00"/> 
    </View>
  </Modal>
 </View> 
)};