import { Rest } from './rest';
import { EStatusCharter } from '../model/EStatus'
import { EGender } from '../model/EGender';

export class EpisodeApi {
    getEpisodes() {
        return Rest.get(`https://rickandmortyapi.com/api/episode/`);
    }
    getEpisodeByPage(page: number) {
        return Rest.get(`https://rickandmortyapi.com/api/episode?page=${page}`);
    }

    getEpisodeById(id: number) {
        return Rest.get(`https://rickandmortyapi.com/api/episode/${id}`);
    }

    getEpisodeMulti(ids: number[]) {
        return Rest.get(`https://rickandmortyapi.com/api/episode/${ids.join(',')}`);
    }
}