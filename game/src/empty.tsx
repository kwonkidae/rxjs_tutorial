import { empty } from 'rxjs';

const subscribe = empty().subscribe({
  next: () => console.log('Next'),
  complete: () => console.log('Complete')
})
