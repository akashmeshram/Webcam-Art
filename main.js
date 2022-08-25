import "./style.css";

import CameraController from "./src/cameraController";
import VideoController from "./src/videoController";
import CanvasController from "./src/canvasController";
import { getScreenDimensions } from "./src/util";

const FRAME_RATE = 60;

window.addEventListener("load", async () => {
  if (navigator && navigator.mediaDevices) app();
  else console.error("[APP] No Media Ouput");
});

const app = async () => {
  let interval = null;
  try {
    const cameraController = new CameraController(navigator);
    const videoController = new VideoController({ videoId: "video" });
    const canvasController = new CanvasController({ canvasId: "canvas" });

    const { width, height } = getSetUpDimentions();
    canvasController.setupCanvas({ width, height });
    videoController.setupVideoElement({ width, height });

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
  } finally {
    clearInterval(interval);
  }
};

const getSetUpDimentions = () => {
  const screenDimentions = getScreenDimensions();

  const height = screenDimentions.gridHeight;
  const width = (screenDimentions.gridHeight / 3) * 4;

  return { width, height };
};
