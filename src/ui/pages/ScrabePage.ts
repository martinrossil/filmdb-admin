import { Container } from 'fuix';
import CompaniesTotalCard from '../cards/CompaniesTotalCard';
import CountriesTotalCard from '../cards/CountriesTotalCard';
import CurrentIndexCard from '../cards/CurrentIndexCard';
import GenresCard from '../cards/GenresCard';
import MovieCard from '../cards/MovieCard';
import MoviesTotalCard from '../cards/MoviesTotalCard';
import PersonCard from '../cards/PersonCard';
import PersonsCard from '../cards/PersonsCard';
import ProgressCard from '../cards/ProgressCard';
import ProvidersCard from '../cards/ProvidersCard';

export default class ScrabePage extends Container {
    public constructor() {
        super();
        this.display = 'flex';
        this.gap = 24;
        this.top = 64;
        this.padding = 24;
        this.flexWrap = 'wrap';
        this.justifyContent = 'space-between';
        this.addComponents([new CurrentIndexCard(),
                            new MoviesTotalCard(),
                            new PersonsCard(),
                            new GenresCard(),
                            new CountriesTotalCard(),
                            new ProvidersCard(),
                            new CompaniesTotalCard(),
                            new MovieCard(),
                            new PersonCard(),
                            new ProgressCard()
                        ]);
    }
}
customElements.define('scrabe-page', ScrabePage);
