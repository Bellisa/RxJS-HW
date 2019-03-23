import { EStatusCharter } from './EStatus';
import { EGender } from './EGender';

export interface ICharacter {
    id: number,
    name: string,
    status: EStatusCharter,
    species: string,
    type: string,
    gender: EGender
    location: {
        name: string,
        url: string
    },
    image: string,
    episode: string[],
    url: string,
    created: string
}