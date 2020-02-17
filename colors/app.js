document.addEventListener('DOMContentLoaded', () => {
  class Hue {
    constructor(r, g, b) {
      this.rgb = [r, g, b];
      this.r = r;
      this.g = g;
      this.b = b;
    }

    toHexTriplet() {
      return this.rgb.map(value => {
        return value.toString(16).padStart(2, '0');
      }).join('');
    }

    getTints(resolution) {

    }

    getShades(resolution) {

    }
  }

  class ColorGrid {
    constructor(startHue = [255, 0, 0]) {
      this.startHue = startHue;
    }

    populate() {

    }

    render() {
      populate();
    }
  }


  const colorGrid = {
    whiteToHue: {
      red:     [ 0, 15, 15],
      yellow:  [ 0,  0, 15],
      green:   [15,  0, 15],
      cyan:    [15,  0,  0],
      blue:    [15, 15,  0],
      magenta: [ 0, 15,  0],
    },

    hueToBlack: {
      red:     [15,  0,  0],
      yellow:  [15, 15,  0],
      green:   [ 0, 15,  0],
      cyan:    [ 0, 15, 15],
      blue:    [ 0,  0, 15],
      magenta: [15,  0, 15],
    },

    rainbowTints: {
      red:     [ 0, -1,  0],
      yellow:  [ 1,  0,  0],
      green:   [ 0,  0, -1],
      cyan:    [ 0,  1,  0],
      blue:    [-1,  0,  0],
      magenta: [ 0,  0,  1],
    },

    rainbowShades: {
      red:     [ 0,  1,  0],
      yellow:  [-1,  0,  0],
      green:   [ 0,  0,  1],
      cyan:    [ 0, -1,  0],
      blue:    [ 1,  0,  0],
      magenta: [ 0,  0, -1],
    },

    columns: [],
    white: [255, 255, 255],

    getTints(rTint, gTint, bTint) {
      const tints = [];
      let [ r, g, b ] = this.white;

      while (r > 0 && g > 0 && b > 0) {
        tints.push([r, g, b]);
        r -= rTint;
        g -= gTint;
        b -= bTint;
      }

      tints.push([r, g, b]);
      return tints;
    },

    getShades([ r, g, b ], rShade, gShade, bShade) {
      const shades = [];

      while (r > 0 || g > 0 || b > 0) {
        r -= rShade;
        g -= gShade;
        b -= bShade;
        shades.push([r, g, b]);
      }

      return shades;
    },

    toHexTriplets(colors) {
      return colors.map(color => {
        return color.map(rgbComponent => {
          return rgbComponent.toString(16).padStart(2, '0');
        }).join('');
      });
    },

    getColumn(rTint, gTint, bTint, rShade, gShade, bShade) {
      const tints = this.getTints(rTint, gTint, bTint);
      const hue = tints[tints.length - 1];
      const shades = this.getShades(hue, rShade, gShade, bShade);
      return this.toHexTriplets(tints.concat(shades));
    },

    populateGrid() {
      for (const hue in this.whiteToHue) {
        let [ rTint, gTint, bTint ] = this.whiteToHue[hue];
        let [ rShade, gShade, bShade ] = this.hueToBlack[hue];

        for (let i = 0; i < 15; i += 1) {
          this.columns.push(this.getColumn(rTint, gTint, bTint, rShade, gShade, bShade));
          rTint += this.rainbowTints[hue][0];
          gTint += this.rainbowTints[hue][1];
          bTint += this.rainbowTints[hue][2];
          rShade += this.rainbowShades[hue][0];
          gShade += this.rainbowShades[hue][1];
          bShade += this.rainbowShades[hue][2];
        }
      }
    },

    renderGrid() {
      this.columns.forEach((column, idx) => {
        column.forEach(color => {
          const cell = document.createElement('div');
          cell.id = `column_${idx + 1}_color_${color}`;
          document.querySelector('#colorGrid').appendChild(cell);
          document.querySelector(`#${cell.id}`).style.backgroundColor = `#${color}`;
          // debugger;
          const sum = (accumulator, currentValue) => accumulator + currentValue;
          // color = color.match(/.{2}/g).map(hex => parseInt(hex, 16)).reduce(sum);
          // color = color.match(/.{2}/g).map(hex => parseInt(hex, 16)).join('.');
          document.querySelector(`#${cell.id}`).textContent = `_${color}_`;
        });
      });
    },

    init() {
      this.populateGrid();
      this.renderGrid();
    }
  };

  colorGrid.init();
});
