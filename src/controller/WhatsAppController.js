class WhatsAppController{

    constructor(){

        this.elementsPrototype();
        this.loadElements(); // método que transformar id do html em camelCase (propriedades de um objeto)
        this.initEvents();

    }

    loadElements(){

        this.el = {}

        document.querySelectorAll('[id]').forEach(element=>{

            this.el[Format.getCamelcase(element.id)] = element; //chamando util Format (app.el)

        })

    }

    elementsPrototype(){

        // aplica um display none sob o elemento
        Element.prototype.hide = function(){
            this.style.display = 'none';
            return this;
        }
    
        // volta a mostrar o elemento
        Element.prototype.show = function(){

            this.style.display = 'block';
            return this;

        }

        // aplica um display none sob o elemento
        Element.prototype.toggle = function(){

            this.style.display = (this.style.style === 'none') ? 'block' : 'none'
            return this;

        }

        // aplica diversos eventos ao mesmo elemento
        Element.prototype.on = function(events, fn){
            events.split(' ').forEach(event=>{

                this.addEventListener(event, fn)
                return this;

            })
        }

        // aplica css em forma de objeto 
        // ex: elemento.css = {
        //   widht:50px
        //   height:50px
        //              }
        Element.prototype.css = function(styles){
            for ( let name in styles){
                this.style[name] = styles[name]
                return this;
            }
        }

        //aplica classe
        Element.prototype.addClass = function(name){
            
            this.classList.add(name)
            return this;
             
        }

        //remove classe
        Element.prototype.removeClass = function(name){

            this.classList.remove(name)
            return this;

        }

        //se não tiver a classe, aplica a mesma
        Element.prototype.toggleClass = function(name){

            this.classList.toggle(name)
            return this;

        }

        //pergunta se possui a classe
        Element.prototype.hasClass = function(name){

           return this.classList.contains(name)

        }

        HTMLFormElement.prototype.getForm = function () {

            return new FormData(this);

        }

        HTMLFormElement.prototype.toJSON = function () {

            let json = {}

            this.getForm().forEach((value, key)=>{

                json[key] = value;

            });

            return json;

        }

    }

    initEvents(){

        this.el.myPhoto.on('click', e=>{

            this.closeAllLeftPanel()
            this.el.panelEditProfile.show()
            setTimeout(()=>{
                this.el.panelEditProfile.addClass('open')
            }, 165)
        })

        this.el.btnNewContact.on('click', e=>{
            this.closeAllLeftPanel();
            this.el.panelAddContact.show()
            setTimeout(()=>{
                this.el.panelAddContact.addClass('open')
            }, 165)
        })

        this.el.btnClosePanelEditProfile.on('click', e=>{
            this.el.panelEditProfile.removeClass('open')
        })

        this.el.btnClosePanelAddContact.on('click', e=>{
            this.el.panelAddContact.removeClass('open')
        })

        this.el.inputNamePanelEditProfile.on('keypress', e=>{

            if(e.key === 'Enter'){
                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();
            }
        
        })

        this.el.btnSavePanelEditProfile.on('click', e=>{

            console.log(this.el.inputNamePanelEditProfile.innerHTML)

        })

        this.el.formPanelAddContact.on('submit', e=>{

            e.preventDefault();

            let formData = new FormData(this.el.formPanelAddContact);

        })

        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item=>{

            item.on('click', e=>{
                this.el.home.hide()
                this.el.main.css({
                    display:'flex'
                })

            })

        })

        this.el.btnAttach.on('click', e=>{

            e.stopPropagation()

            this.el.menuAttach.addClass('open')

            document.addEventListener('click', this.closeMenuAttach.bind(this))

        })

        this.el.btnAttachPhoto.on('click', e=>{
            this.el.inputPhoto.click();
        })

        this.el.inputPhoto.on('change', e=>{
            
            console.log(this.el.inputPhoto.files);

            [...this.el.inputPhoto.files].forEach(file=>{

                console.log(file)

            })

        })

        this.el.btnAttachCamera.on('click', e=>{

            this.closeAllMainPanel()
            this.el.panelCamera.addClass('open')
            this.el.panelCamera.css({
                'height':'calc(100% - 120px)'
            })
        })

        this.el.btnClosePanelCamera.on('click', e=>{
            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show()
        })

        this.el.btnTakePicture.on('click', e=>{

            console.log('take pícture')

        })

        this.el.btnAttachDocument.on('click', e=>{
            this.closeAllMainPanel()
            this.el.panelDocumentPreview.addClass('open')
            this.el.panelDocumentPreview.css({
                'height':'calc(100% - 120px)'
            })
        })

        this.el.btnClosePanelDocumentPreview.on('click', e=>{

            this.closeAllMainPanel()
            this.el.panelMessagesContainer.show()

        })

        this.el.btnSendDocument.on('click', e=>{
            console.log('send document')
        })

        this.el.btnAttachContact.on('click', e=>{
            this.el.modalContacts.show()
        })

        this.el.btnCloseModalContacts.on('click', e=>{
            this.el.modalContacts.hide()
        })

        this.el.btnSendMicrophone.on('click', e=>{
            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide()
            this.startRecordMicrophoneTime();
        })

        this.el.btnCancelMicrophone.on('click', e=>{
            this.closeRecordMicrophone();
        })

        this.el.btnFinishMicrophone.on('click', e=>{
            this.closeRecordMicrophone();
        })


    }

    startRecordMicrophoneTime(){
        let start = Date.now();
        this._recordMicrophoneInterval = setInterval(()=>{

            this.el.recordMicrophoneTimer.innerHTML = (Date.now() - start)

        }, 100)   
    }

    closeRecordMicrophone(){

        this.el.recordMicrophone.hide()
        this.el.btnSendMicrophone.show()
        clearInterval(this._recordMicrophoneInterval)

    }

    closeAllMainPanel(){

        this.el.panelMessagesContainer.hide();
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open')

    }

    closeMenuAttach(e){
        
        document.removeEventListener('click', this.closeMenuAttach)
        this.el.menuAttach.removeClass('open');

    }
        

    closeAllLeftPanel(){
        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();
    }

   

}