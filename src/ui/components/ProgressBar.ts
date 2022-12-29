import { Component, Container, IComponent } from 'fuix';
import Colors from '../Colors';
import IProgressBar from './IProgressBar';

export default class ProgressBar extends Container implements IProgressBar {
    public constructor() {
        super();
        this.minWidth = 160;
        this.height = 4;
        this.borderRadius = 2;
        this.backgroundColor = Colors.NEUTRAL_200;
        this.addComponent(this.track);
    }

    private _track!: IComponent;

    private get track(): IComponent {
        if (!this._track) {
            this._track = new Component();
            this._track.position = 'absolute';
            this._track.widthPercent = 0;
            this._track.heightPercent = 100;
            this._track.borderRadius = 2;
            this._track.backgroundColor = this.trackColor;
        }
        return this._track;
    }

    private updateProgress(): void {
        const range = this.maximum - this.minimum;
        const percent = this.value / range * 100;
        this.track.widthPercent = Math.floor(percent);
    }

    private _trackColor = Colors.BLACK;

    public set trackColor(value: string) {
        this._trackColor = value;
        this.track.backgroundColor = value;
    }

    public get trackColor(): string {
        return this._trackColor;
    }

    private _value = 0;

    public set value(value: number) {
        if (this._value === value) {
            return;
        }
        if (isNaN(value)) {
            if (this._value !== 0) {
                this._value = 0;
                this.updateProgress();
            }
            return;
        }
        if (value <= this.minimum) {
            this._value = this.minimum;
        }
        if (value >= this.maximum) {
            this._value = this.maximum;
        } else {
            this._value = value;
        }
        this.updateProgress();
    }

    public get value(): number {
        return this._value;
    }

    private _minimum = 0;

    public set minimum(value: number) {
        if (this._minimum === value) {
            return;
        }
        if (isNaN(value)) {
            if (this._minimum !== 0) {
                this._minimum = 0;
                this.updateProgress();
            }
            return;
        }
        if (value > this.maximum) {
            this._minimum = this.maximum;
        } else {
            this._minimum = value;
        }
        this.updateProgress();
    }

    public get minimum(): number {
        return this._minimum;
    }

    private _maximum = 100;

    public set maximum(value: number) {
        if (this._maximum === value) {
            return;
        }
        if (isNaN(value)) {
            if (this._maximum !== 100) {
                this._maximum = 100;
                this.updateProgress();
            }
            return;
        }
        if (value < this.minimum) {
            this._maximum = this.minimum;
        } else {
            this._maximum = value;
        }
        this.updateProgress();
    }

    public get maximum(): number {
        return this._maximum;
    }
}
customElements.define('progress-bar', ProgressBar);
