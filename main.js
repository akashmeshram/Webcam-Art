import "./style.css";

import CameraController from "./src/cameraController";
import VideoController from "./src/videoController";
import CanvasController from "./src/canvasController";

const FRAME_RATE = 60;

window.addEventListener("load", async () => {
  if (navigator && navigator.mediaDevices) app();
  else console.error("[APP] No Media Ouput");
});

const app = async () => {
  try {
    let interval = null;

    const cameraController = new CameraController(navigator);
    const videoController = new VideoController({ videoId: "video" });
    const canvasController = new CanvasController({ canvasId: "canvas" });

    const webCamStream = await cameraController.getCameraStream();

    videoController.addStream(webCamStream);
    videoController.on("loaded-video", (video) => {
      interval = setInterval(
        () => canvasController.drawImage(video),
        FRAME_RATE
      );
    });
  } catch (err) {
    throw new Error(err);
  }
};
