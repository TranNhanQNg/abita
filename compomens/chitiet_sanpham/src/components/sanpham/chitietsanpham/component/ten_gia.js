import React,{useState} from "react";
import {  Text, 
          TouchableOpacity,
          View,
          Dimensions,
          Modal
        } from "react-native";
import { useSelector} from 'react-redux'; 
import LinearGradient from 'react-native-linear-gradient';
import styles from '../stylesChiTietSP';
import TinhThanh from '../../../dungchung/tinhthanh'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Share from 'react-native-share';
import diachiDaTa from '../../../../diachiDaTa/diachiDaTa';
import {LikeSanPham,Sao,Tang_Pont_CTSP,QuaTang} from './index'

const{aotext, text} = styles;
const{abita_sanpham,hinhanhsanpham}=diachiDaTa;
export default function Ten_Gia ({navigation,chitiet,
                                          MaTinh
                                          
                                        }) {

  const AddFont = useSelector(state => state.cart.AddFont);
  const [modalVisible,setModalVisible]=useState(false)
	const time_hientai = new Date().getTime()/1000
  const generateLink = async () => {
    try {
      var title = `${chitiet.NGAY_KETTHUC>time_hientai&chitiet.NGAY_KHUYENMAI<time_hientai&chitiet.GIAKHUYENMAI>0&JSON.parse(chitiet.HINHTHUC_KHUYENMAI).loai_km==1?'🎁 '+(chitiet.GIABANSP-chitiet.GIABANSP*chitiet.GIAKHUYENMAI/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."):'🛍 '+chitiet.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ 💎 - ${chitiet.TENSANPHAM+", "+chitiet.QUYCACHSP}`
      var imageUrl = hinhanhsanpham + chitiet.ANHDAIDIEN
      var fallbackUrl =`https://abita.com.vn?param=${MaTinh},ChitietSanpham,true,${chitiet.IDSANPHAM},${chitiet.IDCHITIETSP}`;
      var link = await dynamicLinks().buildShortLink({
        link: `${fallbackUrl}&param=${MaTinh},ChitietSanpham,true,${chitiet.IDSANPHAM},${chitiet.IDCHITIETSP}`,
        domainUriPrefix:'https://app.abita.com.vn',
          android: {
            packageName:'com.abitashopee',
            fallbackUrl:fallbackUrl
            // minimumVersion: '18'
          },
          ios: {
            bundleId:'com.shopee.Abita',
            appStoreId:'6443541989',
            fallbackUrl:fallbackUrl
            // minimumVersion: '18'
          },
          social: { title: title,
                  // descriptionText: descriptionText,rr
                  imageUrl:imageUrl
          
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
GiaSanPham =()=>{
  const time = new Date(chitiet.NGAY_KETTHUC*1000)
  var phut = time.getMinutes().toString();
  var gio = time.getHours().toString();
  var ngay = (time.getDate() + 100).toString().substring(1);
  var thang = (time.getMonth() + 101).toString().substring(1);
 
  return(
    <View>
      <Text numberOfLines ={2} style={{marginTop:5,fontSize:15,color:'#000',lineHeight:25,fontFamily: 'OpenSans-Regular',}}>{chitiet.TENSANPHAM}</Text> 
        <View style={{flexDirection:'row', alignItems:'center'}}>
            {chitiet.QUYCACHSP=='no'||chitiet.QUYCACHSP==''||chitiet.QUYCACHSP==null?null:
              <Text style ={[text]}>{chitiet.QUYCACHSP}{chitiet.MAUSACSP=='no'||chitiet.MAUSACSP==''||chitiet.MAUSACSP==null?null:','}</Text>
              }
              {chitiet.MAUSACSP=='no'||chitiet.MAUSACSP==''||chitiet.MAUSACSP==null?null:
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text> màu: </Text>
                <View style={{height:12,width:12,borderRadius:3,backgroundColor:chitiet.MAMAU,borderWidth:0.5,borderColor:'#B0B0B0'}}/>
              <Text style ={[text]}> {chitiet.MAUSACSP} </Text>
              </View>
            }
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Sao  count={chitiet.SAO}/>
            <TinhThanh MaTinh={MaTinh}/>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between',height:AddFont.fontTieuDe*1.15}}>
                  {chitiet.NGAY_KETTHUC>time_hientai&chitiet.NGAY_KHUYENMAI<time_hientai&chitiet.GIAKHUYENMAI>0?
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FFF',  '#EE82EE']}
                      style={{width:'100%',alignItems:'center',flexDirection:'row',justifyContent:'space-between',borderRadius:3}}>
                          {JSON.parse(chitiet.HINHTHUC_KHUYENMAI).loai_km==1?
                        <View style={{flexDirection:'row',marginVertical:3}}>
                            <View style={{}}>
                              <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={[aotext,{fontSize:20,color:'red',}]}>
                                {(chitiet.GIABANSP-chitiet.GIABANSP*chitiet.GIAKHUYENMAI/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                                </Text>
                                <Text style={{fontSize:13,color:'red',marginLeft:10,backgroundColor:'rgba(80,199,199,0.5)'}}>
                                   -{chitiet.GIAKHUYENMAI}%
                                </Text>
                              </View>
                                <Text style={[aotext,{fontSize:13,marginLeft:5,textDecorationLine:'line-through'}]}>
                                {chitiet.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                                </Text>
                              </View>
                        </View>:
                        <View style={{borderRadius:2,marginVertical:3}}>
                            <Text style={[aotext,{fontSize:20,color:'red',}]}>
                            {chitiet.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                            </Text>
                            <Text style={{color:'#1E90FF',fontSize:12,fontFamily: 'OpenSans-Regular',borderColor:'#FFF',borderWidth:1}}>
                            {' '}mua {JSON.parse(chitiet.HINHTHUC_KHUYENMAI).soluong_mua} tặng {JSON.parse(chitiet.HINHTHUC_KHUYENMAI).soluong_tang}{''}
                            </Text>
                      </View>}
                     
                            <View style={{alignItems:'center',flexDirection:'row',marginHorizontal:5,marginVertical:2,transform: [{ skewX: "160deg"},]}}>
                              <Text style={{fontSize:11}}>{'Kết thúc: ' }</Text>
                              <Text style={{color:'#FFF',backgroundColor:'#FF33CC',fontSize:11}}> {gio+':'+phut} </Text>
                              <Text style={{color:'#FFF',backgroundColor:'#50C7C7',fontSize:11}}> {ngay}/{thang} </Text>
                          </View>
                    </LinearGradient>:
                        <View style={{marginVertical:5}}>
                            <Text style={[aotext,{fontSize:20,color:'red',}]}>
                            {chitiet.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                            </Text>
                           
                           
                            
                        </View>
                        }
        </View> 
        <View style={{flexDirection:'row',justifyContent:'space-between',minHeight:30,alignItems:'center'}}>
        <View>
          <Tang_Pont_CTSP item={chitiet} soluong={1}/>
        </View>
        {chitiet.QUATANG?
          JSON.parse(chitiet.QUATANG)[0].thoigian_batdau<time_hientai&JSON.parse(chitiet.QUATANG)[0].thoigian_ketthuc>time_hientai?
                <TouchableOpacity onPress={()=>setModalVisible(true)}>
                  <Text style={{fontSize:12,color:'red'}}>Mua {JSON.parse(chitiet.QUATANG)[0].soluongmua} tặng quà ➤</Text>
                </TouchableOpacity>:null
                :null
        }
       
        
       </View>
        
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <View>
                
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <LikeSanPham chitiet={chitiet} navigation={navigation}/>
                 
                <TouchableOpacity onPress={() => onCapture()}
                    style={{flexDirection:'row',margin:7,alignItems:'center'}}>
                      <SimpleLineIcons name="share" size={15} color="#900" />
                      <Text style={{fontSize:12,fontStyle: "italic",color:'#606060'}}> chia sẽ</Text>
                </TouchableOpacity>
          </View>
        </View>
        </View>
  )
}

  return (
        <View style={{marginHorizontal:10}}>
           {GiaSanPham()}
           <Modal 
            animationType="fade"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() =>
						setModalXemThem(false)
						}>
            <TouchableOpacity activeOpacity={1} onPress={()=>setModalVisible(false)} style={{backgroundColor:'rgba(0,0,0,0.6)',flex:1,justifyContent:'center',alignItems:'center'}}>
              <QuaTang data={chitiet.QUATANG} setModalVisible={setModalVisible}/>
            </TouchableOpacity>
          </Modal>   
        </View>
      )
};
const {width} = Dimensions.get('window');