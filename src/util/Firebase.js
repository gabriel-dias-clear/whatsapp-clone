export class Firebase {

    constructor(){
        this.init()
    }

    init(){

        const firebaseConfig = {
            apiKey: "AIzaSyBCFW9yYwWhelsunoF3Fci_yMzs-PxqaCw",
            authDomain: "whatsapp-clone-bf712.firebaseapp.com",
            projectId: "whatsapp-clone-bf712",
            storageBucket: "whatsapp-clone-bf712.appspot.com",
            messagingSenderId: "778917491610",
            appId: "1:778917491610:web:9e7e321a3e8f5817dac023",
            measurementId: "G-08GWDV6CRM"
          }; 

          if(!window._initialized){

            firebase.initializeApp(firebaseConfig)

            window._initialized = true;

            firebase.firestore().settings({
                timestampsInSnapshots: true
            })

          }

    }

    static db(){

        return firebase.firestore();

    }

    static hd(){

        return firebase.storage()

    }

}