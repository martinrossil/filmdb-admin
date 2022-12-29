import { IContainer } from 'fuix';

export default interface IProgressBar extends IContainer {
    minimum: number;
    maximum: number;
    value: number;
    trackColor: string;
}
