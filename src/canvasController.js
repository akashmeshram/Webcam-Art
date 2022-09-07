const CHANNEL = 4;

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

  getPixelsMatrix() {
    const pixels = this.getPixels();
    return pixels.reduce((grid, pixel, id) => {
      const widthThreshold = id % this.canvas.width;
      if (widthThreshold === 0) grid.push([]);
      grid[grid.length - 1].push(pixel);
      return grid;
    }, []);
  }

  getPixels() {
    const imageData = this.canvasData();
    const pixels = Array.from(
      Array(Math.ceil(imageData.length / CHANNEL)),
      (_, i) => imageData.slice(i * CHANNEL, i * CHANNEL + CHANNEL)
    );
    return pixels;
  }

  canvasData() {
    const imageData = this.context.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    return imageData.data;
  }
}
