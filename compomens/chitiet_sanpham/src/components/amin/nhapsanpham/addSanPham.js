import React, {useState,} from 'react';
import {Text, View,SafeAreaView,
  TouchableOpacity,StyleSheet,Modal,Alert,ScrollView,} from 'react-native';
import HeaderD from '../../header/headerD';
import {TextInputAmin,TextInputAminGia} from './textInputAmin';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AddDaTa from './addDaTa';
import MauSac from './mausac';
import ChonDanhMuc from './danhmuc/chondanhmuc';
import {AnhSanPham,XemAnh} from './anhSanPham';

const dataSP=[{id:'1', value:''}, // tên sản phẩm
              {id:'2', value:''}, // Mô tả sản phẩm
              {id:'3', value:''},// quy cách
              {id:'4', value:''},// xuất xứ
              {id:'5', value:''},// thương hiệu
              {id:'6', value:''}, // Thông tin sản phẩm
              
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

export default AddSanPham =({navigation})=>{ 

      const [modalVisible, setModalVisible] = useState(false);
      const [modalVisibleDM, setModalVisibleDM] = useState(false);
      const [data, setDaTa] = React.useState(dataSP);
     
      const [mausac, setMauSac] = useState([{TenMau:'no', MaMau:''}]);
      const [dataMauSac,setDaTaMau]= useState(dataMau);
      const [dataImage, setDaTaImage] =useState([]);
      const [tendataImage, setTenDaTaImage] =useState([]);
      const [dataDM, setDataDM] = useState('');
      const [onRefTextInput, setonRefTextInput] =useState(null);
      const [tendanhmuc, setTenDanhMuc] =useState(null);
      
      const [dataVND, setDaTaVND] = React.useState([]);
      const gia =data[2].value.split(",");
      const danhmuc =dataDM.split(",");
      const setDaTaQC =(text)=>{setDaTa(text),refetchSL_G()}
      const refetchDaTa =()=>{
        setModalVisible(false),
        setDaTaVND([]),
        onRefreshTextInput(),
        setDaTaImage([]),
        setMauSac([{TenMau:'no', MaMau:''}]),
        setDaTa(dataSP),
        setDataDM('')
        };

      const addDanhMuc = (item)=>{setDataDM(item.IDDANHMUC+','+item.IDDANHMUCCAP2+','+item.IDDANHMUCCAP3),setTenDanhMuc(item.TENDANHMUCCAP3)};
      const refetchSL_G =()=>{
                              setModalVisible(false),
                              setDaTaVND([])
                              onRefreshTextInput()
                              };
      const wait = (timeout) => {
                  return new Promise(resolve => setTimeout(resolve, timeout));
                  }
      const onRefreshTextInput = React.useCallback(() => {
                  setonRefTextInput('');
                  wait(2000).then(() => setonRefTextInput(null));
                  }, []);

    
    const textinputSL_G =(item)=>{
      return(
      gia.map((e,index)=>
        <View key={index} >
        <TextInputAminGia setDaTaVND={setDaTaVND}
                          mauSP={item.TenMau}
                          mamau={item.MaMau}
                          ten={e} index={index}
                          dataVND={dataVND}
                          tendataImage={tendataImage}
                          onRefTextInput={onRefTextInput}
                          dataImage={dataImage}
                          />
        </View>
        ))
    };
    const mucsanpham =()=>{
      if(tendanhmuc==null){return( <Text> Chọn mục sản phẩm</Text>)
      }else{return(<Text style={{color:'blue'}}> Danh Mục: {tendanhmuc}</Text>)}
    };
    
  return(
    <SafeAreaView >
      <View style={{backgroundColor:'#00BFFF'}}>
      <HeaderD navigation={navigation}/>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={{alignItems:'center', margin:20, flexDirection:'row', justifyContent:'center'}}>
          <Icon name="plus" size={20} color="blue" />
          <Text style={{marginLeft:10}}>Điền thông tin sản phẩm mới, những mục mang sao đỏ bắt buộc phải có thông tin</Text>
        </View>
        <TextInputAmin
              setDaTa={setDaTa}
              id ={'1'}
              ten={'Tên sản phẩm'}
              data={data}
              multiline={false}
        />
        <TouchableOpacity onPress={()=>{setModalVisibleDM(true)}}
                          style={styles.mucchon}>
          <View style={styles.viewmucchon}>
            {mucsanpham()}
            <Icon name="arrow-right" size={20} color="blue" />
          </View>
        </TouchableOpacity>
        <TextInputAmin
              setDaTa={setDaTa}
              id ={'6'}
              ten={'Thông tin sản phẩm'}
              data={data}
              multiline={true}
        />
        <TextInputAmin
              setDaTa={setDaTa}
              id ={'2'}
              ten={'Mô tả sản phẩm'}
              data={data}
              multiline={true}
        />
        <TextInputAmin
              setDaTa={setDaTa}
              id ={'4'}
              ten={'Xuất xứ'}
              data={data}
              multiline={false}
        />
        <TextInputAmin
              setDaTa={setDaTa}
              id ={'5'}
              ten={'Thương hiệu'}
              data={data}
              multiline={false}
        />
        <TextInputAmin
              setDaTa={setDaTaQC}
              id ={'3'}
              ten={'Loại sản phẩm (các loại cách nhau dấu (,))'}
              data={data}
              multiline={false}
              refetchSL_G={refetchSL_G}
        />
         <TouchableOpacity onPress={()=>setModalVisible(true)}
                            style={styles.mucchon}>
              <View style={styles.viewmucchon}>
                <View style={{flexDirection:'row'}}>
                <Text style={{color:'blue'}}> Màu:</Text>
                {mausac.map((e, index)=> <Text key={index}> {e.TenMau=='no'?'Chọn màu sắc':e.TenMau}; </Text>)}
                </View>
                <Icon name="arrow-right" size={20} color="blue" />
              </View>
       </TouchableOpacity>
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
                <View style={{width:20,height:20, backgroundColor:item.MaMau=='no'?'#FFFFFF':item.MaMau, marginLeft:10}}/>
                <Text> {item.TenMau=='no'?null:item.TenMau}</Text>
              </View>
              <AnhSanPham navigation={navigation}
                          tendataImage={tendataImage}
                          setTenDaTaImage={setTenDaTaImage}
                          index={index}
                          setDaTaImage={setDaTaImage}
                          dataImage={dataImage}
                          mauSP={item.TenMau}
                          dataVND={dataVND}
                          setDaTaVND={setDaTaVND}
                          />
            </View>
            <XemAnh index={index}
                    setDaTaImage={setDaTaImage}
                    dataImage={dataImage}
                    mauSP={item.TenMau}
                    dataVND={dataVND}
                    setDaTaVND={setDaTaVND}
                    tendataImage={tendataImage}
                    setTenDaTaImage={setTenDaTaImage}
                    />
            <View style={{flexDirection:'row', height:30,alignItems:'center', backgroundColor:'#F0F0F0', marginTop:5}}>
              <Text style={{flex:0.5, textAlign: 'center',}}>Loại</Text>
              <Text style={{flex:0.4, textAlign: 'center',}}>Số lượng có</Text>
              <Text style={{flex:0.5, textAlign: 'center',}}>Giá bán</Text>
              <Text style={{flex:0.5, textAlign: 'center',}}>Ảnh đại diện</Text>
            </View>
        </View>
          {textinputSL_G(item)}
      </View>
      )}
    
      <AddDaTa data={data}
              danhmuc={danhmuc}
              dataVND={dataVND}
              dataDM={dataDM}
              dataImage={dataImage}
              tendataImage={tendataImage}
              refetchDaTa={refetchDaTa}
              />
      <View style={{marginBottom:50}}/>
  </ScrollView>
  
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
         setDanhMuc={addDanhMuc}
         datadanhmuc={dataDM}
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
   }
})
  	
   