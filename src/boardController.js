export default class BoardController {
  constructor({ redLayerId, greenLayerId, blueLayerId }) {
    this.red = document.getElementById(redLayerId);
    this.green = document.getElementById(greenLayerId);
    this.blue = document.getElementById(blueLayerId);
  }

  displayPixelsOnLayers(pixels) {}
}
