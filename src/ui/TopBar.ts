import { Container } from 'fuix';
import Colors from './Colors';
import Shadows from './Shadows';
import DisplaySMSemiBold from './text/DisplaySMSemiBold';

export default class TopBar extends Container {
    public constructor() {
        super();
        this.backgroundColor = Colors.WHITE;
        this.display = 'flex';
        this.alignItems = 'center';
        this.padding = 16;
        this.height = 64;
        this.position = 'fixed';
        this.top = 0;
        this.left = 0;
        this.right = 0;
        this.boxShadow = Shadows.SMALL;
        this.addComponents([new DisplaySMSemiBold('Film DB Admin')]);
    }
}
customElements.define('top-bar', TopBar);
