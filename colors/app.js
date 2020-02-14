document.addEventListener('DOMContentLoaded', () => {
  const shadeIncrements = {
    red:     [ 0, 15, 15, 15,  0,  0],
    yellow:  [ 0,  0, 15, 15, 15,  0],
    green:   [15,  0, 15,  0, 15,  0],
    cyan:    [15,  0,  0,  0, 15, 15],
    blue:    [15, 15,  0,  0,  0, 15],
    magenta: [ 0, 15,  0, 15,  0, 15],
  };

  const transitions = {
    redToYellow:   [], //add green
    yellowToGreen: [], //sub red
    greenToCyan:   [], //add blue
    cyanToBlue:    [], //sub green
    blueToMagenta: [], //add red
    magentaToRed:  [], //sub blue
  };

  const colors = [];

// RED
  let [ rLight, gLight, bLight, rDark, gDark, bDark ] = shadeIncrements.red;

  for (let i = 0; i < 15; i += 1) {
    transitions.redToYellow.push([rLight, gLight, bLight, rDark, gDark, bDark]);
    gLight -= 1;
    gDark += 1;
  }

  transitions.redToYellow.forEach(transition => {
    colors.push(getShades(transition));
  });

// YELLOW
  [ rLight, gLight, bLight, rDark, gDark, bDark ] = shadeIncrements.yellow;
  for (let i = 0; i < 15; i += 1) {
    transitions.yellowToGreen.push([rLight, gLight, bLight, rDark, gDark, bDark]);
    rLight += 1;
    rDark -= 1;
  }

  transitions.yellowToGreen.forEach(transition => {
    colors.push(getShades(transition));
  });

// GREEN
[ rLight, gLight, bLight, rDark, gDark, bDark ] = shadeIncrements.green;
for (let i = 0; i < 15; i += 1) {
  transitions.greenToCyan.push([rLight, gLight, bLight, rDark, gDark, bDark]);
  bLight -= 1;
  bDark += 1;
}

transitions.greenToCyan.forEach(transition => {
  colors.push(getShades(transition));
});

// CYAN
[ rLight, gLight, bLight, rDark, gDark, bDark ] = shadeIncrements.cyan;
for (let i = 0; i < 15; i += 1) {
  transitions.cyanToBlue.push([rLight, gLight, bLight, rDark, gDark, bDark]);
  gLight += 1;
  gDark -= 1;
}

transitions.cyanToBlue.forEach(transition => {
  colors.push(getShades(transition));
});

// BLUE
  [ rLight, gLight, bLight, rDark, gDark, bDark ] = shadeIncrements.blue;
  for (let i = 0; i < 15; i += 1) {
    transitions.blueToMagenta.push([rLight, gLight, bLight, rDark, gDark, bDark]);
    rLight -= 1;
    rDark += 1;
  }

  transitions.blueToMagenta.forEach(transition => {
    colors.push(getShades(transition));
  });

// MAGENTA
  [ rLight, gLight, bLight, rDark, gDark, bDark ] = shadeIncrements.magenta;
  for (let i = 0; i < 15; i += 1) {
    transitions.magentaToRed.push([rLight, gLight, bLight, rDark, gDark, bDark]);
    bLight += 1;
    bDark -= 1;
  }

  transitions.magentaToRed.forEach(transition => {
    colors.push(getShades(transition));
  });



  colors.forEach((shades, idx) => {
    shades.forEach((hex) => {
      const div = document.createElement('div');
      div.id = `column${idx}_color_${hex}`;
      document.querySelector('#colors').appendChild(div);
      document.querySelector(`#${div.id}`).style.backgroundColor = `#${hex}`;
      // document.querySelector(`#${div.id}`).textContent = hex;
    });
  });
});

function getShades(transition) {
  const [ rLight, gLight, bLight, rDark, gDark, bDark ] = transition;
  const lights = colorize([255, 255, 255], rLight, gLight, bLight);
  const peak = lights[lights.length - 1];
  const darks = blacken(peak, rDark, gDark, bDark);
  return toHex(lights.concat(darks));
}

function toHex(shades) {
  return shades.map(shade => {
    return shade.map(component => {
      return component.toString(16).padStart(2, '0');
    }).join('');
  });
}

function colorize([ r, g, b ], rLight, gLight, bLight) {
  const shades = [];

  while (r > 0 && g > 0 && b > 0) {
    shades.push([r, g, b]);
    r -= rLight;
    g -= gLight;
    b -= bLight;
  }

  shades.push([r, g, b]);
  return shades;
}

function blacken([ r, g, b ], rDark, gDark, bDark) {
  const shades = [];

  while (r > 0 || g > 0 || b > 0) {
    r -= rDark;
    g -= gDark;
    b -= bDark;
    shades.push([r, g, b]);
  }

  return shades;
}