import getType, {WS_INIT_SUCCESS}from './types';

export const initWS = () => {
	return dispatch => {
		dispatch({
			type: WS_INIT_SUCCESS,
		});

		wsMock.onmessage(message => {
			const type = getType(message.type);

			console.log('Received WS message:', type);

			if (type) {
				dispatch({
					type,
					payload: message.payload,
				});
			}
		});
	}
}
