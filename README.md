
This is a library to select and resize image.

![ezgif-2-679c697523f6](https://user-images.githubusercontent.com/2413398/69517176-8931d480-0f86-11ea-92d7-a473a9a753f6.gif)

# Example
```js
import React, { useState } from 'react'
import ImageSelectResize from 'react-image-select-resize'

const Example = () => {
  const [originalImageUrl, setOriginalImageUrl] = useState(null)
  const [resizedImageUrl, setResizedImageUrl] = useState(null)
  return (
    <div style={{padding: 10}}>
      <ImageSelectResize
        maxWidth={200}
        onImageSelectedUrl={setOriginalImageUrl}
        onImageResizedUrl={setResizedImageUrl}
      >
        <div
          style={{
            border: 'black 1px solid',
            borderRadius: 5,
            padding: 5,
            display: 'table',
            cursor: 'pointer'
          }}
        >
          Select image
        </div>
      </ImageSelectResize>
      <div style={{marginTop: 10}}>Original image:</div>
      {originalImageUrl && <img src={originalImageUrl} style={{maxWidth: '100%'}} />}
      <div style={{marginTop: 10}}>Resized image:</div>
      {resizedImageUrl && <img src={resizedImageUrl} />}
    </div>
  )
}

export default Example

```

# Props

| Props | Description |
|-|-|
| style | Set the container style. Example: `style={{borderRadius: 5}}` |
| maxWidth | Set the maximum width. Example: `maxWidth={200}` |
| maxHeight | Set the maximum height. Example: `maxHeight={200}` |
| onImageSelected | A function with original file as the parameter. Example: `onImageSelected={originalFile => console.log(originalFile)}` |
| onImageSelectedUrl | A function with blob URL of original file as the parameter. Example: `onImageSelectedUrl={originalFileUrl => setOriginalImageUrl(originalFileUrl)}` |
| onImageResized | A function with resized file as the parameter. Example: `onImageResized={resizedFile => console.log(resizedFile)}` |
| onImageResizedUrl | A function with blob URL of resized file as the parameter. Example: `onImageResizedUrl={resizedFileUrl => setResizedImageUrl(resizedFileUrl)}` |