import { interval } from 'rxjs';
import { take, finalize } from 'rxjs/operators';

const source = interval(1000);

const example = source.pipe(
  take(5),
  finalize(() => console.log('Sequence complete1')),
  finalize(() => console.log('Sequence complete2')),
  finalize(() => console.log('Sequence complete3'))
);

const subscribe = example.subscribe((val) => console.log(val));
