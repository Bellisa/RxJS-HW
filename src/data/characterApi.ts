import { Rest } from './rest';
import { EStatusCharter } from '../model/EStatus'
import { EGender } from '../model/EGender';
import { IFilter } from '../model/IFilter';

export class CharterApi {
    getCharaters() {
        return Rest.get(`https://rickandmortyapi.com/api/character`);
    }
    getCharatersByPage(page: number) {
        return Rest.get(`https://rickandmortyapi.com/api/character?page=${page}`);
    }

    getCharatersById<ICharaterInfo>(id: number) {
        return Rest.get(`https://rickandmortyapi.com/api/character/${id}`);
    }

    getCharaterMulti(ids: number[]) {
        return Rest.get(`https://rickandmortyapi.com/api/character/${ids.join(',')}`);
    }
    public getCharaterByFilter(filter:IFilter, paage?: number) {
        let query: string = filter.name ? `?name=${filter.name}` : '?';
        query = query+filter.status?`${(query.length > 1 ? '&' : '')}status=${filter.status}`:'';
        query = query+filter.gender?`${(query.length > 1 ? '&' : '')}gender=${filter.gender}`:'';
        query = query+paage?`${(query.length > 1 ? '&' : '')}paage=${paage}`:'';
        query = `${(query.length > 1 ? query : '')}`;
        return Rest.get(`https://rickandmortyapi.com/api/character${query}`);
    }
}