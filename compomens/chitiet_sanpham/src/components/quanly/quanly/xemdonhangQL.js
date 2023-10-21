import React, {Component,useEffect,useState} from 'react';
import { Text, View,Image, StyleSheet,FlatList,TouchableOpacity} from 'react-native';
import { useSelector,useDispatch} from 'react-redux';
import HeaderB from '../../header/headerB';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import styles from '../../cart/stylesCart';
import TieudeHome from '../../home/tieudeHome';

const {dataApp, hinhanhsanpham}=diachiDaTa;
const{aoimage,aotext,viewImage} = styles;

export default XemDonHangQL =({navigation, route})=>{
  const infoAdd = useSelector(state => state.cart.SoDienThoai);
  const{tenLoaiHang,sodonhang,ngaydathang,xacnhan}=route.params;
	const [data, setData] = useState([]);
  	const [isLoading, setLoading] = useState(true);
  	useEffect(() => {
    fetch(dataApp+'quanly/dondathangQL.php?SoDonHang='+sodonhang)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  },[]);

    const listHeader = ()=>{
    return(
    <View style={{height:30}}/>
    )};

  	const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
         
        }}
      />
    );
  };
return (
<View style = {{flex:1, backgroundColor:'#FFFFFF'}}>
         
          <HeaderB navigation ={navigation}/>
          <TieudeHome props ={tenLoaiHang}/>
        <View style = {{flex:1}}>
          <FlatList 
          data={data}
          
          renderItem={({ item }) => (
            
            <View style = {{flex:1, flexDirection: 'row', marginLeft:10}}>

           <TouchableOpacity style = {{flex:1, flexDirection: 'row'}} onPress={() => navigation.navigate("ChitietSanpham",{
                      idchitietsp:(item.IDCHITIETSP),
                      MaTinh:MaTinh,
                      })}>
            <View style={viewImage}>
              <Image source={{uri:hinhanhsanpham + item.TENHINHANH +'1.png'}} style={aoimage} />
            </View>
            <View>
              <Text style={aotext}>{item.TENSANPHAM}</Text>
              <Text style={[aotext]}>{item.GIABANSP} đồng</Text>
              <Text style={[aotext]}>Tên: {item.TENNCC}</Text>
              <Text style={[aotext]}>Điện thoại: {item.IDNHACUNGCAP}</Text>
            </View>
              </TouchableOpacity>
                     
             </View>
            
          )}
          keyExtractor={( item ) => item.IDDONHANG}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={listHeader}
        />
     
    
        
          </View>
         
          
      </View>

      
      );
};