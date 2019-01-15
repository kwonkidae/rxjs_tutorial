import 'rxjs/Rx';

const R = require('ramda');
import { Observable }  from 'rxjs';

const interval$ = Observable.interval(500);

const isEven = x => x % 2 === 0;

interval$
  .filter(isEven)
  .take(5)
  .subscribe(x => {
    console.log(`Even number found: ${x}`);
  });

Observable.timer(1000)
 .subscribe(()=> {
console.log('asdf');
 });

interval$
  .delay(10000)
  .filter(R.compose(R.not, isEven))
  .take(5)
  .subscribe(x => {
    console.log(`Odd number found: ${x}`)
  })


