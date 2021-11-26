import Component from '../../views/component';

import Error404Template from '../../../templates/pages/error404';

class Error404 extends Component {
    render() {
        return new Promise(resolve => resolve(Error404Template()));
    }

    afterRender() {
        document.getElementsByTagName('main')[0].classList = '';
    }
}

export default Error404;