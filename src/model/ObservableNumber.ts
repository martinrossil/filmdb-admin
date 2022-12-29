export default class ObservableNumber extends EventTarget {
    public static CHANGED = 'changed';

    public constructor(value = 0) {
        super();
        if (isNaN(value)) {
            this._value = 0;
            return;
        }
        this._value = value;
    }

    private _value = 0;

    public set value(value: number) {
        if (isNaN(value)) {
            if (this._value !== 0) {
                this._value = 0;
                this.notify();
                return;
            }
        }
        if (this._value === value) {
            return;
        }
        this._value = value;
        this.notify();
    }

    public get value(): number {
        return this._value;
    }

    private notify(): void {
        this.dispatchEvent(new CustomEvent(ObservableNumber.CHANGED, { detail: this.value }));
    }
}
