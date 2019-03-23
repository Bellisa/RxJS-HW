import { EStatusCharter } from "./EStatus";
import { EGender } from "./EGender";

export interface IFilter{
    name?: string, 
    status?: EStatusCharter, 
    gender?: EGender
}