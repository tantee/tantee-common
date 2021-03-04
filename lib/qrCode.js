import jsQR from 'jsqr'

export default function (image) {
  try {
    let tmpImage = new Image()
    tmpImage.src = image

    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d", { alpha: false });

    let width = tmpImage.width
    let height = tmpImage.height

    canvas.width = width
    canvas.height = height
    context.imageSmoothingEnabled = false;
    context.drawImage(tmpImage, 0, 0);

    let imageData = context.getImageData(0, 0, width, height);
    let code = jsQR(imageData.data,width,height)
    if (code) return code.data
    else return null
  } catch {
    return null
  }
}
