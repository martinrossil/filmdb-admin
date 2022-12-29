import { Container } from 'fuix';
import IPicture from './IPicture';

export default class Picture extends Container implements IPicture {
    public constructor() {
        super();
        this.display = 'inline-block';
        this.imageLoaded = this.imageLoaded.bind(this);
        this.imageLoadError = this.imageLoadError.bind(this);
        this.appendChild(this.img);
    }

    private _src = '';

    public set src(value: string) {
        if (this._src === value) {
            return;
        }
        this._src = value;
        this.img.src = value;
    }

    public get src(): string {
        return this._src;
    }

    private _img!: HTMLImageElement;

    private get img(): HTMLImageElement {
        if (!this._img) {
            this._img = document.createElement('img');
            this._img.style.position = 'absolute';
            this._img.style.width = '100%';
            this._img.style.height = '100%';
            this._img.style.outline = 'none';
            this._img.style.border = 'none';
            this._img.style.appearance = 'none';
            this._img.style.opacity = '0.0';
            this._img.addEventListener('error', this.imageLoadError);
            this._img.addEventListener('load', this.imageLoaded);
        }
        return this._img;
    }

    private imageLoaded(): void {
        this.img.style.opacity = '1.0';
    }

    private imageLoadError(): void {
        this.img.style.opacity = '0.0';
    }
}
customElements.define('fiftytwo-picture', Picture);
