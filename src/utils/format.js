export class Format{

    static getCamelCase(text){

        let div = document.createElement('div');

        div.innerHTML = `<div data-${text}="id"></div>`;
        
        
        return Object.keys(div.firstChild.dataset)[0];

    }

    static timeStampToTime(timeStamp){
        return (timeStamp && typeof timeStamp.toDate === 'function') ? Format.dateToTime(timeStamp.toDate()) : '';
    }


    static dateToTime(date, locale = 'pt-BR'){
        
        return date.toLocaleTimeString(this.locale, {
            hour: '2-digit',
            minute: '2-digit'
        }) 
    }
    static toTime(duration) {

        let milliseconds = parseInt((duration % 1000) / 100)
            , seconds = parseInt((duration / 1000) % 60)
            , minutes = parseInt((duration / (1000 * 60)) % 60)
            , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if (hours > 0) {
            console.log(`FORMATED TIME:${hours.toString()}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
            return `${hours.toString()}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        } else {
            console.log(`FORMATED TIME:${minutes.toString()}:${seconds.toString().padStart(2, '0')}`)
            return `${minutes.toString()}:${seconds.toString().padStart(2, '0')}`;

        }

    }

}