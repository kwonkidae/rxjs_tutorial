function foo() {
  console.log('Hello');
  return 42;
}

const x = foo.call();
console.log(x);
const y = foo.call();
console.log(y);
