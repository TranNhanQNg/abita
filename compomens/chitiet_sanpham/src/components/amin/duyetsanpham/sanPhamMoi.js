import React, {useEffect,useState} from 'react';
import { Text, View, SafeAreaView,FlatList,TouchableOpacity,InteractionManager,ActivityIndicator} from 'react-native';
import { useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import HeaderD from '../../header/headerD';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {TieudeHome} from '../../dungchung/tieudeChung';
import styles from '../stylesAmin';

const {abita_amin}=diachiDaTa;
export default SanPhamMoi =({navigation,route})=>{
  const {quanly1,quanly2,quanly3}=styles;
  const {xacnhan,tentinhtrang,api} = route.params;
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const dienthoai = useSelector(state => state.cart.SoDienThoai); 
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [xacnhan1, setXacNhan1] = useState('');
  const [maucomponent, setMauComponent] = useState('');
  
    
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      fetch(abita_amin+api)
        .then((response) => response.json())
        .then((json) => {setData(json),setXacNhan1(xacnhan)})
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    })
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
  <SafeAreaView style = {{flex:1, backgroundColor:'#FFFFFF'}}>
    <HeaderD navigation ={navigation}/>
      <View style={{height:35}}>
      <TieudeHome props = {tentinhtrang} 
            color={[ '#FFFFFF','#CCCCCC','#FFFFFF']}
            icon={"grid"}
            coloricon={'red'}
            colortext={'#000000'}
            />
      </View>
      {xacnhan1!== xacnhan?  <View style={{flex:1,backgroundColor:'#FFFFFF'}}>
      <ActivityIndicator size="large" color="#00ff00" />
        </View> : (
          <FlatList 
            data={data}
            renderItem={({ item, index }) => (
            <TouchableOpacity 
                  onPress={() =>{setMauComponent(index), navigation.navigate("DuyetSanPham", 
                        {idsanpham:item.IDSANPHAM,
                        MaTinh:MaTinh
                       })}
                      }
            >
              <View style = {[quanly1,{backgroundColor:maucomponent==index?'#E8E8E8':'#FFFFFF'}]}>
                <View style={quanly2}>
                  <Text > {index+1} <Icon name="book-open" size={15} color="blue" /></Text>
                </View>
                <Text style={quanly3}>Sản phẩm {item.IDSANPHAM}</Text>
              </View>
              <View style={{height:0.5,backgroundColor:"#D3D3D3", marginLeft:60, marginRight:20}}/>
            </TouchableOpacity> 
            )}
            keyExtractor={( item ) => item.IDSANPHAM}
            ItemSeparatorComponent={renderSeparator}
            ListHeaderComponent={listHeader}
          />
        )
      } 
    </SafeAreaView>
  );
};