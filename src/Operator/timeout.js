import 'rxjs/Rx';

import { Observable, of, interval }  from 'rxjs';
import { mergeMap, map, take } from 'rxjs/operators'; 


const source$ = Observable.create(observer => {
  const timeoutId = setTimeout(() => {
    observer.next();
    observer.complete();
  }, 1000);
  return () => { console.log('return'); clearTimeout(timeoutId)};
});

const resultFn = source$.subscribe(() =>
document.getElementById('root').style.backgroundColor = 'green');

const source = of('Hello');
const myPromise = val =>
  new Promise(resolve => resolve(`${val} World From Promise`));

const example = source.pipe(map(val => myPromise(val)));
const subscribe = example.subscribe(val => val.then((val) => console.log(val)));

const _s = interval(1000);

const ex = _s.pipe(
  mergeMap(
    val => interval(5000).pipe(take(2)),
    (oVal, iVal, oIndex, iIndex) => [oIndex, oVal, iIndex, iVal],
    2
  )
);

const sb = ex.subscribe(val => console.log(val));

// interval(5000).pipe(take(2)).subscribe(val => console.log(val));

function test1() {
  const source = of('Hello');
  
  const example = source.pipe(map(val => of(`${val} World!`)));

  const subscribe = example.subscribe(val => val.subscribe(val => console.log));
}

test1();
