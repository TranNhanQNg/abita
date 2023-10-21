import React, {useEffect, useState} from 'react';
import {Text, View,TextInput,StyleSheet, TouchableOpacity} from 'react-native';
import {Fecht} from './fecht';
import { useSelector,useDispatch} from 'react-redux';

const TextInputAmin =({ten,tenmuc,id,setluu,dieukien,tengiatri,dienthoaincc})=>{
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const [sua, setSua] = React.useState('Sửa');
  const [suamuc, setText] = React.useState(tenmuc);
  const [bodercolor, setBodercolor] = React.useState('#D8D8D8');
  const [editable, setEditable] = React.useState(false);
  
  const setDaTa=(text)=>{setText(text)}

  onPress=()=>Fecht(dieukien={dieukien:dieukien,
    tendieukien:'IdSanPham',
    tencsdl:'sanpham',
    tengiatri:tengiatri,
    giatri:suamuc,
    DienThoaiNCC:dienthoaincc
    },MaTinh,)
  
const pushdata =(text)=>{
    const newdata = data.map(e=>{
      if(e.id==id){
        return(
          {...e,value:text}
        )}
        return(
          {...e}
        )
      })
    setDaTa(newdata)
     
};
const suatextinput =()=>{sua=='Sửa'?setSua('Lưu'):setSua('Sửa'),setBodercolor('blue')};
const editabletextinput =()=>{sua=='Sửa'?setEditable(true):setEditable(false)};
const sualuu =()=>{
  if(id==1){
    return(
    <TouchableOpacity  onPress={()=>{suatextinput(),editabletextinput(),setluu('2'),onPress()}}
        style={{backgroundColor:'red', borderRadius:6}}
    >
    <Text style={styles.textsua}>{sua}</Text>
    </TouchableOpacity>)
    }else if(editable==true){
      return(
      <TouchableOpacity  onPress={()=>{suatextinput(),editabletextinput(),setluu('1'), setBodercolor('#D8D8D8'),onPress()}}
        style={{backgroundColor:'#4682B4', borderRadius:6}}
    >
    <Text style={styles.textsua}>{sua}</Text>
    </TouchableOpacity>)
    }else {return(null)}
}
	return(
		 <View style ={{ }}>
        <View style={{backgroundColor:'#ADD8E6'}}>
            <View style={styles.danhmuc}>
              <View style={{flexDirection:'row'}}>
                <Text> {ten}</Text> 
                <Text style={{color:'red'}}>*</Text>
              </View>
              {sualuu()}
            </View>
        </View>
        <View style={[styles.viewtextInput, {borderColor:bodercolor}]}>
          <TextInput style={styles.textInput}
                      value = {suamuc}
                      returnKeyType ='done'
                      onChangeText={text => {setText(text)}}
                      multiline={true}
                      editable ={editable}
          />
        </View>
        
      </View>
    );
}
// phần giá sản lượng

const TextInputAminGia =({datagia_sl})=>{
    // const id_ct = Math.floor(Math.random() * 100);

    // const id = index+ten+mauSP;
    // const tenImage =tendataImage.filter(e=>  e.TenMau == mauSP);
    // const newdataVND = dataVND.filter(e=>  e.id == id);
    // const pushdataVND =(text)=>{
    //     if(newdataVND.length>0){
    //     const newdatavnd = dataVND.map(e=>{
    //                       if(e.id == id){
    //                         return({...e,GiaBanSP:text})
    //                       }else{
    //                         return({...e})
    //                             }
    //                       });
    //       setDaTaVND(newdatavnd)             
    //     }else{
    //           setDaTaVND([...dataVND,{
    //             IdSanPham:index+id_ct,
    //             id:id,
    //             TenMau:mauSP,
    //             GiaBanSP:text,
    //             TenAnh:tenImage,
    //             QuyCachSP:ten,
    //             TonDau:0
    //           }])
    //     };
    //  };   

    // const pushdataID =(text)=>{
    //     if(newdataVND.length>0){
    //     const newdatavnd = dataVND.map(e=>{
    //                       if(e.id == id){
    //                         return({...e,TonDau:text})
    //                       }else{
    //                         return({...e})
    //                             }
    //                       });
    //       setDaTaVND(newdatavnd)             
    //     }else{
    //           setDaTaVND([...dataVND,{
    //             IdSanPham:index+id_ct,
    //             id:id,
    //             TenMau:mauSP,
    //             GiaBanSP:0,
    //             TenAnh:tenImage,
    //             QuyCachSP:ten,
    //             TonDau:text
    //           }])
    //     };
    //     }tenImage
   
  const [gia,setGia] = useState(datagia_sl.GIABANSP);
  const [sanluong,setSanLuong] = useState(datagia_sl.SOLUONGTON);
  const [quycach,setQuyCach] = useState(datagia_sl.QUYCACHSP);
  const [giaKM,setGiaKM] = useState(datagia_sl.GIAKHUYENMAI);

	return(
    <View>
      <View style={{flexDirection:'row', justifyContent:'space-between', backgroundColor:'#FFFFFF',alignItems:'center'}}>
       
        <View style={{flex:0.6}}>
          <View style={[styles.viewtextInput,{borderColor:datagia_sl.TENHINHANH.length==0?'#D8D8D8':'#006400'}]}>
            <TextInput style={styles.textInput}
              placeholder = {'0'}
              returnKeyType ='done'
              onChangeText={text => {setQuyCach(text)}}
              editable={datagia_sl.TENHINHANH.length==0?false:true}
              value={quycach}
            />
          </View>
        </View>
        <View style={{flex:0.25}}>
          <View style={[styles.viewtextInput,{borderColor:datagia_sl.TENHINHANH.length==0?'#D8D8D8':'#006400'}]}>
            <TextInput style={styles.textInput}
              placeholder = {'0'}
              keyboardType="numeric"
              onChangeText={text => {setSanLuong(text)}}
              editable={datagia_sl.TENHINHANH.length==0?false:true}
              value={sanluong}
            />
          </View>
        </View>
        <View style={{flex:0.5}}>
          <View style={[styles.viewtextInput,{borderColor:datagia_sl.TENHINHANH.length==0?'#D8D8D8':'#006400'}]}>
              <TextInput style={styles.textInput}
                placeholder = {'VNĐ'}
                keyboardType="numeric"
                onChangeText={text => {setGia(text)}}
                value={gia}
                editable={datagia_sl.TENHINHANH.length==0?false:true}
              />
            </View>
      </View>
      <View style={{flex:0.5}}>
          <View style={[styles.viewtextInput,{borderColor:datagia_sl.TENHINHANH.length==0?'#D8D8D8':'#006400'}]}>
              <TextInput style={styles.textInput}
                placeholder = {'VNĐ'}
                keyboardType="numeric"
                onChangeText={text => {setGiaKM(text)}}
                value={giaKM}
                editable={datagia_sl.TENHINHANH.length==0?false:true}
              />
            </View>
      </View>
      <TouchableOpacity >
       
     
        <View style={{width:35,height:35, marginHorizontal:5, borderRadius:5,backgroundColor:'#9ACD32',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
            <Text>Ảnh</Text>
        </View>
      </TouchableOpacity>
      </View>
      <View style={{height:1,}}/>
    </View>
  );
}
module.exports = {TextInputAmin,TextInputAminGia};

const styles= StyleSheet.create({
  danhmuc:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:10,
        height:35,
        alignItems:'center',
        },
        viewtextInput:{
          marginHorizontal:2,
          marginVertical:5,
          borderRadius:5,
          borderWidth:0.5,
          borderColor:'#D8D8D8'
        },
        textInput:{
          flex:1,
          maxHeight:200,
          minHeight:35,
          marginHorizontal:3
        },
        textsua:{
          marginHorizontal:5,
          color:'#FFFFFF'
        }
    })