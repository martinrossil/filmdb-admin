import { ITextBase } from 'fuix';
import Model from '../../model/Model';
import ObservableNumber from '../../model/ObservableNumber';
import Colors from '../Colors';
import DisplayLGBold from '../text/DisplayLGBold';
import TitleCard from './TitleCard';

export default class ProvidersCard extends TitleCard {
    public constructor() {
        super('Providers');
        this.updateTotalValue();
        this.addComponent(this.totalLabel);
        Model.providersCount.addEventListener(ObservableNumber.CHANGED, this.updateTotalValue.bind(this));
    }

    private updateTotalValue(): void {
        this.totalLabel.text = Model.providersCount.value + '';
    }

    private _totalLabel!: ITextBase;

    public get totalLabel(): ITextBase {
        if (!this._totalLabel) {
            this._totalLabel = new DisplayLGBold('7495');
            this._totalLabel.color = Colors.PRIMARY_500;
        }
        return this._totalLabel;
    }
}
customElements.define('providers-card', ProvidersCard);
