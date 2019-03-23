import { from, fromEvent, Observable, of, combineLatest, interval, timer} from 'rxjs';
import { map, catchError, debounceTime, switchMap, delay, find, scan, filter, pluck, skip, startWith, take, takeLast, throttle} from 'rxjs/operators';
import { Main } from './classes/main';

const inputElement: HTMLInputElement = document.querySelector('#refInput') as HTMLInputElement;

new Main(inputElement);