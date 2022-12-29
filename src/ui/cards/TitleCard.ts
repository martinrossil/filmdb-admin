import { ITextBase } from 'fuix';
import TextLGSemiBold from '../text/TextLGSemiBold';
import BaseCard from './BaseCard'

export default class TitleCard extends BaseCard {
    public constructor(title = 'Title') {
        super();
        this.display = 'inline-flex';
        this.style.flexDirection = 'column';
        this.padding = 16;
        this.gap = 16;
        this.titleLabel.text = title;
        this.addComponent(this.titleLabel);
    }

    private _titleLabel!: ITextBase;

    protected get titleLabel(): ITextBase {
        if (!this._titleLabel) {
            this._titleLabel = new TextLGSemiBold();
            // this._titleLabel.display = 'block';
        }
        return this._titleLabel;
    }
}
customElements.define('title-card', TitleCard);
