import { ITextBase } from 'fuix';
import Model from '../../model/Model';
import ObservablePerson from '../../model/ObservablePerson';
import Colors from '../Colors';
import IPicture from '../components/IPicture';
import Picture from '../components/Picture';
import TextLGNormal from '../text/TextLGNormal';
import TitleCard from './TitleCard';

export default class PersonCard extends TitleCard {
    public constructor() {
        super('Creating Person');
        this.style.flex = '1';
        this.addComponents([this.profile, this.nameText, this.birthText]);
        Model.person.addEventListener(ObservablePerson.CHANGED, this.personChanged.bind(this))
    }

    private personChanged(): void {
        if (Model.person.value) {
            this.nameText.text = Model.person.value.name;
            if (Model.person.value.birthday) {
                this.birthText.text = Model.person.value.birthday;
            } else {
                this.birthText.text = 'No Birth Date';
            }
            if (Model.person.value.profile_path) {
                this.profile.src = 'https://image.tmdb.org/t/p/w300/' + Model.person.value.profile_path;
            } else {
                this.profile.src = '';
            }
        } else {
            this.nameText.text = '';
            this.profile.src = '';
        }
    }

    private _profile!: IPicture;

    private get profile(): IPicture {
        if (!this._profile) {
            this._profile = new Picture();
            this._profile.backgroundColor = Colors.NEUTRAL_200;
            this._profile.width = 100;
            this._profile.height = 150;
        }
        return this._profile;
    }

    private _nameText!: ITextBase;

    private get nameText(): ITextBase {
        if (!this._nameText) {
            this._nameText = new TextLGNormal();
            this._nameText.text = 'Name';
        }
        return this._nameText;
    }

    private _birthText!: ITextBase;

    private get birthText(): ITextBase {
        if (!this._birthText) {
            this._birthText = new TextLGNormal();
            this._birthText.text = 'Birth Date';
        }
        return this._birthText;
    }
}
customElements.define('person-card', PersonCard);
