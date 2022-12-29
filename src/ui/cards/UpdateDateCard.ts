import { ITextBase } from 'fuix';
import Model from '../../model/Model';
import Colors from '../Colors';
import TextLGNormal from '../text/TextLGNormal';
import TitleCard from './TitleCard';

export default class UpdateDateCard extends TitleCard {
    public constructor() {
        super('Start & End Dates');
        this.addComponents([
            this.startLabel,
            this.endLabel
        ]);
    }

    private _startLabel!: ITextBase;

    public get startLabel(): ITextBase {
        if (!this._startLabel) {
            this._startLabel = new TextLGNormal(Model.updateStartDate.value);
            this._startLabel.color = Colors.PRIMARY_500;
        }
        return this._startLabel;
    }

    private _endLabel!: ITextBase;

    public get endLabel(): ITextBase {
        if (!this._endLabel) {
            this._endLabel = new TextLGNormal(Model.updateEndDate.value);
            this._endLabel.color = Colors.PRIMARY_500;
        }
        return this._endLabel;
    }
}
customElements.define('update-date-card', UpdateDateCard);
