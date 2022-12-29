import Model from '../../model/Model';
import ProgressContainer from '../ProgressContainer';
import TitleCard from './TitleCard';

export default class ProgressCard extends TitleCard {
    public constructor() {
        super('Movie Progress');
        this.minWidth = 600;
        this.minHeight = 250;
        this.style.flex = '1';
        this.addComponents([new ProgressContainer('Created Genres', Model.createdGenresValue, Model.createdGenresMaximum),
                            new ProgressContainer('Created Countries', Model.createdCountriesValue, Model.createdCountriesMaximum),
                            new ProgressContainer('Created Companies', Model.createdCompaniesValue, Model.createdCompaniesMaximum),
                            new ProgressContainer('Created Persons', Model.createdPersonsValue, Model.createdPersonsMaximum),
                            new ProgressContainer('Created Cast', Model.createdCastValue, Model.createdCastMaximum),
                            new ProgressContainer('Created Crew', Model.createdCrewValue, Model.createdCrewMaximum)]);
    }
}
customElements.define('progress-card', ProgressCard);
