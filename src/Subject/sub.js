import { Subject, from } from 'rxjs';

const subject = new Subject();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

subject.subscribe({
  next: (v) => console.log(`observer b: ${v}`)
});

// subject.next(1);
// subject.next(2);

const observable = from([1,2,3]);

observable.subscribe(subject);

