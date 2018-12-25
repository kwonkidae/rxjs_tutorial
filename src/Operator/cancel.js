import 'rxjs/Rx';

import { Observable }  from 'rxjs';
import { from } from 'rxjs/operator'; 

Observable.from([1,2,3,4])

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(42);
    
  }, 3000);
});

promise.then(val => {
  console.log(`In then(): ${val}`);
});

const subscription$ = Observable.fromPromise(promise).subscribe(val => {
  console.log(`In subscribe(): ${val}`);
});

subscription$.unsubscribe();
