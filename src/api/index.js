import faker from 'faker';
import {
	dialogs,
	getRandomDialog,
	users,
} from './mocks';

export const fetchDialogsMock = (start = 0, count = 10) => {
	console.info('API call: fetchDialogsMock', {
		startIndex: start,
		endIndex: count,
	});

	const paginatedDialogs = dialogs.slice(start, start + count);
	const byId             = paginatedDialogs.reduce((acc, value) => {
		acc[value.id] = {
			...value,
		};
		return acc;
	}, {});
	const byIndex          = paginatedDialogs.map(dialog => {
		return dialog.id;
	});

	const data = {
		start,
		end: start + count,
		total: dialogs.length,
		hasMore: dialogs.length > start + count,
		byId,
		byIndex,
	};

	return new Promise(resolve => {
		setTimeout(() => {
			resolve(data);
		}, 666);
	});
};

export const markAsReadMock = dialogId => {
	console.info('API call: markAsReadMock', {
		dialogId,
	});
	const data = dialogs.find((d) => d.id === dialogId)

	data.unread = null;
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(data);
		});
	})
}

export const newDialog = () => {
	const {userName, userId} = users[dialogs.length + 1];
	const dialog             = getRandomDialog(1, true);
	dialog.userName = userName;
	dialog.userId = userId;
	dialogs.unshift({
		...dialog,
		userName,
		userId,
	});

	return {...dialog};
}

export const newMessage = () => {
	const dialog  = dialogs[Math.floor(Math.random() * dialogs.length)];
	dialog.unread = dialog.unread === null ? 1 : dialog.unread += 1;
	dialog.updatedAt = new Date();
	dialogs.splice(dialogs.indexOf(dialog), 1);
	dialogs.unshift(dialog);

	return {
		...dialog,
	};
}

export const newLastMessage = () => {
	const idx            = getRandomNumberBetween(0, 5);
	const lastDialog     = dialogs[idx];
	lastDialog.unread += 1;
	lastDialog.updatedAt = new Date();
	lastDialog.text      = faker.lorem.words();

	dialogs.splice(dialogs.indexOf(lastDialog), 1);
	dialogs.unshift(lastDialog);

	return {
		...lastDialog,
	};
}

function getRandomNumberBetween(start = 1, end = 7) {
	return Math.floor(Math.random() * end) + start;
}
