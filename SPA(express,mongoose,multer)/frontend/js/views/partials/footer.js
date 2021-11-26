import Component from '../../views/component';

import FooterTemplate from '../../../templates/partials/footer';

class Footer extends Component {
    render() {
        const resource = this.request.resource;

        return new Promise(resolve => resolve(FooterTemplate({
            existAboutTab: (localStorage.getItem('role') && resource),
            isAboutPage: (resource === 'about')
        })));
    }
}

export default Footer;