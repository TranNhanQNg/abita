import React, { useState,useEffect } from "react";
import { FlatList,Text, 
  TouchableOpacity,View,Dimensions } from "react-native";
  import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../stylesChiTietSP';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


import Scroll_Anh from "./scroll_anh";
import Ten_Gia from "./ten_gia";
import Chitiet_Mota from "./chitiet_mota";
import Add_GioHang from "./add_giohang";
import Chitiet_Mota_Mobi from "./chitiet_mota_mobi";
import { Heigth_Width } from "../../api/heigth_width";

const{text} = styles;
const {mobi}=Heigth_Width;
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
 
getItemLayout =(data,index)=>{
  return {length:mobi=="mobi"?width/3+15:width*0.07+6, offset:mobi=="mobi"?(width/3+15-30)*index-width/3-15-30:(width*0.07+8)*index-width*0.07-8, index}
}


    useEffect(() => {
        if(chitiet.ANHDAIDIEN!==dataAnh[0]){
                const newDaTaAnh=JSON.parse(chitiet.TENHINHANH).filter(e=>e !== chitiet.ANHDAIDIEN);
                newDaTaAnh.unshift(chitiet.ANHDAIDIEN);
                setDaTaAnh(newDaTaAnh)
        }
    },[chitiet]);

    const quycachsanpham =()=>{
      return(
        dataQC.length<2?null:
        <View style={{flexDirection: 'row',alignItems:'center',marginVertical:5}} onLayout={currentIndex<0?null:() => {chuyenQuyCach.scrollToIndex({animation:true,index:currentIndex})}}>
           <TouchableOpacity onPress={layindex==1?null:()=>{chuyen_QuyCach(layindex-1),setLayndex(layindex-1)}}>
              <SimpleLineIcons name="arrow-left" size={20} color="blue"  />
           </TouchableOpacity>
           
           <View style={{flex:1}}>
            <FlatList style={{flex:1}}
              data={dataQC}
              renderItem={renderQC}
              keyExtractor={(item) => item.IDCHITIETSP}
              horizontal={true}
              extraData={chitiet.IDCHITIETSP}
              scrollEventThrottle={16}
              bounces = {false}
              getItemLayout={getItemLayout}
              ref={(ref)=>setChuyenQuyCach(ref)}
              showsHorizontalScrollIndicator={false}
            />
            </View>
            <TouchableOpacity onPress={dataQC.length<8||dataQC.length-8==layindex?null:()=>{chuyen_QuyCach(layindex+1),setLayndex(layindex+1)}}>
              <SimpleLineIcons name="arrow-right" size={20} color="blue" />
            </TouchableOpacity>
          
        </View>
      )
  };
  
  const renderQC =({item,index})=>{
    const backgroundColor1 = item.IDCHITIETSP === color ? '#BFE8F5' : "#FFFFFF";
    const backgroundColor2 = item.IDCHITIETSP === color ? "#0000CD" : '#282828';
    const backgroundColor3 = item.IDCHITIETSP === color ? '#BFE8F5' : "#F5A9F2";
    
  const onpressQuyCach =()=>{ chuyen_QuyCach(index),
                              setColor(item.IDCHITIETSP),
                              onpress_render(item),
                              chuyenanh(),
                              setLayndex(index)
                            }
    return(
      <TouchableOpacity 
              activeOpacity={0.5}
              onPress={()=>{onpressQuyCach()}}
      >
          <View style={{ borderColor:backgroundColor3,borderWidth: 1,borderRadius: 7,marginHorizontal:3,backgroundColor:backgroundColor1, justifyContent:'space-evenly',width:mobi=='mobi'?width/3-30:width*0.07,alignItems:'center',minHeight:64,}}>
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



  return (
    <View style={{flex:1,marginHorizontal:mobi=='mobi'?0:width*0.1,backgroundColor:'#FFF',marginTop:10,}}>
   
     <View style={{flexDirection:mobi=='mobi'?'column':'row'}} >
    <Scroll_Anh 
        dataAnh={dataAnh}
        setChuyenImage={setChuyenImage}
    />
   <View style={{justifyContent:'flex-end',flex:1}}>
   <Ten_Gia    navigation={navigation}
                  chitiet={chitiet}
                  MaTinh={MaTinh}
                  />
      {quycachsanpham()}
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
      
       </View>
      <View style={{height:6,backgroundColor:'#E8E8E8'}}/>
    
        <View style={{backgroundColor:'#FFF',marginHorizontal:Heigth_Width.height_tong*0.01}}>
            {
              mobi=='mobi'?
            
                      <Chitiet_Mota_Mobi
                      chitiet={chitiet}
                      MaTinh={MaTinh}
                      navigation={navigation}
                      layindex={1}
                      dataAnh={dataAnh}
                      />
                  
                  :
                  <Chitiet_Mota
                  chitiet={chitiet}
                  MaTinh={MaTinh}
                  navigation={navigation}
                  layindex={1}
                  dataAnh={dataAnh}
                  />
                
            }
  </View>
  </View>)
 
};
const {width} = Dimensions.get('window');