import { TextBase } from 'fuix';
import Colors from '../Colors';

export default class TextLGNormal extends TextBase {
    public constructor(text = '') {
        super();
        this.display = 'inline-block';
        this.text = text;
        // this.fontFamily = 'Inter';
        this.fontWeight = 400;
        this.fontSize = 18;
        // this.lineHeight = '1.2';
        this.color = Colors.NEUTRAL_600;
    }
}
customElements.define('text-lg-normal', TextLGNormal);
