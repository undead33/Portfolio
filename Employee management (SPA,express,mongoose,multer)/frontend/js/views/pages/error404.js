import Component from '../../views/component';

class Error404 extends Component {
    render() {
        return new Promise(resolve => resolve('<h1 class="page-title">404 Error - Page Not Found</h1>'));
    }

    afterRender() {
        document.getElementsByTagName('main')[0].classList = '';
    }
}

export default Error404;