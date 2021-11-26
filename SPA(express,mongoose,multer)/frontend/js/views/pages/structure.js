import Component from '../component';
import Error404 from './error404';
import {redirectTo, confirmAction, capitalizeFirstLetter} from '../../helpers/utils';

import Positions from '../../models/Positions';
import Employees from '../../models/Employees';

import ErrorTemplate from '../../../templates/pages/structure/error';
import PositionCreateTemplate from '../../../templates/pages/structure/position__create';
import PositionAddTemplate from '../../../templates/pages/structure/position__add';
import PositionVacantTemplate from '../../../templates/pages/structure/position__vacant';

class Structure extends Component {
    constructor() {
		super();

		this.positionsModel = new Positions();
        this.employeesModel = new Employees();
	}

	getData() {
		return new Promise(resolve => this.positionsModel.getPositionsStructure().then(employees => resolve(employees)));
	}

    render(employees) {
		return new Promise(resolve => {
            let html;

			if (employees.length) {
                const mentorsQAD = employees.filter(employee => employee.department === 'qa' && employee.position.split(' ')[0] !== 'junior'),
                    employeesQAD = employees.filter(employee => employee.department === 'qa' && employee.position.startsWith('junior')),
                    mentorsWDD = employees.filter(employee => employee.department === 'wd' && employee.position.split(' ')[0] !== 'junior'),
                    employeesWDD = employees.filter(employee => employee.department === 'wd' && employee.position.startsWith('junior')),
                    mentorsFED = employees.filter(employee => employee.department === 'fe' && employee.position.split(' ')[0] !== 'junior'),
                    employeesFED = employees.filter(employee => employee.department === 'fe' && employee.position.startsWith('junior'));

				html = `
                    ${PositionCreateTemplate({isAdmin: (localStorage.getItem('role') === 'admin'), isNotUser: !(localStorage.getItem('role') === 'user')})}
					<section class="employee__structure">
                        <article class="qa">
                            <span><h1>quality assurance department</h1></span>
                            <div class="qa__mentors">${mentorsQAD.map(employee => this.getPositionHTML(employee)).join('\n ')}</div>
                            <div class="qa__employees">${employeesQAD.map(employee => this.getPositionHTML(employee)).join('\n ')}</div>
                        </article>
                        <article class="wd">
                            <span><h1>web design department</h1></span>
                            <div class="wd__mentors">${mentorsWDD.map(employee => this.getPositionHTML(employee)).join('\n ')}</div>
                            <div class="wd__employees">${employeesWDD.map(employee => this.getPositionHTML(employee)).join('\n ')}</div>
                        </article>
                        <article class="fe">
                            <span><h1>frontend department</h1></span>
                            <div class="fe__mentors">${mentorsFED.map(employee => this.getPositionHTML(employee)).join('\n ')}</div>
                            <div class="fe__employees">${employeesFED.map(employee => this.getPositionHTML(employee)).join('\n ')}</div>
                        </article>
					</section>
				`;
			} else if (employees.message) {
				html = 	ErrorTemplate();
            } else {
				html = new Error404().render();
			}

			resolve(html);
        });
    }

    getPositionHTML(employee) {
        let names = capitalizeFirstLetter([
            employee.namesEng[0], employee.namesEng[1], employee.namesRus[0], employee.namesRus[1]
        ]);

        return `
            <a class="employee ${localStorage.getItem('role') === 'user' ? 'small' : ''}" data-id="${employee._id}"  
                ${names[0].toLowerCase() === 'vacant' ? '' : `href="http://localhost:5000/#/position/${employee._id}/info"`}>
                <h4>${employee.position.toUpperCase()}</h4>
                <img src="${employee.photo}" ${names[0].toLowerCase() === 'vacant' ? '' : 'class="employee" title="Click here to go to the employee page"'}>
                <h3 class="employee__namesEng">${names[0]}${names[1] ? ` ${names[1]}` : ''}</h3>
                <h4 class="employee__namesRus">${names[2] ? `${names[2]} ${names[3]}` : ''}</h4>
                ${localStorage.getItem('role') === 'user' ? '' : ` 
                    ${names[2] ? '<button class="employee__edit button">Edit employee</button>'
                        : '<button class="employee__add button">Add employee</button>'}
                    ${names[2] ? '<button class="employee__remove button">Remove employee</button>'
                        : localStorage.getItem('role') === 'admin' ? '<button class="position__remove button">Remove position</button>' : ''}
                `}
            </a>
        `;
    }

    afterRender() {
        document.getElementsByTagName('main')[0].classList = 'positions_structure';
        document.getElementsByClassName('header__authorization')[0].textContent = localStorage.getItem('role');

        document.getElementsByTagName('section')[0] && this.setActions();
    }

    setActions() {
        const addPositionBtn = document.getElementsByClassName('position__add')[0],
            positionCreation = document.getElementsByClassName('position__creation')[0],
            addPositionArea = document.getElementsByClassName('position__create')[0],
            confirmationResultMessage = document.getElementsByClassName('action_confirmation__result')[0],
            employeeStructure = document.getElementsByClassName('employee__structure')[0];

        employeeStructure.addEventListener('click', event => {
            const target = event.target;
            let id, removedPositionContainer, position, employeeCard, vacant;

            if (target.tagName === 'BUTTON') {
                switch (true) {
                    case (target.classList.contains('employee__edit') || target.classList.contains('employee__add')):
                        event.preventDefault();

                        target.parentNode.dataset.id && redirectTo('position', target.parentNode.dataset.id, 'edit');
                        break;

                    case (target.classList.contains('position__remove')):
                        return new Promise(() => confirmAction('remove this position').then(confirmation => {
                            if (confirmation) {
                                id = target.parentNode.dataset.id;
                                removedPositionContainer = target.parentNode.parentNode.classList.value;

                                target.parentNode.dataset.id = id;
                                this.deletePositionFromDB(id, removedPositionContainer, confirmationResultMessage);
                            }
                        }));

                    case (target.classList.contains('employee__remove')):
                        event.preventDefault();

                        return new Promise(() => confirmAction('remove this employee').then(confirmation => {
                            if (confirmation) {
                                position = target.parentNode.children[0].textContent;
                                employeeCard = target.parentNode;
                                vacant = {
                                    employee: 0,
                                    photo: 'http://localhost:4000/employees/vacant.png',
                                    namesEng: ['vacant'],
                                    namesRus: [''],
                                    position: position.toLowerCase(),
                                    _id: target.parentNode.dataset.id
                                };

                                switch (target.parentNode.parentNode.parentNode.children[0].textContent[0]) {
                                    case 'q':
                                        vacant.department = 'qa';
                                        break;

                                    case 'w':
                                        vacant.department = 'wd';
                                        break;

                                    case 'f':
                                        vacant.department = 'fe';
                                        break;
                                }

                                this.removeEmployeeFromDB(vacant, employeeCard, confirmationResultMessage);
                            }
                        }));
                }
            }
        });

        if (addPositionBtn) {
            positionCreation.addEventListener('click', event => {
                switch (true) {
                    case (event.target.parentNode.tagName === 'BUTTON' && event.target.parentNode.classList.contains('position__add')):
                        addPositionBtn.classList.add('hidden');
                        addPositionArea.classList.remove('hidden');
                        addPositionArea.classList.add('grid');

                        addPositionArea.insertAdjacentHTML('afterbegin', PositionAddTemplate());
                        break;

                    case (event.target.tagName === 'BUTTON' && event.target.classList.contains('position__save')):
                        addPositionBtn.classList.remove('hidden');
                        addPositionArea.classList.remove('grid');
                        addPositionArea.classList.add('hidden');

                        this.addPositionToDB();

                        while (addPositionArea.firstChild) addPositionArea.removeChild(addPositionArea.firstChild);
                        break;

                    case (event.target.tagName === 'IMG' && event.target.classList.contains('position__canceal')):
                        addPositionBtn.classList.remove('hidden');
                        addPositionArea.classList.remove('grid');
                        addPositionArea.classList.add('hidden');

                        while (addPositionArea.firstChild) addPositionArea.removeChild(addPositionArea.firstChild);
                        break;
                }
            });
        }
    }

    addPositionToDB() {
        const newPosition = {
            department: document.getElementsByClassName('department')[0].value.trim().toLowerCase(),
            position: document.getElementsByClassName('position')[0].value.trim().toLowerCase()
        };

        return new Promise(() => this.positionsModel.addPosition(newPosition)
            .then(addedPosition => this.addPositionToStructure(JSON.parse(addedPosition))));
    }

    addPositionToStructure(addedPosition) {
        let index = addedPosition.position.startsWith('junior') ? 2 : 1;
        const addedPositionContainer = document.getElementsByClassName(addedPosition.department)[0].children[index];

        addedPositionContainer.insertAdjacentHTML('beforeend', this.getPositionHTML(addedPosition));
    }

    deletePositionFromDB(id, removedPositionContainer, message, modalWindow) {
        return new Promise(() => this.positionsModel.removePosition(id).then(() => {
            this.deletePositionFromStructure(id, removedPositionContainer, message, modalWindow);
        }));
    }

    deletePositionFromStructure(id, removedPositionContainer, message) {
        const positions = document.getElementsByClassName(removedPositionContainer)[0].children;

        for (let i = 0; i < positions.length; i++) {
            if (positions[i].dataset.id === id) positions[i].remove();
        }

        message.textContent = 'The position was successfully removed!';
    }

    removeEmployeeFromDB(removedEmployee, employeeCard, message, modalWindow) {
        employeeCard.dataset.id = removedEmployee._id;

        return new Promise(() => this.employeesModel.removeEmployee(removedEmployee._id).then(() => {
            this.removeEmployeeFromStructure(removedEmployee, employeeCard, message, modalWindow);
        }));
	}

    removeEmployeeFromStructure(removedEmployee, employeeCard, message) {
        employeeCard.removeAttribute('href');

        employeeCard.innerHTML = PositionVacantTemplate({
            position: removedEmployee.position.toUpperCase(),
            photo: removedEmployee.photo,
            isAdmin: (localStorage.getItem('role') === 'admin')
        });

        message.textContent = 'The employee was successfully removed!';
    }
}

export default Structure;