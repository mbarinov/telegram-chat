import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import './styles.styl';
import {DialogList} from '../../components';
import {
	dialogsOperations,
	dialogsSelectors,
} from '../../ducks';

class DialogListContainer extends Component {
	static propTypes = {
		 dialogs: PropTypes.any.isRequired,
		 fetchDialogs: PropTypes.func.isRequired,
		 markAsRead: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const {fetchDialogs} = this.props;

		fetchDialogs();
	}

	render() {
		const {dialogs, fetchDialogs, markAsRead} = this.props;

		const content = dialogs.items !== null ? <DialogList
			dialogs={dialogs}
			markAsRead={markAsRead}
			fetchDialogs={fetchDialogs}
		/> : <span className="dialog-list__loader">Loading...</span>;
		return (
			<div className="dialog-list-container">
				{content}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		dialogs: dialogsSelectors.getDialogsSelector(state),
	};
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators(dialogsOperations, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogListContainer);
