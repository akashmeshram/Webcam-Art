import "./style.css";

import CameraController from "./src/cameraController";
import VideoController from "./src/videoController";

window.addEventListener("load", async () => {
  if (navigator && navigator.mediaDevices) {
    const cameraController = new CameraController(navigator);
    const videoController = new VideoController({ videoId: "video" });

    const stream = await cameraController.getStream();
    videoController.displayVideo(stream);
  } else {
    console.error("[APP] No Video Ouput");
  }
});
