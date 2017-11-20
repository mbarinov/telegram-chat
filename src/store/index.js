import {
	applyMiddleware,
	compose,
	createStore,
} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import reducers from '../ducks';

const logger = createLogger({
	collapsed: true,
});

export default () => {
	/* eslint-disable no-underscore-dangle */
	const store = createStore(
		reducers,
		compose(
			applyMiddleware(thunk, logger),
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		),
	);
	/* eslint-enable */

	return store;
};
