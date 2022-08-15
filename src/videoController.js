export default class VideoController {
  constructor({ videoId }) {
    this.video = document.getElementById(videoId);
  }

  displayVideo(stream) {
    if ("srcObject" in this.video) {
      this.video.srcObject = stream;
    }
  }
}
