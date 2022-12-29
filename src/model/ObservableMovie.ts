import ITMDBMovie from '../api/tmdb/ITMDBMovie';

export default class ObservableMovie extends EventTarget {
    public static CHANGED = 'changed';

    private _value: ITMDBMovie | null = null;

    public set value(value: ITMDBMovie | null) {
        if (this._value === value) {
            return;
        }
        this._value = value;
        this.notify();
    }

    public get value(): ITMDBMovie | null {
        return this._value;
    }

    private notify(): void {
        this.dispatchEvent(new CustomEvent(ObservableMovie.CHANGED, { detail: this.value }));
    }
}
