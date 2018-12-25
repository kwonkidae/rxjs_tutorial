import Rx from 'rxjs/Rx';
import { from, Observable } from 'rxjs';

const body = document.getElementsByTagName('body');
let sinceLast = new Date();
Observable.fromEvent(document, 'mouseup')
  .filter(e => {
    let timeElapsed = new Date() - sinceLast;
    sinceLast = new Date();
    return timeElapsed < 200;
  }).subscribe(() => console.log('double clicked'));

function exclude(predicate) {
  return Observable.create(subscriber => {
    let source = this;
    return source.subscribe(value => {
      try {
        if(!predicate(value)) {
          subscriber.next(value);
        }
      }
      catch(err) {
        subscriber.error(err);
      }
    },
    err => subscriber.error(err),
    () => subscriber.complete());
  });
}

Observable.prototype.exclude = exclude;

Observable.from([1,2,3,4,5])
  .exclude(x => x % 2 === 0)
  .subscribe(console.log);

const computeFutureValue = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve(42);
    reject(new Error('Unexpected Exception!'));
  }, 5000);
});

from(computeFutureValue)
  .subscribe(
    val => {
      console.log(val);
    },
    err => {
      console.log(`Error occurred: ${err}`);
    },
    () => {
      console.log('All done!');
    });
