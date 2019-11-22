// input: ary
// output: new ary where first element of input ary is now at the end
// assume: return undefined if input is not ary
//         return [] if input is []
// logic:
//   use guard clauses for assumptions
//   first = ary[0]
//   rest = ary.slice(1)
//   return rest.push(first);

function rotateArray(ary) {
  // debugger;
  if (!Array.isArray(ary)) return;
  if (ary.length === 0) return [];

  const first = ary[0];
  const rest = ary.slice(1);
  return rest.push(first);
}

// function rotateArray(array) {
//   if (!Array.isArray(array)) {
//     return;
//   }

//   if (array.length === 0) {
//     return [];
//   }

//   return array.slice(1).concat(array[0]);
// }