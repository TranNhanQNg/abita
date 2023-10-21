import React, { useState,useEffect } from "react";
import {  Text,
  TouchableOpacity,View,TextInput } from "react-native";




export default ThanhToan_Abi = ({pold,setAbi,setModalVisible_Abi,sum}) => {
  
  const [Abi_chon,setAbi_chon] =useState(0)
  
    return(
    <TouchableOpacity activeOpacity={1}
    style={{ backgroundColor:'#F0F8FF', margin:10,width:'95%',borderRadius:8,borderWidth:1,borderColor:'#1E90FF'}}>
    <View style={{margin:20}}>
    <View style={{marginVertical:10}}>
        <Text style={{}}>Tổng Abi: <Text style={{color:'#4682B4'}}>{pold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ~  {(200*pold).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đồng</Text></Text>
        <Text style={{marginVertical:5}}>Đơn hàng cần Abi: <Text style={{color:'#4682B4'}}>{(sum/200).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Abi ~ {(Abi_chon*200).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đồng</Text></Text>
    </View>
        <View style ={{ flexDirection:'row', alignItems:'center',backgroundColor:'#FFF',}}>
       
        <TextInput style={{flex:1,height:40, marginHorizontal:20,}}
        placeholder = {'Nhập Abi'}
        returnKeyType ='done'
        value={Abi_chon}
        onChangeText={text => {setAbi_chon(text)}}
        keyboardType={"number-pad"}
        />
        </View>
        <View style={{height:70,marginVertical:5}}>
            {Abi_chon<pold?null:
                <Text style={{color:'red'}}>➣ Bạn chọn vượt Abi bạn có</Text>
               
            }
            {
                sum>=Abi_chon*200?null:
                <Text style={{color:'red'}}>➣ Đơn hàng của bạn chỉ cần {(sum/200).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Abi ~ {(sum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đồng</Text>
            }
       </View>
    <TouchableOpacity onPress={()=>{Abi_chon<pold&sum>=Abi_chon*200?(setModalVisible_Abi(false),setAbi(Abi_chon)):null}}
    style={{backgroundColor:'#4682B4',alignItems:'center',borderRadius:5}}
    >
        <Text style={{margin:10,color:'#FFF'}}>Xác nhận</Text>
    </TouchableOpacity>
   
    </View>
</TouchableOpacity>
      )
}

