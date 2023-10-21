const initialState ={
	dataCart:[],
  dataDonHang:[],
  DonHang:[],
  DiaChi:'',
  DienThoaiMuaHang:'',
  HoTenKH:'Nhập thông tin họ và tên',
  SoDienThoai:'abita',
  MaUid:"",
  PassWord:'',
  TaiKhoan:'',
  TenTaiKhoan:'',
  Khoa:'false',
  Amin:'',
  MaTinh:'',
  refechMaTinh:true,
  TenTinh:'',
  ThongBaoAbita:{"MaxNgay": "0", "sothongbao": "0"},
  DinhVi:"",
  PushThongBao:null,
  Wifi:true,
  dataHistory:[],
  ThongTin:"Nhân",
  ThongBao_DonHang:[],
  ThongBao:[],
  ThoiGian:1,
  ThoiGianXoa_TaiKhoan:null,
  TimKiem:[],
  AddFont:{"fontDM": 120.76190185546875, "fontDM_TD": 56.761905670166016, "fontTieuDe": 65.52381134033203, "fontall": 140.1904754638672},
  ToKen:""
}
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':{
    	const newdataCart = [...state.dataCart];
      const newDataCart = newdataCart.filter(e=>  e.IDCHITIETSP !== action.payload.IDCHITIETSP);
     newDataCart.push(action.payload);
      
      return {
        ...state,
      	dataCart: newDataCart,
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const newdataCart = [...state.dataCart];
      const newDataCart = newdataCart.filter(e=>  e.IDCHITIETSP !== action.payload.IDCHITIETSP);
   
    	return {
        ...state,
        dataCart: newDataCart,
      };
    };
      case 'TANGSOLUONG_FROM_CART': {
        const newdataCart = [...state.dataCart];
        return {
        ...state,
        dataCart: newdataCart.map(product =>
          product.IDCHITIETSP === action.payload.IDCHITIETSP
            ? {...product,
              soluong:action.payload.soluong,
              SOLUONG_KHUYENMAI:action.payload.SOLUONG_KHUYENMAI,
            }
            : product,
        ),
      };
    };
    case 'DIEUCHINHGIA_FROM_CART': {
        const newdataCart = [...state.dataCart];
        return {
        ...state,
        dataCart: newdataCart.map(product =>
          product.IDCHITIETSP === action.payload.IDCHITIETSP
            ? {...product, 
              GIABANSP:action.payload.GIABANSP,
              GIAKHUYENMAI:action.payload.GIAKHUYENMAI,
              HINHTHUC_KHUYENMAI:action.payload.HINHTHUC_KHUYENMAI,
              NGAY_KHUYENMAI:action.payload.NGAY_KHUYENMAI,
              NGAY_KETTHUC:action.payload.NGAY_KETTHUC,
              SOLUONG_KHUYENMAI:action.payload.SOLUONG_KHUYENMAI,
              SOLUONGTON:action.payload.SOLUONGTON,
              soluong:action.payload.soluong,
              P:action.payload.P,
              ABINCC:action.payload.ABINCC,
              ABINCCKM:action.payload.ABINCCKM,
              CK:action.payload.CK,
              CHIETKHAUNCC:action.payload.CHIETKHAUNCC,
              CKSP:action.payload.CKSP,
              QUATANG:action.payload.QUATANG,
              TRAGOP:action.payload.TRAGOP,
            }
            : product,
        ),
      };
    };
      case 'GIAMSOLUONG_FROM_CART': {
      const newdataCart = [...state.dataCart];
        return {
        ...state,
        dataCart: newdataCart.map(product =>
          product.IDCHITIETSP === action.payload.IDCHITIETSP
            ? {...product,
            soluong: product.soluong !== 1 ? product.soluong - 1 : 1,
          
            }
            : product,
        ),
      };
     };
     case 'REMOVE_ADD_CART': {
      const newdataCart = action.payload;
      return {...state,
         dataCart:newdataCart
          };
     };
     case 'ADD_INFO':{
       const newDiaChi = action.payload.DiaChi;
       const newHoTenKH = action.payload.HoTenKH;
       const newDienThoaiMuaHang = action.payload.DienThoaiMuaHang;
      return {...state,
        DiaChi: newDiaChi,
        HoTenKH:newHoTenKH,
        DienThoaiMuaHang:newDienThoaiMuaHang
         };
        };
        case 'ADD_DIACHI':{
          const newDiaChi = action.payload.DiaChi;
          const newThoiGian = action.payload.ThoiGian;
         return {...state,
           DiaChi: newDiaChi,
           ThoiGian:newThoiGian
            };
           };
      case 'ADD_INFO_SDT':{
       const newSoDienThoai= action.payload.SoDienThoai;
       const newmauid = action.payload.MaUid;
      return {...state,
        SoDienThoai: newSoDienThoai,
        MaUid:newmauid,
         };
           };
      case 'ADD_TINHTHANH':{
       const newMaTinh = action.payload.MaTinh;
       const newTenTinh= action.payload.TenTinh;
       const newThongTin= action.payload.ThongTin;
       const newrefechMaTinh=action.payload.refechMaTinh
       
      return {...state,
        MaTinh: newMaTinh,
        TenTinh: newTenTinh,
        ThongTin:newThongTin,
        refechMaTinh:newrefechMaTinh
         };
           };
    case 'ADD_MATINH':{
    const newMaTinh = action.payload.MaTinh;
    return {...state,
      MaTinh: newMaTinh,
      };
        };
      case 'ADD_THONGBAO_KIEMTRA':{
       const newThongBaoAbita = action.payload.ThongBaoAbita;
       return {...state,
        ThongBaoAbita: newThongBaoAbita,
         };
           };
      case 'ADD_DANGNHAP':{
        const newSoDienThoai = action.payload.SoDienThoai;
        const newrefreshToken = action.payload.refreshToken;
       const newTaiKhoan = action.payload.TaiKhoan;
       const newPassWord = action.payload.PassWord;
       const newTenTaiKhoan = action.payload.TenTaiKhoan;
       const newKhoa = action.payload.Khoa;
       const newMaUid = action.payload.MaUid;
       const newAmin = action.payload.Amin;
       const newThoiGianXoa_TaiKhoan=action.payload.ThoiGianXoa_TaiKhoan
       return {...state,
        SoDienThoai:newSoDienThoai,
        refreshToken:newrefreshToken,
        TaiKhoan:newTaiKhoan,
        PassWord:newPassWord,
        TenTaiKhoan:newTenTaiKhoan,
        Khoa:newKhoa,
        MaUid:newMaUid,
        Amin:newAmin,
        ThoiGianXoa_TaiKhoan:newThoiGianXoa_TaiKhoan
         };
           };
      case 'REMOVE_DONHANG':{
       const newDonHang1 = action.payload;
       return {...state,
        DonHang:newDonHang1,
       
         };
           };
       case 'ADD_DATADONHANG':{
        const newDonHang1 = action.payload;
        return {...state,
         DonHang:newDonHang1,
         }
    };
    case 'ADD_DINHVI':{
      const newDinhVi = action.payload.DinhVi;
      return {...state,
       DinhVi:newDinhVi,
      
      };
    };
    case 'ADD_WIFI':{
      const newWifi = action.payload.Wifi;
      return {...state,
        Wifi:newWifi,
      
      };
    };
    case 'ADD_TO_HISTORY':{
    	const newdataHistory = [...state.dataHistory];
      const newDataHistory = newdataHistory.filter(e=>  e.IDCHITIETSP !== action.payload.IDCHITIETSP);
            newDataHistory.unshift(action.payload);
      
      return {
        ...state,
      	dataHistory:newDataHistory,
      };
    }
    case 'REMOVE_TO_HISTORY': {
      const newdataHistory = [...state.dataHistory];
      const newDataHistory = newdataHistory.filter(e=>  e.IDCHITIETSP !== action.payload.IDCHITIETSP);
    	return {
        ...state,
        dataHistory: newDataHistory,
      };
    };
    case 'REMOVE_ADD_HISTORY': {
      const newdataHistory = action.payload;
      return {...state,
        dataHistory:newdataHistory
          };
     };
     case 'ADD_PUSHTHONGBAO':{
      const newPushThongBao = action.payload.PushThongBao;
      return {...state,
        PushThongBao:newPushThongBao,
      
      };
    };
    case 'ADD_FONT':{
      const newAddFont = action.payload.AddFont;
      return {...state,
        AddFont:newAddFont,
        };
      };
    case 'ADD_THONGBAO_DONHANG':{
      const newdatathongbao = [...state.ThongBao_DonHang];
      const newThongBao_DonHang = newdatathongbao.filter(e=>  e.MaDonHang!== action.payload.MaDonHang);
      newThongBao_DonHang.push(action.payload);
      
      return {
        ...state,
        ThongBao_DonHang: newThongBao_DonHang,
      };
    }
    case 'REMOVE_THONGBAO_DONHANG': {
      const newdatathongbao = [...state.ThongBao_DonHang];
      const newThongBao_DonHang = newdatathongbao.filter(e=>  e.MaDonHang!== action.payload.MaDonHang);
    	return {
        ...state,
        ThongBao_DonHang:newThongBao_DonHang,
      };
    };
    case 'ADD_THONGBAO':{
      const newthongbao = [...state.ThongBao];
      const newThongBao = newthongbao.filter(e=>  e.MaDonHang!== action.payload.MaDonHang);
      newThongBao.push(action.payload);
      
      return {
        ...state,
        ThongBao: newThongBao,
      };
    };
    case 'ADD_TIMKIEM':{
      const newtimkiem = [...state.TimKiem];
      const newTimKiem = newtimkiem.filter(e=> e!== action.payload);
      newTimKiem.push(action.payload);
      
      return {
        ...state,
        TimKiem:newTimKiem,
      };
    }
    case 'ADD_TOKEN':{
      const newToKen = action.payload;
      return {...state,
        ToKen:newToKen,
        };
      };
    default:
    return state
  }
 
  
}

export default cartReducer;