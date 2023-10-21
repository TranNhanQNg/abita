import React, {Component,useState,useEffect} from 'react';
import {Text, View,SafeAreaView,Picker,FlatList, Image,
  TouchableOpacity,StyleSheet,TextInput,Modal,Button,Alert,ScrollView,Dimensions} from 'react-native';
import HeaderC from '../header/headerC';
import TextInputAmin from './chung/textInputAmin';
import Icon from 'react-native-vector-icons/SimpleLineIcons';


export default AddSanPham =({navigation})=>{

  const [tinhtrangSP, setTinhTrangSP] = React.useState(true);
  const [checktinhtrangSP, setCheckTinhTrangSP] = React.useState(false);  
  const [texOnChange2, onChangeText2] = React.useState(null); 
  const [editable2, setEditable2] = useState(false);
  const [texOnChange1, onChangeText1] = React.useState(null); 
  const [editable1, setEditable1] = useState(false);
 

  return(
        <SafeAreaView>
         <HeaderC navigation={navigation}/>

        <ScrollView style={styles.scrollView}>
        <View style={{alignItems:'center', margin:20, flexDirection:'row', justifyContent:'center'}}>
        <Icon name="plus" size={20} color="blue" />
        <Text style={{marginLeft:10}}>Điền thông tin sản phẩm mới, những mục mang sao đỏ bắt buộc phải có thông tin</Text>

        </View>
        

        <View style={{backgroundColor:'#50C7C7'}}>
        <View style={styles.danhmuc}>
        <View style={{flexDirection:'row'}}>
        <Text> Tên sản phẩm </Text> 
        <Text style={{color:'red'}}>*</Text>
        </View>
        <TouchableOpacity onPress={()=>setEditable1(true) }> 
       <Icon name="note" size={15} color="blue" style={{marginLeft:10}} />
        </TouchableOpacity>
        </View>
        </View>
       
      <View style={{margin:5, borderRadius:5, borderWidth:editable1?0.5:0}}>
      <TextInput style={styles.textinput}
      placeholder = {'Tên sản phẩm'}
      returnKeyType ='done'
      onChangeText={text=>onChangeText1(text)}
      multiline={true}
      editable ={editable1}
      />
      </View>
      {editable1?
      <TouchableOpacity onPress={()=>{setEditable1(false)}}
      style={{alignItems:'center', }}>
    <View style={{alignItems:'center', backgroundColor:'#50C7C7',borderRadius:4, margin:5}}>
    <Text style={{margin:3}}> Xong </Text>
    </View>
    </TouchableOpacity>
    :null}
     
      <View style={{backgroundColor:'#50C7C7'}}>
        <View style={styles.danhmuc}>
        <View style={{flexDirection:'row'}}>
        <Text> Tên sản phẩm </Text> 
        <Text style={{color:'red'}}>*</Text>
        </View>
        <TouchableOpacity onPress={()=>setEditable2(true) }> 
       <Icon name="note" size={15} color="blue"/>
        </TouchableOpacity>
        </View>
        </View>
       
      <View style={{margin:5, borderRadius:5, borderWidth:editable2?0.5:0}}>
      <TextInput style={styles.textinput}
      placeholder = {'Tên sản phẩm'}
      returnKeyType ='done'
      onChangeText={text=>onChangeText2(text)}
      multiline={true}
      editable ={editable2}
      />
      </View>
      {editable2?
      <TouchableOpacity  onPress={()=>{setEditable2(false)}}
      style={{alignItems:'center', }}>
    <View style={{alignItems:'center', backgroundColor:'#50C7C7',borderRadius:4, margin:5}}>
    <Text style={{margin:3}}> Xong </Text>
    </View>
    </TouchableOpacity>
    :null} 



    <View style={{backgroundColor:'#50C7C7'}}>
        <View style={styles.danhmuc}>
        <View style={{flexDirection:'row'}}>
        <Text> Tình trạng sản phẩm </Text> 
        <Text style={{color:'red'}}>*</Text>
        <Text style={{color:'red'}}> : {tinhtrangSP? 'Hàng luôn sẵn sàng':'Chưa có hàng'}</Text>
        </View>
        <TouchableOpacity onPress={()=>setCheckTinhTrangSP(true) }> 
       <Icon name="note" size={15} color="blue"/>
        </TouchableOpacity>
        </View>
        </View> 
        {checktinhtrangSP?
        <View style={{margin:10, flexDirection:'row',}}>
         <TouchableOpacity onPress ={()=> {setTinhTrangSP(true), setCheckTinhTrangSP(false)}}
          style={{backgroundColor:'#EE82EE',flex:1, width:70, height:25,borderRadius:8, justifyContent:'center',flexDirection:'row',alignItems:'center', marginHorizontal:8}}>
          <Text style={{color:'#FFFFFF',textAlign:'center',}}><Icon name="check" size={15} color="red" /> Hàng luôn sẵn sàng</Text>
      </TouchableOpacity>
       <TouchableOpacity onPress ={()=> {setTinhTrangSP(false), setCheckTinhTrangSP(false)}}
          style={{backgroundColor:'#B0C4DE',flex:1, width:70, height:25,borderRadius:8, justifyContent:'center',flexDirection:'row',alignItems:'center', marginHorizontal:8}}>
          <Text style={{color:'#FFFFFF',textAlign:'center',}}><Icon name="minus" size={15} color="red" /> Huỷ bỏ</Text>
      </TouchableOpacity>
      </View>:null}
       
    </ScrollView>
        </SafeAreaView>
    );
}
  


const {height,width} = Dimensions.get('window')

const h = height;
const w = width;

const styles= StyleSheet.create({

  scrollView:{
    
  },
  danhmuc:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:10,
        height:30,
        alignItems:'center',

  },
  
  textinput:{flex:1,
    maxHeight:200,
    minHeight:40,
    marginHorizontal:7,
    
   },
   viewtextinput:{
    margin:5,
    borderRadius:5,
   }

  // boxicon:{
  //   height: 30,
  //   width: 30,
    
  // },
  // timkiem:{
  //   height: 35,
  //   borderRadius: 5,
  //   backgroundColor:'#FFFFFF',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
    
  // },
  // iconTimKiem:{
  //   height: 30,
  //   width: 30,
  //   margin: 10,
  // }
})
  	
   