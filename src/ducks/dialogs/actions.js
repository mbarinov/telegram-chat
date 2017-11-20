import {
	fetchDialogsMock,
	markAsReadMock
} from '../../api';
import {
	FETCH_DIALOGS,
	FETCH_DIALOGS_SUCCESS,
	MARK_AS_READ,
	MARK_AS_READ_SUCCESS,
} from './types';

export const fetchDialogs = (start = 0, count = 30) => {
	return dispatch => {
		dispatch({
			type: FETCH_DIALOGS,
			payload: {
				start,
				count,
			}
		});

		return fetchDialogsMock(start, count)
			.then(data => {
				dispatch({
					type: FETCH_DIALOGS_SUCCESS,
					payload: data,
				});
			});
	};
}

export const markAsRead = dialogId => {
	return dispatch => {
		dispatch({
			type: MARK_AS_READ,
			payload: {
				dialogId,
			}
		});

		return markAsReadMock(dialogId)
			.then((data) => {
				dispatch({
					type: MARK_AS_READ_SUCCESS,
					payload: data,
				});
			})

	}
}
