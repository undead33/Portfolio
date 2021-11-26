import '../styles/app';

import {parseRequestURL} from './helpers/utils';

import Header from './views/partials/header';
import Footer from './views/partials/footer';

import About from './views/pages/about';
import Authorization from './views/pages/authorization';
import Error404 from './views/pages/error404';

import Search from './views/pages/search';
import Structure from './views/pages/structure';
import Info from './views/pages/position/info';
import Edit from './views/pages/position/edit';

const Routes = {
    '/': Authorization,
    '/about': About,
    '/search': Search,
    '/structure': Structure,
    '/position/:id/info': Info,
    '/position/:id/edit': Edit
};

function router() {
    const header = new Header(),
        footer = new Footer(),
        headerContainer = document.getElementsByTagName('header')[0],
        mainContainer = document.getElementsByTagName('main')[0],
        footerContainer = document.getElementsByTagName('footer')[0];

    const request = parseRequestURL(),
        parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`;
    let page;

    if (parsedURL === '/') {
        page = new Routes['/'];
    } else {
        page = (Routes[parsedURL] && localStorage.getItem('role')) ? new Routes[parsedURL]() : new Error404();
    }

    page.getData().then(data => {
		page.render(data).then(html => {
			mainContainer.innerHTML = html;
			page.afterRender();
		});
        document.title = `${request.resource ? `EM | ${request.resource} ${request.action ? `| ${request.action}` : ''}` : 'Employee Management'}`;
    });

    footer.render().then(html => {
        footerContainer.innerHTML = html;
    }).then(() => header.render().then(html => {
        headerContainer.innerHTML = html;
        header.afterRender();
    }));
}

module.hot ? module.hot.accept(router()) : window.addEventListener('load', router);
window.addEventListener('hashchange', router);