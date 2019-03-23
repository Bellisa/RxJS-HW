import { ICharacter } from "../model/ICharacter";
import { IHtmlControl } from "./IHtmlControl";
import { Subject, Observable, fromEvent } from 'rxjs';
import { map, debounceTime } from "rxjs/operators";
import { IInfo } from "../model/IInfo";

export class Paging implements IHtmlControl<IInfo> {

    private _info: IInfo | undefined;
    public eventHtml: Subject<string> = new Subject<string>();

    public html: HTMLDivElement = <HTMLDivElement>(document.createElement('div'));
    private _prev: HTMLButtonElement = <HTMLButtonElement>(document.createElement('button'));
    private _next: HTMLButtonElement = <HTMLButtonElement>(document.createElement('button'));
    private _page: HTMLButtonElement = <HTMLButtonElement>(document.createElement('button'));

    public genaratedHtml(info: IInfo, page: number): HTMLDivElement {
        this._info = info;
        this._prev.value = this._info.prev;
        this._prev.className = (this._info.prev)?'page-item':'page-item disabled'
        

        this._next.value = this._info.next;
        this._next.className = (this._info.next)?'page-item':'page-item disabled'
        this._page.innerText = page.toString();
        return this.html;
    }
    constructor() {
        let ul: HTMLUListElement = <HTMLUListElement>(document.createElement('ul'));
        ul.className = 'pagination';
        let li1: HTMLLIElement = <HTMLLIElement>(document.createElement('li'));
        li1.className = 'page-item ';
        this._prev.className = this._next.className = this._page.className = 'page-link';
        this._prev.innerText='prev';
        li1.appendChild(this._prev);

        let li2: HTMLLIElement = <HTMLLIElement>(document.createElement('li'));
        li2.className = 'page-item active-item ';
        li2.appendChild(this._page);

        let li3: HTMLLIElement = <HTMLLIElement>(document.createElement('li'));
        li3.className = 'page-item ';
        this._next.innerText='next';
        li3.appendChild(this._next);

        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);

        this.html.appendChild(ul);
        

        this._prev.addEventListener('click', () => {
            if(this._info && this._info.prev)
            this.eventHtml.next(this._info.prev);
        });
        this._next.addEventListener('click', () => {
            if(this._info && this._info.next)
            this.eventHtml.next(this._info.next);
        });
    }
}


