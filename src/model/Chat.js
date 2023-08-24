import { Firebase } from "../utils/Firebase";
import { Model } from "./Model";

export class Chat extends Model{


    constructor(){

        super()
    }


    /**
     * get users value from _data in Model
     * @example this.users
     */
    get users(){ return this._data.users};
    
    /**
     * set users value from _data in Model
     * @example this.users = value
     */
    set users(value){this._data.users = value};

    /**
     * get timeStamp value from _data in Model
     * @example this.timeStamp
     */
    get timeStamp(){ return this._data.timeStamp};

    /**
     * set timeStamp value from _data in Model
     * @example this.timeStamp = value
     */
    set timeStamp(value){this._data.timeStamp = value};

    /**
     * get refs from firebase 'chat' collection
     * @returns Firebase.db().collection('/chats')
     */
    static getRef(){
        return Firebase.db().collection('/chats');
    }

    /**
     * 
     * @param {string} myEmail 
     * @param {string} contactEmail 
     * @returns the document where myEmail and contactEmail are
     */
    static find(myEmail, contactEmail){

        return Chat.getRef()
            .where(btoa(myEmail), '==', (true))
            .where(btoa(contactEmail), '==', (true))
            .get();
    }

    /**
     * Create an chat connection between two users
     * @param {string} myEmail 
     * @param {string} contactEmail 
     * @returns 
     */
    static create(myEmail, contactEmail){

        return new Promise((s,f)=>{

            let users = {}

            users[btoa(myEmail)] = true;
            users[btoa(contactEmail)] = true;

            Chat.getRef().add({
                users,
                timeStamp: new Date()
            }).then(doc =>{
                Chat.getRef().doc(doc.id).get().then(chat=>{
                    s(chat)
                }).catch(err=>{
                    f(err);
                })

            }).catch(err=>{
                f(err);
            });
        })
    }

    /**
     * Creates a chat connection in firebase if it don't exists
     * @param {string} myEmail 
     * @param {string} contactEmail 
     * @returns the 'chat' object as result of a promise
     */
    static createIfNotExists(myEmail, contactEmail){
        return new Promise((s,f)=>{

            Chat.find(myEmail, contactEmail).then(chats => {
                if(chats.empty){                    

                    Chat.create(myEmail, contactEmail).then(chat=>{
                        s(chat);
                    })

                }
                else{

                    chats.forEach(chat => {

                        s(chat);
                        
                    });
                }
            }).catch(err => {
                console.error(err);
            })



        })
    }
    
}