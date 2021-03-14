const g = require('../../global.js')

export default class Sprite {
  constructor(x = 0, y = 0, width = 0, height = 0, onClick = null) {
    this._hide = false
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.onClick = onClick;

    this._clickStartX = -1
    this._clickStartY = -1

    g.canvas.addEventListener('touchstart', (e) => {
      if (this._hasOnClick()) {
        var x = e.touches[0].clientX
        var y = e.touches[0].clientY
        console.log(`x: ${x}, y: ${y}, this.x: ${this.x}, this.y: ${this.y}, width: ${this.width}, height: ${this.height}`)
        if (this._in(x, y)) {
          this._clickStartX = x
          this._clickStartY = y
        }
      }
    })  

    g.canvas.addEventListener('touchend', (e) => {
      if (!this._hide && this._hasOnClick() && this._clickStartX > 0 && this._clickStartY > 0) {
        // simplize
        this._clickStart = 0
        this._clickEnd = 0

        this.onClick && this.onClick()
      }
      this._clickStartX = -1
      this._clickStartY = -1
    })
  }

  change(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    return this
  }

  setOnClickListener(onClick) {
    this.onClick =  onClick
  }

  removeOnClickListener() {
    this.onClick = null
  }

  hide() {
    this._hide = true
  }

  show() {
    this._hide = false
  }

  _hasOnClick() {
    return this.onClick != null
  }

  _in(x, y) {
    return x > this.x && x < this.x + this.width & y > this.y && y < this.y + this.height
  }

}