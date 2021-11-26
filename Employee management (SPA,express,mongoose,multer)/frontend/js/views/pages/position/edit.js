import Component from '../../component';

import Employees from '../../../models/Employees';
import Positions from '../../../models/Positions';

import EditTemplate from '../../../../templates/pages/position/edit';

import Error404 from '../error404';

class Edit extends Component {
	constructor() {
		super();

		this.employeeModel = new Employees();
		this.positionModel = new Positions();
	}

	getData() {
		return new Promise(resolve => this.employeeModel.getEmployee(this.request.id).then(UpdatedPosition => {
			this.UpdatedPosition = UpdatedPosition;

			resolve(UpdatedPosition);
		}));
	}

	render(UpdatedPosition) {
        return new Promise(resolve => {
            let html;

			if (Object.keys(UpdatedPosition).length) {
				html = EditTemplate({
					serverHref: `http://localhost:4000/api/position/edit/${this.request.id}`,
					photo: UpdatedPosition.photo,
					status: UpdatedPosition.status || 'vacation',
					namesEng: `${UpdatedPosition.namesEng[0] === 'vacant' ? '' : `${UpdatedPosition.namesEng[0]} ${UpdatedPosition.namesEng[1]}`}`,
					namesRus: `${UpdatedPosition.namesRus[0] ? `${UpdatedPosition.namesRus[0]} ${UpdatedPosition.namesRus[1]}` : ''}`,
					patronymicRus: UpdatedPosition.patronymicRus,
					department: UpdatedPosition.department,
					project: UpdatedPosition.project,
					position: UpdatedPosition.position,
					lastPromotion: UpdatedPosition.lastPromotion,
					phoneMob: UpdatedPosition.phoneMob || '+375(29)',
					phoneStat: UpdatedPosition.phoneStat,
					email: UpdatedPosition.email,
					skype: UpdatedPosition.skype,
					hireDate: UpdatedPosition.hireDate,
					vacationStartDate: UpdatedPosition.vacationStartDate,
					birthDate: UpdatedPosition.birthDate
				});
			} else {
				html = new Error404().render();
			}

			resolve(html);
        });
    }

	afterRender() {
        document.getElementsByTagName('main')[0].classList = 'employee';

		if (this.UpdatedPosition.status) document.getElementsByClassName(`${this.UpdatedPosition.status}`)[0].selected = true;
		if (this.UpdatedPosition.sex) document.getElementsByClassName(`${this.UpdatedPosition.sex.toLowerCase()}`)[0].selected = true;

		this.setActions();
    }

	setActions() {
        const backBtn = document.getElementsByClassName('employee__back')[0],
			editEmployeeBtn = document.getElementsByClassName('employee__edit')[0],
			form = document.getElementsByTagName('form')[0],
			employeeStatusImg = document.getElementsByClassName('employee__status_img')[0],
			employeeStatus = document.getElementsByClassName('status')[0],
            downloadBtn = document.getElementsByClassName('employee__download_photo')[0],
            employeePhoto = document.getElementsByClassName('employee__photo')[0];

		editEmployeeBtn.disabled = true;

		form.addEventListener('keydown', () => editEmployeeBtn.disabled = false);
		backBtn.addEventListener('click', () => window.history.go(-1), false);
		employeeStatusImg.addEventListener('click', () => this.changeStatusImg(employeeStatusImg, editEmployeeBtn, employeeStatus), false);
		employeeStatus.addEventListener('change', () => employeeStatusImg.src = `http://localhost:4000/icons/${employeeStatus.value}.png`, false);
		employeePhoto.addEventListener('click', () => this.triggerDownload(downloadBtn), false);
        downloadBtn.addEventListener('change', () => this.choseeEmployeePhoto(event, downloadBtn, employeePhoto, editEmployeeBtn), false);
    }

    triggerDownload(downloadBtn) {
		downloadBtn.click();
    }

	choseeEmployeePhoto(event, downloadBtn, employeePhoto, editEmployeeBtn) {
		if (event.target.files.length) {
			if (event.target.files[0].type.match('image')) {
				const reader = new FileReader();

				reader.onload = () => employeePhoto.src = reader.result;
				reader.readAsDataURL(downloadBtn.files[0]);
				editEmployeeBtn.disabled = false;
			} else {
				alert('Choosen file isn`t image!');
			}
		}
	}

	changeStatusImg(employeeStatusImg, editEmployeeBtn, employeeStatus) {
		editEmployeeBtn.disabled = false;

		switch (employeeStatusImg.src) {
			case 'http://localhost:4000/icons/active.png':
				employeeStatusImg.src = 'http://localhost:4000/icons/ill.png';
				employeeStatus.value = 'ill';
				break;
			case 'http://localhost:4000/icons/ill.png':
				employeeStatusImg.src = 'http://localhost:4000/icons/vacation.png';
				employeeStatus.value = 'vacation';
				break;
			case 'http://localhost:4000/icons/vacation.png':
				employeeStatusImg.src = 'http://localhost:4000/icons/active.png';
				employeeStatus.value = 'active';
				break;
		}
	}
}

export default Edit;