import { Component } from 'react'

class ImageSelectResize extends Component {
  returnOriginalImage = (file, fileUrl) => {
    if (typeof this.props.onImageSelected === 'function') {
      this.props.onImageSelected(file)
    }
    if (typeof this.props.onImageSelectedUrl === 'function') {
      this.props.onImageSelectedUrl(fileUrl)
    }
  }

  returnResizedImage = (file, fileUrl) => {
    if (typeof this.props.onImageResized === 'function') {
      this.props.onImageResized(file)
    }
    if (typeof this.props.onImageResizedUrl === 'function') {
      this.props.onImageResizedUrl(fileUrl)
    }
  }

  render () {
    return (
      <div
        style={this.props.style}
        onClick={() => {
          if (this.inputFile && typeof this.inputFile.click === 'function') {
            this.inputFile.click()
          }
        }}
      >
        {this.props.children}
        <input
          onChange={e => {
            if (!this.props) return

            const file = e.target.files[0]
            const fileUrl = URL.createObjectURL(file)

            this.returnOriginalImage(file, fileUrl)

            if (
              typeof this.props.onImageResized === 'function' ||
              typeof this.props.onImageResizedUrl === 'function'
            ) {
              const maxWidth = this.props.maxWidth || 800
              const maxHeight = this.props.maxHeight || 600

              const fileName = file.name
              const reader = new FileReader()
              reader.readAsDataURL(file)
              reader.onload = event => {
                const img = new Image()
                img.src = event.target.result
                img.onload = () => {
                  if (img.width <= maxWidth && img.height <= maxHeight) {
                    this.returnOriginalImage(file, fileUrl)
                    return
                  }

                  const resizerRatio = maxWidth / maxHeight
                  const originalRatio = img.width / img.height

                  let width = maxWidth
                  let height = maxHeight
                  if (originalRatio > resizerRatio) {
                    // modify height
                    height = width / originalRatio
                  } else if (originalRatio < resizerRatio) {
                    // modify width
                    width = height * originalRatio
                  }

                  const elem = document.createElement('canvas')
                  elem.width = width
                  elem.height = height
                  const ctx = elem.getContext('2d')

                  // img.width and img.height will contain the original dimensions
                  ctx.drawImage(img, 0, 0, width, height)
                  ctx.canvas.toBlob(
                    blob => {
                      const resizedFile = new File([blob], fileName, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                      })
                      const resizedFileUrl = URL.createObjectURL(resizedFile)
                      this.returnResizedImage(resizedFile, resizedFileUrl)
                    },
                    'image/jpeg',
                    1
                  )
                }
                reader.onerror = error => console.log(error)
              }
            }
          }}
          type='file'
          ref={e => (this.inputFile = e)}
          hidden
          accept='image/png, image/jpeg'
        />
      </div>
    )
  }
}

export default ImageSelectResize
