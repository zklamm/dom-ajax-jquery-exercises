document.addEventListener('DOMContentLoaded', () => {
  const gradients = {
    redToYellow:   [ 0,  1,  0],
    yellowToGreen: [-1,  0,  0],
    greenToCyan:   [ 0,  0,  1],
    cyanToBlue:    [ 0, -1,  0],
    blueToMagenta: [ 1,  0,  0],
    magentaToRed:  [ 0,  0, -1],
  };

  const firstHues = {
    redToYellow:   [255,   0,   0],
    yellowToGreen: [255, 255,   0],
    greenToCyan:   [  0, 255,   0],
    cyanToBlue:    [  0, 255, 255],
    blueToMagenta: [  0,   0, 255],
    magentaToRed:  [255,   0, 255],
  }

  function getCondition(gradient, r, g, b) {
    if (gradient === 'redToYellow')   return g < 255;
    if (gradient === 'yellowToGreen') return r > 0;
    if (gradient === 'greenToCyan')   return b < 255;
    if (gradient === 'cyanToBlue')    return g > 0;
    if (gradient === 'blueToMagenta') return r < 255;
    if (gradient === 'magentaToRed')  return b > 0;
  }

  function getHues(gradient, resolution) {
    let [ rGradient, gGradient, bGradient ] = gradients[gradient];
    let [ r, g, b ] = firstHues[gradient];
    let hues = [];

    do {
      hues.push([r, g, b]);
      r += resolution * rGradient;
      g += resolution * gGradient;
      b += resolution * bGradient;
    } while (getCondition(gradient, r, g, b));

    return hues;
  }

  function getRainbow(resolution) {
    resolution = 255 / resolution;
    const rainbow = [];

    for (const gradient in gradients) {
      rainbow.push(getHues(gradient, resolution));
    }

    return rainbow.flat();
  }

  function getTintsAndShades(hue, resolution) {
    const whiteToBlack = [hue];
    let [ r, g, b ] = hue;
    const tint = hue.slice();
    const rTintGradient =  (255 - r) / resolution;
    const gTintGradient =  (255 - g) / resolution;
    const bTintGradient =  (255 - b) / resolution;
    const shade = hue.slice();
    const rShadeGradient = (0 - r) / resolution;
    const gShadeGradient = (0 - g) / resolution;
    const bShadeGradient = (0 - b) / resolution;

    let [ rTint, gTint, bTint ] = tint;
    let [ rShade, gShade, bShade ] = shade;

    for (let i = 0; i < resolution; i += 1) {
      rTint += rTintGradient;
      gTint += gTintGradient;
      bTint += bTintGradient;
      whiteToBlack.unshift([rTint, gTint, bTint]);
      rShade += rShadeGradient;
      gShade += gShadeGradient;
      bShade += bShadeGradient;
      whiteToBlack.push([rShade, gShade, bShade]);
    }

    return whiteToBlack;
  }

  const ColorGrid = {
    renderGrid() {
      let total = 0;
      this.grid.forEach((column, idx) => {
        column.forEach(([ r, g, b ]) => {
          const cell = document.createElement('div');
          const grid = document.querySelector('#colorGrid');
total += 1;
          r = Math.ceil(r);
          g = Math.ceil(g);
          b = Math.ceil(b);
          cell.id = `c${idx + 1}_${r}_${g}_${b}`;
          cell.style.backgroundColor = `rgb(${r},${g},${b})`;
          grid.appendChild(cell);
          grid.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`
        });
      });
      console.log(total);
    },

    init(resolution) {
      const rainbow = getRainbow(resolution);

      this.rows = (resolution * 2) + 1;
      this.grid = rainbow.map(hue => getTintsAndShades(hue, resolution));
      this.renderGrid();
    }
  };

  ColorGrid.init(150);
});
