import {combineReducers} from 'redux';
import {
	reducers as dialogs,
} from './dialogs';

export {
	dialogsSelectors,
	dialogsOperations,
} from './dialogs';
export {
	websocketsOperations
} from './websockets';

export default combineReducers({
	dialogs,
});

