// Assign a type to a variable
// This way we ensure that this variable
// is handling a string
let variavel: string = '10';

console.log(typeof variavel);

//we can also assing types to function return and function parameters
function soma(a : number, b : number ): number {
  return a + b;
}

console.log(soma(15, 2));
