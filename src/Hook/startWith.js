import 'rxjs/Rx';

import { Observable }  from 'rxjs';
import { from } from 'rxjs/operator'; 

function startWith(value) {
  return Observable.create(subscriber => {
    let source = this;
    try {
      subscriber.next(value);
    } catch(err) {
      subscriber.error(err);
    }
    return source.subscribe(subscriber);
  });
};

Observable.prototype.startWith = startWith;

Observable.range(1, 5)
  .startWith(0)
  .subscribe(console.log);

class DisposableResource {
  costructor(value) {
    this.value = value;
    this.disposed = false;
  }

  getValue() {
    if (this.disposed) {
      throw new Error('Object is disposed');
    }
    return this.value;
  }

  unsubscribe() {
    if (!this.disposed) {
      this.disposed = true;
      this.value = null;
    }
    console.log('Disposed');
  }
}

const source$ = Observable.using(
  () => new DisposableResource(42),
  resource => Observable.interval(1000)
);

const subscription = source$.subscribe(
  next => console.log(`Next: ${next}`),
  err => console.log(`Error: ${err}`),
  () => console.log('Completed')
);

setTimeout(() => {
  subscription.unsubscribe();
  subscription.unsubscribe();
}, 2000)
