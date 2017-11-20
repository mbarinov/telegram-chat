import React, {Component} from 'react';

import {DialogListContainer} from '../../containers';
import {TestControls} from '../../components';
import './styles.styl';

class ChatPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="chat-page-container">
				<DialogListContainer/>
				<TestControls />
			</div>
		);
	}
}

export default ChatPage;
