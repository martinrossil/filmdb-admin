import { ITextBase } from 'fuix';
import Model from '../../model/Model';
import ObservableNumber from '../../model/ObservableNumber';
import Colors from '../Colors';
import DisplayLGBold from '../text/DisplayLGBold';
import TitleCard from './TitleCard';

export default class TotalChangedMoviesCard extends TitleCard {
    public constructor() {
        super('Movies Changed');
        this.updateTotalValue();
        this.addComponent(this.totalLabel);
        Model.updatedMoviesMaximum.addEventListener(ObservableNumber.CHANGED, this.updateTotalValue.bind(this));
    }

    private updateTotalValue(): void {
        this.totalLabel.text = Model.updatedMoviesMaximum.value + '';
    }

    private _totalLabel!: ITextBase;

    public get totalLabel(): ITextBase {
        if (!this._totalLabel) {
            this._totalLabel = new DisplayLGBold();
            this._totalLabel.color = Colors.PRIMARY_500;
        }
        return this._totalLabel;
    }
}
customElements.define('total-changed-movies-card', TotalChangedMoviesCard);
