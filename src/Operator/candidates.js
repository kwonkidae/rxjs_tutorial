import 'rxjs/Rx';

import { Observable, of, interval }  from 'rxjs';
import { mergeMap, map, take } from 'rxjs/operators'; 
import { from } from 'rxjs/operator'; 

let candidates = [
  {name: 'Brendan Eich', experience : 'JavaScript Inventor'},
  {name: 'Emmet Brown', experience: 'Historian'},
  {name: 'George Lucas', experience: 'Sci-fi writer'},
  {name: 'Alberto Perez', experience: 'Zumba Instructor'},
  {name: 'Bjarne Stroustrup', experience: 'C++ Developer'}
];

function t1() {
  const hasJsExperience = bg => bg.toLowerCase().includes('javascript');

  const candidates$ = Observable.from(candidates);
  candidates$
    .filter(candidates => hasJsExperience(candidates.experience))
    .subscribe(console.log);

  Observable.from(candidates)
    .filter(candidate => {
      const bg = candidate.experience.toLowerCase();
      return bg.includes('javascript') || bg.includes('c++');
    })
    .reduce((acc, obj) => {
      acc.push(obj.name);
      return acc;
    }, [])
    .subscribe(console.log);
}

t1();

function t2() {
  const add = (x, y) => x + y;
  Observable.from([
    {
   date: '2016-07-01',
   amount: -320.00,
    },
    {
   date: '2016-07-13',
   amount: 1000.00,
    },
    {
   date: '2016-07-22',
   amount: 45.0,
    },
  ])
  .pluck('amount')
  .reduce(add, 0)
  .subscribe(console.log);
}

t2();
