import Component from '../../views/component';

import Users from '../../models/Users';

import AuthorizationTemplate from '../../../templates/pages/authorization';

class Authorization extends Component {
    constructor() {
		super();

		this.userModel = new Users();
	}

    render() {
        return new Promise(resolve => resolve(AuthorizationTemplate()));
    }

    afterRender() {
        document.getElementsByTagName('main')[0].classList = '';

        localStorage.removeItem('role');

        this.setActions();
    }

    setActions() {
        const login = document.getElementsByClassName('employee__login')[0],
            password = document.getElementsByClassName('employee__password')[0],
            logInBtn = document.getElementsByClassName('user__login')[0];

        logInBtn.addEventListener('click', () => this.logIn({login: login.value.trim(), password: password.value.trim()}, login, password), false);
    }

    logIn(user, login, password) {
		return new Promise(() => this.userModel.checkUser(user).then(response => {
            if (!response.role) {
                if (response.error === 'login') {
                    login.value = '';
                    login.classList.add('warning');
                    password.classList.remove('warning');
                } else {
                    password.value = '';
                    password.classList.add('warning');
                    login.classList.remove('warning');
                }

                document.getElementsByClassName('error__message')[0].textContent = response.message;

                return ;
            }

            localStorage.setItem('role', response.role);
            sessionStorage.setItem('userID', response._id);

            sessionStorage.setItem('searchText', response.searchParams && response.searchParams.searchText || '');
            sessionStorage.setItem('searchType', response.searchParams && response.searchParams.searchType || '');
            sessionStorage.setItem('active', response.searchParams && response.searchParams.active || '');
            sessionStorage.setItem('resultWiev', response.searchParams && response.searchParams.resultWiev || '');

            location.hash = '#/structure';
        }));
    }
}

export default Authorization;