import Component from '../../views/component';
import {capitalizeFirstLetter} from '../../helpers/utils';

import Employees from '../../models/Employees';
import Users from '../../models/Users';

import MainTemplate from '../../../templates/pages/search/main';
import EmployeeTemplate from '../../../templates/pages/search/employee';

class Search extends Component {
    constructor() {
		super();

		this.employeesModel = new Employees();
        this.userModel = new Users();
	}

    render() {
        return new Promise(resolve => resolve(MainTemplate()));
    }

    afterRender() {
        document.getElementsByTagName('main')[0].classList = '';

        this.setActions();
    }

    setActions() {
        const resultArea = document.getElementsByClassName('search__result')[0],
            searchText = document.getElementsByClassName('search__text')[0],
            searchBtn = document.getElementsByClassName('search__button')[0],
            searchTypes = document.getElementsByTagName('fieldset')[0],
            searchChoices = document.getElementsByClassName('search__choice'),
            all = document.getElementsByClassName('search__all')[0],
            active = document.getElementsByClassName('status__active')[0],
            resetBtn = document.getElementsByClassName('search__reset')[0],
            table = document.getElementsByClassName('search__table')[0],
            list = document.getElementsByClassName('search__list')[0];

        searchText.addEventListener('keyup', () => searchBtn.disabled = !searchText.value.trim());
        searchText.addEventListener('keyup', () => resetBtn.disabled = !searchText.value.trim());
        searchText.addEventListener('keydown', event => event.code == 'Enter' && this.searchEmployees(searchText, resultArea, table, list, active));
        searchBtn.addEventListener('click', () => this.searchEmployees(searchText, resultArea, table, list, active));
        searchTypes.addEventListener('change', () => this.chooseSearchType(event, searchText));
        searchTypes.addEventListener('click', () => this.focusSearchArea(searchText, searchBtn));
        all.addEventListener('click', () => sessionStorage.setItem('searchType', 'all') && this.searchEmployees(searchText, resultArea, table, list, active));
        active.addEventListener('change', () => this.chooseActiveOrAllEmployee(resultArea, active));
        resetBtn.addEventListener('click', () => this.removeSearchParams(searchText, resetBtn, searchChoices, resultArea, table, list, active, searchBtn));
        table.addEventListener('click', () => this.changeToTableWiev(resultArea, table, list, active));
        list.addEventListener('click', () => this.changeToListWiev(resultArea, table, list, active));

        this.getSearchParams(searchBtn, resetBtn, searchText, searchChoices, resultArea, table, list, active);
    }

    getSearchParams(searchBtn, resetBtn, searchText, searchChoices, resultArea, table, list, active) {
        active.checked = sessionStorage.getItem('active') == 'true' ? true : false;
        searchText.value = sessionStorage.getItem('searchText');

        if (sessionStorage.getItem('searchType')) {
            for (let i = 0; i < searchChoices.length; i++) {
                searchChoices[i].checked = searchChoices[i].value === sessionStorage.getItem('searchType') ? true : false;
            }
        } else {
            searchChoices[0].checked = true;
            sessionStorage.setItem('searchType', 'name');
        }

        if (sessionStorage.getItem('resultWiev') == 'list') {
            list.classList.add('blue');
        } else {
            table.classList.add('blue');
            sessionStorage.setItem('resultWiev', 'table');
        }

        searchBtn.disabled = searchText.value.trim() ? false : true;
        resetBtn.disabled = searchText.value.trim() ? false : true;

        this.searchEmployees(searchText, resultArea, table, list, active);
    }

    searchEmployees(searchText, resultArea, table, list, active) {
        const searchInfo = {
            searchText: searchText.value.trim(),
            searchType: sessionStorage.getItem('searchType')
        };

        sessionStorage.setItem('searchText', searchText.value.trim());
        this.removeResult(resultArea);

        if (searchInfo.searchText === '' && searchInfo.searchType !== 'all') {
            this.showEmployeesDisplayedNumber(0);

            return;
        }

        document.getElementsByClassName('error_message')[0] && document.getElementsByClassName('error_message')[0].remove();

        return new Promise(() => this.employeesModel.searchEmployees(searchInfo)
            .then(response => this.createEmployees(resultArea, table, list, active, response)));
    }

    chooseSearchType(event, searchText) {
        sessionStorage.setItem('searchType', event.target.value);

        switch (event.target.value) {
            case 'name':
                searchText.placeholder = 'T/tom B/bond / (Cyrillic)';
                break;
            case 'department':
                searchText.placeholder = 'WDD / wdd';
                break;
            case 'project':
                searchText.placeholder = 'Uber / uber';
                break;
        }
    }

    focusSearchArea(searchText, searchBtn) {
        searchBtn.disabled = true;
        searchText.value = '';
        searchText.focus();
    }

    createEmployees(resultArea, table, list, active, response) {
        if (response.message) {
            this.showEmployeesDisplayedNumber(0);
            document.getElementsByTagName('main')[0].insertAdjacentHTML('beforeend',
                '<h1 class="error_message">Sorry, the server has encountered an error. Please click on the search button again.</h1>');

            return;
        }

        if (!response) return;

        if (response.length) {
            resultArea.innerHTML = response.map(employee => this.getEmployeeHTML(employee)).join('\n ');

            sessionStorage.getItem('resultWiev') === 'list' ?
                this.changeToListWiev(resultArea, table, list, active) : this.changeToTableWiev(resultArea, table, list, active);
        } else {
            this.showNotFound(resultArea);
        }
    }

    getEmployeeHTML(employee) {
        let names = capitalizeFirstLetter([
            employee.namesEng[0], employee.namesEng[1], employee.namesRus[0], employee.namesRus[1], employee.project
        ]);

        return EmployeeTemplate({
            id: employee._id,
            href: employee.href,
            photo: employee.photo,
            status: employee.status,
            namesEng: `${names[0]} ${names[1]}`,
            namesRus: `${names[2]} ${names[3]}`,
            department: employee.department.toUpperCase(),
            project: names[4],
            position: employee.position.toUpperCase(),
            phoneMob: employee.phoneMob,
            phoneStat: employee.phoneStat
        });
    }

    changeToTableWiev(resultArea, table, list, active) {
        table.classList.add('blue');
        list.classList.remove('blue');
        sessionStorage.setItem('resultWiev', 'table');

        for (let i = 0; i < resultArea.children.length; i++) {
            let employee = resultArea.children[i];

            employee.classList = 'table';

            for (let j = 0; j < employee.children.length; j++) {
                employee.children[j].classList.remove('list');
                employee.children[j].classList.add(j < 5 ? 'table' : 'hidden');
            }
        }

        this.chooseActiveOrAllEmployee(resultArea, active);
    }

    changeToListWiev(resultArea, table, list, active) {
        table.classList.remove('blue');
        list.classList.add('blue');
        sessionStorage.setItem('resultWiev', 'list');

        for (let i = 0; i < resultArea.children.length; i++) {
            let employee = resultArea.children[i];

            employee.classList = 'list';

            for (let j = 0; j < employee.children.length; j++) {
                employee.children[j].classList.remove('table', 'hidden');
                employee.children[j].classList.add('list');
            }
        }

        this.chooseActiveOrAllEmployee(resultArea, active);
    }

    chooseActiveOrAllEmployee(resultArea, active) {
        active.checked === true ? sessionStorage.setItem('active', true) : sessionStorage.setItem('active', false);

        if (!resultArea.children.length) return;

        let counter = 0;

        for (let i = 0; i < resultArea.children.length; i++) {
            if (resultArea.children[i].dataset.status !== 'active' && active.checked === true) {
                resultArea.children[i].classList.add('hidden');
            } else {
                resultArea.children[i].classList.remove('hidden');
                counter++;
            }
        }

        if (counter) {
            document.getElementsByTagName('figure')[0].classList.add('hidden');
            resultArea.classList.remove('hidden');
        } else {
            this.showNotFound(resultArea);

            return;
        }

        this.showEmployeesDisplayedNumber(counter);
        this.userModel.saveSearchParams({
            searchText: sessionStorage.getItem('searchText'),
            searchType: sessionStorage.getItem('searchType'),
            active: sessionStorage.getItem('active'),
            resultWiev: sessionStorage.getItem('resultWiev')
        }, sessionStorage.getItem('userID'));
    }

    showEmployeesDisplayedNumber(counter) {
        document.getElementsByClassName('displayed__employee__number')[0].textContent = `${counter} employees displayed`;
    }

    removeSearchParams(searchText, resetBtn, searchChoices, resultArea, table, list, active, searchBtn) {
        sessionStorage.setItem('response', '');
        sessionStorage.setItem('searchText', '');
        sessionStorage.setItem('searchType', '');
        sessionStorage.setItem('active', 'false');

        active.checked = false;
        resetBtn.disabled = true;
        searchBtn.disabled = true;
        searchText.value = '';
        document.getElementsByTagName('figure')[0].classList.add('hidden');

        this.removeResult(resultArea);
        this.getSearchParams(searchBtn, resetBtn, searchText, searchChoices, resultArea, table, list, active);
        this.focusSearchArea(searchText, searchBtn);
        this.userModel.saveSearchParams({
            searchText: sessionStorage.getItem('searchText'),
            searchType: sessionStorage.getItem('searchType'),
            active: sessionStorage.getItem('active'),
            resultWiev: sessionStorage.getItem('resultWiev')
        }, sessionStorage.getItem('userID'));
    }

    showNotFound(resultArea) {
        document.getElementsByTagName('figure')[0].classList.remove('hidden');
        resultArea.classList.add('hidden');

        this.showEmployeesDisplayedNumber(0);
    }

    removeResult(resultArea) {
        while (resultArea.firstChild) resultArea.removeChild(resultArea.firstChild);
    }
}

export default Search;