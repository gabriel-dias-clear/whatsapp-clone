class WhatsAppController{

    constructor(){

        this.loadElements(); // método que transformar id do html em camelCase (propriedades de um objeto)

    }

    loadElements(){

        this.el = {}

        document.querySelectorAll('[id]').forEach(element=>{

            this.el[Format.getCamelcase(element.id)] = element; //chamando util Format (app.el)

        })

    }

}