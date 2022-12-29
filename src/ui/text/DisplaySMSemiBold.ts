import { TextBase } from 'fuix';
import Colors from '../Colors';

export default class DisplaySMSemiBold extends TextBase {
    public constructor(text = '') {
        super();
        this.text = text;
        // this.fontFamily = 'Inter';
        this.fontWeight = 600;
        this.fontSize = 30;
        // this.lineHeight = '.72';
        this.color = Colors.NEUTRAL_900;
    }
}
customElements.define('display-sm-semi-bold', DisplaySMSemiBold);
