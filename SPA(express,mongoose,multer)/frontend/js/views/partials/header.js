import Component from '../../views/component';
import {confirmAction} from '../../helpers/utils';

import Users from '../../models/Users';

import HeaderTemplate from '../../../templates/partials/header';

class Header extends Component {
    constructor() {
		super();

		this.userModel = new Users();
	}

    render() {
        const resource = this.request.resource;

        return new Promise(resolve => resolve(HeaderTemplate({
            existRole: (localStorage.getItem('role')),
            isSearchPage: (resource === 'search'),
            isStructurePage: (resource === 'structure'),
            isAuthorizationPage: (resource === 'authorization'),
            role: (localStorage.getItem('role'))
        })));
    }

    afterRender() {
		this.setActions();
    }

	setActions() {
        const exitBtn = document.getElementsByClassName('header__authorization')[0],
            resource = this.request.resource;

        if (exitBtn) {
            let currentUser = exitBtn.textContent.trim().toLocaleLowerCase();

            exitBtn.addEventListener('mouseover', () => {
                if (currentUser && resource !== '') {
                    exitBtn.textContent = 'log out';
                    exitBtn.title = 'Click here to log out and go to the login page!';
                }
            }, false);

            exitBtn.addEventListener('mouseout', () => {
                if (currentUser && resource !== '') {
                    exitBtn.textContent = localStorage.getItem('role');
                }
            }, false);

            exitBtn.addEventListener('click', () => {
                if (currentUser && resource !== '') {
                    return new Promise(() => confirmAction('log out and go to the login page')
                        .then(confirmation => confirmation && (location.hash = '#/')));
                }
            }, false);
        }
    }
}

export default Header;