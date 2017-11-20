import {createReducer} from '../../utils/index';
import {
	FETCH_DIALOGS,
	FETCH_DIALOGS_SUCCESS,
	MARK_AS_READ_SUCCESS,
} from './types';
import {
	NEW_DIALOG,
	NEW_LAST_MESSAGE,
	NEW_MESSAGE
} from '../websockets/types';

const DialogsReducers = createReducer({
	isLoading: false,
	items: null,
})({
	[FETCH_DIALOGS]: fetchDialogsHandler,
	[FETCH_DIALOGS_SUCCESS]: fetchDialogsSuccessHandler,
	[MARK_AS_READ_SUCCESS]: markAsReadHandler,
	[NEW_DIALOG]: newDialogHandler,
	[NEW_MESSAGE]: newMessageHandler,
	[NEW_LAST_MESSAGE]: newMessageHandler,
});

export default DialogsReducers;

function fetchDialogsHandler(state) {
	return {
		...state,
		isLoading: true,
	};
}

function fetchDialogsSuccessHandler(state, action) {
	const payload = action.payload;

	if (state.items !== null) {
		/*
		* Merging dialogs
		* */
		const byIndex = state.items.byIndex.concat(payload.byIndex);
		const byId    = Object.keys(payload.byId).reduce((acc, dialogId) => {
			acc[dialogId] = payload.byId[dialogId];
			return acc;
		}, state.items.byId);

		var mergeObj = {
			byIndex,
			byId,
		}
	}

	return {
		isLoading: false,
		items: {
			...payload,
			...mergeObj,
		},
	};
}

function markAsReadHandler(state, action) {
	const {unread, id} = action.payload;
	const dialog       = state.items.byId[id];

	dialog.unread = unread;

	return {
		items: {
			...state.items,
		},
		isLoading: false,
	}
}

function newDialogHandler(state, action) {
	const {dialog}        = action.payload;
	const {byId, byIndex} = state.items;

	byId[dialog.id] = dialog;
	byIndex.unshift(dialog.id);

	return {
		...state,
		total: state.items.total += 1,
		items: {
			...state.items,
			byId,
			byIndex,
		}
	}
}

function newMessageHandler(state, action) {
	const {dialog} = action.payload;
	const byIndex  = state.items.byIndex.slice();

	byIndex.splice(byIndex.indexOf(dialog.id), 1);
	byIndex.unshift(dialog.id);

	const byId = {
		...state.items.byId,
		[dialog.id]: dialog,
	};

	return {
		...state,
		items: {
			...state.items,
			byIndex,
			byId,
		},
	};
}
