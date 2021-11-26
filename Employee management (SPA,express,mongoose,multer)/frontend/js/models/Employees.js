class Employees {
	searchEmployees(searchParams) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', 'http://localhost:4000/api/employees_search');
			xhr.setRequestHeader('Content-type', 'application/json');
			xhr.onload = () => {
				try {
					resolve(JSON.parse(xhr.response));
				} catch (err) {
					resolve(err);
				}
			};
			xhr.send(JSON.stringify(searchParams));
		});
	}

	getEmployee(id) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', `http://localhost:4000/api/employee/${id}`);

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

	removeEmployee(id) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', `http://localhost:4000/api/employee/remove/${id}`);

			xhr.onload = () => resolve();

			xhr.send();
		});
	}
}

export default Employees;