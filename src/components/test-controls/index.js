import React, {Component} from 'react';
import {
	newDialog,
	newLastMessage,
	newMessage
} from '../../api';
import './styles.styl'

class TestControls extends Component {
	constructor() {
		super()
	}

	emitNewDialog() {
		wsMock.sendMessage({
			type: 'ws/NEW_DIALOG',
			payload: {
				dialog: newDialog(),
			}
		})
	}

	emitNewMessage() {
		wsMock.sendMessage({
			type: 'ws/NEW_MESSAGE',
			payload: {
				dialog: newMessage(),
			}
		})
	}

	emitLastMessage() {
		wsMock.sendMessage({
			type: 'ws/NEW_LAST_MESSAGE',
			payload: {
				dialog: newLastMessage(),
			}
		})
	}

	render() {
		return (
			<div className="test-controls">
				<div className="test-controls__buttons">
					<h1 className="test-controls__title">IQ Chat</h1>
					<h3 className="test-controls__subtitle">Тестовые события</h3>

					<div className="test-control">
						<p className="test-control__description">Новый пользователь отправил сообщение (Новый диалог).</p>
						<div className="button" onClick={this.emitNewDialog}>Вжух!</div>
					</div>
					<div className="test-control">
						<p className="test-control__description">Новое сообщение от случайного пользователя, который уже есть в списке.</p>
						<div className="button" onClick={this.emitNewMessage}>Вжух №2!</div>
					</div>
					<div className="test-control">
						<p className="test-control__description">Новое сообщение от случайного пользователя, который уже есть в списке и которого сейчас видно на
							экране (Один из последних диалогов).</p>
						<div className="button" onClick={this.emitLastMessage}>Вжух №3</div>
					</div>
					<span className="iguessitsdoneprettywell">Crafted with ❤️ by Max Barinov</span>
				</div>
			</div>
		);
	}
}

export default TestControls;
