import firebase from "firebase";
export class Firebase{
    constructor(){
        this._config = {
            apiKey: "AIzaSyBCFW9yYwWhelsunoF3Fci_yMzs-PxqaCw",
            authDomain: "whatsapp-clone-bf712.firebaseapp.com",
            projectId: "whatsapp-clone-bf712",
            storageBucket: "whatsapp-clone-bf712.appspot.com",
            messagingSenderId: "778917491610",
            appId: "1:778917491610:web:9e7e321a3e8f5817dac023",
            measurementId: "G-08GWDV6CRM"
        };
        this.init();
    }
    init(){
        if(!window._initalizedFirebase){
            firebase.initializeApp(this._config)
            firebase.firestore().settings({
                timeStampsInSnapshots: true
            })
            window._initalizedFirebase = true;
        }
    }
    initAuth(){
        return new Promise((s,f) =>{
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(result=>{
                console.log('RESULTTTT:::', result)
                let token = result.credential.accessToken;
                let user  = result.user;
                s({
                    user,
                    token
                });
            }).catch(err => {
                f(err)
            })
        })
    }
    static db(){
        return firebase.firestore();
    }
    static hd(){
        return firebase.storage()
    }
}