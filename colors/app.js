document.addEventListener('DOMContentLoaded', () => {
  const Color = {
    toHexTriplet() {
      return `#${this.rgb.map(value => {
        return value.toString(16).padStart(2, '0');
      }).join('')}`;
    },

    init({ r, g, b }) {
      this.rgb = [r, g, b];
      this.r = r;
      this.g = g;
      this.b = b;

      return this;
    },
  };

  const Rainbow = {
    hues: [],
    currentHue: {r: 255, g: 0, b: 0},
    gradients: {
      redToYellow:   {r:  0, g:  1, b:  0},
      yellowToGreen: {r: -1, g:  0, b:  0},
      greenToCyan:   {r:  0, g:  0, b:  1},
      cyanToBlue:    {r:  0, g: -1, b:  0},
      blueToMagenta: {r:  1, g:  0, b:  0},
      magentaToRed:  {r:  0, g:  0, b: -1},
    },

    getCondition(gradient) {
      if (gradient === 'redToYellow')   return this.currentHue.g < 255;
      if (gradient === 'yellowToGreen') return this.currentHue.r > 0;
      if (gradient === 'greenToCyan')   return this.currentHue.b < 255;
      if (gradient === 'cyanToBlue')    return this.currentHue.g > 0;
      if (gradient === 'blueToMagenta') return this.currentHue.r < 255;
      if (gradient === 'magentaToRed')  return this.currentHue.b > 0;
    },

    addHues(gradient) {
      do {
        let increment = this.gradients[gradient];
        let hue = Object.create(Color).init(this.currentHue);

        this.hues.push(hue);
        this.currentHue.r += this.resolution * increment.r;
        this.currentHue.g += this.resolution * increment.g;
        this.currentHue.b += this.resolution * increment.b;
      } while (this.getCondition(gradient));
    },

    init(resolution) {
      this.resolution = resolution;

      for (const gradient in this.gradients) {
        this.addHues(gradient);
      }

      return this;
    },
  };

  const Column = {
    whiteToBlack: [],
// 255 254 0
    addTints() {

      let tint = Object.assign({}, this.hue);
      for (let i = 0; i < this.resolution; i += 1) {
        this.whiteToBlack.unshift(tint);
        tint.r += this.rTintIncrements;
        tint.g += this.gTintIncrements;
        tint.b += this.bTintIncrements;
      }
        debugger
    },

    addShades() {

    },

    init(hue, resolution) {
      this.hue = hue;
      this.whiteToBlack.push(hue);
      this.rTintIncrements =  (255 - hue.r) / resolution;
      this.gTintIncrements =  (255 - hue.g) / resolution;
      this.bTintIncrements =  (255 - hue.b) / resolution;
      this.resolution = resolution;

      this.addTints();
      this.addShades();

      return this;
    },
  };

  const ColorGrid = {
    init(rainbowResolution) {
      this.rainbow = Rainbow.init(rainbowResolution);
      // this.createColumns();

      return this;
    }
  };

Column.init(Object.create(Color).init({r:255,g:1,b:0}), 17);

ColorGrid.init(1);
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
