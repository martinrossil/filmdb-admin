import Colors from '../Colors';
import ProgressBar from './ProgressBar';

export default class CreatePersonsProgressBar extends ProgressBar {
    public constructor() {
        super();
        this.value = 50;
        this.trackColor = Colors.PRIMARY_500;
    }
}
customElements.define('create-persons-progress-bar', CreatePersonsProgressBar);
