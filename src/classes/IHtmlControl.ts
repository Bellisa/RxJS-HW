import { Observable, Subject } from "rxjs";

export interface IHtmlControl<T> {
    genaratedHtml(val?: T, page?: number): HTMLDivElement;
}