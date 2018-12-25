import 'rxjs/Rx';

import { Observable }  from 'rxjs';
import { from } from 'rxjs/operator'; 

const panel = document.querySelector('#progress-indicator');
const body = document.getElementsByTagName('body')[0];

const mouseDown$ = Observable.fromEvent(panel, 'mousedown');
const mouseUp$ = Observable.fromEvent(document, 'mouseup');
const mouseMove$ = Observable.fromEvent(document, 'mousemove');

const drag$ = mouseDown$.switchMap(() => mouseMove$.takeUntil(mouseUp$.filter(() => confirm('drop'))));
drag$.forEach(event => {
  panel.style.left = event.clientX + 'px';
  panel.style.top = event.clientY + 'px';
});
