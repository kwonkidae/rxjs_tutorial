import { of, throwError } from 'rxjs';
import {
  delay,
  tap,
  mergeMap,
  innerMap,
  repeat,
  catchError,
} from 'rxjs/operators';
console.clear();

let requestCount = 1;
const produceResponse = () =>
  requestCount++ % 3 === 0 ? throwError('sad face') : of(new Date());

const fakeDelayedRequest = () => produceResponse().pipe(delay(1000));

const write = (response) => {
  if (response) {
    console.log(`RESPONSE ${response}`);
    document.open();
    document.write(response);
  }
};

const poll = of({}).pipe(
  mergeMap((_) =>
    fakeDelayedRequest().pipe(
      catchError((e) => {
        console.error(e);
        return of(false);
      })
    )
  ),
  tap(write),
  tap((_) => console.info('---wating 3 secs to restart polling')),
  delay(3000),
  tap((_) => console.info('---restarted polling')),
  repeat()
);
poll.subscribe();
