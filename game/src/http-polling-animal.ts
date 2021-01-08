import { Observable, Subscription, of, fromEvent, from, empty, merge, timer } from 'rxjs';
import { map, mapTo, switchMap, tap, mergeMap, takeUntil, filter, finalize } from 'rxjs/operators';

declare type RequestCategory = 'cats' | 'meats';

const CATS_URL = "https://placekitten.com/g/{w}/{h}";
function mapCats(response): Observable<string> {
  return from(new Promise((resolve, reject) => {
    const blob = new Blob([response], { type: "image/png" });
    const reader = new FileReader();
    reader.onload = (data: any) => {
      resolve(data.target.result);
    };
    reader.readAsDataURL(blob);
  }));
}

const MEATS_URL = "https://baconipsum.com/api/?type=meat-and-filler";
function mapMeats(response): Observable<string> {
  const parsedData = JSON.parse(response);
  return of(parsedData ? parsedData[0] : '');
}

let requestCategory: RequestCategory = 'cats';
let pollingSub: Subscription;

function requestData(url: string, mapFunc: (any) => Observable<string>): Observable<string> {
  console.log(url);

  const xhr = new XMLHttpRequest();
  return from(new Promise<string>((resolve, reject) => {
    const w = Math.round(Math.random() * 400);
    const h = Math.round(Math.random() * 400);
    const targetUrl = url.replace('{w}', w.toString()).replace('{h}', h.toString());

    xhr.addEventListener("load", () => {
      resolve(xhr.response);
    });
    xhr.open("GET", targetUrl);
    if (requestCategory === 'cats') {
      xhr.responseType = 'arraybuffer';
    }
    xhr.send();
  })).pipe(switchMap((data) => mapFunc(xhr.response)),
    tap((data) => console.log('Request result: ', data)));
}

function startPolling(category: RequestCategory, interval: number = 5000): Observable<string> {
  const url = category === 'cats' ? CATS_URL : MEATS_URL;
  const mapper = category === 'cats' ? mapCats : mapMeats;

  return timer(0, interval).pipe(switchMap(_ => requestData(url, mapper)));
}

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const text = document.getElementById("text");
const pollingStatus = document.getElementById('polling-status');
const catsRadio = document.getElementById('catsCheckbox');
const meatsRadio = document.getElementById('meatsCheckbox');
const catsClick$ = fromEvent(catsRadio, 'click').pipe(mapTo('cats'));
const meatsClick$ = fromEvent(meatsRadio, 'click').pipe(mapTo('meats'));
const catImage: HTMLImageElement = document.getElementById('cat') as HTMLImageElement;

const stopPolling$ = fromEvent(stopButton, 'click');

function updateDom(result) {
  if (requestCategory === 'cats') {
    catImage.src = result;
    console.log(catImage);
  } else {
    text.innerHTML = result;
  }
}

function watchForData(category: RequestCategory) {
  return startPolling(category, 5000).pipe(
    tap(updateDom),
    takeUntil(
      merge(stopPolling$, merge(catsClick$, meatsClick$).pipe(filter(c => c !== category)))
    )
  , finalize(() => pollingStatus.innerHTML = 'stopped'));
}

catsClick$.subscribe((category: RequestCategory) => {
  console.log('click');
  requestCategory = category;
  catImage.style.display = 'block';
  text.style.display = 'none';
});

meatsClick$.subscribe((category: RequestCategory) => {
  requestCategory = category;
  catImage.style.display = 'none';
  text.style.display = 'block';
});

fromEvent(startButton, 'click').pipe(
  tap(_ => pollingStatus.innerHTML = 'Started'),
  mergeMap(_ => watchForData(requestCategory))
).subscribe();
