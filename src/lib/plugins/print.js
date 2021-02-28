import Vue from 'vue'
import printJS from 'print-js'

function Install (Vue, options) {
  const property = (options && options.property) || '$print'

  function print (printObject) {
    printJS(printObject);
  }

  function printPdfBase64(printData,contentType='application/pdf') {
    const dataUrl = `data:${contentType};base64,${printData}`
    fetch(dataUrl).then((res)=>{
      res.blob().then((blob)=>{
        printJS({printable: URL.createObjectURL(blob), type: 'pdf'});
      })
    })
  }

  Vue.prototype[property] = print
  Vue.prototype[property+'PdfBase64'] = printPdfBase64
}

Vue.use(Install,{})
