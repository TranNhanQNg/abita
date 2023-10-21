import { combineReducers } from 'redux';
import cartReducer from './cartReducer';

const rootDucer = combineReducers({
	cart:cartReducer,
	
});
export default rootDucer;