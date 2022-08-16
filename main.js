import "./style.css";

import CameraController from "./src/cameraController";
import VideoController from "./src/videoController";
import CanvasController from "./src/canvasController";

window.addEventListener("load", async () => {
  if (navigator && navigator.mediaDevices) {
    const cameraController = new CameraController(navigator);
    const videoController = new VideoController({ videoId: "video" });
    const canvasController = new CanvasController({ canvasId: "canvas" });

    const stream = await cameraController.getStream();
    videoController.displayVideoOnElement(stream);
    videoController.displayVideoOnCanvas(canvasController);
  } else {
    console.error("[APP] No Video Ouput");
  }
});
