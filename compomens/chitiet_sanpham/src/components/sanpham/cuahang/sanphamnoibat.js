import React, { useState,useEffect } from "react";
import { Text, TouchableOpacity,View,Image,Dimensions,ScrollView } from "react-native";
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {TieudeHome} from '../../dungchung/tieudeChung';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const{abita_sanpham,hinhanhsanpham}=diachiDaTa

const SanPhamNoiBat = ({dienthoaincc, MaTinh, navigation}) => {
const [dataDX, setDataDX] = useState([]);
const [isloading,setLoading]=useState(true); 
  useEffect(() => {
    fetch(abita_sanpham+'CuaHangKM.php?DienThoaiNCC='+dienthoaincc+'&MaTinh='+MaTinh)
      .then((response) => response.json())
      .then((json) => setDataDX(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      },[MaTinh,dienthoaincc]);
  naviga =(item,navigation)=>{navigation.navigate("ChitietSanphamDX",{
      idchitietsp:(item.IDCHITIETSP),
      tensanpham:(item.TENSANPHAM),
      quycachsp:(item.QUYCACHSP),
      mausacsp:(item.MAUSACSP),
      giabansp:(item.GIABANSP),
      giakhuyenmai:(item.GIAKHUYENMAI),
      tenhinhanh:(item.TENHINHANH),
    })
  };
  
  const sanphamDX =()=>{
    if(dataDX.length>0){
      return(
        <View >
        <TieudeHome  props={'Sản phẩm nổi bật'}
                  color={[ '#FFFFFF','#87CEEB','#FFFFFF']}
                  icon={"badge"}
                  coloricon={'#008000'}
                  colortext={'#FFFFFF'}
        />
          <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>   
            <View style = {{flexDirection: 'row',}}>
              {dataDX.map((item, index)=>
                <TouchableOpacity key = {item.IDSANPHAM} onPress={() => naviga(item,navigation)}
                    style={{borderWidth:0.5, borderColor:'#DCDCDC',margin:5, alignItems:'center'}}
                >
                  <View style ={{ width: w*0.25, height: w*0.25,backgroundColor:'#FFFFFF',}}>
                    <Image source={{uri:hinhanhsanpham+JSON.parse(item.TENHINHANH)[0]}} style={{resizeMode:"contain", flex: 1,}} />
                  </View>
                  <View>
                  <Text style={{ width: w*0.3, fontSize: 12,padding: 3,}}>{item.TENSANPHAM}</Text>
                  <Text style={{ width: w*0.3,fontSize: 12,padding: 3,color:'red'}}>
                     {item.GIABANSP>item.GIAKHUYENMAI?item.GIAKHUYENMAI.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."):item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                  </Text>  
                  </View>       
                </TouchableOpacity>
              )}
            </View>
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
export default SanPhamNoiBat;

