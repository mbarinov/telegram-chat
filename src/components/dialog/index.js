import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';

import DialogDate from '../dialog-date';
import './styles.styl';

class Dialog extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		unread: PropTypes.number,
		updatedAt: PropTypes.instanceOf(Date).isRequired,
		userName: PropTypes.string.isRequired,
		markAsRead: PropTypes.func.isRequired,
	}

	constructor() {
		super()
	}

	markAsReadHandler = () => {
		const {
			      id,
			      unread,
			      markAsRead
		      } = this.props;

		if (unread) {
			markAsRead(id);
		}
	}

	render() {
		const {
			      text,
			      unread,
			      updatedAt,
			      userName,
		      }
			      = this.props;
		return (
			<div onClick={this.markAsReadHandler} className="dialog">
				<div className="dialog-avatar">
					<Avatar name={userName} size={42} round={true} />
				</div>
				<div className="dialog-data">
					<div className="dialog-data__title">{userName}</div>
					<div className="dialog-data__message">{text}</div>
				</div>
				<div className="dialog-metadata">
					<div className="dialog-metadata__date">
						<DialogDate date={updatedAt} />
					</div>
					{unread &&
					<div className="dialog-metadata__unread">{unread}</div>
					}
				</div>
			</div>
		);
	}
}

export default Dialog;
