import Component from '../../views/component';

class About extends Component {
    render() {
        return new Promise(resolve => resolve(`
            <div class="about"> 
                <h1 class="page-title">Welcome!</h1>                   
                <p class="about__info">
                    So, here is an application,<br>
                    where you can search and manage<br>
                    your company employees.<br>
                    Enjoy!
                </p>
            </div>
        `));
    }

    afterRender() {
        document.getElementsByTagName('main')[0].classList = '';
    }
}

export default About;