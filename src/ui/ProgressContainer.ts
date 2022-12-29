import { Container, IContainer, ITextBase } from 'fuix';
import ObservableNumber from '../model/ObservableNumber';
import Colors from './Colors';
import IProgressBar from './components/IProgressBar';
import ProgressBar from './components/ProgressBar';
import TextLGNormal from './text/TextLGNormal';
import TextSMBold from './text/TextSMBold';

export default class ProgressContainer extends Container {
    private value: ObservableNumber;
    private maximum: ObservableNumber;
    public constructor(name: string, value: ObservableNumber, maximum: ObservableNumber) {
        super();
        this.display = 'flex';
        this.style.flexDirection = 'column';
        this.gap = 16;
        this.value = value;
        this.maximum = maximum;
        this.addComponents([new TextLGNormal(name),
                            this.container]);
        this.value.addEventListener(ObservableNumber.CHANGED, this.valueChanged.bind(this));
        this.maximum.addEventListener(ObservableNumber.CHANGED, this.maximumChanged.bind(this));
        this.valueChanged();
        this.maximumChanged();
    }

    private valueChanged(): void {
        this.valueLabel.text = this.value.value + '';
        this.progressBar.value = this.value.value;
    }

    private maximumChanged(): void {
        this.progressBar.maximum = this.maximum.value;
        this.maximumLabel.text = this.maximum.value + '';
    }

    private _container!: IContainer;
    private get container(): IContainer {
        if (!this._container) {
            this._container = new Container();
            this._container.display = 'flex';
            this._container.alignItems = 'center';
            this._container.gap = 16;
            this._container.addComponents([this.valueLabel, this.progressBar, this.maximumLabel]);
        }
        return this._container;
    }

    private _valueLabel!: ITextBase;
    private get valueLabel(): ITextBase {
        if (!this._valueLabel) {
            this._valueLabel = new TextSMBold();
            this._valueLabel.width = 40;
            this._valueLabel.text = this.value.value + '';
        }
        return this._valueLabel;
    }

    private _progressBar!: IProgressBar;
    private get progressBar(): IProgressBar {
        if (!this._progressBar) {
            this._progressBar = new ProgressBar();
            this._progressBar.flexGrow = 1;
            this._progressBar.trackColor = Colors.PRIMARY_500;
        }
        return this._progressBar;
    }

    private _maximumLabel!: ITextBase;
    private get maximumLabel(): ITextBase {
        if (!this._maximumLabel) {
            this._maximumLabel = new TextSMBold();
            this._maximumLabel.width = 40;
            this._maximumLabel.text = this.maximum.value + '';
        }
        return this._maximumLabel;
    }
}
customElements.define('progress-container', ProgressContainer);
