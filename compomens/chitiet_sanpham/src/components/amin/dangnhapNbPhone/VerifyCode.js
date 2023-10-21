// import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity,Dimensions } from 'react-native';
import {ModalThongBao} from '../../dungchung/modalThongBao';

const {width,height} = Dimensions.get('window');
export default function OTP(props) {
  const [code, setCode] = useState('');
  const [time, setTime] = useState(0);
  useEffect(() => {
   
    const id = setInterval(() => {setTime(c=>c+1)},1000);
    return () => clearInterval(id);
    
  }, []); 

  useEffect(() => {
    code.length===6?
    setTimeout(() =>{props.onSubmit(code)},300)
    :null
  },[code]);

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Quý khách vui lòng nhập mã OTP từ tin nhắn SMS</Text>
      <View style={{ alignItems:'center'}}>
      <Text style={{fontSize:40, color:'rgba(0, 200, 255, 0.6)'}}> OTP</Text>
      <View>
       <View style={{position:'absolute',height:40,width,flexDirection:'row',justifyContent:'center'}}>
           
            
            <View style={{marginHorizontal:5,justifyContent:'space-between',alignItems:'center'}}>
              <Text style={{fontSize:25}}>{code.split('')[0]}</Text>
              <View style={{height:2,backgroundColor:'#000',width:20}}/>
            </View>
            <View style={{marginHorizontal:5,justifyContent:'space-between',alignItems:'center'}}>
              <Text style={{fontSize:25}}>{code.split('')[1]}</Text>
              <View style={{height:2,backgroundColor:'#000',width:20}}/>
            </View>
            <View style={{marginHorizontal:5,justifyContent:'space-between',alignItems:'center'}}>
              <Text style={{fontSize:25}}>{code.split('')[2]}</Text>
              <View style={{height:2,backgroundColor:'#000',width:20}}/>
            </View>
            <View style={{marginHorizontal:5,justifyContent:'space-between',alignItems:'center'}}>
              <Text style={{fontSize:25}}>{code.split('')[3]}</Text>
              <View style={{height:2,backgroundColor:'#000',width:20}}/>
            </View>
            <View style={{marginHorizontal:5,justifyContent:'space-between',alignItems:'center'}}>
              <Text style={{fontSize:25}}>{code.split('')[4]}</Text>
              <View style={{height:2,backgroundColor:'#000',width:20}}/>
            </View>
            <View style={{marginHorizontal:5,justifyContent:'space-between',alignItems:'center'}}>
              <Text style={{fontSize:25}}>{code.split('')[5]}</Text>
              <View style={{height:2,backgroundColor:'#000',width:20}}/>
            </View>
            
         
       </View>
      <TextInput
        autoFocus
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        returnKeyType ='done'
        maxLength={6}
        style={{width,borderWidth:1,height:50,opacity:0}}
      />
      </View>
     
      </View>
      <View style={{width:'100%',marginTop:40}}>
          {time<61?
          <Text style={{fontSize:12,color:'#00CED1'}}>Vui lòng đợi sau: {60-time}</Text>
          :
          <TouchableOpacity style={{width:'100%'}} onPress={() => {props.setConfirm(null)}}>
            <Text style={{fontSize:13,color:'#00CED1'}}>Click thử lại</Text>
          </TouchableOpacity>
          }
      </View>

      <ModalThongBao
				ten={'Nhập mã OTP không đúng'} thongbao={'vui lòng kiểm tra lại'} modalVisible={props.modalVisible} dieukhien={()=>{props.setModalVisible(false),setTime(61)}} hanhdong={'Quay lại'}
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
    width: 90,
    marginVertical: 30,
    fontSize: 20,
    padding: 10,
    marginLeft:10, 
  },
  text: {
    marginTop:20,
    fontSize: 16,
    marginHorizontal:10,
    color:'#006600'
  },
});