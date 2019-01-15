import 'rxjs/Rx';

import { Observable }  from 'rxjs';

const isEven = (val) => val % 2 === 0;

const source$ = Observable.from([1,2,3,4])
  .filter(isEven)
  .map(x => x * x)
  .share();

  source$.subscribe(x => console.log(`Stream 1 ${x}`));
  source$.subscribe(x => console.log(`Stream 2 ${x}`));
