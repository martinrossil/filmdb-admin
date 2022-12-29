import { Application } from 'fuix';
import FilmDBLogic from './logic/FilmDBLogic';
import UpdateLogic from './logic/UpdateLogic';
import Colors from './ui/Colors';
import ScrabePage from './ui/pages/ScrabePage';
import UpdatePage from './ui/pages/UpdatePage';
import TopBar from './ui/TopBar';
export default class FilmDBAdmin extends Application {
    public constructor() {
        super();
        this.style.height = '100vh';
        this.bodyBackgroundColor = Colors.NEUTRAL_100;
        this.bodyFontFamily = 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
        this.addComponents([new ScrabePage(), new TopBar()]);
        new FilmDBLogic(this);
        // new UpdateLogic(this);
    }
}
customElements.define('film-db-admin', FilmDBAdmin);
