import 'babel-polyfill';
import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import RedBox from 'redbox-react';

import {RootContainer} from './containers';
import './api/websocket.mocks';
import configureStore from './store';
const store = configureStore();
import './styles/index.styl';

try {
	render(
		<Provider store={store}>
			<RootContainer />
		</Provider>,
		document.getElementById('app'),
	);
} catch (e) {
	render(<RedBox error={e} />, document.getElementById('app'));
}
