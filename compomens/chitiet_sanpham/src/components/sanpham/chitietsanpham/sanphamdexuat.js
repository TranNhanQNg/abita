import React, { useState,useEffect } from "react";
import { Text, TouchableOpacity,View,Image,Dimensions,ScrollView } from "react-native";
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import styles from './stylesChiTietSP';
import {TieudeHome} from '../../dungchung/tieudeChung';
import {RenderSanPhamDeXuat} from './renderSP_ChiTiet'
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const{abita_sanpham,hinhanhsanpham}=diachiDaTa;
const {tieude}=styles;

const SanPhanDeXuat = ({navigation,IdDanhMucCap3, MaTinh,IdQuyCach}) => {
const [dataDX, setDataDX] = useState([]);
const [isloading,setLoading]=useState(true);
const [trang, setTrang]= useState(1);
  useEffect(() => {
   
    fetch(abita_sanpham+'SanPhamDeXuat.php?IdDanhMucCap3='+IdDanhMucCap3+'&MaTinh='+MaTinh+'&IdQuyCach='+IdQuyCach+'&Trang='+trang)
      .then((response) => response.json())
      .then((json) => {setDataDX(json)})
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      },[IdQuyCach]);
  const sanphamDX =()=>{
    if(dataDX.length>0){
      return(
        <View >
          <TieudeHome props = {'Sản phẩm đề xuất'} 
				color={[ '#FFFFFF','#CCCCCC','#FFFFFF']}
				icon={"❊"}
				coloricon={'blue'}
				colortext={'#008B8B'}
				/>
          <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}
            style={{backgroundColor:'#E8E8E8',marginBottom:5}}
          >  
              {dataDX.map((item, index)=>
                <View key={item.IDCHITIETSP}>
                  <RenderSanPhamDeXuat  item={item} navigation={navigation} />
                </View>
              )}
          </ScrollView>
        </View>
        )
      }
    }
  return (
    <View>
      {sanphamDX()}
    </View> 
  );
};
export default SanPhanDeXuat;

