export default class CanvasController {
  constructor({ canvasId }) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
  }

  setupCanvas({ width, height }) {
    this.canvas.width = width;
    this.canvas.height = height;

    this.context.scale(-1, 1);
  }

  drawImage(imageSrc) {
    this.context.drawImage(
      imageSrc,
      0,
      0,
      -1 * this.canvas.width,
      this.canvas.height
    );
  }
}
