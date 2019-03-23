import { Rest } from './rest';
import { EStatusCharter } from '../model/EStatus'
import { EGender } from '../model/EGender';

export class LocationApi {
    getLocations() {
        return Rest.get(`https://rickandmortyapi.com/api/location`);
    }
    getLocationByPage(page: number) {
        return Rest.get(`https://rickandmortyapi.com/api/location?page=${page}`);
    }

    getLocationById(id: number) {
        return Rest.get(`https://rickandmortyapi.com/api/location/${id}`);
    }

    getLocationMulti(ids: number[]) {
        return Rest.get(`https://rickandmortyapi.com/api/location/${ids.join(',')}`);
    }
}