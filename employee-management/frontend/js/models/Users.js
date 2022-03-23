class Users {
	checkUser(user) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', 'http://localhost:4000/api/user/log_in');
			xhr.setRequestHeader('Content-type', 'application/json');

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send(JSON.stringify(user));
		});
	}

    saveSearchParams(params, id) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('PUT', `http://localhost:4000/api/user/save_search_params/${id}`);
			xhr.setRequestHeader('Content-type', 'application/json');

			xhr.onload = () => resolve();

			xhr.send(JSON.stringify(params));
		});
	}
}

export default Users;