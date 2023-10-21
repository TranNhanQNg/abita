import React, {Component,useEffect,useState, useRef,useLayoutEffect} from 'react';
import { Text, View,Image, SafeAreaView,StyleSheet,Animated, FlatList,TouchableOpacity,Modal} from 'react-native';
import {useFocusEffect,} from '@react-navigation/native';
import { useSelector,useDispatch} from 'react-redux';
import HeaderB from '../../header/headerB';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import styles from '../stylesQuanLy';
import {Render_DonHang} from './render_DonHang';

import {Activity} from '../../dungchung/activityIndicator';
import {fadeInCT} from '../../dungchung/anima';
import {AnhNen} from '../../dungchung/anhnen';
import QuaTang from '../../sanpham/chitietsanpham/component/quatang'

const {abita_dathang, hinhanhicon}=diachiDaTa;
const{viewFlatlist,aoimage,aotext,viewImage,viewThanhTien, viewText} = styles;

export default ChiTietDonHang =({navigation, route})=>{
  const infoAdd = useSelector(state => state.cart.SoDienThoai);
  const Wifi = useSelector(state => state.cart.Wifi);
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const{MaDonHang,tinhtrangdonhang,Ngay}=route.params;
	const [data, setData] = useState([]);
  const [datatang, setDaTaTang] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [activity,setActivity]= useState(true);
  const MaUid = useSelector(state => state.cart.MaUid);
  const [pold, setPold] = useState(0);
  onRefresh=()=>{setActivity(true), setLoading(true)} 
  const xemQuaTang =(item)=>{setDaTaTang(item.QUATANGDH),setModalVisible(true)}
    //animated
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useFocusEffect(() => {fadeInCT(fadeAnim)});
    const fechPold =()=>{
      fetch(abita_dathang+'ThanhToan_Abi.php?MaUid='+MaUid+'&MaTinh='+MaTinh+'&MaDonHang='+MaDonHang)
      .then((response) => response.json())
      .then((json) => {setPold(json.tongPoldKhauTru*1), console.log(json)})
      .catch((error) => console.error(error))
    }
    useEffect(() => {
      fechPold()
    },[])
  useEffect(() => { 
    if(Wifi){ 
      fetch(abita_dathang+'XemDonHang.php?SoDonHang='+MaDonHang)
        .then((response) => response.json())
        .then((json) => {setData(json)})
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      }
  },[Wifi]);

 
  const listHeaderFlatlis =()=>{
    return(
                <View style = {{marginHorizontal:5,borderRadius:8,backgroundColor:'#F0FFFF', marginTop:3}}>
                     <View style={{flexDirection:'row',alignItems:'center'}}> 
                      <Text  style={{margin:6,fontWeight:'bold',color:'#606060'}}>Mã đơn hàng: </Text>
                      <Text selectable={true} selectionColor='orange' style={{fontWeight:'bold',color:'#606060'}}>{MaDonHang} </Text>
                    </View>
                    <Text style={{margin:6,fontWeight:'bold',color:'#606060'}}>Ngày đặt hàng: <Text style={{fontWeight:'normal'}}>{Ngay}</Text></Text>
                    <Text style={{margin:6,fontWeight:'bold',color:'#606060'}}>Tình trạng: <Text style={{fontWeight:'normal'}}>
                    {tinhtrangdonhang}
                    </Text></Text>
                     
                  </View>
    )}

 
    
      for (var i = 0, sum = 0; i < data.length;i++){
        if(data[i].XACNHANNCC!=='hethang')
          sum+= data[i].GIABANSP*data[i].SOLUONGDH};
      
    

      const renderItem=({ item }) => (
        <View style={{
                   flex:1,
                   marginTop:5,
                   marginHorizontal:5,
                   backgroundColor:item.XACNHANNCC=='hethang'?'#DCDCDC':'#FFF',
                   borderRadius:4,
                   }}>
           <Render_DonHang item={item} navigation={navigation} soluong={item.SOLUONGDH} xemQuaTang={xemQuaTang}/>
           
           </View>
       );
    return (
        <View style = {{flex:1}}>
           <AnhNen api={'../icon/nenhome.jpg'}
          backgroundColor={'#20B2AA'}
          backgroundColor1={'rgba(0,175,175,0.8)'}/>
          <SafeAreaView style = {{flex:1}}>
            <HeaderB navigation ={navigation} />
           
            {isLoading?  <Activity/> : (
          <View style={{backgroundColor:'#E8E8E8',justifyContent:'space-between',flex:1}}>
             <Animated.FlatList
              style={{opacity:fadeAnim,flex:1}}
             data={data}
             renderItem={renderItem}     
             keyExtractor={(item,index) => item.IDDONHANG+index}
             ListHeaderComponent={listHeaderFlatlis}
             />
          <View style={{backgroundColor:'#FFFAFA'}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'#FFFAFA',marginVertical:5}}>
                <Text style={{color:'blue',marginLeft:20,}}> Tổng đơn hàng:  </Text> 
                <Text style={{color:'red',marginRight:20,}}> {(sum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đồng </Text> 
          </View>
         
          {pold>0?
          <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:10,backgroundColor:'#FFFAFA'}}>
                <Text style={{color:'blue',marginLeft:20,}}> Thanh toán Abi:  <Text style={{color:'#4682B4',marginRight:20,}}> {pold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Abi</Text> </Text> 
                <Text style={{color:'red',marginRight:20,}}>  {(pold*200).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đồng </Text> 
          </View>
          :null
          }
          <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'#FFFAFA',marginVertical:5}}>
                <Text style={{color:'blue',marginLeft:20,}}> Còn trả:  </Text> 
                <Text style={{color:'red',marginRight:20,}}> {(sum-pold*200).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đồng </Text> 
          </View>
          </View>
        </View>)}
      </SafeAreaView>
      <Modal 
            animationType="fade"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() =>
						setModalVisible(false)
						}>
            <TouchableOpacity onPress={()=>setModalVisible(false)} style={{backgroundColor:'rgba(0,0,0,0.6)',flex:1,justifyContent:'center',alignItems:'center'}}>
              <QuaTang data={datatang} setModalVisible={setModalVisible}/>
            </TouchableOpacity>
      </Modal> 
      </View>

          
          );
};