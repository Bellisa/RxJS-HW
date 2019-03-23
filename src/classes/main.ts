import { Observable } from "rxjs";
import { CharterApi } from "../data/characterApi";
import { EpisodeApi } from "../data/episodeApi";
import { LocationApi } from "../data/locationApi";
import { RowCharater } from "./rowCharter";
import { ICharaterInfo } from "../model/ICharaterInfo";
import { ICharacter } from "../model/ICharacter";
import { IFilter } from "../model/IFilter";
import { Paging } from "./paging";
import { IInfo } from "../model/IInfo";
import { CharacerInfo } from "./characterInfo";
import { Filter } from "./filter";

export class Main {
    private _divPaging: HTMLDivElement | undefined;
    private _divCharater: HTMLDivElement | undefined;
    private _divListCharater: HTMLDivElement | undefined;
    private _divFilter: HTMLDivElement | undefined;

    private _charterApi: CharterApi | undefined;
    private _episodeApi: EpisodeApi | undefined;
    private _locationApi: LocationApi | undefined;

    private _rowsCharater: RowCharater[] = [];
    private _paging: Paging | undefined;
    private _characerInfo: CharacerInfo | undefined;
    private _filterControl: Filter | undefined


    private _charaterInfo: ICharaterInfo | undefined;
    private _currPage: number = 0;
    private _filter: IFilter | undefined;

    constructor(div: HTMLDivElement) {

        let divrow = <HTMLDivElement>(document.createElement('div'));
        divrow.className = 'row';
        let divcell1 = <HTMLDivElement>(document.createElement('div'));
        divcell1.className = 'col-8';
        let divcell2 = <HTMLDivElement>(document.createElement('div'));
        divcell2.className = 'col-4';

        this._divListCharater = <HTMLDivElement>(document.createElement('div'));
        this._divPaging = <HTMLDivElement>(document.createElement('div'));
        this._divCharater = <HTMLDivElement>(document.createElement('div'));
        this._divFilter = <HTMLDivElement>(document.createElement('div'));

        divcell1.appendChild(this._divPaging);
        divcell1.appendChild(this._divFilter);
        divcell1.appendChild(this._divListCharater);

        divcell2.appendChild(this._divCharater);

        divrow.appendChild(divcell1);
        divrow.appendChild(divcell2);

        div.appendChild(divrow);

        this._charterApi = new CharterApi();
        this._episodeApi = new EpisodeApi();
        this._locationApi = new LocationApi();


        this._currPage = 1;
        this.genaratedCharacters();

        this._paging = new Paging();
        this._divPaging.appendChild(this._paging.html);
        this._paging.eventHtml.subscribe(res => this.pageClick(res));

        this._characerInfo = new CharacerInfo();
        this._divCharater.appendChild(this._characerInfo.html);

        this._filterControl = new Filter();
        this._filterControl.eventHtml.subscribe(filt => this.genaratedCharacters(this._currPage, filt));
        this._divFilter.appendChild(this._filterControl.html);

    }
    private genaratedCharacters(page?: number, filter?: IFilter) {
        if (!this._charterApi) return;

        this._rowsCharater = [];
        if (this._divListCharater)
            while (this._divListCharater.firstChild) {
                this._divListCharater.firstChild.remove();
            }

        if (page && filter) {
           // console.log(page,filter);
            this._charterApi.getCharaterByFilter(filter, page).then(res => {
                if (res as ICharaterInfo) {
                    this._charaterInfo = res as ICharaterInfo;

                    this.genaratedPage(this._charaterInfo.info, this._currPage);

                    this._charaterInfo.results.forEach((value) => {
                        this._rowsCharater.push(this.genaratedCharacter(value));
                    });
                }

            })
            .catch(console.log);
            return;
        }

        if (page) {
            this._charterApi.getCharatersByPage(page).then(res => {
                if (res as ICharaterInfo) {
                    this._charaterInfo = res as ICharaterInfo;

                    this.genaratedPage(this._charaterInfo.info, this._currPage);

                    this._charaterInfo.results.forEach((value) => {
                        this._rowsCharater.push(this.genaratedCharacter(value));
                    });
                }

            }).catch(console.log);
            return;
        }

        if (filter) {
            this._charterApi.getCharaterByFilter(filter).then(res => {
                if (res as ICharaterInfo) {
                    this._charaterInfo = res as ICharaterInfo;

                    this.genaratedPage(this._charaterInfo.info, this._currPage);

                    this._charaterInfo.results.forEach((value) => {
                        this._rowsCharater.push(this.genaratedCharacter(value));
                    });
                }

            }).catch(console.log);
            return;
        }

        this._charterApi.getCharaters().then(res => {
            if (res as ICharaterInfo) {
                this._charaterInfo = res as ICharaterInfo;

                this.genaratedPage(this._charaterInfo.info, this._currPage);

                this._charaterInfo.results.forEach((value) => {
                    this._rowsCharater.push(this.genaratedCharacter(value));
                });
            }

        }).catch(console.log);

    }
    genaratedCharacter(value: ICharacter): RowCharater {
        let row = new RowCharater();

        //console.log(value);
        row.eventHtml.subscribe(res => this.rowClick(res));
        row.genaratedHtml(value);
        if (this._divListCharater) {
            this._divListCharater.appendChild(row.html);
        }
        return row;
    }
    public rowClick(row: ICharacter) {
        if (this._characerInfo)
            this._characerInfo.genaratedHtml(row);
    }

    public pageClick(url: string) {
        if (url.includes('?')) {
            const httpParams = { page: url.split('?page=')[1] };
            this._currPage = httpParams.page as unknown as number;
            this.genaratedCharacters(this._currPage);
        }
    }

    // Paging

    genaratedPage(info?: IInfo, page?: number) {
        if (!this._paging || !info || !page) return;

        this._paging.genaratedHtml(info, page);
    }

}