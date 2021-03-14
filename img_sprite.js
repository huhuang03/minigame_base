import Sprite from './sprite.js'
const g = require('../../global.js')

/**
 * 游戏基础的精灵类
 */
export default class ImageSprite extends Sprite {

  constructor(imgSrc = '', x, y, w, h, dx, dy, dw, dh) {
    super(x, y, w, h)
    this.width = dw | this.width
    this.height = dh | this.height
    this.dx = dx
    this.dy = dy

    this.imgSrc = imgSrc

    this.loaded = false
    this.img     = new Image()
    this.img.src = imgSrc
    this.img.onload = () => {
      this.loaded = true
    }

    this.visible = true
  }

  changeSrc(src) {
    this.imgSrc = src
    this.img.src = this.imgSrc
  }

  has(x, y) {
    return x > this.x && (x < this.x + this.width) && y > this.y && (y < this.y + this.height)
  }

  on_destory() {
    this.visible = false
  }

  scale(scale) {
    this.width = (x * scale) | 0
    this.height = (x * scale) | 0
  }

  validate() {
    return this.x && this.y && this.width && this.height
  }

  /**
   * 将精灵图绘制在canvas上
   */
  draw(callback = null) {
    if (!this.validate()) {
      console.log(`not validate x: ${this.x}, y: ${this.y}, width: ${this.width}, height: ${this.height}`)
      return
    }

    var ctx = g.ctx
    if ( !this.visible ) {
      callback && callback()
      return
    }
      

    if (this.loaded) {
      this._real_draw(ctx)
      callback && callback()
    } else {
      this.img.onload = () => {
        this.loaded = true
        this._real_draw(ctx)
        callback && callback()
      }
    }
  }

  _hasD() {
    return this.dx != null && this.dy != null && this.dw != null && this.dh != null
  }

  _real_draw(ctx) {
    // console.log(`draw: ${this.imgSrc}, x: ${this.x}, y: ${this.y}, w: ${this.width}, h: ${this.height}, dw: ${this.dw}, dh: ${this.dh}`)
    if (this._hasD()) {
      ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.width,
        this.height,
        this.dx,
        this.dy,
        this.dw,
        this.dh
      )
    } else {
      ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }

  }

  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param{ImageSprite} sp: Sptite的实例
   */
  isCollideWith(sp) {
    let spX = sp.x + sp.width / 2
    let spY = sp.y + sp.height / 2

    if ( !this.visible || !sp.visible )
      return false

    return !!(   spX >= this.x
              && spX <= this.x + this.width
              && spY >= this.y
              && spY <= this.y + this.height  )
  }
}
