
import React, { useLayoutEffect,useState,useRef,useEffect,useMemo } from 'react';
import { View,RefreshControl,Animated} from 'react-native';
import { useSelector} from 'react-redux';
import diachiDaTa from '../../../../diachiDaTa/diachiDaTa';
import {RenderItem} from '../renderItem';
import ListHeadre from '../listHeader';
import {Activity} from '../../../dungchung/activityIndicator';
import DrawerMenNu from '../../../dungchung/drawermenu';
import fadeIn from '../../../dungchung/anima';
import {LenDauTrang} from '../../../sanpham/dautrang';
// import MasonryList from '@react-native-seoul/masonry-list';
import DanhMucListFooter from '../../../sanpham/danhmucListFooter'





export default function Add_SanPham_GiamGia ({navigation, id,chuyenDauTrang,scrollY}) { 

  
    const MaTinh = useSelector(state => state.cart.MaTinh);
    const Wifi = useSelector(state => state.cart.Wifi);
    const {hinhanhsanpham,abita_chung,abita_sanpham, hinhanh} = diachiDaTa; 
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [trang, setTrang]= useState(2);
    const [refreshing, setRefreshing] = useState(false);
    const [isloading,setLoading]=useState(true);
    const [soluongdata,setSoLuongDaTa] =useState(1);
    const [soluongdatacuoi,setSoLuongDaTaCuoi] =useState(1);
    const [activityCT,setActivityCT]= useState(true);
    
   
    //animated
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeAnimFlatlist = useRef(new Animated.Value(0)).current;
    const animations =()=>{fadeAnim.setValue(0)};
    
   
    useLayoutEffect(() => {fadeIn(fadeAnimFlatlist)},[id.id]);
    
//Animater cho danh mục
      useEffect(() => {
        animations() 
        fadeIn(fadeAnim)
        fadeIn(fadeAnimFlatlist)
      },[id.api])
      useEffect(() => {
        if(Wifi&&data.length==0){
          setActivityCT(true)
          fechDaTa()
        }
          fechDaTa1()
        },[refreshing,id.api,Wifi,trang]);

        const timestamp = Math.round(new Date().getTime()/1000)
      const fechDaTa=()=>{
        fetch(id.api+'&Trang=1&timestamp='+timestamp)
        .then((response) => response.json())
        .then((json) => {setData(json),activityCT?setSoLuongDaTa(json.length):null,setLoading(false)})
        .catch((error) => console.error(error))
        .finally(() => {setActivityCT(false)});
      }
      const fechDaTa1=()=>{
        fetch(id.api+'&Trang='+trang+'&timestamp='+timestamp)
        .then((response) => response.json())
        .then((json) => {setData1(json),setSoLuongDaTaCuoi(json.length),setLoading(false)})
        .catch((error) => console.error(error))
        .finally(() => {setActivityCT(false)});
      }
      
     
      const onRefresh = () => {
                            setTrang(2)
                            setData([]),
                            setData1([]),
                            setRefreshing(!refreshing),
                            setActivityCT(true)
                          };
  // Hàm cho flatlist
  const cuoiban =useMemo(() =>{
    return(
      <DanhMucListFooter
        activityCT={activityCT}
        soluongdata={soluongdata}/>
      
      )
  },[activityCT,soluongdata]);

  const listHeader =()=>{
      return(
        <View style={{height:0}}>
         
            <ListHeadre item={id}/>
         </View>
      )
  }
  const renderItemCon=({ item }) => {
   
    return(
   <Animated.View style={{opacity:fadeAnimFlatlist,
                          backgroundColor:'#FFF',
                          justifyContent: 'center',
                          borderRadius:5,
                          margin:1
                          }}>
                          
      <RenderItem item={item} navigation={navigation} id={id}/>
        

      
      
      </Animated.View>
    )
  };
 
  const onEndReached=()=>{
                  if(!activityCT&&soluongdatacuoi!==0&&Wifi){
                    setData(data.concat(data1))
                    setTrang(trang+1)
                    setActivityCT(true)
                    setRefreshing(!refreshing)
                    }
                  };
    return(   	
     <View style={{flex:1}}>
        <View style={{height:'100%',justifyContent:'center'}}>
        {isloading?<Activity mau={'#FFF'}/> : (
        <Animated.FlatList
        style={{flex:1,opacity:fadeAnim}}
          data={data}
         renderItem ={renderItemCon}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false} 
            onEndReachedThreshold={0.5}
            onEndReached={onEndReached}
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl refreshing={isloading}  onRefresh={onRefresh}/>
            }
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y:scrollY}}}],
              {useNativeDriver:false}
            )}
            keyExtractor={(item) => item}
            ref={chuyenDauTrang}
            ListHeaderComponent={listHeader()}
           />
       
        )}
          </View>
          <DrawerMenNu 
              navigation={navigation}
          />
         <LenDauTrang chuyenDauTrang={chuyenDauTrang} scrollY={scrollY} cao={28}/>
      </View>
   );
}
