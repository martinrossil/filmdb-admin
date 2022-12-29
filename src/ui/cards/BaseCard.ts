import { Container } from 'fuix';
import Colors from '../Colors';
import Shadows from '../Shadows';

export default class BaseCard extends Container {
    public constructor() {
        super();
        this.minWidth = 176;
        this.backgroundColor = Colors.WHITE;
        this.borderRadius = 8;
        this.boxShadow = Shadows.SMALL;
        this.style.border = '2px solid ' + Colors.PRIMARY_500;
    }
}
customElements.define('base-card', BaseCard);
