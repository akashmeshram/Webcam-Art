export default class CanvasController {
  constructor({ canvasId }) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
  }

  drawImage(imageSrc) {
    this.context.drawImage(
      imageSrc,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }
}
