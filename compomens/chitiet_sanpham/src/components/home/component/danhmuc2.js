import React from 'react';
import { Text, TouchableOpacity,ScrollView,} from 'react-native';
 
  import { useSelector} from 'react-redux';

export default DanhMuc2 =({data,navigation})=>{
   
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

                  <ScrollView  showsHorizontalScrollIndicator={false} 
                  style={{backgroundColor:'rgba(255,255,255, 0.7)',}}
                  bounces = {false} 
                  >
                   {data.map(item=>
                    <TouchableOpacity
                            key={item.IDDANHMUC}
                            activeOpacity={0.5} 
                            style={{
                                    alignItems:'center',
                                    marginHorizontal:5,
                                    marginTop:5,
                                    flex:1,
                                    borderWidth:0.5,
                                    borderColor:'#1E90FF',
                                    borderRadius:5,
                                   justifyContent:'center',
                                   height:30
                                    }}
                              onPress={() => dieuhuong(item)}>
                           
                            <Text numberOfLines ={2} 
                            style={{ 
                                        textAlign: 'center',
                                        fontSize:14,
                                        color:'#383838',
                                        marginHorizontal:5
                                       }}>
                              {item.TENDANHMUC}
                            </Text>
                           
                          </TouchableOpacity>
                   )}  
                        
                  </ScrollView>
                 
     
    )
}

