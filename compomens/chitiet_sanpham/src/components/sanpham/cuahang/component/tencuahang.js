import React,{useState,useEffect} from 'react';
import { Text, View,SafeAreaView,TouchableOpacity,FlatList,Dimensions,StyleSheet,
  RefreshControl,Animated, Image, ScrollView,} from 'react-native';
  import { useSelector} from 'react-redux';
  import diachiDaTa from '../../../../diachiDaTa/diachiDaTa'; 
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
  import Share from 'react-native-share';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import {ThongTin_CuaHang} from './thongtincuahang'

 export default TenCuaHang =({tencuahang,dataAnh,heightAvata,MaTinh,navigation,MaUidNCC})=>{
    const {hinhanh,abita_amin} = diachiDaTa;
    const [count_like, setcount_like] = useState(dataAnh.LuotThichCH);
    const [like, setlike] = useState(1);
    const [reflike, setReflike] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const SoDienThoai = useSelector(state => state.cart.SoDienThoai); 
    const MaUid = useSelector(state => state.cart.MaUid);
    const matinh = useSelector(state => state.cart.MaTinh);
    const Wifi = useSelector(state => state.cart.Wifi);


    useEffect(() => {
      if(Wifi){
              kiemtralike()
            }
      }, [reflike,Wifi]);

 const  kiemtralike=()=>{
            axios.post(abita_amin+'Like_TheoDoi/KiemTraLike.php?MaTinh='+MaTinh,
            JSON.stringify(
              {
              DienThoaiKH:SoDienThoai,
              MaUid:MaUid,
              MaUidNCC:MaUidNCC
              }
          ))
          .then((response) => {setlike(response.data.kq)})
          .catch(function (error) {console.log(error)})
          }
   
const diemsolike=()=>{
            fetch(abita_amin+'Like_TheoDoi/LuotTheoDoi.php?MaTinh='+MaTinh+'&MaUidNCC='+MaUidNCC)
            .then((response) => response.json())
            .then((json) => {setcount_like(json.countDHMoi)})
            .catch(function (error) {console.log(error)})
          }
  
      const Fecht =()=>{
        axios.post(abita_amin+'/Like_TheoDoi/Like.php?MaTinh='+MaTinh, 
            JSON.stringify(
              {
              DienThoaiKH:SoDienThoai,
              MaUid:MaUid,
              TenCuaHang:tencuahang,
              MaTinh:matinh,
              MaUidNCC:MaUidNCC,
              LuotThichCH:count_like
              }
            )
        ).then(function (response) {
          setReflike(!reflike)
        })
        .catch(function (error) {
          console.log(error);
          alert('Bạn xem lại kết nối')
        });      
};

    const generateLink = async () => {
      try {
        var fallbackUrl = `https://abita.com.vn?param=${MaTinh},CuaHang,${MaUidNCC},true,true`;
        var link = await dynamicLinks().buildShortLink({
          link: `${fallbackUrl}&param=${MaTinh},CuaHang,${MaUidNCC},true,true`,
          domainUriPrefix: 'https://app.abita.com.vn',
          android: {
            packageName:'com.abitashopee',
            fallbackUrl: fallbackUrl
            // minimumVersion: '18'
          },
          ios: {
            appStoreId: '6443541989',
            bundleId: 'com.shopee.Abita',
            // minimumVersion: '18'
          },
          social: { title: `🌟 Cửa hàng: ${dataAnh.TenCuaHang} 🌟 
          Có nhiều sản phẩm đa dạng, kính mong các anh/chị ghé thăm.`,
                  // descriptionText: 'A Social Application',
                  imageUrl:hinhanh+'slileApp/'+dataAnh.AnhDaiDienCH
                }
        },
          dynamicLinks.ShortLinkType.DEFAULT
        )
        return link
      } catch (error) {
        console.log("error raised", error)
      }
    }
    const onCapture = async () => {
      const getLink = await generateLink()
      Share.open({
        url:getLink
        
        
      }).then((res) => {
        console.log(res);
        })
        .catch((err) => {
        err && console.log(err);
        });
      }
    return(
      
      <Animated.View style={{position:'absolute',bottom:3,flexDirection:'row',width:'100%',justifyContent:'space-between',opacity:heightAvata}}
      >
                  <View style={{flexDirection:'row',alignItems:'center',}}>
                    <TouchableOpacity onPress={()=>setModalVisible(true)}
                     style={{width:70,height:70,borderRadius:70,borderWidth:2,borderColor:'#FFFFFF',marginHorizontal:5}}>
                      <Image source={{uri:hinhanh+'slileApp/'+dataAnh.AnhDaiDienCH}} 
                      style={[styles1.imageSile,{borderRadius:50}]} />  
                    </TouchableOpacity>
                    <View style={{justifyContent:'space-between'}}>
                      <Text style={{fontSize:16,color:'#FFF',fontWeight:'bold'}}>{tencuahang}</Text>
                      <Text style={{fontSize:13, color:'#EE82EE'}}>{count_like>1000?Math.round((count_like/1000)*100)/100+'k':count_like} <Icon name="thumbs-up" size={13}  /> thích | <Text style={{fontSize:13, color:'#F4A460'}}>{dataAnh.LuotXemCH>1000?Math.round((dataAnh.LuotXemCH/1000)*100)/100+'k':dataAnh.LuotXemCH}  lượt xem </Text></Text>
                     
                    </View>
                  </View>
                  <View style={{justifyContent:'flex-end'}}>
                  <TouchableOpacity 
                    style={{backgroundColor:'#20B2AA',borderColor:'#EE82EE',borderWidth:1,borderRadius:5,margin:5}}
                    onPress={()=>onCapture()}
                    >
                      
                     
                        <Text style={{fontSize:10,color:'#FFFFFF',margin:3}}><SimpleLineIcons name="share" size={13}/> Chia sẽ</Text>
                  </TouchableOpacity>
                      {
                        !like?
                        <TouchableOpacity 
                    style={{backgroundColor:'#DDA0DD',borderColor:'#EE82EE',borderWidth:1,borderRadius:5,margin:5}}
                    onPress={SoDienThoai=='abita'? ()=>navigation.navigate('DangNhapNumberPhone',{loai:'3'}):()=>{Fecht(),setcount_like(count_like*1+1)}}
                    >
                        <Text style={{fontSize:10,color:'#FFFFFF',margin:3}}><Icon name="thumbs-up" size={13}/> Thích</Text>
                        </TouchableOpacity>:
                        <TouchableOpacity 
                    style={{backgroundColor:'#DDA0DD',borderColor:'#EE82EE',borderWidth:1,borderRadius:5,margin:5}}
                    onPress={SoDienThoai=='abita'? ()=>navigation.navigate('DangNhapNumberPhone',{loai:'3'}):()=>{Fecht(),setcount_like(count_like*1-1)}}
                    >
                        <Text style={{fontSize:10,color:'#FFFFFF',margin:3}}><Icon name="thumbs-up" size={13}/> Bỏ thích</Text>
                        </TouchableOpacity>
                      }
                 
                 </View>
              <ThongTin_CuaHang modalVisible={modalVisible} setModalVisible={setModalVisible} dataAnh={dataAnh}/>
        </Animated.View>
    )
  };
  const {height,width} = Dimensions.get('window')
  const h = height;
  const w = width;
    const styles1 = StyleSheet.create({
  
     //Hình paner
    
       viewImagePaner:{
          height: w/1.5,
        
    },
    imageSile:{
       flex:1,
      resizeMode:"cover",
      
    },
    })