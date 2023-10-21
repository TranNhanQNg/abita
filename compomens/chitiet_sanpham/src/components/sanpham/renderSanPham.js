import React,{useState,useMemo} from 'react';
import { Text, View,TouchableOpacity,Pressable, Image,Dimensions,StyleSheet} from 'react-native';
import axios from 'axios';
import FastImage from 'react-native-fast-image'
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
// import styles from './stylesSanPham';
import Sao from './chitietsanpham/sao';
import SaoTinh from './saotinh';
import {naviga,navigaPush,navigaCuaHang} from '../dungchung/naviga';
import {giamgia,giamgia_tang }from '../dungchung/giamgia';
import { useDispatch,useSelector } from 'react-redux';
import {ADD_TO_HISTORY} from '../../redux/cartAction';
import Tang_Pont from './chitietsanpham/component/tang_pont'



const width = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const colorNen ='#E8E8E8'
   const {hinhanhsanpham,hinhanh,abita_dungchung,hinhanhdanhmuc} = diachiDaTa; 


const RenderSanPham =({navigation,item,index,component}) =>{ 
  const {viewTong,aoflatlist,aoimage,viewImage,aotext,imagelistHeader,textlistHeader,viewlistHeader,viewlistHeader1,
    viewText,giatext} = styles;
    const MaTinh = useSelector(state => state.cart.MaTinh);
    const AddFont = useSelector(state => state.cart.AddFont);
    const Wifi = useSelector(state => state.cart.Wifi);
    const dispatch = useDispatch()
    const addItemToHistory = (item) =>{
      const action = ADD_TO_HISTORY(item);
      dispatch(action);
    };
   
  const layou =index%2;
  const time_hientai = Math.round(new Date().getTime()/1000)
    return(   
          <Pressable onPress={() => {component===1?navigaPush(item,navigation,MaTinh):naviga(item,navigation,MaTinh),addItemToHistory(item)}}
          activeOpacity={1}
          style={[viewTong,{ alignItems:layou===1?'flex-end':'flex-start'}]}>
          <View style={{backgroundColor:'#FFF',margin:1,flex:1,borderRadius:3,margin:width*0.008,alignItems:'center'}}>
            <View style ={viewImage}>
            <View style={{position:'absolute',left:0,right:0,width:width*0.45}}>
            <Text style={{textAlign:'center',fontSize:30,fontWeight:'bold',color:'#C8C8C8'}}>Abita</Text>
             </View>
             
              <FastImage
                          style={{flex:1,margin:2}}
                          source={{
                              uri: hinhanhsanpham+item.ANHDAIDIEN,
                              priority: FastImage.priority.normal,
                            
                          }}
                          resizeMode={FastImage.resizeMode.contain}
                      />
               
            </View>
                  <View style={viewText}>
                  <View style={{height:AddFont.fontTieuDe}}>
                    <Text numberOfLines ={2} style={aotext}>{item.TENSANPHAM} {item.QUYCACHSP}{!item.MAUSACSP||item.MAUSACSP==''||item.MAUSACSP==null?null:', màu: '+item.MAUSACSP}</Text>
                   
                    </View>
                    <View>
                    {item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0?
                          JSON.parse(item.HINHTHUC_KHUYENMAI).loai_km==1?
                        <View style={{flexDirection:'row'}}>
                            <Text style={[giatext]}>
                            {(item.GIABANSP-item.GIABANSP*item.GIAKHUYENMAI/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <Text style={{fontSize:11}}>đ</Text>
                            </Text>
                            <Text style={[aotext,{fontSize:13,marginLeft:5,textDecorationLine:'line-through',fontSize:10}]}>
                            {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                            </Text>
                        </View>:
                        <View style={{}}>
                            <Text style={[giatext]}>
                            {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <Text style={{fontSize:11}}>đ</Text>
                            </Text>
                           
                        </View>:
                        <View style={{flexDirection:'row'}}>
                        <Text style={[giatext,{color:'#191970'}]}>
                            {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <Text style={{fontSize:11}}>đ</Text>
                            </Text>
                        
                        </View>
                        }
                      </View>
                      <View style={{minHeight:18,flexDirection:'row',alignItems:'center'}}>
                          <Sao count={item.SAO}
                          />
                          {item.TONGBAN>0?
                          <Text style={{fontSize:11,}}> » Đã bán: {item.TONGBAN}</Text> 
                          :null}
                      </View>
                    <View style={{minHeight:18}}>      
                      <Tang_Pont item={item}/> 
                    </View>
                  <View style={{flexDirection:'row'}}>
                  {item.QUATANG?
                    JSON.parse(item.QUATANG)[0].thoigian_batdau<time_hientai&JSON.parse(item.QUATANG)[0].thoigian_ketthuc>time_hientai?
                    <View style={{alignItems:'center',borderWidth:0.5,borderRadius:2,borderColor:'red',marginRight:5,flex:0.5,justifyContent:'center'}}>
                    <Text style={{fontSize:10,fontFamily:'OpenSans-Light',margin:1}}>qua tặng</Text>
                    </View>:null
                    :null
                  }
                 {item.LOAISANPHAM>1?
                    <View style={{alignItems:'center',borderWidth:0.5,borderRadius:2,borderColor:'#50C7C7',flex:0.5,justifyContent:'center'}}>
                      <Text style={{fontSize:10,fontFamily:'OpenSans-Light',margin:1}}>{item.LOAISANPHAM} loại</Text>
                    </View>
                 :null
                 }
                 
                 </View>
                  </View>
                  { giamgia(item,time_hientai)}   
            </View>
           
          </Pressable>
                  
    )
             
};
const RenderSanPhamCuaHang =({navigation, item,MaTinh}) =>{ 
  const {viewTong,aoflatlist,aoimage,viewImage,aotext,imagelistHeader,textlistHeader,viewlistHeader,viewlistHeader1,
    viewText,giatext} = styles;
    const [sao,setSao]=useState(0)
  const dispatch = useDispatch()
  const addItemToHistory = (item) =>{
    const action = ADD_TO_HISTORY(item);
    dispatch(action);
  };
    const time_hientai = new Date().getTime()/1000
    const fechluotxem =(item)=>{
     
          axios.post(abita_dungchung+'luotxem.php?MaTinh='+MaTinh, 
                  JSON.stringify({
                      tendieukien:'IdChiTietSp',
                      dieukien:item.IDCHITIETSP,
                      tencsdl:'sanpham',
                      tengiatri:'LuotXem',
                      giatri:item.LUOTXEM+1
                  })
              )
              .catch(function (error) {
                console.error(error);
              });   
  }
  return(
 
    <Pressable onPress={() => {navigaPush(item,navigation,MaTinh),addItemToHistory(item)}}
    activeOpacity={1}
    style={[viewTong]}>
    <View style={{backgroundColor:'#FFF',margin:1,flex:1,borderRadius:3}}>
      <View style ={viewImage}>
      <Text style={{position:'absolute',left:0,right:0,textAlign:'center',fontSize:30,fontWeight:'bold',color:'#C8C8C8'}}>Abita</Text>
        {/* <Image source={{uri:hinhanhsanpham+item.ANHDAIDIEN}} style={aoimage} /> */}
        <FastImage
                          style={{flex:1,margin:2}}
                          source={{
                              uri: hinhanhsanpham+item.ANHDAIDIEN,
                              priority: FastImage.priority.normal,
                            
                          }}
                          resizeMode={FastImage.resizeMode.contain}
                      />
      </View>
            <View style={[viewText]}>
              <Text numberOfLines ={2} style={aotext}>{item.TENSANPHAM} {item.QUYCACHSP}{!item.MAUSACSP||item.MAUSACSP==''||item.MAUSACSP==null?null:', màu: '+item.MAUSACSP}</Text>
             
              <Sao idsanpham={item.IDSANPHAM}
                    MaTinh={MaTinh}
                    dienthoaincc={item.DIENTHOAINCC}
                    />

              {item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0?
                    JSON.parse(item.HINHTHUC_KHUYENMAI).loai_km==1?
                  <View style={{}}>
                      <Text style={[giatext]}>
                      {(item.GIABANSP-item.GIABANSP*item.GIAKHUYENMAI/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<Text style={{fontSize:11}}>đ</Text>
                      </Text>
                      {/* <Text style={[aotext,{fontSize:13,marginLeft:5,textDecorationLine:'line-through'}]}>
                      {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                      </Text> */}
                  </View>:
                  <View style={{}}>
                      <Text style={[giatext]}>
                      {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<Text style={{fontSize:11}}>đ</Text>
                    </Text>
                  </View>:
                  <View style={{flexDirection:'row'}}>
                      <Text style={[giatext,{color:'#191970'}]}>
                      {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<Text style={{fontSize:11}}>đ</Text>
                      </Text>
                  
                  </View>
                  }
            </View>
            { giamgia(item,time_hientai)
           }
           </View>
    </Pressable>
       
                
  )
           
};
const RenderDanhMuc =({ item,dieuhuong,tenhinhanh,tendanhmuc,soluong}) =>{ 
    const MaTinh = useSelector(state => state.cart.MaTinh); 
    const {imagelistHeader,textlistHeader,viewlistHeader,viewlistHeader1,
      viewText,giatext} = styles;
    return(
   
                <TouchableOpacity onPress={() => dieuhuong(item)}
                style={ viewlistHeader}>
                            <View style={viewlistHeader1}>
                            {/* <Image 
                              source={{uri:hinhanhdanhmuc+tenhinhanh}} 
                              style={imagelistHeader}
                                />    */}
                            <FastImage 
                              source={{uri:hinhanhdanhmuc+tenhinhanh,
                              headers: { Authorization: 'someAuthToken' },
                              priority: FastImage.priority.high,}} 
                              style={imagelistHeader}
                              resizeMode={FastImage.resizeMode.contain}
                                />   
                            </View>
                            <Text numberOfLines ={2} style={textlistHeader}>{tendanhmuc}</Text>
                </TouchableOpacity>
    )
             
}

  const RenderSanPhamKhac =({navigation,item,soluong}) =>{ 
    const {viewTong,aoflatlist,aoimage,viewImage,aotext,imagelistHeader,textlistHeader,viewlistHeader,viewlistHeader1,
      viewText,giatext} = styles;
      const AddFont = useSelector(state => state.cart.AddFont);
    const dispatch = useDispatch()
    const addItemToHistory = (item) =>{
      const action = ADD_TO_HISTORY(item);
      dispatch(action);
    };
    const fechluotxem =(item)=>{
      axios.post(abita_dungchung+'luotxem.php', 
              JSON.stringify({
                  tendieukien:'IdSanPham',
                  dieukien:item.IDCHITIETSP,
                  tencsdl:'sanpham',
                  tengiatri:'LuotXem',
                  giatri:item.LUOTXEM+1
              })
          )
          .catch(function (error) {
            console.error(error);
          });   
}
    const time_hientai = new Date().getTime()/1000
    return(
      <TouchableOpacity onPress={() => {naviga(item,navigation,MaTinh=item.MATINH),addItemToHistory(item)}}
      style={{flexDirection:'row',backgroundColor:'#FFF',borderRadius:5,flex:1}}>
        <View style ={{width:width/4,height:width/4,justifyContent:'center'}}>
      <Text style={{position:'absolute',left:0,right:0,textAlign:'center',fontSize:20,fontWeight:'bold',color:'#C8C8C8'}}>Abita</Text>
        {/* <Image source={{uri:hinhanhsanpham+item.ANHDAIDIEN}} style={aoimage} /> */}
        <FastImage
                          style={{flex:1,margin:2}}
                          source={{
                              uri: hinhanhsanpham+item.ANHDAIDIEN,
                              priority: FastImage.priority.normal,
                            
                          }}
                          resizeMode={FastImage.resizeMode.contain}
                      />
      </View>
              <View style={{ flex:1,
                              width:width/2-10,
                              marginLeft:5,
                              marginVertical:5
                              }}>
                <View style={{height:AddFont.fontTieuDe}}>
                <Text numberOfLines ={2} style={aotext}>{item.TENSANPHAM} {item.QUYCACHSP} {!item.MAUSACSP||item.MAUSACSP==''||item.MAUSACSP==null?null:', màu: '+item.MAUSACSP}</Text>
                </View>
                <Sao idsanpham={item.IDSANPHAM}
                      MaTinh={item.MATINH}
                      dienthoaincc={item.DIENTHOAINCC}
                      />

                  {item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0?
                      <View>
                      {JSON.parse(item.HINHTHUC_KHUYENMAI).loai_km==1?
                    <View style={{flexDirection:'row',alignItems:'flex-start'}}>
                        <Text style={[giatext]}>
                        {(item.GIABANSP-item.GIABANSP*item.GIAKHUYENMAI/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                        </Text>
                        <View style={{backgroundColor:'red', marginLeft:5,borderRadius:3}}>
                          <Text style={{color:'#FFF', marginHorizontal:3,fontWeight:'bold',fontSize:13}}>-{item.GIAKHUYENMAI}</Text>
                        </View>
                    </View>:
                    <View style={{flexDirection:'row',alignItems:'flex-start'}}>
                        <Text style={[giatext]}>
                        {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                        </Text>
                       
                        <View style={{flexDirection:'row', marginLeft:5,transform: [{skewX: "160deg"}]}}>
                          <Text style={{color:'#FFF',fontSize:13,textAlign:'center',fontWeight:'bold',backgroundColor:'rgba(0, 83, 171,0.7)'}}> mua {JSON.parse(item.HINHTHUC_KHUYENMAI).soluong_mua} tặng {JSON.parse(item.HINHTHUC_KHUYENMAI).soluong_tang+'  '} </Text>
                        </View>
                    </View>}
                   
                    </View>
                    :
                    <View style={{flexDirection:'row'}}>
                        <Text style={[giatext]}>
                        {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                    </Text>
                    </View>}
              </View>
      </TouchableOpacity>          
    )}

    const RenderSanPhamDanhMuc =({item,navigation}) =>{ 
      const {viewTong,aoflatlist,aoimage,viewImage,aotext,imagelistHeader,textlistHeader,viewlistHeader,viewlistHeader1,
        viewText,giatext} = styles;
    
        const MaTinh = useSelector(state => state.cart.MaTinh);
        const Wifi = useSelector(state => state.cart.Wifi);
        const [sao,setSao]=useState(0)
        const dispatch = useDispatch()
        const addItemToHistory = (item) =>{
          const action = ADD_TO_HISTORY(item);
          dispatch(action);
        };
        const fechluotxem =(item)=>{
              axios.post(abita_dungchung+'luotxem.php?MaTinh='+MaTinh, 
                      JSON.stringify({
                          tendieukien:'IdSanPham',
                          dieukien:item.IDCHITIETSP,
                          tencsdl:'sanpham',
                          tengiatri:'LuotXem',
                          giatri:item.LUOTXEM+1
                      })
                  )
                  .catch(function (error) {
                    console.error(error);
                  });
              }    
      const time_hientai = new Date().getTime()/1000
        return(   
              <TouchableOpacity onPress={() => {naviga(item,navigation,MaTinh),addItemToHistory(item)}}
              activeOpacity={1}
              style={viewTong}>
                <View style ={viewImage}>
                <Text style={{position:'absolute',left:0,right:0,textAlign:'center',fontSize:30,fontWeight:'bold',color:'#C8C8C8'}}>Abita</Text>
                  <Image source={{uri:hinhanhsanpham+item.ANHDAIDIEN}} style={aoimage} />
                </View>
                <View style={viewText}>
                  <Text numberOfLines ={2} style={aotext}>{item.TENSANPHAM} {item.QUYCACHSP}</Text>
                  <Sao idsanpham={item.IDSANPHAM}
                          MaTinh={MaTinh}
                          dienthoaincc={item.DIENTHOAINCC}
                          setSao={setSao}
                          />
                  {item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0?
                          JSON.parse(item.HINHTHUC_KHUYENMAI).loai_km==1?
                        <View style={{}}>
                            <Text style={[giatext]}>
                            {(item.GIABANSP-item.GIABANSP*item.GIAKHUYENMAI/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                            </Text>
                            <Text style={[aotext,{fontSize:13,marginLeft:5,textDecorationLine:'line-through'}]}>
                            {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                            </Text>
                        </View>:
                        <View style={{}}>
                            <Text style={[giatext]}>
                            {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                            </Text>
                            
                        </View>:
                        <View style={{flexDirection:'row'}}>
                            <Text style={[giatext]}>
                            {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                            </Text>
                        
                        </View>
                        }
                  </View>
                  {
                   
                   giamgia(item,time_hientai)
        
                 }
                
              </TouchableOpacity>
                      
        )
                 
    };
    const Render_DonHang =({navigation,item}) =>{ 
      const {viewTong,aoflatlist,aoimage,viewImage,aotext,imagelistHeader,textlistHeader,viewlistHeader,viewlistHeader1,
        viewText,giatext} = styles;
    
        const MaTinh = useSelector(state => state.cart.MaTinh);
        const Wifi = useSelector(state => state.cart.Wifi);
        const dispatch = useDispatch()
        const addItemToHistory = (item) =>{
          const action = ADD_TO_HISTORY(item);
          dispatch(action);
        };
        const fechluotxem =(item)=>{
          if(Wifi){
              axios.post(abita_dungchung+'luotxem.php?MaTinh='+MaTinh, 
                      JSON.stringify({
                          tendieukien:'IdSanPham',
                          dieukien:item.IDCHITIETSP,
                          tencsdl:'sanpham',
                          tengiatri:'LuotXem',
                          giatri:item.LUOTXEM+1
                      })
                  )
                  .catch(function (error) {
                    console.error(error);
                  });
              }    
      }
      const time_hientai = new Date().getTime()/1000
      const time = new Date(item.NGAY_KETTHUC*1000)
      var phut = time.getMinutes().toString();
      var gio = time.getHours().toString();
      var ngay = (time.getDate() + 100).toString().substring(1);
      var thang = (time.getMonth() + 101).toString().substring(1);
      var nam = time.getFullYear().toString();
        return(
          
              <TouchableOpacity onPress={() => {naviga(item,navigation,MaTinh),addItemToHistory(item)}}
              style={{flexDirection:'row',backgroundColor:'#FFF',borderRadius:5}}>
                <View style ={{alignItems:'center',justifyContent:'center'}}>
                <Text style={{position:'absolute',textAlign:'center',fontSize:30,fontWeight:'bold',color:'#C8C8C8'}}>Abita</Text>
                
                  <FastImage
                          style={{height:width/3,width:width/3,margin:2,resizeMode:'contain'}}
                          source={{
                              uri: hinhanhsanpham+item.ANHDAIDIEN,
                              priority: FastImage.priority.normal,
                            
                          }}
                          resizeMode={FastImage.resizeMode.contain}
                      />
                </View>
                      <View style={{ flex:1,
                                      width:width/2-10,
                                      marginLeft:5,
                                      marginVertical:5
                                      }}>
                        <Text numberOfLines ={2} style={aotext}>{item.TENSANPHAM}</Text>
                        <Text style={aotext}>{item.QUYCACHSP} {!item.MAUSACSP||item.MAUSACSP==''||item.MAUSACSP==null?null:', màu: '+item.MAUSACSP}</Text>
                        <Sao idsanpham={item.IDSANPHAM}
                              MaTinh={MaTinh}
                              dienthoaincc={item.DIENTHOAINCC}
                              />
    
                          {item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0?
                              <View>
                              {JSON.parse(item.HINHTHUC_KHUYENMAI).loai_km==1?
                            <View style={{flexDirection:'row',alignItems:'flex-start'}}>
                                <Text style={[giatext]}>
                                {(item.GIABANSP-item.GIABANSP*item.GIAKHUYENMAI/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                                </Text>
                                <View style={{backgroundColor:'red', marginLeft:5,borderRadius:3}}>
                                  <Text style={{color:'#FFF', marginHorizontal:3,fontWeight:'bold',fontSize:13}}>-{item.GIAKHUYENMAI}</Text>
                                </View>
                            </View>:
                            <View style={{flexDirection:'row',alignItems:'flex-start'}}>
                                <Text style={[giatext]}>
                                {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                                </Text>
                               
                                <View style={{flexDirection:'row', marginLeft:5,transform: [{skewX: "160deg"}]}}>
                                  <Text style={{color:'#FFF',fontSize:13,textAlign:'center',fontWeight:'bold',backgroundColor:'rgba(0, 83, 171,0.7)'}}> mua {JSON.parse(item.HINHTHUC_KHUYENMAI).soluong_mua} tặng {JSON.parse(item.HINHTHUC_KHUYENMAI).soluong_tang+'  '} </Text>
                                </View>
                            </View>}
                            <View style={{alignItems:'center',flexDirection:'row',marginHorizontal:5,marginVertical:2,transform: [{ skewX: "160deg"},]}}>
                                  <Text>{'Kết thúc: ' }</Text>
                                  <Text style={{color:'#FFF',backgroundColor:'#FF33CC',fontSize:11}}> {gio+':'+phut} </Text>
                                  <Text style={{color:'#FFF',backgroundColor:'#50C7C7',fontSize:11}}> {ngay}/{thang} </Text>
                              </View>
                            </View>
                            :
                            <View style={{flexDirection:'row'}}>
                                <Text style={[giatext]}>
                                {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                            </Text>
                            
                            </View>}
                   <Text style={{marginTop:3,color:'#1E90FF'}}>Số lượng: {item.SOLUONGDH}</Text>
                   {item.KHUYENMAI?
                        JSON.parse(item.KHUYENMAI).loai_km==2?
                    <View style={{height:30,backgroundColor:'#87CEFA',justifyContent:'center',flex:1,borderRadius:3,margin:3}}>
                          <Text style={{color:'#00008B',marginHorizontal:10}}>
                              Số lượng sản phẩm tặng: {JSON.parse(item.KHUYENMAI).soluong_tang}
                          </Text>
                      </View>:null
                      :null
                    }
                    {item.QUATANGDH?
                JSON.parse(item.QUATANGDH)[0].thoigian_batdau<time_hientai&JSON.parse(item.QUATANGDH)[0].thoigian_ketthuc>time_hientai&JSON.parse(item.QUATANGDH)[0].soluongmua<item.SOLUONGDH+1?
                    <TouchableOpacity onPress={()=>{null}}
                    style={{height:30,backgroundColor:'#87CEFA',justifyContent:'center',flex:1,borderRadius:3,margin:3}}
                    >
                      <Text style={{fontSize:11,color:'red',marginLeft:5}}>Tặng {Math.floor(item.SOLUONGDH/JSON.parse(item.QUATANGDH)[0].soluongmua)} phần gồm ➤</Text>
                    </TouchableOpacity>:null
                  :null
                }
                      </View>
              </TouchableOpacity>          
        )
      }

  
const RenderItemTimKiem =({navigation,item,id}) =>{ 
  const {viewTong,aoflatlist,aoimage,viewImage,aotext,imagelistHeader,textlistHeader,viewlistHeader,viewlistHeader1,
    viewText,giatext} = styles;
    const AddFont = useSelector(state => state.cart.AddFont);
    const MaTinh = useSelector(state => state.cart.MaTinh);
    const Wifi = useSelector(state => state.cart.Wifi);
    const dispatch = useDispatch()
    const addItemToHistory = (item) =>{
      const action = ADD_TO_HISTORY(item);
      dispatch(action);
    };
    const fechluotxem =(item)=>{
      if(Wifi){
          axios.post(abita_dungchung+'luotxem.php?MaTinh='+MaTinh, 
                  JSON.stringify({
                      tendieukien:'IdSanPham',
                      dieukien:item.IDCHITIETSP,
                      tencsdl:'sanpham',
                      tengiatri:'LuotXem',
                      giatri:item.LUOTXEM+1
                  })
              )
              .catch(function (error) {
                console.error(error);
              });
          }    
  }
  const time_hientai = new Date().getTime()/1000
  const time = new Date(item.NGAY_KETTHUC*1000)
  var phut = time.getMinutes().toString();
  var gio = time.getHours().toString();
  var ngay = (time.getDate() + 100).toString().substring(1);
  var thang = (time.getMonth() + 101).toString().substring(1);
    return(
      
          <TouchableOpacity activeOpacity={0.8} onPress={() => {naviga(item,navigation,MaTinh),addItemToHistory(item)}}
          style={{flex:1,backgroundColor:'#E8E8E8'}}>
          <View style={{marginHorizontal:5,flex:1,marginVertical:2.5,flexDirection:'row',backgroundColor:'#FFF',borderRadius:5,}}>
             <View style ={{width:width/3,height:width/3.2,justifyContent:'center'}}>
      <Text style={{position:'absolute',left:0,right:0,textAlign:'center',fontSize:20,fontWeight:'bold',color:'#C8C8C8'}}>Abita</Text>
        <FastImage
                          style={{flex:1,margin:2}}
                          source={{
                              uri: hinhanhsanpham+item.ANHDAIDIEN,
                              priority: FastImage.priority.normal,
                            
                          }}
                          resizeMode={FastImage.resizeMode.contain}
                      />
      </View>
                  <View style={{ flex:1,
                                  width:width/2-10,
                                  marginLeft:5,
                                  marginVertical:2
                                  }}>
                     <View style={{height:AddFont.fontTieuDe,marginHorizontal:5}}>
                      <Text numberOfLines ={2} style={[aotext,{marginTop:2}]}>{item.TENSANPHAM} {item.QUYCACHSP} {!item.MAUSACSP||item.MAUSACSP==''||item.MAUSACSP==null?null:', màu: '+item.MAUSACSP}</Text>
                    </View>
                   
                   

                      {item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0?
                          <View>
                          {JSON.parse(item.HINHTHUC_KHUYENMAI).loai_km==1?
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={[giatext]}>
                            {(item.GIABANSP-item.GIABANSP*item.GIAKHUYENMAI/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                            </Text>
                            <View style={{backgroundColor:'rgb(191, 0, 67)', marginLeft:5,borderRadius:3}}>
                              <Text style={{color:'#FFF', marginHorizontal:3,fontWeight:'bold',fontSize:12}}> -{item.GIAKHUYENMAI} %</Text>
                            </View>
                        </View>:
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={[giatext]}>
                            {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                            </Text>
                           
                            <View style={{flexDirection:'row', marginLeft:5,transform: [{skewX: "160deg"}]}}>
                              <Text style={{color:'#FFF',fontSize:11,textAlign:'center',fontWeight:'bold',backgroundColor:'rgba(0, 83, 171,0.7)'}}> mua {JSON.parse(item.HINHTHUC_KHUYENMAI).soluong_mua} tặng {JSON.parse(item.HINHTHUC_KHUYENMAI).soluong_tang+'  '} </Text>
                            </View>
                        </View>}
                        
                        </View>
                        :
                        <View style={{flexDirection:'row'}}>
                        <Text style={[giatext,{color:'#191970'}]}>
                            {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                        </Text>
                        
                        </View>}
                        <View style={{minHeight:15,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            <Sao count={item.SAO}/>
                            {item.TONGBAN>0?
                            <Text style={{fontSize:11,}}> » Đã bán: {item.TONGBAN}</Text> 
                            :null}
                          </View>
                          {item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0?
                            <View style={{alignItems:'center',flexDirection:'row',marginHorizontal:5,marginVertical:2,transform: [{ skewX: "160deg"},]}}>
                              <Text style={{fontSize:11}}>{'Kết thúc: ' }</Text>
                              <Text style={{color:'#FFF',backgroundColor:'#FF33CC',fontSize:11}}> {gio+':'+phut} </Text>
                              <Text style={{color:'#FFF',backgroundColor:'#50C7C7',fontSize:11}}> {ngay}/{thang} </Text>
                          </View>:null}
                        </View>
                      <View style={{minHeight:18}}>      
                        <Tang_Pont item={item}/> 
                      </View>
                  <View style={{flexDirection:'row'}}>
                  {item.QUATANG?
                    JSON.parse(item.QUATANG)[0].thoigian_batdau<time_hientai&JSON.parse(item.QUATANG)[0].thoigian_ketthuc>time_hientai?
                    <View style={{alignItems:'center',borderWidth:0.5,borderRadius:2,borderColor:'red',marginRight:5}}>
                    <Text style={{fontSize:10,fontFamily:'OpenSans-Light',margin:1,marginHorizontal:3}}>qua tặng</Text>
                    </View>:null
                    :null
                  }
                      {item.LOAISANPHAM>1?
                      <View style={{alignItems:'center',borderWidth:0.5,borderRadius:2,borderColor:'#50C7C7'}}>
                      <Text style={{fontSize:10,fontFamily:'OpenSans-Light',margin:1,marginHorizontal:3}}>nhiều loại</Text>
                      </View>
                      :null
                      }
                      </View>      
                  </View>
                  
              </View>  
              
          </TouchableOpacity>          
    )
             
};
    
module.exports = {RenderSanPham,RenderDanhMuc,RenderSanPhamCuaHang,RenderSanPhamKhac,RenderSanPhamDanhMuc,Render_DonHang,RenderItemTimKiem};







const styles = StyleSheet.create({
  //  sản phẩm 
  viewTong:{
    flex:1,
     backgroundColor:'#F8F8F8',
  
      },
 
  aoimage:{
   resizeMode:"contain",
   flex: 1,
   margin:2,
   borderRadius:2,
  
 },
 viewText:{
        width: width*0.43
        },
   aotext:{
    fontFamily: 'OpenSans-Regular',
   fontSize:13,
   color:'#000',
   marginTop:5
   },
   giatext:{
    fontSize:17,
    color:'red',
    fontFamily: 'OpenSans-SemiBold',
    marginVertical:3
    },
    viewImage:{
   width: width*0.476, 
   height:width*0.476,
  margin:width*0.0001,
  justifyContent:'center'
   
   
 },
// style listHeader danh mục
viewNen:{
  marginLeft:5,
  marginTop:5
   },
  
     
   viewlistHeader:{
 
     alignItems: 'center',
     width:width*0.21,
     marginHorizontal:5 
      
  }, 
  viewlistHeader1:{
     width:width*0.19,
     height:width*0.18,
   
  }, 
  imagelistHeader:{
   flex:1, 
     resizeMode:"contain",
     borderRadius:6
  },
  textlistHeader:{
     textAlign: 'center',
     marginVertical:10,
     color:'#000',
     fontSize:12,
     fontFamily: 'OpenSans-Medium'
     
 
   },
   linearGradientSanPham:{
     height:h*0.06,
     width:width,
     alignItems: 'center',
     justifyContent: 'space-between',
     flexDirection: 'row',
 },
  lendautrang:{
    backgroundColor:'rgba(200,200,200,0.5)',
    width:30,
    height:30,
    top:h*0.85,
    right:5,
    borderRadius:8,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center'
 }, 
  
  
   

 
   
  
})
export default styles;