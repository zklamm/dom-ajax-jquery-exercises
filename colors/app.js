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

function getReds() {
  const lights = colorize([255, 255, 255]);
  const peak = lights[lights.length - 1];
  const darks = blacken(peak);
  return toHex(lights.concat(darks));
}

function toHex(shades) {
  return shades.map(shade => {
    return shade.map(component => {
      return component.toString(16).padStart(2, '0');
    }).join('');
  });
}

function colorize([ r, g, b ]) {
  const shades = [];

  while (r > 0 && g > 0 && b > 0) {
    shades.push([r, g, b]);
    r -= 0;
    g -= 17;
    b -= 17;
  }

  shades.push([r, g, b]);
  return shades;
}

function blacken([ r, g, b ]) {
  const shades = [];

  while (r > 0 || g > 0 || b > 0) {
    r -= 17;
    g -= 0;
    b -= 0;
    shades.push([r, g, b]);
  }

  return shades;
}