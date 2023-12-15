import "firebase/compat/storage"
import "firebase/compat/auth";
import "firebase/compat/database";
import firebase from "firebase/compat/app"


const firebaseConfig = {
    apiKey: "AIzaSyBsyBWsfRaDmR8CgSBjsep5FSs7UtORyAA",
    authDomain: "mindu-b28e3.firebaseapp.com",
    projectId: "mindu-b28e3",
    storageBucket: "mindu-b28e3.appspot.com",
    messagingSenderId: "749411407784",
    appId: "1:749411407784:web:6792300c2b8ed55ec3ef9d"
}
// if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
// }

export default firebase;