import Component from '../../component';
import {capitalizeFirstLetter} from '../../../helpers/utils';

import Employees from '../../../models/Employees';

import InfoTemplate from '../../../../templates/pages/position/info';
import InfoErrorTemplate from '../../../../templates/pages/position/info_error';

import Error404 from '../error404';

class Info extends Component {
	constructor() {
		super();

		this.model = new Employees();
	}

	getData() {
		return new Promise(resolve => this.model.getEmployee(this.request.id).then(employee => {
			this.employee = employee;

			resolve(employee);
		}));
	}

	render(employee) {
        return new Promise(resolve => {
            let html;

			if (Object.keys(employee).length) {
				let names = capitalizeFirstLetter([
					employee.namesEng[0], employee.namesEng[1], employee.namesRus[0], employee.patronymicRus, employee.namesRus[1], employee.project
				]);

				html = InfoTemplate({
					showButton: (window.history.length === 1 || this.request.action !== 'info'),
					isNewTab: (window.history.length === 1),
					isNotUser: (localStorage.getItem('role') !== 'user'),
					photo: employee.photo,
					status: employee.status,
					sex: employee.sex,
					namesEng: `${names[0]} ${names[1]}`,
					namesRus: `${names[2]} ${names[3]} ${names[4]}`,
					editPageHref: `#/position/${this.request.id}/edit`,
					department: employee.department,
					project: names[5],
					position: employee.position,
					lastPromotion: employee.lastPromotion || 'Employee hasn`t promoted yet',
					phoneMob: employee.phoneMob,
					phoneStat: employee.phoneStat || 'Employee hasn`t stationary phone',
					email: employee.email,
					skype: employee.skype || 'Employee hasn`t skype',
					hireDate: employee.hireDate,
					vacationStartDate: employee.vacationStartDate || 'Vacation start date hasn`t set yet',
					birthDate: employee.birthDate
				});
			} else if (employee.message) {
				html = 	InfoErrorTemplate();
			} else {
				html = new Error404().render();
			}

			resolve(html);
		});
    }

	afterRender() {
		const role = document.getElementsByClassName('header__authorization')[0];

        document.getElementsByTagName('main')[0].classList = 'employee';

		role && (role.textContent = localStorage.getItem('role'));

		document.getElementsByTagName('form')[0] && this.setActions();
    }

	setActions() {
        const backBtn = document.getElementsByClassName('employee__back')[0];

		backBtn && backBtn.addEventListener('click', () => window.history.length === 1 ? window.close() : window.history.go(-1), false);
    }
}

export default Info;