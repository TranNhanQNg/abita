import React from 'react';
import { Text, View,TouchableOpacity,FlatList,ScrollView, Image,ImageBackground,} from 'react-native';
  import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
  import { useSelector} from 'react-redux';

export default DanhMuc1 =({data,navigation})=>{
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
    return(
      
        
             <ImageBackground style={{width:'100%',justifyContent:'center'}}
                   source={{uri:hinhanh+'AnhNen/hinhnendanhmuc.jpg'}}
                  >
                  <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} 
                  style={{backgroundColor:'rgba(255,255,255, 0.7)',}}
                  bounces = {false} 
                  >
                   {data.map(item=>
                    <TouchableOpacity
                            key={item.IDDANHMUC}
                            activeOpacity={0.5} 
                            style={{marginBottom:10,
                                    alignItems:'center',
                                    marginHorizontal:5,
                                    marginVertical:5,
                                    flex:1,
                                    borderWidth:0.5,
                                    borderColor:'#1E90FF',
                                    borderRadius:5,
                                   justifyContent:'center',
                                  
                                    }}
                              onPress={() => dieuhuong(item)}>
                           
                            <Text numberOfLines ={2} 
                            style={{ 
                                        textAlign: 'center',
                                      marginHorizontal:10,
                                      marginVertical:10,
                                        fontFamily: 'OpenSans-Medium',
                                        fontSize:14,
                                        color:'#000'
                                       }}>
                              {item.TENDANHMUC}
                            </Text>
                           
                          </TouchableOpacity>
                   )}  
                        
                  </ScrollView>
                  </ImageBackground>
     
    )
}

