import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
	InfiniteLoader,
	List,
} from 'react-virtualized';
import 'react-virtualized/styles.css'

import Dialog from '../dialog';

class DialogList extends Component {
	static propTypes = {
		dialogs: PropTypes.any.isRequired,
		fetchDialogs: PropTypes.func.isRequired,
		markAsRead: PropTypes.func.isRequired,
	}

	constructor() {
		super();
	}

	state = {
		height: window.innerHeight,
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	componentDidUpdate() {
		this.__list.forceUpdateGrid()
	}

	loadMore = ({stopIndex, startIndex}) => {
		const {fetchDialogs, dialogs: {isLoading, items: {hasMore}}} = this.props;

		if (!isLoading && hasMore) {
			fetchDialogs(startIndex, stopIndex);
		}
	}

	rowRenderer = ({index, style}) => {
		const {dialogs: {items: {byIndex, byId}}, markAsRead} = this.props;
		const dialog                                          = byId[byIndex[index]];

		return (
			<div
				style={style}
				key={index}>
				{dialog && dialog.id &&
				<Dialog markAsRead={markAsRead} {...dialog} />
				}
			</div>
		)
	}

	isRowLoaded = ({index}) => {
		const {dialogs: {items: {byIndex}}} = this.props;

		return !!byIndex[index];
	}

	updateDimensions = () => {
		this.setState({
			height: window.innerHeight,
		});
	}

	render() {
		const {dialogs} = this.props;
		const {height}  = this.state;

		return (
			<InfiniteLoader
				isRowLoaded={this.isRowLoaded}
				loadMoreRows={this.loadMore}
				rowCount={dialogs.items.total}>
				{({onRowsRendered, registerChild}) => (
					<List
						ref={(list) => {
							this.__list = list;
							return registerChild();
						}}
						height={height}
						onRowsRendered={onRowsRendered}
						rowCount={dialogs.items.total}
						rowHeight={62}
						rowRenderer={this.rowRenderer}
						width={300}
					/>
				)}
			</InfiniteLoader>
		)
	}
}

export default DialogList;
