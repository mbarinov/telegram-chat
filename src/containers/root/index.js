import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import {ChatPage} from '../../pages';
import {websocketsOperations} from '../../ducks';

class RootContainer extends Component {
	static propTypes = {
		initWS: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const {initWS} = this.props;
		initWS();
	}

	render() {
		return (
			<ChatPage />
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators(websocketsOperations, dispatch),
	};
};

export default connect(null, mapDispatchToProps)(RootContainer);
