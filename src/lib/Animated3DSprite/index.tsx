import { Clock, RepeatWrapping, Texture } from 'three'

export default class Animated3DSprite {
  currentFrameDisplayTime: number = 0
  currentFrame: number = 0
  clock: Clock = new Clock()
  readonly frameDisplayDuration: number

  constructor(
    public texture: Texture,
    protected tilesAmountHorizontally: number,
    protected tilesAmountVertically: number,
    protected tilesTotalAmount: number,
    framesPerSecond: number,
  ) {
    this.tilesTotalAmount -= 1
    this.frameDisplayDuration = 1000 / framesPerSecond
    this.texture.wrapS = RepeatWrapping
    this.texture.wrapT = RepeatWrapping
    this.texture.repeat.set(
      1 / tilesAmountHorizontally,
      1 / tilesAmountVertically,
    )
  }

  init(startFrame: number = 0): Texture {
    this.currentFrame = startFrame
    this.currentFrameDisplayTime = 0
    this.clock = new Clock()
    this._updateFrame()
    return this.texture
  }

  update(): void {
    this.currentFrameDisplayTime += this.clock.getDelta() * 1000

    while (this.currentFrameDisplayTime > this.frameDisplayDuration) {
      this.currentFrameDisplayTime -= this.frameDisplayDuration
      this.currentFrame =
        this.currentFrame < this.tilesTotalAmount ? this.currentFrame + 1 : 0
      this._updateFrame()
    }
  }

  next() {
    this.currentFrameDisplayTime += 16 * 0.001
    this.currentFrameDisplayTime -= this.frameDisplayDuration
    this.currentFrame =
      this.currentFrame < this.tilesTotalAmount ? this.currentFrame + 1 : 0
    this._updateFrame()
  }

  previous() {
    this.currentFrameDisplayTime -= 16 * 0.001
    this.currentFrameDisplayTime += this.frameDisplayDuration
    this.currentFrame =
      this.currentFrame > 0 ? this.currentFrame - 1 : this.tilesTotalAmount
    this._updateFrame()
  }

  _updateFrame() {
    const tileHeight = 1 / this.tilesAmountVertically

    const currentColumn = this.currentFrame % this.tilesAmountHorizontally
    const currentRow = Math.floor(
      this.currentFrame / this.tilesAmountHorizontally,
    )

    this.texture.offset.x = currentColumn / this.tilesAmountHorizontally
    this.texture.offset.y =
      1 - currentRow / this.tilesAmountVertically - tileHeight
  }
}
