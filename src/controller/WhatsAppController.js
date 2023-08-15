class WhatsAppController{

    constructor(){

        this.elementsPrototype();
        this.loadElements(); // método que transformar id do html em camelCase (propriedades de um objeto)

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

    }

}