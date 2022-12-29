import { Container } from 'fuix';
import TotalChangedMoviesCard from '../cards/TotalChangedMoviesCard';
import UpdateDateCard from '../cards/UpdateDateCard';
import UpdateProgressCard from '../cards/UpdateProgressCard';

export default class UpdatePage extends Container {
    public constructor() {
        super();
        this.display = 'flex';
        this.gap = 24;
        this.top = 64;
        this.padding = 24;
        this.flexWrap = 'wrap';
        this.justifyContent = 'space-between';
        this.addComponents([
            new UpdateDateCard(),
            new TotalChangedMoviesCard(),
            new UpdateProgressCard()
        ]);
    }
}
customElements.define('update-page', UpdatePage);
