import React, {useEffect, useRef, useState} from 'react';
import {Text, View,SafeAreaView,
  TouchableOpacity,StyleSheet,Modal,Alert,ScrollView,ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import HeaderD from '../../header/headerD';
import {TextInputAmin,TextInputAminGia} from './textInputD';
import {Fecht,FechtDM} from './fecht';



import MauSac from '../nhapsanpham/mausac';
import ChonDanhMuc from '../nhapsanpham/danhmuc/chondanhmuc';
import {AnhSanPham,XemAnh} from './anhSanPhamMoi';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';


const {abita_amin}=diachiDaTa;
const dataSP=[{id:'1', value:''}, // tên sản phẩm
              {id:'2', value:''}, // Mô tả sản phẩm
              {id:'3', value:''},// quy cách
              {id:'4', value:''},// xuất xứ
              {id:'5', value:''},// thương hiệu
              
              ];
const dataMau=[
              {TenMau:'black', MaMau:'#000000', setmau:false},
              {TenMau:'silver', MaMau:'#c0c0c0',setmau:false},
              {TenMau:'gray', MaMau:'#808080',setmau:false},
              {TenMau:'white', MaMau:'#ffffff',setmau:false},
              {TenMau:'maroon', MaMau:'#800000',setmau:false},
              {TenMau:'red', MaMau:'#ff0000',setmau:false},
              {TenMau:'purple', MaMau:'#800080',setmau:false},
              {TenMau:'fuchsia', MaMau:'#ff00ff',setmau:false},
              {TenMau:'green', MaMau:'#008000',setmau:false},
              {TenMau:'lime', MaMau:'#00ff00',setmau:false},
              {TenMau:'olive', MaMau:'#808000',setmau:false},
              {TenMau:'yellow', MaMau:'#ffff00',setmau:false},
              {TenMau:'navy', MaMau:'#000080',setmau:false},
              {TenMau:'blue', MaMau:'#0000ff',setmau:false},
              {TenMau:'teal', MaMau:'#008080',setmau:false},
              {TenMau:'aqua', MaMau:'#00ffff',setmau:false},
              {TenMau:'orange', MaMau:'#ffa500',setmau:false},
             ];

export default DuyetSanPham =({navigation,route})=>{ 
      const {idsanpham,MaTinh}=route.params;
      const [idsp,setIdsp]=useState('');
      const [luu,setLuu]=useState('1');
      const [dataSPM, setDataSPM] = React.useState([]);
      const [isLoading, setLoading] = useState(true);
      const [mausac, setMauSac] = useState([]);
      const [quycach, setQuyCach] = useState('');
      const [data, setDaTa] = useState([]);
      

     
              
    
      

      const [modalVisible, setModalVisible] = useState(false);
      const [modalVisibleDM, setModalVisibleDM] = useState(false);
      
     
      const [dataanh,setDaTaAnh]=useState([]);
      const [dataMauSac,setDaTaMau]= useState(dataMau);
      const [load, setLoad] =useState(true);
      const [dataDM, setDataDM] = useState('');

    
      
      useEffect(() => {
        datamausac();
        dataquycach();
        fetch(abita_amin+'SanPhamMoi.php?IdSanPham='+idsanpham+'&MaTinh='+MaTinh)
        .then((response) => response.json())
        .then((json) => {setDataSPM(json),setIdsp(idsanpham)})
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      },[isLoading]);
      
      const datamausac = () => {
        fetch(abita_amin+'MauSacSPM.php?IdSanPham='+idsanpham+'&MaTinh='+MaTinh)
        .then((response) => response.json())
        .then((json) => {setMauSac(json)})
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      };
      const dataquycach = () => {
        fetch(abita_amin+'QuyCachSPM.php?IdSanPham='+idsanpham+'&MaTinh='+MaTinh)
        .then((response) => response.json())
        .then((json) => {setQuyCach(json.join())})
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      };
      // danh mục
     const setload=()=> setLoad(load?false:true);
      const onPressDM= (item)=>{setDataDM(item.IDDANHMUC+','+item.IDDANHMUCCAP2+','+item.IDDANHMUCCAP3+','+item.TENDANHMUCCAP3),
      FechtDM(dieukien={IdSanPham:dataSPM[0].IDSANPHAM,
        IdDanhMuc:item.IDDANHMUC,
        IdDanhMucCap2:item.IDDANHMUCCAP2,
        IdDanhMucCap3:item.IDDANHMUCCAP3,
        DienThoaiNCC:dataSPM[0].DIENTHOAINCC
        },MaTinh),
        setLoading(true)
      };


      const refetchSL_G =()=>{setTenDaTaImage([]),
                              setModalVisible(false),
                              setDaTaVND([])
                              onRefreshTextInput()
                              setDaTaImage([])};
      const wait = (timeout) => {
                  return new Promise(resolve => setTimeout(resolve, timeout));
                  }
      const onRefreshTextInput = React.useCallback(() => {
                  setonRefTextInput('');
                  wait(2000).then(() => setonRefTextInput(null));
                  }, []);

    
    const textinputSL_G =(item)=>{
      const datagia_sl =dataSPM.filter(e=>e.MAUSACSP==item.MAUSACSP);
      return(
        <View>
      {datagia_sl.map((e,index)=>
        <View key={index} >
        <TextInputAminGia 
                          datagia_sl={e}
                          />
        </View>
        )}
        </View>
        )
    };
 
  return(
    <SafeAreaView>
      <HeaderD navigation={navigation}/>
      {idsp!==idsanpham?<ActivityIndicator/>:(
      <ScrollView showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={{alignItems:'center', margin:10,marginLeft:20, flexDirection:'row'}}>
         
          <Text style={{marginLeft:10}}> <Icon5 name="store-alt" size={15} color="#008000" /> {dataSPM[0].TENCUAHANG}</Text>
          <Text style={{marginLeft:10}}><Icon5 name="phone" size={15} color="#008000" /> {dataSPM[0].DIENTHOAINCC}</Text>
         
        </View>
       
        <TextInputAmin
              ten={'Tên sản phâm'}
              tenmuc={dataSPM[0].TENSANPHAM}
              id={luu}
              setluu={setLuu}
             
              dieukien={dataSPM[0].IDSANPHAM}
              dienthoaincc={dataSPM[0].DIENTHOAINCC}
              tengiatri={'TenSanPham'}
        />
         <TextInputAmin
              ten={'Id sản phẩm'}
              tenmuc={dataSPM[0].IDSANPHAM}
              id={luu}
              setluu={setLuu}
             
              dieukien={dataSPM[0].IDSANPHAM}
              dienthoaincc={dataSPM[0].DIENTHOAINCC}
              tengiatri={'IdSanPham'}  
        />
        <TouchableOpacity onPress={()=>{setModalVisibleDM(true)}}
                          style={styles.mucchon}>
          <View style={styles.viewmucchon}>
          <Text style={{color:'blue'}}> {dataSPM[0].TENDANHMUC}<Icon name="arrow-right"  color="red" />{dataSPM[0].TENDANHMUCCAP2}<Icon name="arrow-right"  color="red" />{dataSPM[0].TENDANHMUCCAP3}</Text>
            <Icon name="arrow-right" size={20} color="blue" />
          </View>
        </TouchableOpacity>
        <TextInputAmin
              
              ten={'Chi tiết sản phẩm'}
              tenmuc={dataSPM[0].CHITIETSANPHAM}
              id={luu}
              setluu={setLuu}
             
              dieukien={dataSPM[0].IDSANPHAM}
              dienthoaincc={dataSPM[0].DIENTHOAINCC}
              tengiatri={'ChiTietSanPham'}
              
        />
        <TextInputAmin
              
              ten={'Mô tả sản phẩm'}
              tenmuc={dataSPM[0].MOTASANPHAM}
              id={luu}
              setluu={setLuu}
             
              dieukien={dataSPM[0].IDSANPHAM}
              dienthoaincc={dataSPM[0].DIENTHOAINCC}
              tengiatri={'MoTaSanPham'}
              
        />
        <TextInputAmin
             
              ten={'Xuất xứ'}
              tenmuc={dataSPM[0].XUATXU} 
        />
        <TextInputAmin
              tenmuc={dataSPM[0].THUONGHIEU}
              ten={'Thương hiệu'}
             
        />
        
       
       
       <View style={{height:30, marginHorizontal:10,alignItems:'center',flexDirection:'row'}}>
          <Text style={{fontSize:13, color:'#006400'}}>
            Sản phẩm phải bắc buộc có ảnh 
          </Text>
        </View>
       {mausac.map((item,index)=>
        <View key={index}>
          <View style={{backgroundColor:'#FFFFFF',}}>
            <View style={{flexDirection:'row', justifyContent:'space-between',marginHorizontal:10, alignItems:'center'}}>
              <View style={{flexDirection:'row', height:30,alignItems:'center', }}>
                <Text>Sản phẩm màu:</Text>
                <View style={{width:20,height:20, backgroundColor:item.MAMAU==false?'#FFFFFF':item.MAMAU, marginLeft:10}}/>
                
                <Text> {item.MAUSACSP}</Text>
              </View>
              <AnhSanPham 
                          dataImage={JSON.parse(item.TENHINHANH)}
                          mauSP={item.TenMau}
                          dienthoaincc={dataSPM[0].DIENTHOAINCC}
                          load={setLoading}
                          setDaTaAnh={setDaTaAnh}
                          dataanh={dataanh}
                          
                          />
            </View>
            <XemAnh 
                    load={setLoading}
                    dataImage={JSON.parse(item.TENHINHANH)}
                    mauSP={item.TenMau}
                    dienthoaincc={dataSPM[0].DIENTHOAINCC}
                    setDaTaAnh={setDaTaAnh}
                    dataanh={dataanh}
                    navigation={navigation}
                    
                    />
            <View style={{flexDirection:'row', height:30,alignItems:'center', backgroundColor:'#F0F0F0', marginTop:5}}>
              <Text style={{flex:0.6, textAlign: 'center',}}>Loại</Text>
              <Text style={{flex:0.25, textAlign: 'center',}}>SL tồn</Text>
              <Text style={{flex:0.5, textAlign: 'center',}}>Giá bán</Text>
              <Text style={{flex:0.5, textAlign: 'center',}}>Giá k mãi</Text>
              <Text style={{flex:0.25, textAlign: 'center',}}></Text>
            </View>
        </View>
          {textinputSL_G(item)}
      </View>
      )}
    
     <View >
     <View style={{height:30,flexDirection:'row', justifyContent:'space-between',marginHorizontal:40,marginTop:10}}>
      <TouchableOpacity onPress={()=>Fecht(dieukien={dieukien:dataSPM[0].IDSANPHAM,
                        tendieukien:'IdSanPham',
                        tencsdl:'sanpham',
                        tengiatri:'DuyetSP',
                        giatri:'true',
                        DienThoaiNCC:dataSPM[0].DIENTHOAINCC
                        },MaTinh)}
      style={{backgroundColor:'#50C7C7',width:60, alignItems:'center',justifyContent:'center',borderRadius:5}}>
        <Text style={styles.textsua}>Duyệt</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>Fecht(dieukien={dieukien:dataSPM[0].IDSANPHAM,
                        tendieukien:'IdSanPham',
                        tencsdl:'sanpham',
                        tengiatri:'DuyetSP',
                        giatri:'false',
                        DienThoaiNCC:dataSPM[0].DIENTHOAINCC,
                        },MaTinh)}
      
      style={{backgroundColor:'#50C7C7',width:60, alignItems:'center',justifyContent:'center',borderRadius:5}}>
        <Text style={styles.textsua}>Huỷ</Text>
      </TouchableOpacity>
     </View>
     </View>
      <View style={{marginBottom:50}}/>
      <Text>{JSON.stringify(dataSPM)}</Text>
  </ScrollView>)}
  
     <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style ={{flex:1,justifyContent:'center',backgroundColor: 'rgba(52, 52, 52, 0.8)'}}>
        <MauSac 
          setDaTaMau={setDaTaMau} 
          dataMauSac={dataMauSac}
          setMauSac={setMauSac} 
          mausac={mausac} 
          refetchSL_G={refetchSL_G}
       />
        </View>
    </Modal>
    <Modal
        animationType="none"
        transparent={true}
        visible={modalVisibleDM}
        onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
        }}
      >
      <View style ={{flex:1,backgroundColor: '#E0E0E0'}}>
       <ChonDanhMuc 
         setDanhMuc={onPressDM}
         setModalVisible={setModalVisibleDM}/>
       </View>
    </Modal>
</SafeAreaView>
    );
}
  
const styles= StyleSheet.create({

  scrollView:{
    
  },
  mucchon:{
    backgroundColor:'#D8D8D8',
    marginBottom:5,
    height:40,
    justifyContent:'center'
  },
  viewmucchon:{
    height:30,
    flexDirection:'row',
    justifyContent:'space-between', 
    marginHorizontal:10,
    alignItems:'center',
    backgroundColor:'#E6E6E6',
    borderRadius:15
  },
  danhmuc:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:10,
        height:30,
        alignItems:'center',

  },
  
  textinput:{flex:1,
    maxHeight:200,
    minHeight:40,
    marginHorizontal:7,
    
   },
   viewtextinput:{
    margin:5,
    borderRadius:5,
   },
   textsua:{
     marginHorizontal:5,
     color:'#FFFFFF'
   }
})
  	
   