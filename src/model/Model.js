import { ClassEvent } from "../utils/ClassEvent";

export class Model extends ClassEvent{

    constructor(){
        super();

        this._data = {}
    }


    fromJSON(json){
        //console.log('JSON RECEIVED:', json);
        this._data = Object.assign(this._data, json);
        //console.log('_DATA MODEL:', this._data)
        this.trigger('datachange', this.toJSON())
    }

    toJSON(){
        return this._data;
    }
}