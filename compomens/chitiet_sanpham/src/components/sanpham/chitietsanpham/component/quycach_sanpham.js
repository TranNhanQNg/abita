import React, { useState,useEffect } from "react";
import { FlatList,Text, 
  TouchableOpacity,View,Dimensions } from "react-native";
  import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../stylesChiTietSP';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {Add_GioHang,Ten_Gia,Scroll_Anh,Chitiet_Mota,QuaTang} from './index'


const{viewHinhAnh,viewImage,aoimage,aotext, text} = styles;

export default function QuyCach_SanPham ({
                                        onpress_render,
                                        dataQC,
                                        chitiet,
                                        MaTinh,
                                        currentIndex,
                                        navigation,
                                        setModalVisible,
                                        setModalVisibleSoLuong,
                                        setModalVisibleThongBao,
                                        setcaocard
                                        }) {


	const [chuyenQuyCach,setChuyenQuyCach]=useState(0);
	const time_hientai = new Date().getTime()/1000
    const [color,setColor]=useState(chitiet.IDCHITIETSP);
    const [chuyenImage,setChuyenImage]=useState(1);
    const [layindex,setLayndex]=useState(2);
    const [dataAnh,setDaTaAnh]=useState([])
  
  const chuyen_QuyCach=(index)=>{
	chuyenQuyCach.scrollToIndex({animation:true,index:index})
  };
  const chuyenanh=()=>{
	chuyenImage.scrollTo({ x: 0, y: 0, animated: true })
  };
  const onLayout=(event)=> {
    const {x, y, height, width} = event.nativeEvent.layout;
  setcaocard(height)
  }
getItemLayout =(data,index)=>{
  return {length:width*0.27+6, offset:(width*0.27+6)*index-width*0.27-24, index}
}


    useEffect(() => {
        if(chitiet.ANHDAIDIEN!==dataAnh[0]){
                const newDaTaAnh=JSON.parse(chitiet.TENHINHANH).filter(e=>e !== chitiet.ANHDAIDIEN);
                newDaTaAnh.unshift(chitiet.ANHDAIDIEN);
                setDaTaAnh(newDaTaAnh)
        }
    },[chitiet]);

const renderQC =({item,index})=>{
  const backgroundColor1 = item.IDCHITIETSP === color ? '#BFE8F5' : "#FFFFFF";
  const backgroundColor2 = item.IDCHITIETSP === color ? "#0000CD" : '#282828';
  const backgroundColor3 = item.IDCHITIETSP === color ? '#BFE8F5' : "#F5A9F2";
  
const onpressQuyCach =()=>{ chuyen_QuyCach(index),
                            setColor(item.IDCHITIETSP),
                            onpress_render(item),
                            chuyenanh(),
                            setLayndex(layindex==2?1:2)
                          }
  return(
    <TouchableOpacity 
            activeOpacity={0.5}
            onPress={()=>{onpressQuyCach()}}
    >
        <View style={{ borderColor:backgroundColor3,borderWidth: 1,borderRadius: 7,marginHorizontal:3,backgroundColor:backgroundColor1, justifyContent:'space-evenly',width:width*0.27,alignItems:'center',minHeight:64,}}>
        <View style={{minHeight:40,justifyContent:'center',marginTop:2,alignItems:'center'}}>
          {!item.QUYCACHSP||item.QUYCACHSP==null?null:
          <Text  style ={{marginHorizontal:5,fontSize:12,color:backgroundColor2}}>{item.QUYCACHSP}</Text>
          }
            {item.MAUSACSP=='no'||!item.MAUSACSP?null:
             <View style={{flexDirection:'row', margin:2,alignItems:'center'}}>
               <View style={{height:15,width:15,borderRadius:3,backgroundColor:item.MAMAU,borderWidth:0.5,borderColor:'#B0B0B0'}}/>
                <Text numberOfLines ={1} style ={{marginLeft:5,color:backgroundColor2,fontSize:12}}>{item.MAUSACSP}</Text>
              </View> 
            }
           
          </View>
          <View style={{height:0.5,width:'90%', backgroundColor:'#888888',alignItems:'center'}}/>
            {item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0?
                          JSON.parse(item.HINHTHUC_KHUYENMAI).loai_km==1?
                        <View style={{}}>
                            <Text style={[text,{color:backgroundColor2}]}>
                            {(item.GIABANSP-item.GIABANSP*item.GIAKHUYENMAI/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <Text style={{fontSize:10}}>đ</Text>
                            </Text>
                        </View>:
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Text style={[text,{color:backgroundColor2}]}>
                            {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <Text style={{fontSize:10}}>đ</Text>
                            </Text>
                        </View>:
                        <View style={{flexDirection:'row'}}>
                            <Text style={[text,{color:backgroundColor2}]}>
                            {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <Text style={{fontSize:10}}>đ</Text>
                            </Text>
                        
                        </View>
                        }
                        <View style={{position:'absolute',top:0,right:3}}>
                          {item.QUATANG?
                            JSON.parse(item.QUATANG)[0].thoigian_batdau<time_hientai&JSON.parse(item.QUATANG)[0].thoigian_ketthuc>time_hientai?
                            <MaterialCommunityIcons color={'#3CB371'} name={"star"}/>
                            :null
                            :item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0?
                            <MaterialCommunityIcons color={'#FF00FF'} name={"star"}/>:null
                          }
                      </View>
        </View>
      </TouchableOpacity>  
    )
};


const quycachsanpham =()=>{
 
    return(
      dataQC.length<2?null:
      <View style={{flexDirection: 'row',alignItems:'center',marginVertical:5}} onLayout={currentIndex<0?null:() => {chuyenQuyCach.scrollToIndex({animation:true,index:currentIndex})}}>
         <SimpleLineIcons name="arrow-left" size={10} color="blue"  />
         <View style={{flex:1,alignItems:'center'}}>
          <FlatList
            data={dataQC}
            renderItem={renderQC}
            keyExtractor={(item) => item.IDCHITIETSP}
            horizontal={true}
            extraData={chitiet.IDCHITIETSP}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            bounces = {false}
            getItemLayout={getItemLayout}
            ref={(ref)=>setChuyenQuyCach(ref)}
          />
          </View>
        <SimpleLineIcons name="arrow-right" size={10} color="blue" />
      </View>
    )
};

  return (
    <View >
     <View onLayout={onLayout}>
    <Scroll_Anh 
        dataAnh={dataAnh}
        setChuyenImage={setChuyenImage}
    />
   
      <Ten_Gia    navigation={navigation}
                  chitiet={chitiet}
                  MaTinh={MaTinh}
                  />
      <View style={{height:4,backgroundColor:'#E8E8E8'}}/>
     
      
          {quycachsanpham()}
          <View style={{height:4,backgroundColor:'#E8E8E8'}}/>
          <View style={{marginVertical:15}}> 
                <Add_GioHang 
                    chitiet={chitiet}
                    MaTinh={MaTinh}
                    setModalVisible={setModalVisible}
                    setModalVisibleSoLuong={setModalVisibleSoLuong}
                    setModalVisibleThongBao={setModalVisibleThongBao}
                />
          </View>
          
        </View>
        <Chitiet_Mota
        chitiet={chitiet}
        MaTinh={MaTinh}
        navigation={navigation}
        layindex={layindex}
        dataAnh={dataAnh}
        />
  </View>)
 
};
const {width} = Dimensions.get('window');