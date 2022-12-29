import { ITextBase } from 'fuix';
import Model from '../../model/Model';
import ObservableMovie from '../../model/ObservableMovie';
import Colors from '../Colors';
import IPicture from '../components/IPicture';
import Picture from '../components/Picture';
import TextLGNormal from '../text/TextLGNormal';
import TitleCard from './TitleCard';

export default class MovieCard extends TitleCard {
    public constructor() {
        super('Creating Movie');
        this.style.flex = '1';
        this.addComponents([this.poster, this.titleText, this.releaseText]);
        Model.movie.addEventListener(ObservableMovie.CHANGED, this.movieChanged.bind(this))
    }

    private movieChanged(): void {
        if (Model.movie.value) {
            this.titleText.text = Model.movie.value.title;
            this.releaseText.text = Model.movie.value.release_date;
            if (Model.movie.value.poster_path) {
                this.poster.src = 'https://image.tmdb.org/t/p/w300/' + Model.movie.value.poster_path;
            } else {
                this.poster.src = '';
            }
        } else {
            this.titleText.text = '';
            this.poster.src = '';
            this.releaseText.text = '';
        }
    }

    private _poster!: IPicture;

    private get poster(): IPicture {
        if (!this._poster) {
            this._poster = new Picture();
            this._poster.backgroundColor = Colors.NEUTRAL_200;
            this._poster.width = 100;
            this._poster.height = 150;
        }
        return this._poster;
    }

    private _titleText!: ITextBase;

    private get titleText(): ITextBase {
        if (!this._titleText) {
            this._titleText = new TextLGNormal();
            this._titleText.text = 'Title';
        }
        return this._titleText;
    }

    private _releaseText!: ITextBase;

    private get releaseText(): ITextBase {
        if (!this._releaseText) {
            this._releaseText = new TextLGNormal();
            this._releaseText.text = 'Release Date';
        }
        return this._releaseText;
    }
}
customElements.define('movie-card', MovieCard);
