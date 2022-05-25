const tensorflow = require('@tensorflow/tfjs');

export class ModelContainer {
  nn: any

  constructor(nn: any) {
    this.nn = nn
  }

  async loadFromURL(url: string) {
    this.nn = await tensorflow.loadLayersModel(url)
  }

  removeNetwork() {
    this.nn = null
  }

  swapToNewObject() {
    let new_nn = this.nn
    this.nn = null
    return new_nn
  }

  obtainMemorySafe() {
    return this.swapToNewObject()
  }

  obtain() {
    return this.nn
  }
}


export const runInference = (modelContainer: ModelContainer, imageData: HTMLElement) => {
  let nn = modelContainer.obtainMemorySafe()
  let pixels = tensorflow.browser.fromPixels(imageData)
  pixels = pixels.reshape([1, 80, 80, 3])
  pixels.dtype = 'float32'
  pixels = tensorflow.div(pixels, 255)
  let predictions = nn.predict(pixels)
  modelContainer.nn = nn
  nn = null
  return predictions.dataSync()
}
