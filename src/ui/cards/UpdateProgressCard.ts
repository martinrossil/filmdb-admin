import Model from '../../model/Model';
import ProgressContainer from '../ProgressContainer';
import TitleCard from './TitleCard';

export default class UpdateProgressCard extends TitleCard {
    public constructor() {
        super('Update Progress');
        this.flexGrow = 1;
        this.addComponent(new ProgressContainer('Updated Movies', Model.updatedMoviesValue, Model.updatedMoviesMaximum));
    }
}
customElements.define('update-progress-card', UpdateProgressCard);
