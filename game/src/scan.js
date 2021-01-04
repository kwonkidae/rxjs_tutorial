import { of, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

const source = of(1, 2, 3);

const example = source.pipe(scan((acc, curr) => acc + curr, 0));

const subscribe = example.subscribe((val) => console.log(val));

(() => {
  const subject = new Subject();
  const example = subject.pipe(
    scan((acc, curr) => Object.assign({}, acc, curr), {})
  );

  const subscribe = example.subscribe((val) =>
    console.log('Accumulated object', val)
  );

  subject.next({ name: 'Joe' });
  subject.next({ age: 30 });
  subject.next({ favoriteLanguage: 'Javascript' });
})();
