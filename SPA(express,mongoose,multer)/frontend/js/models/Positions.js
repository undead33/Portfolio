class Positions {
	getPositionsStructure() {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', 'http://localhost:4000/api/positions_structure');

			xhr.onload = () => {
				try {
					resolve(JSON.parse(xhr.response));
				} catch (err) {
					resolve(err);
				}
			};

			xhr.send();
		});
    }

	addPosition(newPosition) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('PUT', 'http://localhost:4000/api/position/add');
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve(xhr.response);

			xhr.send(JSON.stringify(newPosition));
		});
	}

	removePosition(id) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('DELETE', `http://localhost:4000/api/position/remove/${id}`);
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve();

			xhr.send();
		});
	}
}

export default Positions;