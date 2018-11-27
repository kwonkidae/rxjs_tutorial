import { from, interval, Subject } from 'rxjs';
import { multicast } from 'rxjs/operators';

function multi_test1() {
  const source = from([1,2,3]);
  const subject = new Subject();
  const multicasted = source.pipe(multicast(subject));

  multicasted.subscribe({
    next: (v) => console.log(`observerA: ${v}`)
  });

  multicasted.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
  });

  multicasted.connect();
}

function multi_test2() {
  const source = interval(500);
  const subject = new Subject();
  const multicasted = source.pipe(multicast(subject));
  let subscription1, subscription2, subscriptionConnect;
  console.log('mutli_test2');
  subscription1 = multicasted.subscribe({
    next: (v) => console.log(`observerA: ${v}`)
  });

  subscriptionConnect = multicasted.connect();

  setTimeout(() => {
    subscription2 = multicasted.subscribe({
      next: (v) => console.log(`observerB: ${v}`)
    });
  }, 600);

  setTimeout(() => {
    subscription1.unsubscribe();
  }, 1200);

  setTimeout(() => {
    subscription2.unsubscribe();
    subscriptionConnect.unsubscribe();
  }, 2000); 
}

multi_test2();
