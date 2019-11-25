import React, { useRef } from 'react'

const ImageSelectResize = (props = {}) => {
  const inputFile = useRef()

  const returnOriginalImage = (file, fileUrl) => {
    if (typeof props.onImageSelected === 'function') {
      props.onImageSelected(file)
    }
    if (typeof props.onImageSelectedUrl === 'function') {
      props.onImageSelectedUrl(fileUrl)
    }
  }

  const returnResizedImage = (file, fileUrl) => {
    if (typeof props.onImageResized === 'function') {
      props.onImageResized(file)
    }
    if (typeof props.onImageResizedUrl === 'function') {
      props.onImageResizedUrl(fileUrl)
    }
  }

  return (
    <div
      style={props.style}
      onClick={() => {
        if (
          inputFile &&
          inputFile.current &&
          typeof inputFile.current.click === 'function'
        ) {
          inputFile.current.click()
        }
      }}
    >
      {props.children}
      <input
        onChange={e => {
          if (!props) return

          const file = e.target.files[0]
          const fileUrl = URL.createObjectURL(file)

          returnOriginalImage(file, fileUrl)

          if (
            typeof props.onImageResized === 'function' ||
            typeof props.onImageResizedUrl === 'function'
          ) {
            const maxWidth = props.maxWidth || 800
            const maxHeight = props.maxHeight || 600

            const fileName = file.name
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = event => {
              const img = new Image()
              img.src = event.target.result
              img.onload = () => {
                if (img.width <= maxWidth && img.height <= maxHeight) {
                  returnOriginalImage(file, fileUrl)
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
                    returnResizedImage(resizedFile, resizedFileUrl)
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
        ref={inputFile}
        hidden
        accept='image/png, image/jpeg'
      />
    </div>
  )
}

export default ImageSelectResize
