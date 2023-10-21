import React, { useState,useRef,useEffect,useLayoutEffect } from 'react';
import { Text, View, Animated,Image,TouchableOpacity,Dimensions,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import FastImage from 'react-native-fast-image'
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import {fadeIn} from '../dungchung/anima';
import {MD5,fechDaTa_Axios} from '../dungchung/fech_data';


export default function DanhMucCon ({navigation, idDanhMuc,tenhinhanh,tendanhmuc}) {
  const {hinhanh,abita_chung,hinhanhdanhmuc} = diachiDaTa;  
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
    //animated
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {fadeIn(fadeAnim)},[idDanhMuc]);
  useLayoutEffect(() => {
    setData([])
    setLoading(true)
    var api_fech = abita_chung+'DanhMucCap3.php?IdDanhMucCap2='+idDanhMuc
    var set_then =(res)=>{setData(res.data)}
    var set_catch =()=>{console.log(error)}
    var set_finally =()=>{setLoading(false)}
    var data_fech = JSON.stringify({KiemTra:MD5.home,IdDanhMucCap2:idDanhMuc})
    fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)

    },[idDanhMuc]);
  return (
    <View>
 {!isLoading?
      <Animated.View style={{opacity:fadeAnim}}>
     
        <View>
          {data.length<2?(
              <TouchableOpacity onPress={() => navigation.navigate("DanhMucCap4",
                        {
                        idDanhMuc:idDanhMuc,
                        tendanhmuc:tendanhmuc,
                        })
                      }
              >
                <View>
                      <View  style={styles.viewtieude}>
                        <Text style={[styles.aotexttieude]}>{tendanhmuc}</Text>
                      </View>
                      <View style={styles.viewImageC}>
                        <Image source={{uri:hinhanhdanhmuc+tenhinhanh}}  style={styles.aoimage}/>
                      </View>
                </View>
              </TouchableOpacity>):
                <TouchableOpacity style={styles.viewtieude}
                      onPress={() => navigation.navigate("DanhMucCap3",{
                                                    idDanhMuc:idDanhMuc,
                                                    tendanhmuc:tendanhmuc,
                                                  }
                                                        )
                              }
                      >
                    <Text style={[styles.aotexttieude]}>{tendanhmuc}</Text>
                    <Text style={{}}> XEM <Icon name="arrow-right" size={15} color="blue" /></Text>
                </TouchableOpacity>
                    }
        </View>
        <View style={{flexWrap:'wrap',flexDirection:'row'}}>
          {data.map(item=>
            <TouchableOpacity key = {item.IDDANHMUCCAP3} 
                      onPress={() => navigation.navigate("DanhMucCap4",{
                                                                        idDanhMuc:item.IDDANHMUCCAP3,
                                                                        tendanhmuc:item.TENDANHMUCCAP3
                                                                        }
                                                        )
                              }
                              style={styles.view}
            >
                <View style={styles.viewImage}>
                  <FastImage
                          style={{flex:1,margin:2}}
                          source={{
                              uri:hinhanhdanhmuc+item.TENHINHANH,
                              priority: FastImage.priority.normal,
                            
                          }}
                          resizeMode={FastImage.resizeMode.contain}
                      />
                </View>
                <Text numberOfLines ={2} style={styles.aotext}>{item.TENDANHMUCCAP3}</Text>
              
            </TouchableOpacity>)}
            </View>
      </Animated.View>
     :null}
      </View>
    );
}
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  view:{
      width:width*0.243,
      alignItems:'center',
     
    },
  viewImage:{
    width: width*0.2, 
    height: width*0.2,
    margin:5    
  },
  image:{
    flex:1,
    resizeMode:"contain",
    borderRadius: 8,
    margin: 15,
    
  },
  aotext:{
    fontSize: 12,
    textAlign: 'center',
    color:'#303030',
    fontFamily: 'OpenSans-Medium',
    marginBottom:4
    
    },
    viewtieude:{
      height:45,
      alignItems:'center',
      borderBottomWidth:0.5,
      borderColor:'#C0C0C0',
      flexDirection:'row',
      justifyContent:'space-between',
      marginHorizontal:5
      },
      viewImageC:{
        width: width*0.24, 
        height: width*0.24,
      },
      aoimage:{
        flex:1,
        resizeMode:"contain",
        borderRadius: 8,
        marginTop: 5,
   },
   aotexttieude:{
    textAlign: 'center',
    fontSize:14,
    color:'#1E90FF',
    },
});