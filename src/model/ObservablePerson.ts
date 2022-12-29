import ITMDBPerson from '../api/tmdb/ITMDBPerson';

export default class ObservablePerson extends EventTarget {
    public static CHANGED = 'changed';

    private _value: ITMDBPerson | null = null;

    public set value(value: ITMDBPerson | null) {
        if (this._value === value) {
            return;
        }
        this._value = value;
        this.notify();
    }

    public get value(): ITMDBPerson | null {
        return this._value;
    }

    private notify(): void {
        this.dispatchEvent(new CustomEvent(ObservablePerson.CHANGED, { detail: this.value }));
    }
}
