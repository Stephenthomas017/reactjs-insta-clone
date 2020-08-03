
import firebase from "firebase";
const firebasApp = firebase.initializeApp({

    apiKey: "AIzaSyCIlb0BM9FXufWFFPqoktLTmrwYYFzpohM",
    authDomain: "insta-clone-react-b23f0.firebaseapp.com",
    databaseURL: "https://insta-clone-react-b23f0.firebaseio.com",
    projectId: "insta-clone-react-b23f0",
    storageBucket: "insta-clone-react-b23f0.appspot.com",
    messagingSenderId: "1036862351938",
    appId: "1:1036862351938:web:c42bc2a0c2a1757a9a1bdb",
    measurementId: "G-GS96QPCB59"
});
   const db =firebase.firestore();
    const auth =firebase.auth();
    const storage = firebase.storage();

    export { db, auth,storage };

