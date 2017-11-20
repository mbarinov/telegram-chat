export const NEW_DIALOG = 'ws/NEW_DIALOG';
export const NEW_MESSAGE = 'ws/NEW_MESSAGE';
export const NEW_LAST_MESSAGE = 'ws/NEW_LAST_MESSAGE';
export const WS_INIT_SUCCESS = 'ws/WS_INIT_SUCCESS';

const types = [
	NEW_DIALOG,
	NEW_MESSAGE,
	NEW_LAST_MESSAGE,
];

export default type => {
	return types.find(i => i === type);
}
