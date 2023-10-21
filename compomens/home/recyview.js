import React, {
    memo,
    useMemo,
    useRef,
    useState,
    useEffect,
    useCallback,
  } from 'react';
  import {
    View,
    Text,
    Dimensions,
    ScrollView,
    Button,
    ActivityIndicator,
    RefreshControl,
  } from 'react-native';
  import {
    RecyclerListView,
    DataProvider,
    LayoutProvider,
    BaseScrollView,
  } from 'recyclerlistview'; // Version can be specified in package.json
  import Header_Home from '../header/header_home';
  const ViewTypes = {
    FULL: 0,
    HALF_LEFT: 1,
    HALF_RIGHT: 2,
  };
  
  let containerCount = 0;
  
  const pageSize = 4;
  
  let { width } = Dimensions.get('window');
  
  const ListView = memo(() => {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
  
    const _layoutProvider = useRef(layoutMaker()).current;
  
    const listView = useRef();
  
    const dataProvider = useMemo(() => dataProviderMaker(data), [data]);

    const load = useCallback(
      async (data, more = false) => {
        try {
          if (more) setIsLoadingMore(!!more);
          else setIsLoading(true);
  
          const resData = await fake(data);
          setData(resData);
        } catch (e) {
          console.log(e);
        } finally {
          if (more) {
            setIsLoadingMore(false);
          } else {
            setIsLoading(false);
            setIsLoadingMore(false);
            !loaded && setLoaded(true);
          }
        }
      },
      [loaded]
    );
  
    const loadMore = () => {
      console.log('end');
      load([...data, ...generateArray(pageSize)], true);
    };
  
    const refresh = async () => {
      load(generateArray(pageSize));
    };
  
  
  
    return (
      <View style={{ flex: 1}}>
        <Header_Home/>
     {data.map(e=>
        <View>
            <CellContainer >
            <Text>Data: {data}</Text>
          </CellContainer>
        </View>
        )}
      </View>
    );
  });
  
  const layoutMaker = () =>
    new LayoutProvider(
      (index) => {
        if (index  === 0) {
          return ViewTypes.FULL;
        } else if (index % 3 === 1) {
          return ViewTypes.HALF_LEFT;
        } else {
          return ViewTypes.HALF_RIGHT;
        }
      },
      (type, dim) => {
        switch (type) {
          case ViewTypes.HALF_LEFT:
            dim.width = width / 2;
            dim.height = 160;
            break;
          case ViewTypes.HALF_RIGHT:
            dim.width = width / 2 - 0.001;
            dim.height = 160;
            break;
          case ViewTypes.FULL:
            dim.width = width;
            dim.height = 160;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
        }
      }
    );
  
  const rowRenderer = (type, data) => {
    switch (type) {
      case ViewTypes.HALF_LEFT:
        return (
          <CellContainer style={styles.containerGridLeft}>
            <Text>Data: {data}</Text>
          </CellContainer>
        );
      case ViewTypes.HALF_RIGHT:
        return (
          <CellContainer style={styles.containerGridRight}>
            <Text>Data: {data}</Text>
          </CellContainer>
        );
      case ViewTypes.FULL:
        return (
            <Header_Home />
        );
      default:
        return null;
    }
  };
  
  const RenderFooter = ({ loading }) =>
    loading && (
      <ActivityIndicator
        style={{ margin: 20, alignSelf: 'center', flex: 1 }}
        size="large"
      />
    );
  
  const dataProviderMaker = (data) =>
    new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data);
  
  const generateArray = (n) => {
    let arr = new Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = i;
    }
    return arr;
  };
  
  class ExternalScrollView extends BaseScrollView {
    scrollTo = (...args) => {
      if (this._scrollViewRef) {
        this._scrollViewRef.scrollTo(...args);
      }
    };
  
    render() {
      return (
        <ScrollView
          {...this.props}
          ref={(scrollView) => {
            this._scrollViewRef = scrollView;
          }}
        />
      );
    }
  }
  
  class CellContainer extends React.Component {
    constructor(args) {
      super(args);
      this._containerId = containerCount++;
    }
    render() {
      return (
        <View {...this.props}>
          {this.props.children}
          <Text>Cell Id: {this._containerId}</Text>
        </View>
      );
    }
  }
  
  const fake = (data) => {
    return new Promise(function (resolve, reject) {
      try {
        setTimeout(() => {
          resolve(data);
        }, 3000);
      } catch (e) {
        reject(e);
      }
    });
  };
  
  export default ListView;
  
  const styles = {
    container: {
      justifyContent: 'space-around',
      alignItems: 'center',
      flex: 1,
      backgroundColor: 'orange',
    },
    containerGridLeft: {
      justifyContent: 'space-around',
      alignItems: 'center',
      flex: 1,
      backgroundColor: 'yellow',
    },
    containerGridRight: {
      justifyContent: 'space-around',
      alignItems: 'center',
      flex: 1,
      backgroundColor: 'blue',
    },
  };
  