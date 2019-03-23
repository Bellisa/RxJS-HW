import { ICharacter } from "../model/ICharacter";
import { IHtmlControl } from "./IHtmlControl";
import { Subject } from 'rxjs';

export class RowCharater implements IHtmlControl<ICharacter> {

    public eventHtml:Subject<ICharacter> = new Subject<ICharacter>();
    private _charater: ICharacter | undefined;    
    public html:HTMLDivElement=<HTMLDivElement>(document.createElement('div'));

    public genaratedHtml(char: ICharacter): HTMLDivElement {

        this._charater = char;
        this.html.className = this._charater.id%2==0?'row w-800 m-1 p-1 alert alert-secondary':'row m-1 p-1 alert alert-primary';
        this.html.innerHTML = `
        <div class='col-6'>${this._charater.name}</div>
        <div class='col-3'>${this._charater.gender}</div>
        <div class='col-3'>${this._charater.status}</div>
        `;
        return this.html;
    }
    constructor(){
        this.html.addEventListener('click', () => {
            this.eventHtml.next(this._charater);
        });
    }
}