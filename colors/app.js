document.addEventListener('DOMContentLoaded', () => {
  const colors = getReds();

  colors.forEach((hex, idx) => {
    let div = document.createElement('div');
    div.id = `c${idx}`;
    document.querySelector('#colors').appendChild(div);
    document.querySelector(`#${div.id}`).style.backgroundColor = `#${hex}`;
    document.querySelector(`#${div.id}`).textContent = hex;
  });
});

// function getColors() {
//   const colors = [];

//   for (let i = 15; i >= 1; i -= 1) {
//     const h = i.toString(16);
//     colors.push(`f${h}${h}`);
//   }
//   for (let i = 15; i >= 0; i -= 1) {
//     const h = i.toString(16);
//     colors.push(`${h}00`);
//   }

//   for (let i = 15; i >= 1; i -= 1) {
//     const h = i.toString(16);
//     colors.push(`ff${h}`);
//   }
//   for (let i = 15; i >= 0; i -= 1) {
//     const h = i.toString(16);
//     colors.push(`${h}${h}0`);
//   }

//   for (let i = 15; i >= 1; i -= 1) {
//     const h = i.toString(16);
//     colors.push(`${h}f${h}`);
//   }
//   for (let i = 15; i >= 0; i -= 1) {
//     const h = i.toString(16);
//     colors.push(`0${h}0`);
//   }

//   for (let i = 15; i >= 1; i -= 1) {
//     const h = i.toString(16);
//     colors.push(`${h}ff`);
//   }
//   for (let i = 15; i >= 0; i -= 1) {
//     const h = i.toString(16);
//     colors.push(`0${h}${h}`);
//   }

//   for (let i = 15; i >= 1; i -= 1) {
//     const h = i.toString(16);
//     colors.push(`${h}${h}f`);
//   }
//   for (let i = 15; i >= 0; i -= 1) {
//     const h = i.toString(16);
//     colors.push(`00${h}`);
//   }

//   for (let i = 15; i >= 1; i -= 1) {
//     const h = i.toString(16);
//     colors.push(`f${h}f`);
//   }
//   for (let i = 15; i >= 0; i -= 1) {
//     const h = i.toString(16);
//     colors.push(`${h}0${h}`);
//   }

//   return colors;
// }

function getReds() {
  const shades = [];
  const white = [255, 255, 255];
  let [ r, g, b ] = white;

  do {
    let shade = decsToHex([r, g, b]);
    shades.push(shade);
    r -= 0;
    g -= 17;
    b -= 17;
  } while (r > 0 && g > 0 && b > 0);

  do {
    let shade = decsToHex([r, g, b]);
    shades.push(shade);
    r -= 17;
    g -= 0;
    b -= 0;
  } while (r > 0 || g > 0 || b > 0);

  // while (r > 0 || g > 0 || b > 0) {
  //   let shade = decsToHex([r, g, b]);
  //   shades.push(shade);
  //   r -= 17;
  //   g -= 0;
  //   b -= 0;
  // }
// debugger
  return shades;
}

function decsToHex(decs) {
  return decs.map(dec => dec.toString(16).padStart(2, '0')).join('');
}
