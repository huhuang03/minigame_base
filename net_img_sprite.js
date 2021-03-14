import ImageSprite from './img_sprite.js'

export default class NetImgeSprite extends ImageSprite {
  constructor(url, x, y, width, height)  {
    super('', x, y, width, height)
    this.url = url
    this.isDownloading = false
  }

  changeUrl(url) {
    if (url != this.url) {
      this.url = url
      this.imgSrc = ''
    }
  }

  draw(callback) {
    if (!this.url || this.isDownloading) {
      callback && callback()
      return
    }

    if (this.imgSrc) {
      super.draw(callback)
    } else {
      this.isDownloading = true
      wx.downloadFile({
        url: this.url,
        success: res => {
          this.isDownloading = false
          this.changeSrc(res.tempFilePath);
          this.draw(callback)
        },
        fail: err => {
          this.isDownloading = false
          console.log('downlaod failed', err);
        }
      })
    }
  }
}