import 'rxjs/Rx';

import { Observable }  from 'rxjs';
import { from } from 'rxjs/operator'; 

// Observable.of(2,4,5,8,10)
//  .map(num => {
//     if(num % 2 !== 0) {
//       throw new Error(`Unexpected odd number: ${num}`);
//     }
//     return num;
//  })
//   .catch(err => Observable.of(6))
//   .map(n => n / 2)
//   .subscribe(
//     (val) => console.log(val),
//     (error) => console.log(`Caught: ${error}`),
//     () => console.log('All done!')
// );


// const maxRetries = 3;
// Observable.of(2,4,5,8,10)
//   .map(num => {
//     if(num % 2 !== 0) {
//       throw new Error(`Unexpected odd number: ${num}`);
//     }
//     return num;
//   })
//   .retryWhen(errors$ =>
//     Observable.range(0, maxRetries)
//     .zip(errors$, val => { console.log(errors$, val); return val})
//     .mergeMap(i =>
//       Observable.timer(i * 1000)
//     .do(() => console.log(`Retrying after ${i} second(s)...`)))
//   ).subscribe(console.log);

const val$ = Observable.of('a','b', 'c', 'd', 'e');

Observable.of(2,4,6,8)
  .zip(val$, (val1, val2) => [val1, val2])
  .subscribe(console.log)
