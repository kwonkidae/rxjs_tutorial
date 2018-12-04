import { Observable } from 'rxjs';
import { from } from 'rxjs';
const computeFutureValue = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(42);
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
