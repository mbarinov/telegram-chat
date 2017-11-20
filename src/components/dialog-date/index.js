import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class DialogDate extends Component {
	static propTypes = {
		date: PropTypes.instanceOf(Date).isRequired,
	}

	constructor() {
		super();
	}

	getDate = () => {
		const {date}   = this.props;
		const dateDiff = (Date.now() - date.getTime()) / (1000 * 3600);

		if (dateDiff < 24) {
			return moment(date).format('hh:mm A');
		} else if (dateDiff < 168) {
			return moment(date).format('ddd');
		} else {
			return moment(date).format('D/M/YY');
		}
	}

	render() {
		const date = this.getDate();
		return (
			<span>{date}</span>
		)
	}
}

export default DialogDate;
