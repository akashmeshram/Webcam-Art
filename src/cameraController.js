const CONSTRAINTS = { audio: false, video: {} };

export default class CameraController {
  constructor(navigator) {
    this.navigator = navigator;
  }

  async getCameraStream() {
    try {
      const stream = await this.navigator.mediaDevices.getUserMedia(
        CONSTRAINTS
      );
      return stream;
    } catch (err) {
      throw new Error(err);
    }
  }
}
