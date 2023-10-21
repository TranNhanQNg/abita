
import React,{useState,useRef} from 'react';
import { Platform,StyleSheet,View,Image,TouchableOpacity,Animated,useWindowDimensions,Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import diachiDaTa from '../../diachiDaTa/diachiDaTa';

const{ abita_sanpham,hinhanhsanpham}=diachiDaTa;

export default function DrawerMenNu ({navigation,mau}) {
  const w = useWindowDimensions().width;
  const h = useWindowDimensions().height;
  const [morong,setMoRong] =useState(false)

  const naviga1 =()=>{navigation.navigate("Sidebar")};
  const naviga2 =()=>{navigation.navigate("SanPhamDaXem")};
  const naviga3 =()=>{navigation.navigate("Danhmuc")};
  const naviga4 =()=>{navigation.navigate("Home")};
  const naviga5 =()=>{navigation.navigate("Search")};
 

  const heghtMoRong = useRef(new Animated.Value(30)).current;

  const animatedDong =()=>{
    Animated.timing(
      heghtMoRong,
      {
        toValue:300,
        duration: 300,
        useNativeDriver:false, 
      }
    ).start(()=>{setMoRong(!morong)});
  };
  const animatedMoRong =()=>{
    
    Animated.timing(
      heghtMoRong,
      {
        toValue: 30,
        duration: 300,
        useNativeDriver:false,
      }
    ).start(()=>setMoRong(false));
  };
  const onpressMoRong =()=>{morong==false?setMoRong(true):null,morong==false?animatedDong():animatedMoRong()}
  
     return (
     
           <Animated.View style={{
            ...Platform.select({
              ios:{width:0},
              android:{width:heghtMoRong,},
              backgroundColor:'red'
            }),
            
            height:300,
            justifyContent:'center',
            position:'absolute',
            bottom:h/2-75
           
            }}>
           <TouchableOpacity onPress={()=>onpressMoRong()}>
            <Animated.View style={{
                    //transform: [{ scale:heghtMoRong}],
                    width:heghtMoRong,
                    height:heghtMoRong,
                    justifyContent:'center',
                    }}>
               
                      
                  <Pressable onPress={()=>{onpressMoRong(),naviga1()}}
                     style={[styles.icon,{left:'5%',backgroundColor:mau==1?'#EE82EE':'#20B2AA'}]}      
                    >
                    
                       <Image style ={{flex:0.6,resizeMode:'contain'}} source={require('../icon/user.png')}/>
                  </Pressable>

                 
                  
                  <Pressable onPress={()=>{onpressMoRong(),naviga3()}}
                              style={[styles.icon,{left:'28%',backgroundColor:mau==3?'#EE82EE':'#20B2AA'}]} 
                      >
                         <Image style ={{flex:0.6,resizeMode:'contain'}} source={require('../icon/menu.png')}/>
                    </Pressable>
                    <Pressable onPress={()=>{onpressMoRong(),naviga2()}}
                          style={[styles.icon,{left:'35%',marginVertical:'7%',backgroundColor:mau==2?'#EE82EE':'#20B2AA'}]}      
                    >
                       <Image style ={{flex:0.6,resizeMode:'contain'}} source={require('../icon/history.png')}/>
                  </Pressable>
                 
                    <Pressable onPress={()=>{onpressMoRong(),naviga4()}}
                         style={[styles.icon,{left:'28%',backgroundColor:mau==4?'#EE82EE':'#20B2AA'}]}  
                    >
                      <Image style ={{flex:0.6,resizeMode:'contain'}} source={require('../icon/home.png')}/>
                  </Pressable>
                  <TouchableOpacity onPress={()=>{onpressMoRong(),naviga5()}}
                         style={[styles.icon,{left:'5%',backgroundColor:mau==5?'#EE82EE':'#20B2AA'}]}  
                    >
                      <Ionicons name="search-outline" size={25} color="#FFF"/>
                  </TouchableOpacity>

                  <TouchableOpacity  onPress={()=>onpressMoRong()}
                          style={{height:50,
                              width:50,
                              left:-20,
                              position:'absolute',
                              zIndex:1,
                              alignItems:'center',
                              backgroundColor:morong?'#EE82EE':'rgba(176,176,176,0.3)',
                              justifyContent:'space-around',
                              borderBottomRightRadius:100,
                              borderTopRightRadius:100
                            }}        
                    >
                      {morong?
                      <Icon name="list" size={18} color={morong?'#FFF':"blue"}/>:null
                      }
                  </TouchableOpacity> 
              
            </Animated.View>
            </TouchableOpacity>
          </Animated.View>
           
           
     
     
    );
  }
  const styles = StyleSheet.create({
    icon:{
      height:'15%',
      width:'15%',
      zIndex:1,
      alignItems:'center',
      backgroundColor:'#20B2AA',
      justifyContent:'center',
      borderRadius:100,
      elevation: 5,
      ...Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: -2, height: 10 },
            shadowOpacity: 0.3,
        },
        Android: {
            elevation: 4

        }
        }),
     

    },
  

  })


