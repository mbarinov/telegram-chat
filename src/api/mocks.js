import faker from 'faker';
export const users   = getFakeUsers();
export const dialogs = getFakeDialogs({
	users,
	count: 420,
	minUnread: 3,
	maxUnread: 8,
});

function getFakeUsers(count = 1024) {
	return getDefinedArray(count).map(() => {
		return {
			userId: faker.random.uuid(),
			userName: faker.name.findName(),
			dialogs: [],
		}
	});
}

function getFakeDialogs({
	users,
	count = 42,
	minUnread = 3,
	maxUnread = 9,
}) {
	const dialogs = getDefinedArray(count)
		.reduce(acc => {
			const randomDialog = getRandomDialog();
			acc.push(randomDialog);
			return acc;
		}, [])
		.sort((a, b) => b.updatedAt - a.updatedAt);

	dialogs.forEach((dialog, idx) => {
		const {userId, userName} = users[idx];
		dialog.userId = userId;
		dialog.userName = userName;

		users[idx].dialogs.push(dialog.id);
	})

	getDefinedArray(getRandomNumberBetween(minUnread, maxUnread)).forEach((value, idx) => {
		dialogs[idx].unread = getRandomNumberBetween(1, 4);
	});

	function getRandomNumberBetween(start = 1, end = 7) {
		return Math.floor(Math.random() * end) + start;
	}

	return dialogs;
}

function getDefinedArray(length) {return Array.from({length});}

export function getRandomDialog(unread = null, now = false) {
	return {
		id: faker.random.uuid(),
		text: faker.lorem.words(),
		updatedAt: now ? new Date() : faker.date.past(),
		unread,
	}
}
