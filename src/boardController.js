const PALETTE = ["░", "▄", "▀", "█"];

export default class BoardController {
  constructor({ redLayerId, greenLayerId, blueLayerId }) {
    this.red = document.getElementById(redLayerId);
    this.green = document.getElementById(greenLayerId);
    this.blue = document.getElementById(blueLayerId);
  }

  displayPixelsOnLayers(pixelsGrid = [[]]) {
    const [redString, greenString, blueString] =
      this.convertPixelsToString(pixelsGrid);

    this.red.textContent = redString;
    this.green.textContent = greenString;
    this.blue.textContent = blueString;
  }

  convertPixelsToString(pixelsGrid = [[]]) {
    let redString = "";
    let greenString = "";
    let blueString = "";

    pixelsGrid.forEach((pixelRow) => {
      const [redRow, greenRow, blueRow] = pixelRow.reduce(
        (row, pixel) => {
          const redPixelId = Math.floor(
            (pixel[0] / 255) * (PALETTE.length - 1)
          );
          const greenPixelId = Math.floor(
            (pixel[1] / 255) * (PALETTE.length - 1)
          );
          const bluePixelId = Math.floor(
            (pixel[2] / 255) * (PALETTE.length - 1)
          );

          row[0].push(PALETTE[redPixelId]);
          row[1].push(PALETTE[greenPixelId]);
          row[2].push(PALETTE[bluePixelId]);
          return row;
        },
        [[], [], []]
      );

      redString = `${redString}${redRow.join("")}\n`;
      greenString = `${greenString}${greenRow.join("")}\n`;
      blueString = `${blueString}${blueRow.join("")}\n`;
    });

    return [redString, greenString, blueString];
  }
}
