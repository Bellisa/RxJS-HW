import { IFilter } from "../model/IFilter";
import { IHtmlControl } from "./IHtmlControl";
import { Subject, fromEvent, Observable } from "rxjs";
import { map, debounceTime, switchMap } from "rxjs/operators";

export class Filter implements IHtmlControl<IFilter> {
    genaratedHtml(): HTMLDivElement {
        throw new Error("Method not implemented.");
    }

    private _filter: IFilter | undefined;
    public eventHtml: Subject<IFilter> = new Subject<IFilter>();
    private eventHtml2: Observable<any> | undefined;


    public html: HTMLDivElement = <HTMLDivElement>(document.createElement('div'));
    public input: HTMLInputElement = <HTMLInputElement>(document.createElement('input'));
    public select: HTMLSelectElement = <HTMLSelectElement>(document.createElement('select'));

    constructor() {
        this.html.appendChild(this.input);

        this.eventHtml2 = fromEvent(this.input, 'input').pipe(
            map((event: Event) => {
                this._filter = {
                    name: (event.target as any).value
                }
                return this.eventHtml.next(this._filter);
            }
            ),
            debounceTime(500)
        );
    }
}