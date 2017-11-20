class WSMock {
	constructor() {
		this.listeners = []
	}

	onmessage(callback) {
		this.listeners.push(callback);
	}

	sendMessage(data) {
		this.listeners.forEach(listener => {
			listener(data);
		})
	}
}

window.wsMock = new WSMock();
