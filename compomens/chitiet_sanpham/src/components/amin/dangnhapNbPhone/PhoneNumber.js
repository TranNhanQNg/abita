import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput,Dimensions} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {ModalThongBao} from '../../dungchung/modalThongBao';
const {width,height} = Dimensions.get('window');
export default function PhoneNumber ({phoneNumber,setPhoneNumber,onSubmit}) {
  const [modalVisible,setModalVisible] =useState(false);
  

  const dieukhien =()=>setModalVisible(false);
  
  const auth =()=>{
    if(phoneNumber==null||phoneNumber.length!==10){
       setModalVisible(true)
    }else{onSubmit(phoneNumber)} 
  };
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>
        Quý khách vui lòng nhập số điện thoại để quản lý tài khoản của mình
      </Text>
      <View style={{flexDirection:'row', alignItems:'center'}}>
      <SimpleLineIcons name="phone" size={30} color="#FFFF00" />
      
      </View>
      <View>
       <View style={{position:'absolute',height:40,width,flexDirection:'row',justifyContent:'center'}}>
           
            
            <View style={{marginHorizontal:2,justifyContent:'space-between',alignItems:'center'}}>
              <Text style={{fontSize:25}}>{phoneNumber.split('')[0]}</Text>
              <View style={{height:2,backgroundColor:'#FFA500',width:20}}/>
            </View>
            <View style={{marginHorizontal:2,justifyContent:'space-between',alignItems:'center'}}>
              <Text style={{fontSize:25}}>{phoneNumber.split('')[1]}</Text>
              <View style={{height:2,backgroundColor:'#FFA500',width:20}}/>
            </View>
            <View style={{marginHorizontal:2,justifyContent:'space-between',alignItems:'center'}}>
              <Text style={{fontSize:25}}>{phoneNumber.split('')[2]}</Text>
              <View style={{height:2,backgroundColor:'#FFA500',width:20}}/>
            </View>
            <View style={{marginHorizontal:2,justifyContent:'space-between',alignItems:'center'}}>
              <Text style={{fontSize:25}}>{phoneNumber.split('')[3]}</Text>
              <View style={{height:2,backgroundColor:'#FFA500',width:20}}/>
            </View>
            <View style={{marginHorizontal:2,justifyContent:'space-between',alignItems:'center'}}>
              <Text style={{fontSize:25}}>{phoneNumber.split('')[4]}</Text>
              <View style={{height:2,backgroundColor:'#FFA500',width:20}}/>
            </View>
            <View style={{marginHorizontal:2,justifyContent:'space-between',alignItems:'center'}}>
              <Text style={{fontSize:25}}>{phoneNumber.split('')[5]}</Text>
              <View style={{height:2,backgroundColor:'#FFA500',width:20}}/>
            </View>
            <View style={{marginHorizontal:2,justifyContent:'space-between',alignItems:'center'}}>
              <Text style={{fontSize:25}}>{phoneNumber.split('')[6]}</Text>
              <View style={{height:2,backgroundColor:'#FFA500',width:20}}/>
            </View>
            <View style={{marginHorizontal:2,justifyContent:'space-between',alignItems:'center'}}>
              <Text style={{fontSize:25}}>{phoneNumber.split('')[7]}</Text>
              <View style={{height:2,backgroundColor:'#FFA500',width:20}}/>
            </View>
            <View style={{marginHorizontal:2,justifyContent:'space-between',alignItems:'center'}}>
              <Text style={{fontSize:25}}>{phoneNumber.split('')[8]}</Text>
              <View style={{height:2,backgroundColor:'#FFA500',width:20}}/>
            </View>
            <View style={{marginHorizontal:2,justifyContent:'space-between',alignItems:'center'}}>
              <Text style={{fontSize:25}}>{phoneNumber.split('')[9]}</Text>
              <View style={{height:2,backgroundColor:'#FFA500',width:20}}/>
            </View>
            
         
       </View>
      <TextInput
        autoFocus
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="numeric"
        returnKeyType ='done'
        maxLength={10}
        style={{width,borderWidth:1,height:50,opacity:0}}
      />
      </View>
     
      <TouchableOpacity style={{backgroundColor: 'rgba(0, 200, 255, 0.6)', borderRadius:8,marginTop:20}} onPress={() => auth()}>
        <Text style={{margin:10, color:'#FFFFFF',fontSize:16, fontFamily: "Cochin"}}>
          <SimpleLineIcons name="user-follow" size={16} color="#000000" /> Đăng nhập
        </Text>
      </TouchableOpacity>
      <ModalThongBao
        ten={'Số điện thoại không đúng'}
        thongbao ={'Bạn vui lòng xem lại số điện thoại'}
        modalVisible={modalVisible}
        dieukhien={dieukhien}
        hanhdong={'Đóng'}

      />
      
      
    </View>
  ); 
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center', 
  },
  input: {
    backgroundColor:'rgba(52, 52, 52, 0.2)',
    borderRadius:8,
    width: 200,
    marginVertical: 30,
    fontSize: 20,
    padding: 10,
    marginLeft:10,
  },
  text: {
    marginTop:20,
    fontSize: 16,
    marginHorizontal:10,
    color:'#006600',
    fontFamily: "Cochin"
  },
});