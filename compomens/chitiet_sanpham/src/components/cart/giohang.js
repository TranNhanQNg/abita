import React, {useEffect,useState} from 'react';
import { SafeAreaView,FlatList, Text, View, Image,TouchableOpacity,Modal} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import HeaderGH from '../header/headerGH';
import LinearGradient from 'react-native-linear-gradient';
import styles from './stylesCart';
import { navigaPush} from '../dungchung/naviga';
import {ModalThongBao2Chon,ModalThongBao} from '../dungchung/modalThongBao';
import ChuyenMuc from '../dungchung/chuyenmuc';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {REMOVE_FROM_CART,TANGSOLUONG_FROM_CART,GIAMSOLUONG_FROM_CART,DIEUCHINHGIA_FROM_CART} from '../../redux/cartAction';
import {AnhNen} from '../dungchung/anhnen';
import Sao from '../sanpham/chitietsanpham/sao';
import TinhThanh from '../dungchung/tinhthanh';
import Tang_Pont_CTSP from '../sanpham/chitietsanpham/component/tang_pont_ctsp'
import QuaTang from '../sanpham/chitietsanpham/component/quatang'
import ThanhToan_Abi from './thanhtoan_Abi'
import {Activity} from '../dungchung/activityIndicator'
const{ abita_dathang,hinhanhsanpham}=diachiDaTa;
const{aoflatlist,aoimage,aotext,viewImage,viewTinhTong,viewDatHang,LinearGradientTinhTong,
  iconTangGiam,viewTangGiam} = styles;

export default function Giohang ({navigation}) {  
  
  const [modalVisibleTB, setModalVisibleTB] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible_Abi, setModalVisible_Abi] = useState(false);
  const [modalVisibleTBX, setModalVisibleTBX] = useState(false); 
  const [chiaMoDal,setChiaMoDal] =useState('')
  const [soluongton,setSoLuongTon] =useState('')
  const [isload,setLoad] =useState(true)
  const [sum, setsum] = useState(false);
  const [pold, setPold] = useState(0);
  const [data, setDaTa] = useState(0);
  const [sumgiam, setsumgiam] = useState(false);
  const [item, setItem]=useState('');
  const [Abi, setAbi]=useState(0);
  const dataCart = useSelector(state => state.cart.dataCart);
  const matinhthanh = useSelector(state => state.cart.MaTinh);
  const MaUid = useSelector(state => state.cart.MaUid);
  const dieukhien=()=>{setModalVisibleTB(false),setChiaMoDal(''), navigation.navigate("Danhmuc")};
  const dieukhienX1=()=>{setModalVisibleTBX(false)}
  const dieukhienX2=()=>{setModalVisibleTBX(false),removeItemToCart()}
  const time_hientai =  Math.round(new Date().getTime()/1000)
  const fechPold =()=>{
    fetch(abita_dathang+'KiemTra_Pold.php?MaUid='+MaUid+'&MaTinh='+matinhthanh)
    .then((response) => response.json())
    .then((json) => {setPold(json.tongPold*1-json.tongPoldKhauTru*1)})
    .catch((error) => console.error(error))
  }
  useEffect(() => {
    fechPold()
  },[])

  const getPostKiemTra = async () => {
    await dataCart.map((item) =>{
      fetch(abita_dathang+'KiemTra_GioHang.php?IdChiTietSp='+item.IDCHITIETSP+'&MaTinh='+item.MATINH)
        .then((response) => response.json())
        .then((json) => {json==null?removeItemHetHang(item):giaItemToCart(json,item)})
        .catch((error) => console.error(error))
        });
    await setLoad(false);
  };

  useEffect(() => {
      getPostKiemTra()
  },[]);
  const dispatch = useDispatch()
  const removeItemHetHang = (item) =>{
    const action = REMOVE_FROM_CART(item);
    dispatch(action);}

  const removeItemToCart = () =>{
        const action = REMOVE_FROM_CART(item);
        dispatch(action);}

  const giaItemToCart =(json,item)=>{
    const ton = json[0].SOLUONGTON;
    const soluongkhuyenmai = json[0].NGAY_KETTHUC>time_hientai&json[0].NGAY_KHUYENMAI<time_hientai&json[0].GIAKHUYENMAI>0&JSON.parse(json[0].HINHTHUC_KHUYENMAI).loai_km==2?item.SOLUONG_KHUYENMAI:0;
    const diemP1=Number(json[0].P)
    const diemP1KM=Number(json[0].ABINCCKM)
    
    const diemP = json[0].NGAY_KETTHUC>time_hientai&json[0].NGAY_KHUYENMAI<time_hientai&json[0].GIAKHUYENMAI>0?diemP1KM:diemP1
        const newhobby ={
          IDCHITIETSP:json[0].IDCHITIETSP,
          GIABANSP:json[0].GIABANSP,
          GIAKHUYENMAI:json[0].GIAKHUYENMAI,
          HINHTHUC_KHUYENMAI:json[0].HINHTHUC_KHUYENMAI,
          NGAY_KHUYENMAI:json[0].NGAY_KHUYENMAI,
          NGAY_KETTHUC:json[0].NGAY_KETTHUC,
          SOLUONG_KHUYENMAI:soluongkhuyenmai,
          SOLUONGTON:ton,
          soluong:item.soluong>ton?ton>0?ton:1:item.soluong,
          P:diemP,
          ABINCC:json[0].ABINCC,
          ABINCCKM:json[0].ABINCCKM,
		      CK:json[0].CK,
          CHIETKHAUNCC:json[0].CHIETKHAUNCC,
          CKSP:json[0].CKSP,
          QUATANG:json[0].QUATANG,
		      TRAGOP:json[0].TRAGOP
          };
        const action = DIEUCHINHGIA_FROM_CART(newhobby);
        dispatch(action);
  };

  const tangsoluongItemToCart =item=>{
    const newhobby ={
      IDCHITIETSP:item.IDCHITIETSP,
      SOLUONG_KHUYENMAI:item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0&JSON.parse(item.HINHTHUC_KHUYENMAI).loai_km==2?Math.floor((item.soluong*1+1)/JSON.parse(item.HINHTHUC_KHUYENMAI).soluong_mua)*JSON.parse(item.HINHTHUC_KHUYENMAI).soluong_tang:0,
      soluong:item.soluong*1+1
      };
    const action = TANGSOLUONG_FROM_CART(newhobby);
    dispatch(action);
};
 
 

  const giamsoluongItemToCart = item =>{
    const newhobby ={
      IDCHITIETSP:item.IDCHITIETSP,
      SOLUONG_KHUYENMAI:item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0&JSON.parse(item.HINHTHUC_KHUYENMAI).loai_km==2?Math.floor((item.soluong-1)/JSON.parse(item.HINHTHUC_KHUYENMAI).soluong_mua)*JSON.parse(item.HINHTHUC_KHUYENMAI).soluong_tang:0,
      soluong:item.soluong !== 1 ? item.soluong*1 - 1 : 1
      };
    const action = TANGSOLUONG_FROM_CART(newhobby);
        dispatch(action);
      }

  const dathang = () =>{
          if(dataCart.length>0){
            matinhthanh==''?navigation.navigate("TinhThanh"):
          navigation.navigate("DatHang",{loai:1,Abi:Abi})
          }
          else{setModalVisibleTB(true),setChiaMoDal('2')}
          };
   
  const listHeader = ()=>{
    return(
      <View style={{backgroundColor: '#FFFFFF'}}>
        <View style={{height:0.5, backgroundColor: '#D8D8D8'}}/>
      </View>
    )
  };
useEffect(()=>{
  const newData = dataCart.filter(e=> {return( e.SOLUONGTON !=='0')});
  for (var i = 0, sum = 0,sumgiam = 0; i < newData.length;i++){
    sum+=newData[i].SOLUONGTON>0?newData[i].NGAY_KETTHUC>time_hientai&newData[i].NGAY_KHUYENMAI<time_hientai&newData[i].GIAKHUYENMAI>0?JSON.parse(newData[i].HINHTHUC_KHUYENMAI).loai_km==1?(newData[i].GIABANSP-newData[i].GIABANSP*newData[i].GIAKHUYENMAI/100)*newData[i].soluong:newData[i].GIABANSP*newData[i].soluong:newData[i].GIABANSP*newData[i].soluong:0;
    sumgiam+=newData[i].SOLUONGTON>0?newData[i].NGAY_KETTHUC>time_hientai&newData[i].NGAY_KHUYENMAI<time_hientai&newData[i].GIAKHUYENMAI>0?JSON.parse(newData[i].HINHTHUC_KHUYENMAI).loai_km==1? newData[i].GIABANSP*newData[i].GIAKHUYENMAI/100*newData[i].soluong:0:0:0}
    setsum(sum)
    setsumgiam(sumgiam)
},[dataCart.length,soluongton])



const modalThongBao=()=>{
  switch(chiaMoDal) {
    case '1':return(
      <ModalThongBao
        ten={'Cửa hàng có '+soluongton+' sản phẩm'} 
        thongbao ={'Bạn vui lòng tìm thêm sản phẩm này ở cửa hàng khác'}
        modalVisible={modalVisibleTB}
        dieukhien={()=>{setModalVisibleTB(false),setChiaMoDal('')}}
        hanhdong={'Đóng'}
        />
    )
    break;
    case '2':return(
      <ModalThongBao
      ten={'THÔNG BÁO'} 
      thongbao ={'Giỏ hàng của bạn không có sản phẩm, vui lòng chọn sản phẩm'}
      modalVisible={modalVisibleTB}
      dieukhien={dieukhien}
      hanhdong={'Chọn sản phẩm'}
      />
      )
      break;
  }
}
  

  const renderItem =({item})=>{
    return(
     
          <View style = {[aoflatlist,{backgroundColor:item.SOLUONGTON==0?'#FFDEAD':'#FFF'}]}>
          <View style = {{flex:1, flexDirection: 'row',marginHorizontal:5}}>
            <TouchableOpacity style = {{flex:1, flexDirection: 'row'}} onPress={() => navigaPush(item,navigation,MaTinh=item.MATINH)}>
              <View style={viewImage}>
                <Image source={{uri:hinhanhsanpham + item.TENHINHANH}} style={aoimage} />
              </View>
              <View style={{flex:1,margin:5,justifyContent:'space-between'}}>
                <View style={{marginBottom:10}}>
                  <Text numberOfLines ={2} style={aotext}>{item.TENSANPHAM}</Text>
                  <View style={{borderRadius: 10,flexDirection:'row',}}>
                  {item.QUYCACHSP==''||item.QUYCACHSP==null?null:
                    <Text style ={{fontSize:13}}>{item.QUYCACHSP}</Text>
                  }
                    {item.MAUSACSP=='no'||item.MAUSACSP==""?null:
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                      <Text>, </Text>
                      <View style={{height:15,width:15,borderRadius:3,backgroundColor:item.MAMAU}}/>
                    <Text style ={{marginLeft:5,fontSize:13}}>{item.MAUSACSP}</Text>
                  </View> 
                    }
                   
                  </View>
                  <View style={{marginVertical:2}}>
                  <Sao idquycach={item.IDQUYCACH}
                          MaTinh={item.MATINH}
                          dienthoaincc={item.DIENTHOAINCC}
                          />
                  </View>
                  {item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0?
                          JSON.parse(item.HINHTHUC_KHUYENMAI).loai_km==1?
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:'red',fontSize:16}}>
                            {(item.GIABANSP-item.GIABANSP*item.GIAKHUYENMAI/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                            </Text>
                            <Text style={[aotext,{fontSize:13,marginLeft:5,textDecorationLine:'line-through'}]}>
                            {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                            </Text>
                        </View>:
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:'red',fontSize:16}}>
                            {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                            </Text>
                            <View style={{borderRadius:3,margin:2,justifyContent:'center',borderWidth:1,borderColor:'red',marginLeft:5}}>
                              <Text style={{color:'red',fontSize:13,textAlign:'center',marginHorizontal:5,fontWeight:'bold'}}>mua {JSON.parse(item.HINHTHUC_KHUYENMAI).soluong_mua} tặng {JSON.parse(item.HINHTHUC_KHUYENMAI).soluong_tang} </Text>
                            </View>
                        </View>:
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:'red',fontSize:16}}>
                            {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                            </Text>
                        
                        </View>
                        }

                </View>
                <Tang_Pont_CTSP item={item} soluong={item.soluong}/>
                {item.QUATANG?
                  JSON.parse(item.QUATANG)[0].thoigian_batdau<time_hientai&JSON.parse(item.QUATANG)[0].thoigian_ketthuc>time_hientai?
                    <TouchableOpacity onPress={()=>{setDaTa(item.QUATANG),setModalVisible(true)}}>
                      <Text style={{fontSize:11,color:'red'}}>Xem mua {JSON.parse(item.QUATANG)[0].soluongmua} tặng ➤</Text>
                    </TouchableOpacity>:null
                  :null
                }
               
                <TinhThanh MaTinh={item.MATINH}/> 
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                  <View  style={{flexDirection:'row'}}>
                    {item.SOLUONGTON*1<0?
                    <Text style ={aotext}>Hết hàng </Text>
                    :
                    <View style={viewTangGiam}>
                      <TouchableOpacity onPress={()=> {item.SOLUONGTON>item.soluong?tangsoluongItemToCart(item):setChiaMoDal('1'),setModalVisibleTB(true),setSoLuongTon(item.soluong)}}
                            style={iconTangGiam}
                            >
                            <Text > + </Text>
                      </TouchableOpacity>
                            <Text>{item.soluong}</Text>
                      <TouchableOpacity onPress={()=> {item.soluong<2?null:giamsoluongItemToCart(item),setSoLuongTon(soluongton-1)}}
                            style={iconTangGiam}
                            >
                          <Text > - </Text>
                      </TouchableOpacity>
                      
                    </View>}
                   
                    
                    </View>
                    <TouchableOpacity 
                        onPress={()=> {setModalVisibleTBX(), setItem(item)}}>
                      <Ionicons name="close-outline" size={20} color="red"/>  
                    </TouchableOpacity>
                 </View>
              </View>
          </TouchableOpacity>
         
          </View>
          {item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0?
            JSON.parse(item.HINHTHUC_KHUYENMAI).loai_km==2&item.SOLUONG_KHUYENMAI>0?
                    <View style={{height:30,backgroundColor:'#87CEFA',justifyContent:'center',flex:1,borderRadius:3,margin:3}}>
                          <Text style={{color:'#00008B',marginHorizontal:10}}>
                              Số lượng sản phẩm tặng: {item.SOLUONG_KHUYENMAI}
                          </Text>
                      </View>:null
                      :null
                    }
            {item.QUATANG?
                JSON.parse(item.QUATANG)[0].thoigian_batdau<time_hientai&JSON.parse(item.QUATANG)[0].thoigian_ketthuc>time_hientai&JSON.parse(item.QUATANG)[0].soluongmua<item.soluong+1?
                    <TouchableOpacity onPress={()=>{setDaTa(item.QUATANG),setModalVisible(true)}}
                    style={{height:30,backgroundColor:'#87CEFA',justifyContent:'center',flex:1,borderRadius:3,margin:3}}
                    >
                      <Text style={{fontSize:11,color:'red',marginLeft:5}}>Tặng {Math.floor(item.soluong/JSON.parse(item.QUATANG)[0].soluongmua)} phần gồm ➤</Text>
                    </TouchableOpacity>:null
                  :null
                }
          </View>
          
       
    )
  }

  return(
      <View style = {{flex:1}}>
        
        <AnhNen api={'../icon/nenhome.jpg'}
       backgroundColor={'#20B2AA'}
       backgroundColor1={'rgba(0,175,175,0.7)'}/>
       <SafeAreaView style = {{flex:1}}>
       <HeaderGH navigation ={navigation} setModalVisible_Abi={setModalVisible_Abi} pold={pold}/>
       {dataCart.length==0?<ChuyenMuc navigation={navigation} thongbao={'Giỏ hàng không có sản phẩm'}/>:
       isload?<Activity/>:
       <View style={{flex:1}}>
       
        <View style = {{flex:1,backgroundColor:'#F2F2F2', marginHorizontal:2, borderRadius:5}}>
         
          <FlatList 
          data={dataCart}
          renderItem={renderItem}
          keyExtractor={(item) => item.IDCHITIETSP}
          ListHeaderComponent={listHeader}
          showsVerticalScrollIndicator={false}
          />
          
        </View> 
        <View style={{backgroundColor:'rgba(0,175,175,0.2)'}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:20,marginVertical:5}}>
            <Text style={{ fontWeight:'600',fontSize:16,color:'#FFFFFF'}}>Tổng thanh toán</Text>
            <Text style ={{color:'red',fontWeight:'600'}}>{(sum-Abi*200).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<Text style={{color:'#000'}}> đồng</Text></Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:20,marginBottom:10}}>
            <Text style={{ fontWeight:'600',fontSize:16,color:'#FFFFFF'}}>Tổng đã giảm</Text>
            <Text style ={{color:'#303030',fontWeight:'600'}}>{sumgiam.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<Text style={{color:'#000'}}> đồng</Text></Text>
          
          </View>
          {pold*200>200000?
          <TouchableOpacity onPress={()=>setModalVisible_Abi(true)}
          style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10,marginBottom:20,marginHorizontal:20}}>
            <Text style={{ fontWeight:'600',fontSize:16,color:'#FFFFFF'}}>Abi: {pold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
            
              {Abi>0?
              <Text>{(Abi*200).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đồng</Text>
              :<Text>Thanh toán Abi</Text>}
            </TouchableOpacity>
            :null}
          
          <TouchableOpacity onPress={dathang}
          style={{marginHorizontal:30}}>
           
            <LinearGradient
              colors={['#eb68f2','#a205aa', '#eb68f2',  ]}
              style={{alignItems:'center'}}
            >
              <Text style={{fontWeight:'600', color:'#FFF',marginVertical:9}}>ĐẶT HÀNG</Text>
            </LinearGradient>
            
          </TouchableOpacity>
        <View style={{height:10}}/> 
      </View>
      </View>
      }
      {modalThongBao()}
      <ModalThongBao2Chon
        ten={'THÔNG BÁO'} 
        thongbao ={'Bạn muốn xoá sản phẩm này khỏi giỏ hàng?'}
        modalVisible={modalVisibleTBX}
        dieukhien1={dieukhienX1}
        dieukhien2={dieukhienX2}
        hanhdong1={'Huỷ'}
        hanhdong2={'Xoá'}
        />
      </SafeAreaView> 
       <Modal 
            animationType="fade"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() =>
						setModalVisible(false)
						}>
  <TouchableOpacity onPress={()=>setModalVisible(false)} style={{backgroundColor:'rgba(0,0,0,0.6)',flex:1,justifyContent:'center',alignItems:'center'}}>
    <QuaTang data={data} setModalVisible={setModalVisible}/>
    </TouchableOpacity>
  </Modal> 
  <Modal 
            animationType="fade"
						transparent={true}
						visible={modalVisible_Abi}
						onRequestClose={() =>
						setModalVisible_Abi(false)
						}>
  <TouchableOpacity onPress={()=>setModalVisible_Abi(false)}
   style={{backgroundColor:'rgba(0,0,0,0.6)',flex:1,justifyContent:'center',alignItems:'center'}}>
    <ThanhToan_Abi 
          Abi={Abi}
          pold={pold}
          setAbi={setAbi}
          setModalVisible_Abi={setModalVisible_Abi}
          sum={sum}
          />
    </TouchableOpacity>
  </Modal>    
    </View> 
  );
}
