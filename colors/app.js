document.addEventListener('DOMContentLoaded', () => {
  const Rainbow = {
    hues: [],
    currentHue: [255, 0, 0],
    gradients: {
      redToYellow:   [ 0,  1,  0],
      yellowToGreen: [-1,  0,  0],
      greenToCyan:   [ 0,  0,  1],
      cyanToBlue:    [ 0, -1,  0],
      blueToMagenta: [ 1,  0,  0],
      magentaToRed:  [ 0,  0, -1],
    },

    getCondition(gradient, r, g, b) {
      if (gradient === 'redToYellow')   return g < 255;
      if (gradient === 'yellowToGreen') return r > 0;
      if (gradient === 'greenToCyan')   return b < 255;
      if (gradient === 'cyanToBlue')    return g > 0;
      if (gradient === 'blueToMagenta') return r < 255;
      if (gradient === 'magentaToRed')  return b > 0;
    },

    addHues(gradient) {
      let [ rGradient, gGradient, bGradient ] = this.gradients[gradient];
      let [ r, g, b ] = this.currentHue;

      do {
        this.hues.push([r, g, b]);
        r += this.resolution * rGradient;
        g += this.resolution * gGradient;
        b += this.resolution * bGradient;
      } while (this.getCondition(gradient, r, g, b));

      this.currentHue = [r, g, b];
    },

    init(resolution) {
      this.resolution = resolution;

      for (const gradient in this.gradients) {
        this.addHues(gradient);
      }

      return this.hues;
    },
  };

  const Column = {
    whiteToBlack: [],

    addTintsAndShades() {
      let [ rTint, gTint, bTint ] = this.tint;
      let [ rShade, gShade, bShade ] = this.shade;

      for (let i = 0; i < this.resolution; i += 1) {
        rTint += this.rTintGradient;
        gTint += this.gTintGradient;
        bTint += this.bTintGradient;
        this.whiteToBlack.unshift([rTint, gTint, bTint]);
        rShade += this.rShadeGradient;
        gShade += this.gShadeGradient;
        bShade += this.bShadeGradient;
        this.whiteToBlack.push([rShade, gShade, bShade]);
      }
    },

    init(hue, resolution) {
      let [ r, g, b ] = hue;

      this.whiteToBlack.push(hue);
      this.resolution = resolution;
      this.tint = hue.slice();
      this.rTintGradient =  (255 - r) / resolution;
      this.gTintGradient =  (255 - g) / resolution;
      this.bTintGradient =  (255 - b) / resolution;
      this.shade = hue.slice();
      this.rShadeGradient = (0 - r) / resolution;
      this.gShadeGradient = (0 - g) / resolution;
      this.bShadeGradient = (0 - b) / resolution;

      this.addTintsAndShades();

      return this.whiteToBlack;
    },
  };

  const ColorGrid = {
    renderGrid() {
      this.grid.forEach((column, idx) => {
        column.forEach(([ r, g, b ]) => {
          const cell = document.createElement('div');
          cell.id = `column_${idx + 1}_color_${r}_${g}_${b}`;
          document.querySelector('#colorGrid').appendChild(cell);
          // debugger
          document.querySelector(`#${cell.id}`).style.backgroundColor = `rgb(${r},${g},${b})`;
          // document.querySelector(`#${cell.id}`).textContent = `_${color}_`;
        });
      });
    },

    init(rainbowResolution, whiteToBlackResolution) {
        debugger
      this.grid = Rainbow.init(rainbowResolution).map(hue => {
        return Object.assign({}, Column).init(whiteToBlackResolution);
        // return Object.create(Column).init(hue, whiteToBlackResolution);
      });

      this.renderGrid();
    }
  };

ColorGrid.init(15, 3);


  // const colorGrid = {
  //   whiteToHue: {
  //     red:     [ 0, 15, 15],
  //     yellow:  [ 0,  0, 15],
  //     green:   [15,  0, 15],
  //     cyan:    [15,  0,  0],
  //     blue:    [15, 15,  0],
  //     magenta: [ 0, 15,  0],
  //   },

  //   hueToBlack: {
  //     red:     [15,  0,  0],
  //     yellow:  [15, 15,  0],
  //     green:   [ 0, 15,  0],
  //     cyan:    [ 0, 15, 15],
  //     blue:    [ 0,  0, 15],
  //     magenta: [15,  0, 15],
  //   },

  //   rainbowTints: {
  //     red:     [ 0, -1,  0],
  //     yellow:  [ 1,  0,  0],
  //     green:   [ 0,  0, -1],
  //     cyan:    [ 0,  1,  0],
  //     blue:    [-1,  0,  0],
  //     magenta: [ 0,  0,  1],
  //   },

  //   rainbowShades: {
  //     red:     [ 0,  1,  0],
  //     yellow:  [-1,  0,  0],
  //     green:   [ 0,  0,  1],
  //     cyan:    [ 0, -1,  0],
  //     blue:    [ 1,  0,  0],
  //     magenta: [ 0,  0, -1],
  //   },

  //   columns: [],
  //   white: [255, 255, 255],

  //   getTints(rTint, gTint, bTint) {
  //     const tints = [];
  //     let [ r, g, b ] = this.white;

  //     while (r > 0 && g > 0 && b > 0) {
  //       tints.push([r, g, b]);
  //       r -= rTint;
  //       g -= gTint;
  //       b -= bTint;
  //     }

  //     tints.push([r, g, b]);
  //     return tints;
  //   },

  //   getShades([ r, g, b ], rShade, gShade, bShade) {
  //     const shades = [];

  //     while (r > 0 || g > 0 || b > 0) {
  //       r -= rShade;
  //       g -= gShade;
  //       b -= bShade;
  //       shades.push([r, g, b]);
  //     }

  //     return shades;
  //   },

  //   toHexTriplets(colors) {
  //     return colors.map(color => {
  //       return color.map(rgbComponent => {
  //         return rgbComponent.toString(16).padStart(2, '0');
  //       }).join('');
  //     });
  //   },

  //   getColumn(rTint, gTint, bTint, rShade, gShade, bShade) {
  //     const tints = this.getTints(rTint, gTint, bTint);
  //     const hue = tints[tints.length - 1];
  //     const shades = this.getShades(hue, rShade, gShade, bShade);
  //     return this.toHexTriplets(tints.concat(shades));
  //   },

  //   populateGrid() {
  //     for (const hue in this.whiteToHue) {
  //       let [ rTint, gTint, bTint ] = this.whiteToHue[hue];
  //       let [ rShade, gShade, bShade ] = this.hueToBlack[hue];

  //       for (let i = 0; i < 15; i += 1) {
  //         this.columns.push(this.getColumn(rTint, gTint, bTint, rShade, gShade, bShade));
  //         rTint += this.rainbowTints[hue][0];
  //         gTint += this.rainbowTints[hue][1];
  //         bTint += this.rainbowTints[hue][2];
  //         rShade += this.rainbowShades[hue][0];
  //         gShade += this.rainbowShades[hue][1];
  //         bShade += this.rainbowShades[hue][2];
  //       }
  //     }
  //   },

  //   renderGrid() {
  //     this.columns.forEach((column, idx) => {
  //       column.forEach(color => {
  //         const cell = document.createElement('div');
  //         cell.id = `column_${idx + 1}_color_${color}`;
  //         document.querySelector('#colorGrid').appendChild(cell);
  //         document.querySelector(`#${cell.id}`).style.backgroundColor = `#${color}`;
  //         // debugger;
  //         const sum = (accumulator, currentValue) => accumulator + currentValue;
  //         // color = color.match(/.{2}/g).map(hex => parseInt(hex, 16)).reduce(sum);
  //         // color = color.match(/.{2}/g).map(hex => parseInt(hex, 16)).join('.');
  //         // document.querySelector(`#${cell.id}`).textContent = `_${color}_`;
  //       });
  //     });
  //   },

  //   init() {
  //     this.populateGrid();
  //     this.renderGrid();
  //   }
  // };

  // colorGrid.init();
});
