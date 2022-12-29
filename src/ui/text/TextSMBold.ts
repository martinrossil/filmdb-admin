import { TextBase } from 'fuix';
import Colors from '../Colors';

export default class TextSMBold extends TextBase {
    public constructor(text = '') {
        super();
        this.text = text;
        // this.fontFamily = 'Inter';
        this.fontWeight = 600;
        this.fontSize = 12;
        // this.lineHeight = '.72';
        this.color = Colors.NEUTRAL_900;
    }
}
customElements.define('text-sm-bold', TextSMBold);
