import { IFilter } from "../model/IFilter";
import { IHtmlControl } from "./IHtmlControl";
import { Subject, fromEvent, Observable } from "rxjs";
import { map, debounceTime, switchMap } from "rxjs/operators";

export class Filter implements IHtmlControl<IFilter> {
    genaratedHtml(): HTMLDivElement {
        throw new Error("Method not implemented.");
    }
    public html: HTMLDivElement = <HTMLDivElement>(document.createElement('div'));
    public input: HTMLInputElement = <HTMLInputElement>(document.createElement('input'));
    public select: HTMLSelectElement = <HTMLSelectElement>(document.createElement('select'));

    private _filter: IFilter | undefined;
    public eventHtml: Subject<IFilter> = new Subject<IFilter>();
    private eventHtml2: Observable<string> = fromEvent(this.input, 'input').pipe(
        map((event: Event) => (event.target as any).value),
        debounceTime(500));    

    constructor() {
        this.html.appendChild(this.input); 
        this.eventHtml2.subscribe(val => this.textChanged(val));    
    }

    textChanged(value: string) {
        console.log(value);
        this._filter = {
            name: value
        }
        this.eventHtml.next(this._filter);
    }
}