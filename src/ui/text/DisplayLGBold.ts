import { TextBase } from 'fuix';
import Colors from '../Colors';

export default class DisplayLGBold extends TextBase {
    public constructor(text = '') {
        super();
        this.text = text;
        // this.fontFamily = 'Inter';
        this.fontWeight = 700;
        this.fontSize = 30;
        // this.lineHeight = '.72';
        this.color = Colors.NEUTRAL_900;
    }
}
customElements.define('display-lg-bold', DisplayLGBold);
