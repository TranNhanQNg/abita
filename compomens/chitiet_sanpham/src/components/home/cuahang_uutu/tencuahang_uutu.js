import React,{useState,useEffect} from 'react';
import { Text, View,SafeAreaView,TouchableOpacity,ImageBackground,Dimensions,StyleSheet,
  RefreshControl,Animated, Image, ScrollView,} from 'react-native';
  import { useSelector} from 'react-redux';
  import diachiDaTa from '../../../diachiDaTa/diachiDaTa'; 
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
  import Share from 'react-native-share';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import auth from '@react-native-firebase/auth';
import axios from 'axios';

 export default TenCuaHang =({tencuahang,dataAnh,heightAvata,MaTinh,navigation,MaUidNCC})=>{
    const {hinhanh,abita_amin} = diachiDaTa;
   
    const [like, setlike] = useState(null);
    const [reflike, setReflike] = useState(true);
    const SoDienThoai = useSelector(state => state.cart.SoDienThoai); 
    const MaUid = useSelector(state => state.cart.MaUid);
    const matinh = useSelector(state => state.cart.MaTinh);
    const Wifi = useSelector(state => state.cart.Wifi);
    const [tile_Image,settile_Image]=useState(0);
    const [count_like, setcount_like] = useState(0);

    useEffect(() => {
      if(Wifi){
              kiemtralike()
              diemsolike()
            }
      }, [reflike,Wifi,SoDienThoai]);

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
          MaUidNCC:MaUidNCC
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
        var fallbackUrl = 'https://abita.com.vn';
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
      useEffect(()=>{
        getAnh()
      },)
      const apiAnh='https://cdn.pixabay.com/photo/2020/04/30/14/03/mountains-and-hills-5112952_1280.jpg'
        const getAnh=()=>{
        if(dataAnh.AnhNen==''||dataAnh.AnhNen==null){
        Image.getSize(apiAnh, (w, h) => {
            settile_Image(h/w)
        }, (error) => {
            console.error(error);
        })}
        else{
        Image.getSize(hinhanh+'slileApp/'+dataAnh.AnhNen, (w, h) => {
            settile_Image(h/w)
        }, (error) => {
            console.error(error);
        })
        }
        };
    return(
     <View >
      <ImageBackground source={{uri:!dataAnh.AnhNen||dataAnh.AnhNen==''||dataAnh.AnhNen==null?apiAnh:hinhanh+'slileApp/'+ dataAnh.AnhNen}}
                style={{width:width,height:100,resizeMode:'center'}}
              >
              <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.2)'}}>
             
              </View>
            </ImageBackground>
      <Animated.View style={{bottom:3,flexDirection:'row',width:'100%',justifyContent:'space-between',opacity:1,position:'absolute'}}
      >
                  <View style={{flexDirection:'row',alignItems:'center',}}>
                    <TouchableOpacity onPress={()=>navigation.navigate("CuaHang",{MaUidNCC:MaUidNCC, MaTinh:matinh})}
                     style={{width:70,height:70,borderRadius:70,borderWidth:2,borderColor:'#FFFFFF',marginHorizontal:5}}>
                      <Image source={{uri:hinhanh+'slileApp/'+dataAnh.AnhDaiDienCH}} 
                      style={[styles1.imageSile,{borderRadius:50}]} />  
                    </TouchableOpacity>
                    <View style={{justifyContent:'space-between'}}>
                      <Text style={{fontSize:16,color:'#FFF',fontWeight:'bold'}}>{tencuahang}</Text>
                      <Text style={{fontSize:13, color:'#EE82EE'}}>{count_like} <Icon name="thumbs-up" size={13}  /> theo dõi </Text>
                    </View>
                  </View>
                  <View style={{justifyContent:'flex-end'}}>
                  <TouchableOpacity 
                    style={{backgroundColor:'#20B2AA',borderColor:'#EE82EE',borderWidth:1,borderRadius:5,margin:5}}
                    onPress={()=>onCapture()}
                    >
                      
                     
                        <Text style={{fontSize:10,color:'#FFFFFF',margin:3}}><SimpleLineIcons name="share" size={13}/> Chia sẽ</Text>
                  </TouchableOpacity>
                   
                  <TouchableOpacity 
                    style={{backgroundColor:!like?'#DDA0DD':null,borderColor:'#EE82EE',borderWidth:1,borderRadius:5,margin:5}}
                    onPress={SoDienThoai=='abita'? ()=>navigation.navigate('DangNhapNumberPhone',{loai:'3'}):()=>Fecht()}
                    >
                      
                      {
                        !like?
                        <Text style={{fontSize:10,color:'#FFFFFF',margin:3}}><Icon name="thumbs-up" size={13}/> Theo dõi</Text>:
                        <Text style={{fontSize:10,color:'#FFFFFF',margin:3}}><Icon name="thumbs-up" size={13}/> đã theo dõi</Text>
                      }
                  </TouchableOpacity>
                 </View>   
            </Animated.View>
        </View> 
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