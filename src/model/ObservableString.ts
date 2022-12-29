export default class ObservableString extends EventTarget {
    public static CHANGED = 'changed';

    public constructor(value = '') {
        super();
        this._value = value;
    }

    private _value = '';

    public set value(value: string) {
        if (this._value === value) {
            return;
        }
        this._value = value;
        this.notify();
    }

    public get value(): string {
        return this._value;
    }

    private notify(): void {
        this.dispatchEvent(new CustomEvent(ObservableString.CHANGED, { detail: this.value }));
    }
}
