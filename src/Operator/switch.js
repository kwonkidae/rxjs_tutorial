import 'rxjs/Rx';

import { Observable }  from 'rxjs';
import { from } from 'rxjs/operator'; 

Observable.fromEvent(document.getElementById('root'), 'click')
  .map(click => Observable.range(1, 3))
  .switch()
  .subscribe(console.log);

// Observable.fromEvent(document.getElementById('root'), 'click')
//   .merge(Observable.range(1, 3))
//   .subscribe(console.log);
