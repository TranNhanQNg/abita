
import React, { useLayoutEffect,useState,useRef,useEffect,useMemo } from 'react';
import { Text, View,SafeAreaView,TouchableOpacity,FlatList,Dimensions, Image,RefreshControl,
ScrollView,Animated} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';

import { useSelector} from 'react-redux';
import HeaderDM_CH from '../../header/headerDM_CH';
import {AnhNen} from '../../dungchung/anhnen';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {RenderSanPham,RenderDanhMuc} from '../renderSanPham';
import {Activity} from '../../dungchung/activityIndicator';
import DrawerMenNu from '../../dungchung/drawermenu';
import {fadeIn} from '../../dungchung/anima';
import {LenDauTrang} from '../dautrang';
import DanhMucListFooter from '../danhmucListFooter';
import axios from 'axios';

const {width} = Dimensions.get('window')
const createNewDataProvider = () => {
  return new DataProvider((r1, r2) => r1 !== r2);
};


export default function SanPhamDM_CH ({navigation, route}) { 

    const Wifi = useSelector(state => state.cart.Wifi);
    const AddFont = useSelector(state => state.cart.AddFont);
    const {abita_amin,abita_sanpham} = diachiDaTa; 
    const {idDanhMuc,dataAnh,MaTinh} = route.params;
    const [trang, setTrang]= useState(2);
    const [cao, setCao] = useState(50);
    const [dataAll, setDataAll] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isloading,setLoading]=useState(true);
    const [isloadingdm,setLoadingdm]=useState(true);
    const [soluongdata,setSoLuongDaTa] =useState(0);
    const [soluongdatacuoi,setSoLuongDaTaCuoi] =useState(1);
    const [api, setApi]=useState('Cua_Hang/SanPhamDM_CH.php?');
    const chuyenDauTrang = useRef(null);
    const [mauMuc,setMauMuc]=useState(1);
    const [activityCT,setActivityCT]= useState(true);
    const [dataProvider, setDataProvider] = React.useState(createNewDataProvider().cloneWithRows([1]));
   
    //animated
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeAnimFlatlist = useRef(new Animated.Value(0)).current;
    
    useLayoutEffect(() => {fadeIn(fadeAnim)},[]);
    useLayoutEffect(() => {fadeIn(fadeAnimFlatlist)},[api]);
    const animations =()=>{fadeAnimFlatlist.setValue(0)};
    const scrollY = useRef(new Animated.Value(0)).current;

      useEffect(() => {
        if(Wifi&&soluongdata==0){
        fechDaTa()}
        fechDaTa1()
        },[refreshing,api,Wifi,trang]);

       
      const fechDaTa=()=>{
        axios.post(abita_sanpham+api+"MaTinh="+MaTinh,
            JSON.stringify({
              Trang:1,
              IdDanhMuc:idDanhMuc,
              GiaTriMuc:dataAnh.MaUidNCC,
              Muc:'MaUidNCC',
              timestamp:timestamp

            })
        )
        .then((response) => {setDataProvider(createNewDataProvider().cloneWithRows([1].concat(response.data))),activityCT?setSoLuongDaTa(response.data.length):null,setLoading(false)})
        .catch((error) => console.error(error))
        .finally(() => {setActivityCT(false)});
      }
      const fechDaTa1=()=>{
        axios.post(abita_sanpham+api+"MaTinh="+MaTinh, 
            JSON.stringify({
              Trang:trang,
              IdDanhMuc:idDanhMuc,
              GiaTriMuc:dataAnh.MaUidNCC,
              Muc:'MaUidNCC',
              timestamp:timestamp
            })
        )
        .then((response) => {setDataAll(response.data),setSoLuongDaTaCuoi(response.data.length),setLoading(false)})
        .catch((error) => console.error(error))
        .finally(() => {setActivityCT(false)});
      }
      
      const [update, updateRecycler] = useState({
        update: false
      });
      const ViewTypes = {
        FULL: 0,
        HEDER: 1,
    };
    
    useEffect(() => {
   
      setlayoutProvider(new LayoutProvider(
        index => {
            if (index === 0) {
                return ViewTypes.HEDER;
            } else {
                return ViewTypes.FULL;
            }
        },
        (type, dim) => {
  
            switch (type) {
                case ViewTypes.HEDER:
                  dim.width = width;
                  dim.height = cao;
                    break;
                case ViewTypes.FULL:
                  dim.width = width / 2;
                  dim.height = width/2+AddFont.fontall+5;
                  break;
                default:
                    dim.width = 0;
                    dim.height = 0;
            }
        }
    ))
      },[cao,MaTinh,api]);
    const [_layoutProvider, setlayoutProvider] = React.useState( new LayoutProvider(
      index => {
        if (index === 0) {
            return ViewTypes.HEDER;
        } else {
            return ViewTypes.FULL;
        }
    },
    (type, dim) => {
  
        switch (type) {
            case ViewTypes.HEDER:
              dim.width = width;
              dim.height = y;
                break;
            case ViewTypes.FULL:
              dim.width = width / 2;
              dim.height =width/2+AddFont.fontall+5;
              break;
            default:
                dim.width = 0;
                dim.height = 0;
        }
    }
    ));
    
  
    const renderList = (type, item, index) => {
      return (
        item ===1?
        <View style={{flex:1, }} >
        {listHeader}
        </View>:
           <Animated.View style={{flex:1,justifyContent: 'center',opacity:fadeAnimFlatlist
            }}>   
                 <RenderSanPham item={item} navigation={navigation} MaTinh={MaTinh} index={index} component={1}/>
          </Animated.View>
                );
              };
      const data_muc =[
        {id:1, muc:'Tất cả', icon:'1',api:'Cua_Hang/SanPhamDM_CH.php?'},
        {id:2,muc:'Giảm giá', icon:'2',api:'Cua_Hang/SanPhamDM_CH_GG.php?'}
      ];
      const timestamp = Math.round(new Date().getTime()/1000)
      const Api_Muc =(item)=> {
                          setTrang(2),
                          setActivityCT(true)
                          setDataProvider(createNewDataProvider().cloneWithRows([1])),
                          setDataAll([]),
                          setMauMuc(item.id),
                          setApi(item.api),
                          setSoLuongDaTa(0),
                          setSoLuongDaTaCuoi(1)
                          
                          };
     
      const onRefresh = () => {
                            setTrang(2)
                            setDataProvider(createNewDataProvider().cloneWithRows([1])),
                            setDataAll([]),
                            setRefreshing(!refreshing),
                            setActivityCT(true)
                          };
     
    
      
          const cuoiban =() =>{
            return(
              <View style={{backgroundColor:'#FFF',flex:1}}>
              <DanhMucListFooter
                activityCT={activityCT}
                soluongdata={soluongdatacuoi}/>
                <View style={{height:soluongdata?null:500}}/>
              </View>
              )
          };

      _Muc = ()=>{
        return(
          <View style={{width:'100%',backgroundColor:'#FFF'}}>
          <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{}}
          >
            {data_muc.map(item=>
            <TouchableOpacity 
              onPress={mauMuc==item.id?()=>null:()=>{Api_Muc(item),animations()}}
              key ={item.id}
            style={{marginLeft:10, width:80}}
            >
            <View style={{margin:5, width:80,height:40,alignItems:'center',justifyContent:'center',borderBottomWidth:2,marginVertical:5,borderBottomColor:mauMuc==item.id?'red':'#FFF'}}>
              <Text style={{color:mauMuc==item.id?'blue':'#000',fontFamily: 'OpenSans-Regular'}}>{item.muc}</Text>
            </View>
            </TouchableOpacity>)}
          </ScrollView>
          <View style={{height:1,backgroundColor:'#D3D3D3'}}/>
        </View>
        )
      }
    
    const listHeader = useMemo(()=>{
      return(
        <View style={{marginBottom:1,backgroundColor:'#FFF',}} onLayout={e => {setCao(e.nativeEvent.layout.height) }}>

        { _Muc()}
        <View style={{backgroundColor:'#F5F5F5',height:1}}/>
        </View>)
     },[mauMuc,soluongdata,activityCT]);
  // Hàm cho flatlist
  
  
  const onEndReached=()=>{
                  if(!activityCT&&soluongdatacuoi!==0&&Wifi){
                    setDataProvider(createNewDataProvider().cloneWithRows(dataProvider._data.concat(dataAll))),
                    setTrang(trang+1)
                    setActivityCT(true)
                    setRefreshing(!refreshing)
                    }
                  };
    return(   	
     <View style={{flex:1}}>
       <AnhNen />
       <SafeAreaView>
       <HeaderDM_CH navigation={navigation} dataAnh={dataAnh}/>
        <View style={{height:'100%',justifyContent:'center',backgroundColor:'#D3D3D3',}}>
        {isloading?<Activity mau={'#FFF'}/> : (
          <RecyclerListView style={{flex:1}}
                layoutProvider={_layoutProvider}
                dataProvider={dataProvider}
                rowRenderer={(type, item, index) =>
                  renderList(type, item, index)
                }
                ref={chuyenDauTrang}
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {y:scrollY}}}],
                  {useNativeDriver:false}
                  )}
                  keyExtractor={(item,index) => item.IDCHITIETSP+index}
                  onEndReached={onEndReached}
                  onEndReachedThreshold={0.5}
                  showsVerticalScrollIndicator={false}
                  extendedState={update}
                  renderFooter={()=>cuoiban()}
              />
       
        )}
          </View>
          <DrawerMenNu 
              navigation={navigation}
          />
          </SafeAreaView>
         <LenDauTrang chuyenDauTrang={chuyenDauTrang} scrollY={scrollY} cao={28}/>
      </View>
   );
}
