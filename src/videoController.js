import { EventEmitter } from "events";

export default class VideoController extends EventEmitter {
  constructor({ videoId }) {
    super();

    this.video = document.getElementById(videoId);
    this.interval = null;
  }

  addStream(stream) {
    this.addStreamToVideoElement(stream);
    this.addEventForLoadedVideo();
  }

  addStreamToVideoElement(stream) {
    if ("srcObject" in this.video) {
      this.video.srcObject = stream;
    }
  }

  addEventForLoadedVideo() {
    //developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadedmetadata_event
    https: this.video.addEventListener("loadedmetadata", () => {
      this.emit("loaded-video", this.video);
    });
  }
}
