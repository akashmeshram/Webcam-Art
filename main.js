import "./style.css";

import CameraController from "./src/cameraController";
import VideoController from "./src/videoController";
import CanvasController from "./src/canvasController";
import { getScreenDimensions } from "./src/util";
import BoardController from "./src/boardController";

const FRAME_RATE = 60;
const VIDEO_ID = "video";
const CANVAS_ID = "canvas";
const BOARD_ID = "board";
const LAYER_IDS = {
  redLayerId: "red-layer",
  greenLayerId: "green-layer",
  blueLayerId: "blue-layer",
};

window.addEventListener("load", async () => {
  if (navigator && navigator.mediaDevices) app();
  else console.error("[APP] No Media Ouput");
});

const app = async () => {
  let interval = null;
  try {
    const cameraController = new CameraController(navigator);
    const videoController = new VideoController({ videoId: VIDEO_ID });
    const canvasController = new CanvasController({ canvasId: CANVAS_ID });
    const boardController = new BoardController(BOARD_ID, LAYER_IDS);

    const { width, height } = getSetUpDimentions();
    canvasController.setupCanvas({ width, height });
    videoController.setupVideoElement({ width, height });

    const webCamStream = await cameraController.getCameraStream();
    videoController.addStream(webCamStream);
    videoController.on("loaded-video", (video) => {
      interval = setInterval(
        () => processVideoFrame(video, canvasController, boardController),
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

const processVideoFrame = (videoElement, canvasController, boardController) => {
  canvasController.drawImage(videoElement);
  const pixelsGrid = canvasController.getPixelsMatrix();
  boardController.displayPixelsOnLayers(pixelsGrid);
};
