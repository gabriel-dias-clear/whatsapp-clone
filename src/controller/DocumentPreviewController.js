const pdfjslib = require('pdfjs-dist')
const path = require('path')

pdfjslib.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, '../../dist/pdf.worker.bundle.js')

export class DocumentPreviewController {
    
    constructor(file){

        this._file = file;

    }

    getPreviewData(){

        return new Promise((s,f)=>{

            let reader = new FileReader()

            switch(this._file.type){

                case 'image/png':
                case 'image/jpeg':
                case 'image/jpg':
                case 'image/gif':
                
                reader.onload = e=>{

                    s({
                        src: reader.result,
                        info: this._file.name
                    })

                }
                reader.onerror = e =>{

                    f(e);

                }
                reader.readAsDataURL(this._file)
                break;

                case 'application/pdf':
                reader.onload = event =>{
                    
                    pdfjslib.getDocument(new Uint8Array(reader.result)).then(pdf => {

                        pdf.getPage(1).then(page => {
                            let viewport = page.getViewport(1)

                            let canvas = document.createElement('canvas');
                            let canvasContext = canvas.getContext('2d');

                            canvas.width = viewport.width;
                            canvas.height = viewport.height

                            page.render({
                                canvasContext,
                                viewport
                            }).then(()=>{

                                s({
                                    src: canvas.toDataURL('image/png'),
                                    info: `${pdf.numPages} páginas`
                                })

                            }).catch(err=>{
                                f(err)
                            })

                        }).catch(err=>{
                            f(err);
                        })

                    }).catch(err=>{

                        f(err)

                    })

                }

                reader.readAsArrayBuffer(this._file)

                break;

                default:

                f()

            }

        })

    }

}