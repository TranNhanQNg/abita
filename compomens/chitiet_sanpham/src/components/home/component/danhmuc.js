import React from 'react';
import { Text, View,TouchableOpacity,FlatList,ScrollView, Image,ImageBackground,} from 'react-native';
  import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
  import {TieudeHome} from '../../dungchung/tieudeChung';
  import { useSelector} from 'react-redux';

export default DanhMuc =({data,navigation})=>{
    const {hinhanhdanhmuc,hinhanh}=diachiDaTa;
    const MaTinh = useSelector(state => state.cart.MaTinh);
    const a = Math.ceil(data.length);
    const dieuhuong = (item)=>{ 
        switch (item.IDDANHMUC) {
          case 'DM_00':navigation.navigate("Danhmuc",{matinh:MaTinh});
          break;
          default:
              navigation.navigate("DanhMucCap2",
                {idDanhMuc:item.IDDANHMUC,
                  tendanhmuc:item.TENDANHMUC,
                  matinh:MaTinh,
                  apiSP:'SanPhamDanhMucCap2.php?IdDanhMuc='
                }
              );
            break;
          }
        };

    const renderItem =({item})=>{
      return(
        <TouchableOpacity activeOpacity={0.5} 
        style={{marginBottom:10,
                alignItems:'center',
                marginHorizontal:5,
                flex:1}}
          onPress={() => dieuhuong(item)}>
       
          
            <Image source={{uri:hinhanhdanhmuc+item.TENHINHANH}} style={{height:45,width:45,resizeMode:"contain",}} />
         
        <Text numberOfLines ={2} 
        style={{ width:75,
                    textAlign: 'center',
                    marginTop:10,
                    fontFamily: 'OpenSans-Medium',
                    fontSize:12,
                    color:'#383838',
                    }}>
          {item.TENDANHMUC}
        </Text>
       
      </TouchableOpacity>
      )
    }
    return(
        <View>
        
             <ImageBackground style={{maxHeight:400,minHeight:100,width:'100%'}}
                   source={{uri:hinhanh+'AnhNen/hinhnendanhmuc.jpg'}}
                  >
                 <TieudeHome props = {'Danh Mục' }
                 color={['#FFF','rgba(255,255,255,0.7)']}
                 coloricon={'#4682B4'}
                 colortext={'#008B8B'}
                 icon={'➣'}
                  /> 
                  <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} 
                  style={{backgroundColor:'rgba(255,255,255, 0.7)',}}
                  bounces = {false} 
                  >
                     
                        <FlatList style={{marginVertical:3}}a
                          data={data}
                          renderItem={renderItem}
                          keyExtractor={(item) =>item.IDDANHMUC}
                          key ={a}
                          horizontal={false}
                          numColumns={a}
                          showsHorizontalScrollIndicator={true}
                          bounces = {false}                        
                        />
                        
                    
                  </ScrollView>
                  </ImageBackground>
        </View>
    )
}