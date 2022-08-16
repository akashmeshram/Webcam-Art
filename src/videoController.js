const FRAME_RATE = 60;

export default class VideoController {
  constructor({ videoId }) {
    this.video = document.getElementById(videoId);
    this.interval = null;
  }

  displayVideoOnElement(stream) {
    if ("srcObject" in this.video) {
      this.video.srcObject = stream;
    }
  }

  displayVideoOnCanvas(canvasController) {
    this.video.addEventListener("loadedmetadata", () => {
      this.interval = setInterval(
        () => canvasController.drawImage(this.video),
        FRAME_RATE
      );
    });
  }

  pauseVideoOnCanvas() {
    clearInterval(this.interval);
  }
}
