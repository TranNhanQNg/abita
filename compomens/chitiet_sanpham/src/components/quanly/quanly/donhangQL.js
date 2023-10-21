import React, {Component,useEffect,useState} from 'react';
import { Text, View,Image, StyleSheet,FlatList,TouchableOpacity} from 'react-native';
import { useSelector,useDispatch} from 'react-redux';

import HeaderB from '../../header/headerB';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import TieudeHome from '../../home/tieudeHome';
import styles from '../stylesQuanLy';

const {dataApp, hinhanhsanpham}=diachiDaTa;

export default DonHangQL =({navigation,route})=>{
  const {quanly1,quanly2,quanly3}=styles;
  const {xacnhan,tentinhtrang} = route.params;
  const infoAdd = useSelector(state => state.cart.SoDienThoai);
  const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
    fetch(dataApp+'quanly/LocSoDonHangQL.php?XacNhan='+xacnhan)
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
          height: 20,
          width: "100%",
          backgroundColor: "#FFFFFF",
         
        }}
      />
    );
  };
return (
<View style = {{flex:1, backgroundColor:'#FFFFFF'}}>
         <HeaderB navigation ={navigation}/>
         <TieudeHome props ={tentinhtrang}/>

        <View style = {{flex:1}}>

          <FlatList
          inverted
          data={data.reverse()}
          renderItem={({ item }) => (
          
           <TouchableOpacity  onPress={() => navigation.navigate("XemDonHangQL", 
            {sodonhang:item.SODONHANG, tenLoaiHang: tentinhtrang +item.NGAYDATHANG, xacnhan:xacnhan})}>
            <View style = {quanly1}>
              <View style={quanly2}>
                <Icon name="angle-double-right" size={30} color="#FFFFFF" />
                <Text style={quanly3}>Đơn hàng {item.NGAYDATHANG}</Text>
                
              </View>
            </View>
            </TouchableOpacity>
            
          )}
          keyExtractor={( item ) => item.SODONHANG}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={listHeader}

        />
     
    
        
          </View>
         
          
      </View>

      
      );
};